import { Download, MapPin, MoveDown } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { AnchorButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/site";
import { heroStack } from "@/data/skills";

type HeroProps = {
  cvAvailable: boolean;
};

export function Hero({ cvAvailable }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative scroll-mt-24 overflow-hidden pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24"
    >
      <div aria-hidden="true" className="accent-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10" />

      <Container>
        <div className="grid items-start gap-12 xl:grid-cols-12 xl:gap-8">
          {/* `min-w-0` matters: a grid item defaults to `min-width: auto`, which
              would let the `pre` below stretch this column past the viewport
              instead of scrolling its own long lines. */}
          <div className="min-w-0 xl:col-span-7">
            <Reveal>
              <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-fg-muted">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-accent"
                />
                <span className="font-mono tracking-tight">{siteConfig.role}</span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
                {siteConfig.location}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1
                id="home-heading"
                className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]"
              >
                {siteConfig.name}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-4 max-w-xl text-lg font-medium tracking-tight text-fg-muted sm:text-xl">
                {siteConfig.headline}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
                {siteConfig.intro}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-fg">
                {heroStack.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden="true" className="text-fg-subtle">
                        |
                      </span>
                    ) : null}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <AnchorButton href="#projects">
                  View My Work
                  <MoveDown aria-hidden="true" className="size-4" />
                </AnchorButton>

                {cvAvailable ? (
                  <AnchorButton href="/Borhen-Dkhil-CV.pdf" variant="outline" download>
                    <Download aria-hidden="true" className="size-4" />
                    Download CV
                  </AnchorButton>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Add your PDF to /public/Borhen-Dkhil-CV.pdf to enable this button"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-dashed border-line-strong px-5 text-[0.9375rem] text-fg-subtle"
                  >
                    <Download aria-hidden="true" className="size-4" />
                    Download CV
                    <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-tight uppercase">
                      PDF pending
                    </span>
                    <span className="sr-only">— not available yet</span>
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-9">
                <SocialLinks compact />
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="min-w-0 xl:col-span-5">
            <ProfileCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const profileLines: Array<{ indent: number; tokens: Array<[string, string]> }> = [
  {
    indent: 0,
    tokens: [
      ["const", "keyword"],
      [" borhen", "plain"],
      [" =", "punct"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["role", "key"],
      [": ", "punct"],
      ['"Software Engineer"', "string"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["backend", "key"],
      [": ", "punct"],
      ['["Java", "Spring Boot", "Node.js"]', "array"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["frontend", "key"],
      [": ", "punct"],
      ['["Angular"]', "array"],
    ],
  },
  { indent: 1, tokens: [["mobile", "key"], [": ", "punct"], ['["Flutter"]', "array"]] },
  {
    indent: 1,
    tokens: [
      ["architecture", "key"],
      [": ", "punct"],
      ['["REST APIs", "Clean Architecture"]', "array"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["security", "key"],
      [": ", "punct"],
      ['["JWT", "OAuth2", "Keycloak"]', "array"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["databases", "key"],
      [": ", "punct"],
      ['["SQL", "MongoDB"]', "array"],
    ],
  },
  {
    indent: 1,
    tokens: [
      ["tooling", "key"],
      [": ", "punct"],
      ['["Docker", "Git", "Linux"]', "array"],
    ],
  },
  {
    indent: 0,
    tokens: [
      ["}", "punct"],
      [";", "punct"],
    ],
  },
];

const tokenColor: Record<string, string> = {
  keyword: "text-purple-700 dark:text-purple-400",
  key: "text-accent",
  string: "text-emerald-700 dark:text-emerald-400",
  array: "text-amber-700 dark:text-amber-300",
  punct: "text-fg-subtle",
  plain: "text-fg",
};

function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-lift">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="ml-2 font-mono text-xs text-fg-subtle">profile.ts</span>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-xs text-fg-subtle sm:inline-flex">
          <MapPin aria-hidden="true" className="size-3" />
          Tunisia
        </span>
      </div>

      <pre
        aria-label="Developer profile expressed as a TypeScript object"
        className="overflow-x-auto px-4 py-4 font-mono text-xs leading-[1.75] text-fg"
      >
        <code>
          {profileLines.map((line, lineIndex) => (
            <span key={lineIndex} className="flex">
              <span
                aria-hidden="true"
                className="w-4 shrink-0 select-none pr-2 text-right text-fg-subtle/50"
              >
                {lineIndex + 1}
              </span>
              <span style={line.indent ? { paddingLeft: `${line.indent * 16}px` } : undefined}>
                {line.tokens.map(([text, kind], tokenIndex) => (
                  <span key={tokenIndex} className={tokenColor[kind]}>
                    {text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>

      <div className="border-t border-line px-4 py-3 sm:px-5">
        <p className="text-xs leading-relaxed text-fg-subtle">
          Backend services in Java and Spring Boot, mobile clients in Flutter, web
          clients in Angular.
        </p>
      </div>
    </div>
  );
}