import { isValidEmail, sanitizeText } from "@/lib/utils";
import type { ContactPayload, ContactResponse, ContactSubmission } from "@/types/contact";

/** Field caps, mirrored by the `maxLength` attributes on the form inputs. */
const LIMITS = {
  name: 80,
  email: 160,
  message: 2000,
} as const;

/** Hard ceiling on the request body so an oversized payload is never buffered. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Contact form endpoint.
 *
 * No email provider is configured by default, and none is simulated: without
 * `CONTACT_WEBHOOK_URL` the route answers with `not-configured` so the UI can say
 * so plainly instead of faking a success message. The form responds by opening a
 * pre-filled `mailto:` draft, so a submission is never silently dropped.
 *
 * To enable delivery, set CONTACT_WEBHOOK_URL to any endpoint that accepts a
 * JSON POST (Formspree, Resend via a small function, Zapier, Make, a Worker...).
 * The payload is sanitised and length-capped before it leaves the server.
 */
export async function POST(request: Request) {
  /**
   * Cross-origin guard. Browsers always send `Origin` on a POST, so a mismatched
   * origin means the submission came from another site. Requests without the
   * header (curl, server-to-server) are allowed through.
   */
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json<ContactResponse>(
      { status: "error", code: "invalid", message: "Malformed request." },
      403,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json<ContactResponse>(
      { status: "error", code: "invalid", message: "That message is too long to send." },
      413,
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json<ContactResponse>(
      { status: "error", code: "invalid", message: "Malformed request." },
      400,
    );
  }

  const raw = (body ?? {}) as Partial<ContactSubmission>;

  /**
   * Honeypot. The field is hidden from humans but trivial for a naive bot to
   * fill, so a hit is answered with a normal success response and silently
   * dropped — the bot learns nothing and the visitor is never affected.
   */
  if (sanitizeText(raw.company, 100)) {
    return json<ContactResponse>({ status: "ok" });
  }

  // Oversized input is rejected rather than silently truncated, so a message is
  // never delivered with its tail cut off.
  for (const field of ["name", "email", "message"] as const) {
    if (typeof raw[field] === "string" && raw[field]!.length > LIMITS[field]) {
      return json<ContactResponse>(
        {
          status: "error",
          code: "invalid",
          message:
            field === "message"
              ? `Please keep your message under ${LIMITS.message} characters.`
              : `Please keep your ${field} under ${LIMITS[field]} characters.`,
        },
        400,
      );
    }
  }

  const payload: ContactPayload = {
    name: sanitizeText(raw.name, LIMITS.name),
    email: sanitizeText(raw.email, LIMITS.email),
    message: sanitizeText(raw.message, LIMITS.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return json<ContactResponse>(
      {
        status: "error",
        code: "invalid",
        message: "Please fill in your name, email and a message.",
      },
      400,
    );
  }

  if (!isValidEmail(payload.email)) {
    return json<ContactResponse>(
      { status: "error", code: "invalid", message: "That email address looks invalid." },
      400,
    );
  }

  if (payload.message.length < 10) {
    return json<ContactResponse>(
      {
        status: "error",
        code: "invalid",
        message: "Please add a little more detail to your message.",
      },
      400,
    );
  }

  if (!webhookUrl) {
    return json<ContactResponse>({ status: "not-configured" }, 503);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        source: "portfolio-contact-form",
      }),
      // Never let a slow provider hang the request.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Provider responded with ${response.status}`);
    }

    return json<ContactResponse>({ status: "ok" });
  } catch {
    // The upstream detail is never forwarded to the client.
    return json<ContactResponse>(
      {
        status: "error",
        code: "provider",
        message: "Your message could not be sent right now. Please try again shortly.",
      },
      502,
    );
  }
}

function json<T>(body: T, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}