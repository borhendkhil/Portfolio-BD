"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Rendered as the dialog heading and used as its accessible name. */
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Modal dialog built on the native <dialog> element.
 *
 * Using the platform primitive means the accessibility behaviour is the
 * browser's, not ours: focus is trapped inside the dialog, the rest of the page
 * becomes inert, Escape closes it, and focus returns to the trigger on close.
 * We only add what the platform does not provide — body scroll locking, the
 * backdrop click handler, and the close button.
 */
export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const headingId = useId();

  // Native imperative API: the `open` prop only mirrors what the element reports.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  // `close` covers Escape, the close button and `onClose()` alike.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleClose = () => onClose();
    node.addEventListener("close", handleClose);
    return () => node.removeEventListener("close", handleClose);
  }, [onClose]);

  /**
   * Lock background scrolling while the dialog is open, compensating for the
   * removed scrollbar so the layout does not shift sideways.
   */
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /**
   * A click lands on the dialog element itself only when the backdrop was hit,
   * because the content sits inside a positioned wrapper. This also covers the
   * case of a drag that starts inside and ends on the backdrop.
   */
  const handleClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const node = ref.current;
    if (node) node.close();
  }, []);

  return (
    <dialog
      ref={ref}
      onClick={handleClick}
      aria-labelledby={headingId}
      className={cn(
        // A narrow measure keeps body text comfortable: the case study is long
        // and would be hard to track across a full-width panel.
        "m-auto max-h-[85dvh] w-[calc(100%-1.5rem)] max-w-3xl",
        "overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-lift",
        "open:animate-dialog-in",
        // Opaque enough that the page behind cannot compete with the text.
        "backdrop:bg-slate-950/75",
        className,
      )}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <header className="flex items-start justify-between gap-6 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={headingId}
              className="mt-1 text-lg font-semibold tracking-tight text-balance sm:text-xl"
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="-mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-line text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
            <span className="sr-only">Close</span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-8">
          {children}
        </div>
      </div>
    </dialog>
  );
}