"use client";

import { useCaseStudy } from "@/components/projects/CaseStudyProvider";

/**
 * Opens the case study modal.
 *
 * A real `<button>` so keyboard and screen-reader users get the same affordance
 * as everyone else. `aria-haspopup` / `aria-expanded` expose the state, and the
 * native `<dialog>` returns focus to this button once the modal closes.
 */
export function CaseStudyTrigger({ className }: { className?: string }) {
  const { open, setOpen } = useCaseStudy();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={
        className ??
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[0.9375rem] font-medium text-accent-fg transition-[background-color,transform] duration-200 hover:bg-accent-hover active:translate-y-px"
      }
    >
      Read the case study
      <span aria-hidden="true">&darr;</span>
    </button>
  );
}