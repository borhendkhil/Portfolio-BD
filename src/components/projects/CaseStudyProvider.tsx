"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { Dialog } from "@/components/ui/Dialog";
import { caseStudy } from "@/data/caseStudy";

type CaseStudyContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
};

const CaseStudyContext = createContext<CaseStudyContextValue | null>(null);

/**
 * Holds the open state for the case study modal.
 *
 * The trigger lives inside the featured project card while the dialog is
 * rendered separately, so the two are separated in the tree and need shared
 * state. `dialogContent` is passed in from the Server Component, which keeps
 * the case study text and its diagrams out of the client bundle.
 */
export function CaseStudyProvider({
  children,
  dialogContent,
}: {
  children: ReactNode;
  /** Server-rendered case study body. */
  dialogContent: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Keeps the old #case-study deep link working now that it is a modal.
  useEffect(() => {
    const syncFromHash = () => setOpen(window.location.hash === "#case-study");
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <CaseStudyContext.Provider value={{ open, setOpen }}>
      {children}

      <Dialog open={open} onClose={close} title={caseStudy.title} eyebrow={caseStudy.eyebrow}>
        {dialogContent}
      </Dialog>
    </CaseStudyContext.Provider>
  );
}

/** Used by the trigger button. Safe to call outside the provider: it no-ops. */
export function useCaseStudy() {
  const value = useContext(CaseStudyContext);
  return {
    open: value?.open ?? false,
    setOpen: value?.setOpen ?? (() => {}),
  };
}