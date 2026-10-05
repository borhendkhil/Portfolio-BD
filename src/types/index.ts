/**
 * Shared domain types.
 *
 * Content lives in `src/data` and is typed with the shapes below, so the UI
 * never hard-codes copy. Every external URL is optional by design: when a value
 * is empty the corresponding button is not rendered at all.
 */

export type SocialLinks = {
  /** Full profile URL, e.g. https://github.com/username */
  github: string;
  /** Full profile URL, e.g. https://www.linkedin.com/in/username */
  linkedin: string;
  /** Bare address, e.g. name@example.com */
  email: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  /** Short explanation of how the group is used in practice. */
  note: string;
  items: string[];
};

export type ExperienceResponsibility = {
  title: string;
  description: string;
};

export type Experience = {
  id: string;
  organization: string;
  location: string;
  period: string;
  role: string;
  engagement: string;
  summary: string;
  technologies: string[];
  responsibilities: ExperienceResponsibility[];
};

export type ProjectImageKind = "mobile" | "desktop" | "diagram";

export type ProjectImage = {
  /** File name inside the project's public folder. */
  file: string;
  /** Caption shown on hover / below the frame. */
  label: string;
  kind: ProjectImageKind;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  context: string;
  featured?: boolean;
  github?: string;
  demo?: string;
  /** Button text for the demo link, e.g. "Demo video" when demo links to a recording. */
  demoLabel?: string;
  /** Folder under /public that holds the project's screenshots. */
  imageFolder?: string;
  images?: ProjectImage[];
  highlights?: string[];
};

export type EducationEntry = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: "completed" | "in-progress";
  note: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  role: string;
  location: string;
  headline: string;
  intro: string;
  /** Primary stack line, visible above the fold. */
  primaryStack: string[];
  availability: string;
  seo: {
    title: string;
    description: string;
    /** Replace with the production URL before deploying. */
    url: string;
  };
};