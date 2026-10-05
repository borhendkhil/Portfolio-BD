import { Building2, CalendarDays, MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { BadgeList } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { experiences } from "@/data/experience";
import type { Experience } from "@/types";

export function Experience() {
  return (
    <Section id="experience" tone="soft">
      <Container>
        <Reveal>
          <SectionHeading
            id="experience"
            index="03"
            eyebrow="Experience"
            title="Professional engineering work"
            description="One verified professional engagement, presented in full. University projects are listed separately under Projects."
          />
        </Reveal>

        <ol className="mt-10 space-y-4">
          {experiences.map((experience, index) => (
            <ExperienceItem key={experience.id} experience={experience} index={index} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function ExperienceItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <li>
      <Reveal delay={index * 80}>
        <Card className="overflow-hidden">
          <div className="grid gap-x-8 gap-y-5 p-5 sm:p-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
                <Building2 aria-hidden="true" className="size-3.5" />
                {experience.engagement}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {experience.organization}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">{experience.role}</p>

              <dl className="mt-4 space-y-1.5 text-sm text-fg-muted">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Period</dt>
                  <CalendarDays aria-hidden="true" className="size-3.5 text-fg-subtle" />
                  <dd>{experience.period}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Location</dt>
                  <MapPin aria-hidden="true" className="size-3.5 text-fg-subtle" />
                  <dd>{experience.location}</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8">
              <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                {experience.summary}
              </p>

              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {experience.responsibilities.map((item) => (
                  <li key={item.title} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>
                      <span className="text-sm font-medium tracking-tight">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-line bg-surface-2/50 px-5 py-4 sm:px-6">
            <p className="mb-2.5 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
              Technologies
            </p>
            <BadgeList items={experience.technologies} label="Technologies used" />
          </div>
        </Card>
      </Reveal>
    </li>
  );
}