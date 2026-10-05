import { Reveal } from "@/components/animations/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { principles } from "@/data/education";

export function Approach() {
  return (
    <Section id="approach" tone="soft">
      <Container>
        <Reveal>
          <SectionHeading
            id="approach"
            index="06"
            eyebrow="How I build software"
            title="Four principles I work by"
            description="Deliberately short. These describe how I make technical decisions, not what I would like to build someday."
          />
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <Reveal delay={index * 70}>
                <div className="flex h-full gap-4 rounded-xl border border-line bg-surface p-5 shadow-card">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-xs text-accent"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}