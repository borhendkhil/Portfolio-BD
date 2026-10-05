import type { SkillGroup } from "@/types";

/**
 * Technology groups. Deliberately tag-based — no invented proficiency
 * percentages, because those numbers would not mean anything.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    note: "Service-side business logic, APIs and access control.",
    items: ["Java", "Spring Boot", "Spring Security", "Node.js", "NestJS", "REST APIs"],
  },
  {
    title: "Frontend",
    note: "Typed, component-driven interfaces for web clients.",
    items: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    title: "Mobile",
    note: "Cross-platform apps, including field usage with poor connectivity.",
    items: ["Flutter", "Dart", "Android"],
  },
  {
    title: "Databases",
    note: "Document and relational persistence.",
    items: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    title: "Security",
    note: "Standards-based authentication and authorization.",
    items: ["JWT", "OAuth2", "Keycloak"],
  },
  {
    title: "DevOps & Tools",
    note: "Version control, containers and everyday engineering tooling.",
    items: ["Docker", "Git", "GitHub", "Linux", "Postman"],
  },
  {
    title: "Architecture",
    note: "How I structure code and the clients that consume it.",
    items: [
      "Clean Architecture",
      "RESTful Architecture",
      "Microservices concepts",
      "Offline-first concepts",
    ],
  },
];

/** Compact stack rendered in the hero for a 30-second read. */
export const heroStack = ["Java", "Spring Boot", "Flutter", "Angular", "Node.js"];