/**
 * Content for the Fruit Traceability case study.
 *
 * Kept separate from `projects.ts` so the case study reads as an article
 * rather than as card metadata.
 */

export const caseStudy = {
  eyebrow: "Case study",
  title: "Inside the Fruit Traceability application",
  intro:
    "A closer look at the problem the application addresses, how the system is structured, and the two engineering decisions that shaped it most: working offline in the field, and delegating authentication to a real identity provider.",

  problem: {
    title: "The problem",
    body: "Agricultural traceability spans multiple actors and a long chain of operations. Keeping accurate information about a fruit batch means recording what happened at several separate points:",
    points: [
      "Production at plot level",
      "Agricultural operations applied over time",
      "Harvest and post-harvest treatment",
      "Transport between sites",
      "Inspection and fruit sorting",
      "Packaging and labelling",
      "Delivery and orders",
    ],
    closing:
      "When those steps are documented on paper or in disconnected systems, information is easy to lose, hard to retrieve later, and expensive to reconcile. The application was designed to digitise the workflows so traceability data is captured at the point of work and stays readable across the whole lifecycle.",
  },

  solution: {
    title: "The solution",
    body: "A cross-platform mobile application connected to backend REST services. Field users manage traceability operations directly from a phone, and the same domain rules are enforced on the server so the client cannot bypass validation.",
    points: [
      "One mobile client covering the traceability operations end to end",
      "A Spring Boot REST API as the single source of truth when online",
      "Local persistence so the workflow keeps running without a connection",
      "Keycloak handling identity, issuing the tokens the client sends to the API",
    ],
  },

  architecture: {
    title: "Technical architecture",
    body: "The application is split into four layers. Each one only talks to the layer below it, which keeps the mobile presentation independent from transport, domain rules and storage.",
    /** Rendered top to bottom as a layered stack. */
    layers: [
      {
        name: "Flutter mobile application",
        detail: "Dart client with the UI and application state, organized with clean architecture.",
      },
      {
        name: "REST API layer",
        detail: "Typed HTTP contract between the client and the backend, with serialization and validation at the edge.",
      },
      {
        name: "Spring Boot backend",
        detail: "Domain logic, authorization and persistence. The only component allowed to write to the database.",
      },
      {
        name: "Database",
        detail:
          "Persistence layer holding production, itinerary, operation, transport and traceability records.",
      },
    ],
    keycloak: {
      title: "Authentication is a separate concern",
      body: "Identity is not implemented inside the Spring Boot services. Keycloak owns it: users authenticate there, the client receives an OAuth2 access token, and the API validates that token on every protected request. The backend therefore depends on token verification rather than on password handling.",
    },
  },

  itinerary: {
    title: "Technical itinerary",
    body: "The technical itinerary is one of the important parts of the application. Each plot has an itinerary describing the agricultural operations to perform on it, and the operations actually carried out are recorded against that plan over time.",
    flow: ["Plot", "Technical itinerary", "Agricultural operations"],
    operations: [
      {
        name: "Ground Work",
        detail: "Soil preparation and maintenance operations recorded against the plot.",
      },
      {
        name: "Irrigation",
        detail: "Watering operations tracked with their timing on the itinerary.",
      },
      {
        name: "Fertilization",
        detail: "Fertiliser applications logged so the plot history stays complete.",
      },
      {
        name: "Phytosanitary Treatment",
        detail: "Crop-protection treatments captured as part of the plot record.",
      },
    ],
    closing:
      "Because the itinerary is the plan and the operations are the actual history, the traceability view can report what was planned against what was really done — and the two stay connected as the product moves down the chain.",
  },

  offline: {
    title: "Offline-first behavior",
    body: "The application is used in orchards and warehouses where connectivity is unreliable, so treating the network as always available would have made it unusable in practice.",
    quote:
      "The mobile application was designed to support field usage where network connectivity may be unreliable. Data can be handled locally and synchronized with the backend when connectivity becomes available.",
    online: {
      title: "Online",
      steps: ["Mobile app", "REST API", "Backend"],
    },
    offline: {
      title: "Offline",
      steps: [
        "Local data",
        "Pending changes",
        "Connection restored",
        "Synchronization",
        "Backend",
      ],
    },
    points: [
      "Data captured in the field is written locally first, so the workflow never blocks on a request.",
      "Local changes are held as pending work while the device is offline.",
      "Once a connection is available, pending changes are sent to the backend and local state is reconciled.",
      "The backend stays authoritative: synchronization updates the client, it does not replace server-side validation.",
    ],
    note: "The exact conflict-resolution strategy is an implementation detail of the project and is intentionally not described here.",
  },

  auth: {
    title: "Authentication and authorization",
    body: "Identity is owned by Keycloak and expressed with OAuth2. The client authenticates there, receives a JWT access token, and the Spring Boot API verifies that token on every protected request.",
    flow: ["Flutter", "Authentication", "Keycloak", "OAuth2 / JWT", "Spring Boot API"],
    points: [
      {
        title: "Authentication",
        body: "The user authenticates against Keycloak rather than a custom login form, so credentials are handled by a dedicated identity provider.",
      },
      {
        title: "Access tokens",
        body: "On success the client receives a signed JWT access token and sends it as a bearer token on subsequent API requests.",
      },
      {
        title: "Protected REST APIs",
        body: "The Spring Boot services validate the token before executing a request, so an unauthenticated client cannot reach the data.",
      },
      {
        title: "Authorization",
        body: "Authorization is enforced server-side on the protected endpoints. Role-based access is applied where the domain requires it.",
      },
    ],
    note: "Concrete role names are not listed here because they are defined by the project's Keycloak realm configuration rather than by the client application.",
  },
} as const;