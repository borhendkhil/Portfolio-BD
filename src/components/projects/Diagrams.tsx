import { ArrowDown, CornerDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

/** Vertical stack of layers, connected downward. Used for the system architecture. */
export function LayeredDiagram({
  layers,
  className,
}: {
  layers: ReadonlyArray<{ name: string; detail: string }>;
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col", className)}>
      {layers.map((layer, index) => (
        <li key={layer.name} className="flex flex-col">
          <div className="rounded-lg border border-line bg-surface px-4 py-3">
            <p className="text-sm font-medium tracking-tight">{layer.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{layer.detail}</p>
          </div>
          {index < layers.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex h-8 items-center justify-center text-fg-subtle"
            >
              <ArrowDown className="size-4" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** A single vertical chain of steps, e.g. the authentication request flow. */
export function StepFlow({
  steps,
  label,
  className,
}: {
  steps: readonly string[];
  label: string;
  className?: string;
}) {
  return (
    <ol aria-label={label} className={cn("flex flex-col", className)}>
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col">
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-2.5">
            <span
              aria-hidden="true"
              className="grid size-5 shrink-0 place-items-center rounded-md bg-accent-soft font-mono text-[0.625rem] font-semibold text-accent"
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium tracking-tight">{step}</span>
          </div>
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="flex h-7 items-center justify-center text-fg-subtle"
            >
              <ArrowDown className="size-3.5" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/** Plot → technical itinerary → the set of agricultural operations. */
export function ItineraryDiagram({ className }: { className?: string }) {
  const root = "Plot";
  const middle = "Technical itinerary";
  const operations = [
    "Ground Work",
    "Irrigation",
    "Fertilization",
    "Phytosanitary Treatment",
  ];

  return (
    <ol aria-label="Technical itinerary workflow" className={cn("flex flex-col", className)}>
      <li>
        <div className="rounded-lg border border-line bg-surface px-4 py-2.5 text-center text-sm font-medium tracking-tight">
          {root}
        </div>
        <span aria-hidden="true" className="flex h-7 items-center justify-center text-fg-subtle">
          <ArrowDown className="size-3.5" />
        </span>
      </li>
      <li>
        <div className="rounded-lg border border-accent-line bg-accent-soft px-4 py-2.5 text-center text-sm font-medium tracking-tight text-accent">
          {middle}
        </div>
        <span aria-hidden="true" className="flex h-7 items-center justify-center text-fg-subtle">
          <CornerDownRight className="size-3.5" />
        </span>
      </li>
      <li>
        <ul className="grid gap-2 sm:grid-cols-2">
          {operations.map((operation) => (
            <li
              key={operation}
              className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm tracking-tight"
            >
              {operation}
            </li>
          ))}
        </ul>
      </li>
    </ol>
  );
}