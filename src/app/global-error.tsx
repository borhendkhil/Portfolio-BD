"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { AnchorButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for the site owner; the visitor only sees a generic message.
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-canvas font-sans text-fg">
        <main className="flex min-h-dvh items-center">
          <Container>
            <div className="mx-auto max-w-lg text-center">
              <AlertTriangle
                aria-hidden="true"
                className="mx-auto size-6 text-accent"
                strokeWidth={1.5}
              />
              <h1 className="mt-5 text-2xl font-semibold tracking-tight">
                Something went wrong
              </h1>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                The page could not be rendered. Trying again usually resolves it.
              </p>
              <div className="mt-7 flex justify-center">
                <AnchorButton href="/" onClick={reset}>
                  Try again
                </AnchorButton>
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}