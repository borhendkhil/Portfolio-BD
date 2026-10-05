import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-[0_1px_2px_hsl(var(--shadow-color)/0.12)] hover:bg-accent-hover",
  secondary: "bg-surface-3 text-fg hover:bg-surface-2 border border-line",
  outline:
    "border border-line-strong text-fg hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps) {
  return (
    <span className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

type AnchorButtonProps = {
  href: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  /** Triggers a browser download for the linked asset (e.g. a PDF). */
  download?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children" | "download">;

export function AnchorButton({
  href,
  external,
  download,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: AnchorButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external || download) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
        {...(download ? { download: "" } : {})}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type NativeButtonProps = ButtonProps &
  Omit<ComponentProps<"button">, "className" | "children">;

export function NativeButton({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: NativeButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}