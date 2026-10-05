import { ExternalLink, Star } from "lucide-react";

import { GitHubIcon } from "@/components/ui/BrandIcons";

import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyTrigger } from "@/components/projects/CaseStudyTrigger";
import { BadgeList } from "@/components/ui/Badge";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { featuredProject } from "@/data/projects";

export function FeaturedProject() {
  const project = featuredProject;

  return (
    <Section id="projects">
      <Container>
        <Reveal>
          <SectionHeading
            id="projects"
            index="04"
            eyebrow="Featured project"
            title="Project with the most detail"
            description="The most substantial piece of work in this portfolio, presented as a case study rather than a screenshot grid."
          />
        </Reveal>

        <Reveal delay={80}>
          <article className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="p-5 sm:p-7 lg:col-span-7 lg:border-r lg:border-line">
                <p className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
                  <Star aria-hidden="true" className="size-3.5 text-accent" />
                  {project.category}
                </p>

                <h3 className="mt-3.5 text-xl font-semibold tracking-tight text-balance sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-accent">{project.subtitle}</p>

                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                  {project.description}
                </p>

                {project.highlights ? (
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-sm text-fg-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="flex flex-col justify-between gap-6 border-t border-line bg-surface-2/50 p-5 sm:p-7 lg:col-span-5 lg:border-t-0">
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
                    Context
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {project.context}
                  </p>

                  <p className="mt-6 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
                    Stack
                  </p>
                  <BadgeList
                    items={project.technologies}
                    tone="accent"
                    label="Technologies"
                    className="mt-2.5"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <CaseStudyTrigger />

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      <GitHubIcon className="size-4" />
                      Source
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}

                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      <ExternalLink aria-hidden="true" className="size-4" />
                      {project.demoLabel ?? "Live demo"}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}

                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}