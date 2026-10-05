import type { EducationEntry, Principle } from "@/types";

/**
 * Education.
 *
 * Studies are complete: the degrees below are graduated, not in progress.
 * Order is newest first.
 */
export const education: EducationEntry[] = [
  {
    id: "software-engineering",
    degree: "Software Engineering Engineer",
    field: "Software Engineering",
    institution: "TEK-UP University",
    period: "Graduated 2025",
    status: "completed",
    note: "Engineering studies covering backend development, data structures, databases and software design. Graduated in 2025, with the final-year project carried out at FinStart Vision Afrique.",
  },
  {
    id: "bachelor-software-engineering",
    degree: "Bachelor’s Degree in Software Engineering",
    field: "Software Engineering",
    institution: "Faculty of Sciences de Gabès, Gabès, Tunisia",
    period: "2022",
    status: "completed",
    note: "Bachelor’s degree covering algorithms, data structures, databases, object-oriented design and software engineering practice.",
  },
];

export const principles: Principle[] = [
  {
    title: "Clean Architecture",
    description:
      "I aim to keep business logic independent from infrastructure and UI concerns, so the same rules hold whether they are called from a screen, a test or an API.",
  },
  {
    title: "API-First Thinking",
    description:
      "I build clear REST APIs that allow frontend and mobile clients to communicate reliably with backend services, and I treat the contract as something to be designed, not just implemented.",
  },
  {
    title: "Security",
    description:
      "I use established authentication and authorization approaches such as JWT, OAuth2 and Keycloak when appropriate, instead of inventing my own.",
  },
  {
    title: "Performance & Reliability",
    description:
      "I pay attention to unnecessary requests, data synchronization, application performance and reliability, especially for mobile applications used in environments with unstable connectivity.",
  },
];