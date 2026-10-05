import { Reveal } from "@/components/animations/Reveal";
import { BadgeList } from "@/components/ui/Badge";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Reveal>
          <SectionHeading
            id="skills"
            index="02"
            eyebrow="Technical skills"
            title="Technologies I work with"
            description="Listed as tags rather than percentages — a number would not tell you anything useful about how I use a tool."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-semibold tracking-tight">{group.title}</h3>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-fg-subtle/70 transition-colors duration-300 group-hover:text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-subtle">
                  {group.note}
                </p>
                <BadgeList
                  items={group.items}
                  label={`${group.title} technologies`}
                  className="mt-4"
                />
              </article>
            </Reveal>
          ))}

          <Reveal delay={skillGroups.length * 60}>
            <article className="flex h-full flex-col justify-between rounded-xl border border-dashed border-line-strong bg-surface-2/50 p-5">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Working with me</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Most of these tools appear together: a Spring Boot API, a Flutter or
                  Angular client, Keycloak in front of both, and Docker around whatever
                  runs on a server.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline"
              >
                Start a conversation
                <span aria-hidden="true">&rarr;</span>
              </a>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}