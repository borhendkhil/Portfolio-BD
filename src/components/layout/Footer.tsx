"use client";

import { ArrowUp, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/BrandIcons";

import { Container } from "@/components/ui/Section";
import { phoneNumber, siteConfig, socialLinks } from "@/data/site";

/**
 * Compact contact footer: the copyright line, a way back to the top and the
 * direct ways to reach Borhen. Section links are left out on purpose, they are
 * already in the navbar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const topHref = pathname === "/" ? "#home" : "/#home";

  const profiles = [
    { href: socialLinks.github, label: "GitHub", Icon: GitHubIcon },
    { href: socialLinks.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  ].filter((item) => item.href.trim().length > 0);

  const linkClass =
    "inline-flex items-center gap-1.5 text-xs text-fg-muted transition-colors duration-200 hover:text-fg";

  return (
    <footer className="border-t border-line bg-canvas-soft">
      <Container>
        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            &copy; {year} {siteConfig.name}
          </p>

          <nav
            aria-label="Contact details"
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {profiles.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer me"
                className={linkClass}
              >
                <Icon className="size-3.5" />
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}

            <a href={`mailto:${socialLinks.email}`} className={linkClass}>
              <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              Email
            </a>

            <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className={linkClass}>
              <Phone aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
              {phoneNumber}
            </a>

            <a href={topHref} className={linkClass}>
              Back to top
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}