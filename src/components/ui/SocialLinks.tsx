"use client";

import { Copy, Mail } from "lucide-react";

import {
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/BrandIcons";

import { useToast } from "@/components/ui/Toast";
import { configuredSocials, hasEmail, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  /** Renders icon-only buttons; used in the hero. */
  compact?: boolean;
};

const socialIcons = { github: GitHubIcon, linkedin: LinkedInIcon } as const;

/**
 * Renders only the profiles that have been configured. Missing values produce no
 * markup at all rather than a dead link, and a note explains what to fill in so
 * the omission never reads as an oversight.
 */
export function SocialLinks({ className, compact = false }: SocialLinksProps) {
  const { showToast } = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      showToast("Email address copied to clipboard");
    } catch {
      showToast("Copying is not available in this browser");
    }
  };

  if (configuredSocials.length === 0 && !hasEmail) {
    return (
      <p className={cn("text-sm text-fg-subtle", className)}>
        GitHub, LinkedIn and email links are not configured yet — see{" "}
        <code className="font-mono text-fg-muted">src/data/site.ts</code>.
      </p>
    );
  }

  const labelClass = compact ? "sr-only" : "text-sm";

  return (
    <ul
      className={cn(
        "flex items-center gap-2",
        compact ? "gap-1.5" : "flex-wrap gap-2.5",
        className,
      )}
    >
      {configuredSocials.map((social) => {
        const Icon = socialIcons[social.key];
        return (
          <li key={social.key}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-fg-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-px hover:border-line-strong hover:text-fg"
            >
              <Icon className="size-4" />
              <span className={labelClass}>{social.label}</span>
            </a>
          </li>
        );
      })}

      {hasEmail ? (
        <li className="inline-flex items-center gap-1.5">
          <a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-fg-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-px hover:border-line-strong hover:text-fg"
          >
            <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
            <span className={labelClass}>Email</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address to clipboard"
            title="Copy email address"
            className="grid size-8 place-items-center rounded-lg border border-line bg-surface-2 text-fg-subtle transition-colors duration-200 hover:border-line-strong hover:text-fg"
          >
            <Copy aria-hidden="true" className="size-3.5" />
          </button>
        </li>
      ) : null}
    </ul>
  );
}