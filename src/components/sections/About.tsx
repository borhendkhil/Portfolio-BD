import { BookOpen, Code2, GraduationCap, Layers } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/data/site";

const focusAreas = [
  {
    Icon: Code2,
    title: "Backend engineering",
    body: "Java and Spring Boot services exposed as REST APIs, with Spring Security for access control and clean separation between domain logic and infrastructure.",
  },
  {
    Icon: Layers,
    title: "Mobile applications",
    body: "Flutter and Dart clients, including offline behavior and synchronization for devices that lose connectivity during real work.",
  },
  {
    Icon: Layers,
    title: "Web front ends",
    body: "Angular interfaces backed by TypeScript, built to consume APIs that behave predictably.",
  },
  {
    Icon: BookOpen,
    title: "University projects",
    body: "Coursework and team projects covering data structures, databases and software design, culminating in a real-world final-year project with an external company.",
  },
];

export function About() {
  return (
    <Section id="about" tone="soft">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="about"
              index="01"
              eyebrow="About"
              title="A software engineer who works end to end"
              description={`${siteConfig.name} is a Software Engineering Engineer whose main interest is building complete products rather than isolated features — the API behind a screen, and the screen in the user's hand.`}
            />

            <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              <p>
                My day-to-day work sits between the backend and the client: designing
                REST contracts, implementing them with Spring Boot, and building the
                Flutter and Angular interfaces that consume them.
              </p>
              <p>
                During my final-year project I worked on a real-world production
                application at FinStart Vision Afrique: a mobile fruit traceability
                platform used across production, transport, inspection and delivery.
                That project shaped how I think about offline-first design,
                authentication against a real identity provider, and keeping domain
                rules out of the UI layer.
              </p>
            </div>

            <p className="mt-6 flex items-center gap-2 border-t border-line pt-5 text-sm text-fg-subtle">
              <GraduationCap aria-hidden="true" className="size-4" />
              Software Engineering Engineer, graduated 2025
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {focusAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 70}>
                <Card interactive className="h-full p-5">
                  <area.Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
                  <h3 className="mt-3.5 text-sm font-semibold tracking-tight">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {area.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}