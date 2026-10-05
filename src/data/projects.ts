import type { Project } from "@/types";

const FRUIT_TRACABILITY_FOLDER = "/projects/fruit-traceability";

export const projects: Project[] = [
  {
    id: "fruit-traceability",
    title: "Fruit Traceability Mobile Application",
    subtitle: "Cross-platform agricultural traceability solution",
    description:
      "A Flutter mobile application connected to Spring Boot REST services, used to record and follow fruit production through delivery: technical itineraries, agricultural operations, transport, inspection, sorting, packaging, labelling, orders and traceability. Designed to keep working in the field when connectivity is unreliable.",
    technologies: [
      "Flutter",
      "Dart",
      "Spring Boot",
      "REST API",
      "Keycloak",
      "OAuth2",
      "JWT",
      "Clean Architecture",
    ],
    category: "Mobile · Backend",
    context: "PFE project at FinStart Vision Afrique, Tunis — February to July 2025",
    featured: true,
    // TODO: add the repository URL once the code is public.
    github: "",
    demo: "https://drive.google.com/file/d/1LIjvvBb8U7OGLj6cGiEctTwWoCB__iVw/view?usp=sharing",
    demoLabel: "Demo video",
    imageFolder: FRUIT_TRACABILITY_FOLDER,
    images: [
      { file: "login.jpeg", label: "Login and Keycloak authentication", kind: "mobile" },
      { file: "dashboard.jpeg", label: "Dashboard", kind: "mobile" },
      {
        file: "technical-itinerary.jpeg",
        label: "Technical itinerary per plot",
        kind: "mobile",
      },
      {
        file: "ai-detection.jpeg",
        label: "AI detection of plant diseases",
        kind: "mobile",
      },
    ],
    highlights: [
      "Field-ready mobile client built with Flutter and Dart",
      "Offline data handling with synchronization back to the backend",
      "Authentication delegated to Keycloak over OAuth2 with JWT access tokens",
      "REST API layer exposing traceability operations to the mobile client",
      "AI-assisted detection of plant diseases integrated into the mobile client",
      "Clean-architecture separation between presentation, domain and data",
    ],
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "Personal finance application with a NestJS API",
    description:
      "Personal finance management application covering transactions, categories and budgets, with user authentication and JWT-based authorization on every protected route.",
    technologies: ["NestJS", "Node.js", "MongoDB", "JWT", "REST API"],
    category: "Backend",
    context: "Personal project",
    // TODO: add repository URL when public.
    github: "",
    demo: "",
    highlights: [
      "Transactions organised by category with budget tracking",
      "User registration and login issuing JWT access tokens",
      "Guards protecting routes and validating the token on each request",
      "MongoDB persistence for accounts, categories and transactions",
    ],
  },
  {
    id: "eventplanner",
    title: "EventPlanner",
    subtitle: "Event management platform",
    description:
      "Event management platform designed to manage events together with the users and data attached to them.",
    technologies: ["Spring Boot", "Spring Security", "JWT", "MongoDB", "Docker"],
    category: "Full-Stack",
    context: "University project",
    // TODO: add repository URL when public.
    github: "",
    demo: "",
    highlights: [
      "Spring Boot services for creating and managing events",
      "Spring Security configuration securing the exposed endpoints",
      "JWT authentication guarding the API surface",
      "Containerised with Docker for consistent local and deployed environments",
    ],
  },
  {
    id: "sheep-flock-management",
    title: "Sheep Flock Management",
    subtitle: "Web application for flock records",
    description:
      "Web application for managing sheep flock information and the operations recorded against it.",
    technologies: ["React", "NestJS"],
    category: "Full-Stack",
    context: "University project",
    // TODO: add repository URL when public.
    github: "",
    demo: "",
    highlights: [
      "React interface over a NestJS backend",
      "Flock records and related operations kept in sync through the API",
    ],
  },
  {
    id: "invoicing-sales",
    title: "Invoicing & Sales Application",
    subtitle: "Business application for sales workflows",
    description:
      "Business application focused on sales and invoicing workflows, with an Angular front end over Spring Boot services.",
    technologies: ["Angular", "Spring Boot"],
    category: "Full-Stack",
    context: "University project",
    // TODO: add repository URL when public.
    github: "",
    demo: "",
    highlights: [
      "Angular client for sales and invoice workflows",
      "Spring Boot services handling the business rules behind invoicing",
    ],
  },
];

export const featuredProject = projects.find((project) => project.featured)!;

export const otherProjects = projects.filter((project) => !project.featured);