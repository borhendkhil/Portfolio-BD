"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { AnchorButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-28">
      <div className="mx-auto max-w-lg text-center">
        <AlertTriangle
          aria-hidden="true"
          className="mx-auto size-6 text-accent"
          strokeWidth={1.5}
        />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          This section could not be loaded
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
          An unexpected error occurred while rendering this part of the page. Reloading
          usually fixes it.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <AnchorButton href="/" onClick={reset}>
            Try again
          </AnchorButton>
          <AnchorButton href="#home" variant="outline">
            Back to top
          </AnchorButton>
        </div>
      </div>
    </Container>
  );
}