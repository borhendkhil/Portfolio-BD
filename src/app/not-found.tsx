import { AnchorButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { navigationItems } from "@/data/site";

export const metadata = {
  title: "404 — Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
          Error 404
        </p>
        <p className="mt-4 font-mono text-6xl font-semibold tracking-tight text-accent sm:text-7xl">
          404
        </p>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
          The address may have changed, or the link that brought you here was mistyped.
          Everything on this site lives on a single page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <AnchorButton href="/">Back to Home</AnchorButton>
        </div>

        <nav aria-label="Suggested sections" className="mt-10 border-t border-line pt-6">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  className="text-sm text-fg-muted underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}