import { ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/ui/BrandIcons";

import { Reveal } from "@/components/animations/Reveal";
import { BadgeList } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { otherProjects } from "@/data/projects";
import type { Project } from "@/types";

export function ProjectsGrid() {
  return (
    <Section id="other-projects">
      <Container>
        <Reveal>
          <SectionHeading
            id="other-projects"
            index="05"
            eyebrow="Other projects"
            title="Additional projects"
            description="Backend and full-stack work built during university studies and as personal projects. Repository links appear once they are public."
          />
        </Reveal>

        <ul className="mt-10 grid items-stretch gap-4 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <li key={project.id} className="flex">
              {/* `h-full` on both wrappers is required: grid stretches the <li>,
                  but the card's own h-full needs every ancestor in the chain to
                  have a resolved height or it collapses to content height. */}
              <Reveal delay={index * 70} className="flex w-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>

        </Container>
    </Section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive className="flex h-full w-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 text-base font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg-muted">{project.description}</p>

      {project.highlights ? (
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-xs leading-relaxed text-fg-subtle">
              <span
                aria-hidden="true"
                className="mt-[0.4rem] size-1 shrink-0 rounded-full bg-accent"
              />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5 flex-1" />

      <div className="border-t border-line pt-4">
        <BadgeList items={project.technologies} label="Technologies" />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
              <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
            </a>
          ) : null}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <ExternalLink aria-hidden="true" className="size-3.5" />
              {project.demoLabel ?? "Demo"}
              <span className="sr-only">of {project.title} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}