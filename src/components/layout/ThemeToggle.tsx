"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme, type Theme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

const options: Array<{ value: Theme; label: string; Icon: typeof Sun }> = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
];

/**
 * Segmented theme control. Rendered as a radio group so keyboard and screen
 * reader users get the current selection announced.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5",
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "grid size-7 place-items-center rounded-md transition-colors duration-200",
              isActive
                ? "bg-surface text-fg shadow-[0_1px_2px_hsl(var(--shadow-color)/0.12)]"
                : "text-fg-subtle hover:text-fg",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" strokeWidth={2} />
          </button>
        );
      })}
      <span className="sr-only">Current theme: {theme}</span>
    </div>
  );
}