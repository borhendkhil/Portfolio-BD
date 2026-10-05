import { GraduationCap } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="education"
              index="07"
              eyebrow="Education"
              title="Studies"
              description="Engineering studies completed at TEK-UP University, including a final-year project carried out in an industry setting, after a Bachelor’s degree from the Faculty of Sciences of Gabès."
            />
          </Reveal>

          <ol className="space-y-4 lg:col-span-8">
            {education.map((entry, index) => (
              <li key={entry.id}>
                <Reveal delay={index * 80}>
                  <div className="flex h-full gap-4 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-accent"
                    >
                      <GraduationCap className="size-4" strokeWidth={1.75} />
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base font-semibold tracking-tight">
                          {entry.degree}
                        </h3>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 font-mono text-[0.625rem] tracking-tight uppercase ${
                            entry.status === "completed"
                              ? "border-line bg-surface-2 text-fg-muted"
                              : "border-accent-line bg-accent-soft text-accent"
                          }`}
                        >
                          {entry.status === "completed" ? "Completed" : "In progress"}
                        </span>
                      </div>

                      <p className="mt-1 text-sm font-medium text-accent">{entry.field}</p>

                      <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
                        <span className="italic">{entry.institution}</span>
                        <span aria-hidden="true" className="text-fg-subtle">
                          &middot;
                        </span>
                        <span className="text-fg-subtle">{entry.period}</span>
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                        {entry.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}