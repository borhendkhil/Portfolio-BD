/**
 * Contact form types, shared by the client form and the route handler.
 */

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/** Raw shape as submitted, including the honeypot field real users never fill. */
export type ContactSubmission = ContactPayload & {
  /** Honeypot. Must stay empty; filled values are dropped silently. */
  company?: string;
};

export type ContactResponse =
  | { status: "ok" }
  /** No delivery provider configured — the UI says so instead of faking success. */
  | { status: "not-configured" }
  | {
      status: "error";
      /** `invalid` is a client mistake; `provider` is an upstream failure. */
      code: "invalid" | "provider";
      message: string;
    };