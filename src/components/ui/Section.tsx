import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Alternating background tone for long pages. */
  tone?: "default" | "soft";
};

export function Section({ id, children, className, tone = "default" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-24 py-16 sm:py-20 lg:py-28",
        tone === "soft" && "bg-canvas-soft border-y border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  /** Numbered label, e.g. "01". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-[2.125rem] lg:leading-[1.15]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-fg-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}