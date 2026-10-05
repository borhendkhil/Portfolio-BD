import type { SiteConfig, SocialLinks } from "@/types";

/**
 * Social profiles.
 *
 * The UI hides any link whose value is empty, so the page never renders a
 * broken or dead anchor.
 */
export const socialLinks: SocialLinks = {
  github: "https://github.com/borhendkhil",
  linkedin: "https://www.linkedin.com/in/borhen-dkhil/",
  email: "borhen.dkhiill@gmail.com",
};

/** Contact number, shown as a clickable `tel:` link. */
export const phoneNumber = "+216 92369257";

/** Only non-empty links, in display order. */
export const configuredSocials = (
  [
    { key: "github", label: "GitHub", handle: "github.com" },
    { key: "linkedin", label: "LinkedIn", handle: "linkedin.com/in" },
  ] as const
)
  .filter((item) => socialLinks[item.key].trim().length > 0)
  .map((item) => ({
    ...item,
    href: socialLinks[item.key],
  }));

export const hasEmail = socialLinks.email.trim().length > 0;

export const siteConfig: SiteConfig = {
  name: "Borhen Dkhil",
  shortName: "BD",
  role: "Software Engineer & Full-Stack Developer",
  location: "Tunis, Tunisia",
  headline: "Software Engineer & Full-Stack Developer",
  intro:
    "I build reliable web and mobile applications with a strong focus on backend engineering, clean architecture, APIs, and modern user experiences.",
  primaryStack: ["Java", "Spring Boot", "Flutter", "Angular", "Node.js"],
  availability:
    "Open to software engineering roles, internships, freelance work and remote positions.",
  seo: {
    title: "Borhen Dkhil | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Borhen Dkhil, a Software Engineer focused on Java, Spring Boot, Angular, Flutter, Node.js and modern full-stack application development.",
    // TODO: replace with the deployed origin, e.g. https://borhendkhil.dev
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://borhendkhil.dev",
  },
};

export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/** Relative path of the CV PDF inside /public. */
export const cvFileName = "Borhen-Dkhil-CV.pdf";