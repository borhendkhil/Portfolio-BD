import { KeyRound, RefreshCw, Route, ShieldCheck } from "lucide-react";

import {
  ItineraryDiagram,
  LayeredDiagram,
  StepFlow,
} from "@/components/projects/Diagrams";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Panel } from "@/components/ui/Card";
import { caseStudy } from "@/data/caseStudy";
import { featuredProject } from "@/data/projects";

/**
 * Case study body, rendered inside the modal by `CaseStudyDialog`.
 *
 * Deliberately a Server Component: the content and the diagrams are static, and
 * the gallery reads the filesystem at build time, so none of this needs to be
 * part of the client bundle.
 */
export function CaseStudyContent() {
  return (
    <div className="space-y-12">
      {/* 1. Problem */}
      <article className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <PartLabel number="01" title={caseStudy.problem.title} />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            {caseStudy.problem.body}
          </p>
        </div>
        <div className="lg:col-span-7">
          <Panel>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {caseStudy.problem.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-fg-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Panel>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            {caseStudy.problem.closing}
          </p>
        </div>
      </article>

      {/* 2. Solution */}
      <article className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <PartLabel number="02" title={caseStudy.solution.title} />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
            {caseStudy.solution.body}
          </p>
        </div>
        <div className="lg:col-span-7">
          <Panel>
            <ul className="space-y-3">
              {caseStudy.solution.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-fg-muted">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={1.75}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </article>

      {/* 3. Architecture */}
      <article className="border-t border-line pt-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PartLabel number="03" title={caseStudy.architecture.title} icon={Route} />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              {caseStudy.architecture.body}
            </p>
            <div className="mt-5 rounded-lg border border-line bg-surface-2 px-4 py-3.5">
              <p className="text-sm font-medium tracking-tight">
                {caseStudy.architecture.keycloak.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {caseStudy.architecture.keycloak.body}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LayeredDiagram layers={caseStudy.architecture.layers} />
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PartLabel title="Offline mode" icon={RefreshCw} />
            <blockquote className="mt-4 border-l-2 border-accent pl-4 text-[0.9375rem] leading-relaxed text-fg-muted italic">
              {caseStudy.offline.quote}
            </blockquote>
            <div className="mt-6 space-y-5">
              <div>
                <p className="mb-2 font-mono text-xs tracking-[0.14em] text-accent uppercase">
                  Online
                </p>
                <StepFlow label="Online request path" steps={caseStudy.offline.online.steps} />
              </div>
              <div>
                <p className="mb-2 font-mono text-xs tracking-[0.14em] text-accent uppercase">
                  Offline
                </p>
                <StepFlow
                  label="Offline path and synchronization"
                  steps={caseStudy.offline.offline.steps}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {caseStudy.offline.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
              {caseStudy.offline.note}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PartLabel title="Technical itinerary" icon={Route} />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              {caseStudy.itinerary.body}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ItineraryDiagram />
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {caseStudy.itinerary.operations.map((operation) => (
                <li key={operation.name} className="text-sm">
                  <span className="font-medium tracking-tight">{operation.name}</span>
                  <span className="mt-0.5 block text-fg-muted">{operation.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              {caseStudy.itinerary.closing}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <PartLabel title={caseStudy.auth.title} icon={KeyRound} />
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              {caseStudy.auth.body}
            </p>
          </div>
          <div className="grid gap-8 lg:col-span-7 lg:grid-cols-2">
            <StepFlow label="Authentication flow" steps={caseStudy.auth.flow} />
            <div>
              <dl className="space-y-4">
                {caseStudy.auth.points.map((point) => (
                  <div key={point.title}>
                    <dt className="text-sm font-medium tracking-tight">{point.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-fg-muted">
                      {point.body}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
                {caseStudy.auth.note}
              </p>
            </div>
          </div>
        </div>
      </article>

      {featuredProject.images?.length ? (
        <section aria-labelledby="gallery-heading" className="border-t border-line pt-10">
          <h3 id="gallery-heading" className="text-lg font-semibold tracking-tight">
            Application gallery
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
            Frames for the screenshots of this project. Select any frame to open
            it full size. Placeholders are shown deliberately — nothing here is a
            mock-up pretending to be the real application.
          </p>
          <ProjectGallery
            folder={featuredProject.imageFolder ?? "/projects/fruit-traceability"}
            images={featuredProject.images}
          />
        </section>
      ) : null}
    </div>
  );
}

function PartLabel({
  number,
  title,
  icon: Icon,
}: {
  number?: string;
  title: string;
  icon?: typeof Route;
}) {
  return (
    <p className="flex items-center gap-2.5">
      {Icon ? (
        <Icon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.75} />
      ) : null}
      <span className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
        {number ? `${number} / ` : ""}
        {title}
      </span>
    </p>
  );
}