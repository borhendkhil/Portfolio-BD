import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container, Section } from "@/components/ui/Section";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <Section id="contact" tone="soft">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          <div className="grid lg:grid-cols-12">
            <div className="p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-line">
              <Reveal>
                <p className="font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
                  08 / Contact
                </p>
                <h2
                  id="contact-heading"
                  className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                >
                  Let&rsquo;s build something useful.
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
                  I&rsquo;m open to software engineering opportunities, internships,
                  freelance projects, and collaborations.
                </p>

                <div className="mt-6 space-y-3 border-t border-line pt-6">
                  <p className="text-sm leading-relaxed text-fg-subtle">
                    Based in {siteConfig.location}, comfortable working with distributed
                    teams across time zones.
                  </p>
                  <SocialLinks />
                </div>

                </Reveal>
            </div>

            <div className="p-6 sm:p-8 lg:col-span-7">
              <Reveal delay={80}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}