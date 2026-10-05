import type { Experience } from "@/types";

/**
 * Professional experience.
 *
 * Only one verified engagement is listed. Contributed as part of a team —
 * the wording stays at "contributed to" rather than claiming sole ownership
 * of the platform.
 */
export const experiences: Experience[] = [
  {
    id: "finstart-vision-afrique",
    organization: "FinStart Vision Afrique",
    location: "Tunis, Tunisia",
    period: "February 2025 – July 2025",
    role: "Full-Stack Developer",
    engagement: "PFE (Projet de Fin d'Études) — academic engineering project",
    summary:
      "Contributed to a cross-platform mobile application for fruit traceability, built to support agricultural actors and improve visibility across the product lifecycle from production through delivery. My work covered the Flutter client and the REST services behind it, including offline behavior and token-based authentication.",
    technologies: [
      "Flutter",
      "Dart",
      "Spring Boot",
      "REST APIs",
      "Keycloak",
      "OAuth2",
      "JWT",
      "Clean Architecture",
      "Database",
      "Offline synchronization",
    ],
    responsibilities: [
      {
        title: "Mobile client",
        description:
          "Built and maintained Flutter screens for the traceability workflows, structured the app with clean-architecture separation between presentation, domain and data layers, and connected them to the backend over REST.",
      },
      {
        title: "Domain modelling",
        description:
          "Modelled the agricultural domain: technical itineraries per plot, agricultural operations, production tracking, transport, inspection and fruit sorting, harvest treatment, packaging and labelling, orders, and traceability records.",
      },
      {
        title: "Offline-first behavior",
        description:
          "Implemented local data handling and synchronization so the application stays usable in the field when connectivity is unreliable, and reconciles pending changes with the backend once a connection is available.",
      },
      {
        title: "Authentication and authorization",
        description:
          "Integrated Keycloak with OAuth2 and JWT so the mobile client authenticates against a real identity provider, holds an access token, and calls protected REST endpoints that enforce authorization server-side.",
      },
      {
        title: "Backend services",
        description:
          "Developed and consumed Spring Boot REST endpoints, mapping traceability operations to persistent storage and validating request data on the service side.",
      },
    ],
  },
];