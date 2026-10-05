import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  /** Subtle accent styling, used for the primary technology tags. */
  tone?: "neutral" | "accent";
};

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs tracking-tight transition-colors duration-200",
        tone === "accent"
          ? "border-accent-line bg-accent-soft text-accent hover:border-accent"
          : "border-line bg-surface-2 text-fg-muted hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

type BadgeListProps = {
  items: readonly string[];
  tone?: BadgeProps["tone"];
  className?: string;
  /** Accessible label for the group, e.g. "Technologies". */
  label?: string;
};

export function BadgeList({ items, tone, className, label }: BadgeListProps) {
  return (
    <ul
      aria-label={label}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {items.map((item) => (
        <li key={item}>
          <Badge tone={tone}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}