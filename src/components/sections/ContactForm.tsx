"use client";

import { AlertCircle, Loader2, Mail, Send } from "lucide-react";
import { useId, useState } from "react";

import { NativeButton } from "@/components/ui/Button";
import { hasEmail, socialLinks } from "@/data/site";
import { cn, isValidEmail } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

type FormState = "idle" | "submitting" | "success" | "error" | "fallback";

/** Mirrors the caps enforced by /api/contact so the browser stops bad input first. */
const FIELD_LIMITS = { name: 80, email: 160, message: 2000 } as const;

export function ContactForm() {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  /** Prefilled draft offered after direct delivery proves unavailable. */
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const validate = (formData: FormData): FieldErrors => {
    const next: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!isValidEmail(email)) next.email = "That email address looks invalid.";
    if (!message) next.message = "Please write a short message.";
    else if (message.length < 10)
      next.message = "Please add a little more detail — at least 10 characters.";

    return next;
  };

  /**
   * Turns the submission into a `mailto:` draft so the visitor's own mail client
   * sends it. Used when direct delivery is unavailable, which keeps the form
   * useful on a deployment with no email provider wired up.
   */
  function openMailClient(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    const href = `mailto:${socialLinks.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setMailtoHref(href);
    setState("fallback");
    setFeedback(
      "Direct delivery is not available here, so your email app will open instead. Send the draft and I will reply by email.",
    );

    // `location.href` on mailto hands off to the mail client. Wrapped because a
    // browser without one simply does nothing.
    try {
      window.location.href = href;
    } catch {
      // The button below still opens the draft manually.
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setState("error");
      setFeedback("Please correct the highlighted fields.");
      return;
    }

    setState("submitting");
    setFeedback("");
    setMailtoHref(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      const status =
        result && typeof result === "object" && "status" in result
          ? String((result as { status: unknown }).status)
          : "error";

      if (response.ok && status === "ok") {
        form.reset();
        setState("success");
        setFeedback("Message sent. Thank you — I will reply by email.");
        return;
      }

      // No provider on this deployment: degrade to the visitor's mail client
      // rather than dead-ending, but never claim the message was sent.
      if (status === "not-configured" || !hasEmail) {
        if (!hasEmail) {
          setState("error");
          setFeedback(
            "Direct delivery is unavailable and no email address is configured.",
          );
          return;
        }
        openMailClient(formData);
        return;
      }

      const message =
        result &&
        typeof result === "object" &&
        "message" in result &&
        typeof (result as { message: unknown }).message === "string"
          ? (result as { message: string }).message
          : "Something went wrong. Please try again.";
      setState("error");
      setFeedback(message);
    } catch {
      if (hasEmail) {
        openMailClient(formData);
        return;
      }
      setState("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  }

  const isSubmitting = state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Name"
          autoComplete="name"
          maxLength={FIELD_LIMITS.name}
          error={errors.name}
          required
        />
        <Field
          id={`${formId}-email`}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
          error={errors.email}
          required
        />
      </div>

      <Field
        id={`${formId}-message`}
        name="message"
        label="Message"
        as="textarea"
        rows={5}
        maxLength={FIELD_LIMITS.message}
        error={errors.message}
        hint="A short note about the role, the project or the timeline."
        required
      />

      {/* Honeypot: invisible to people, tempting for naive bots. Never labelled. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <NativeButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" />
              Send message
            </>
          )}
        </NativeButton>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "flex items-center gap-1.5 text-sm",
            state === "success" && "text-accent",
            state === "fallback" && "text-accent",
            state === "error" && "text-amber-700 dark:text-amber-400",
            (state === "idle" || isSubmitting) && "text-fg-subtle",
          )}
        >
          {state === "error" ? (
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          ) : null}
          {feedback}
        </p>
      </div>

      {/*
        Backup route. `mailto:` opens the visitor's own mail client with the
        message already written, which works with no backend configured at all.
      */}
      {state === "fallback" && mailtoHref ? (
        <div className="rounded-lg border border-dashed border-line-strong bg-surface-2 px-3.5 py-3 text-sm leading-relaxed text-fg-muted">
          <p>
            If no mail app opened, use this button to write the same message
            directly to{" "}
            <a
              href={mailtoHref}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {socialLinks.email}
            </a>
            .
          </p>
          <a
            href={mailtoHref}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
            Open the pre-filled draft
          </a>
        </div>
      ) : null}
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  rows?: number;
  as?: "input" | "textarea";
  autoComplete?: string;
  maxLength?: number;
  hint?: string;
  error?: string;
  required?: boolean;
};

function Field({
  id,
  name,
  label,
  type = "text",
  rows,
  as = "input",
  autoComplete,
  maxLength,
  hint,
  error,
  required,
}: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  const classes = cn(
    "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-fg transition-colors duration-200 placeholder:text-fg-subtle/70 focus:border-accent focus:outline-none",
    error ? "border-amber-600/70 dark:border-amber-500/70" : "border-line",
  );

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium tracking-tight">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-accent">
            *
          </span>
        ) : null}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows ?? 5}
          required={required}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(classes, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={classes}
        />
      )}

      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-amber-700 dark:text-amber-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}