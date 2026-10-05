# Borhen Dkhil — Software Engineer Portfolio

A production-ready, single-page developer portfolio built with Next.js (App Router),
TypeScript and Tailwind CSS.

The site is designed around one goal: a technical recruiter should understand who
Borhen is, what he builds and how to reach him within about thirty seconds, without
reading anything that is not true.

---

## What is built

| Section                | What it does                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| Navigation             | Sticky header, scroll-spy active indicator, mobile menu, theme switch, CV button          |
| Hero                   | Name, role, stack line, primary CTAs, social links, code-editor profile card              |
| About                  | Honest positioning plus four focus areas (backend, mobile, front end, academic work)      |
| Technical skills       | Seven grouped technology groups rendered as tags — no invented proficiency percentages    |
| Experience             | Timeline entry for the FinStart Vision Afrique PFE project, with responsibilities        |
| Featured project       | The fruit traceability application, presented as the main project of the portfolio        |
| Case study             | Problem, solution, layered architecture, offline-first behavior, technical itinerary, auth |
| Other projects         | Four additional projects in a two-column card grid                                        |
| Engineering approach   | Four principles describing how the work is done                                           |
| Education              | Completed engineering degree at TEK-UP University with a status badge                      |
| Contact                | Email/LinkedIn/GitHub buttons plus a validated contact form                               |
| Footer                 | Navigation, social links, back to top                                                    |

Plus: custom 404 page, error boundaries, generated app icon and Open Graph image, web
manifest, `sitemap.xml`, `robots.txt`, JSON-LD `Person` structured data and a
copy-to-clipboard email button with a toast notification.

### The case study is a modal

Clicking **Read the case study** on the featured project opens the full write-up in a
modal instead of scrolling to a separate section. It is built on the native
`<dialog>` element (`src/components/ui/Dialog.tsx`), so focus trapping, Escape to
close, background inerting and focus restoration are all handled by the browser.

The modal body is a Server Component (`CaseStudyContent.tsx`) rendered on the server
and passed into the client dialog as `children`, so the case study text and diagrams
never enter the client bundle. `#case-study` still opens the modal if it is used as a
deep link.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, static generation)
- **React 19** — Server Components by default, client components only where interactivity is needed
- **TypeScript** (strict mode)
- **Tailwind CSS v4** — CSS-variable driven design tokens, no runtime CSS-in-JS
- **next/font** — Inter (UI) and JetBrains Mono (code), self-hosted, `display: swap`
- **lucide-react** — icons
- **No animation library.** Scroll reveals are a ~40-line IntersectionObserver component,
  which keeps roughly 30 KB of JavaScript out of the bundle and avoids layout thrash.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, theme script, providers
│   ├── page.tsx                # Section composition
│   ├── globals.css             # Design tokens, base styles, reveal/grid utilities
│   ├── error.tsx               # Route-level error boundary
│   ├── global-error.tsx        # Root error boundary
│   ├── not-found.tsx           # 404 page
│   ├── icon.tsx                # Generated favicon
│   ├── opengraph-image.tsx     # Generated social share card
│   ├── manifest.ts             # PWA manifest
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   └── api/contact/route.ts    # Contact form endpoint
│
├── components/
│   ├── animations/Reveal.tsx   # Dependency-free scroll reveal
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx          # Scroll spy + mobile menu
│   │   ├── ThemeProvider.tsx   # localStorage + system preference
│   │   └── ThemeToggle.tsx
│   ├── projects/
│   │   ├── CaseStudyContent.tsx    # Server Component: modal body
│   │   ├── CaseStudyProvider.tsx   # Modal open state + deep-link handling
│   │   ├── CaseStudyTrigger.tsx    # Button that opens the modal
│   │   ├── Diagrams.tsx            # Layered stack, step flow, itinerary tree
│   │   └── ProjectGallery.tsx      # Server component, filesystem-aware
│   ├── sections/               # One component per page section
│   └── ui/                     # Button, Badge, Card, Dialog, Section, Toast, SocialLinks
│
├── data/                       # ← All content lives here, separated from the UI
│   ├── site.ts                 # Identity, SEO, navigation, social links
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── caseStudy.ts
│   └── education.ts
│
├── lib/
│   ├── assets.ts               # Build-time checks for the CV and project images
│   └── utils.ts
│
└── types/
    ├── index.ts
    └── contact.ts
```

**Content and presentation are fully separated.** Editing `src/data/*.ts` changes
the site without touching a single component.

---

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Other commands:

```bash
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript presets)
npm run build    # Production build (static where possible)
npm run start    # Serve the production build
```

There is no test suite in this repository; quality is enforced with `npm run lint`
and `npm run build` plus a TypeScript check via `npx tsc --noEmit`.

### About `npm audit`

`npm audit` reports high-severity advisories for `braces`, which is reachable only
through the linting toolchain:

```
eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces
```

`npm ls braces --omit=dev` is empty, so the advisory has no path into the runtime or
the deployed bundle — it affects local linting only. The suggested automated repair
(`npm audit fix --force`) would downgrade `eslint-config-next` to 14.x, which is a
breaking change and the wrong trade. The advisory is therefore left in place
deliberately; it disappears when the Next.js lint plugin updates its own dependencies.

---

## Environment variables

Copy `.env.example` to `.env.local`. Nothing here is required for the site to run.

| Variable               | Required | Purpose                                                                     |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | No       | Canonical origin for metadata, Open Graph, `sitemap.xml` and `robots.txt`. Defaults to the placeholder in `src/data/site.ts`. |
| `CONTACT_WEBHOOK_URL`   | No       | HTTPS endpoint that receives contact form submissions as a JSON POST.      |

`.env.local` is git-ignored. Never commit secrets.

### Enabling the contact form

No email provider is wired up by default, and none is simulated. With
`CONTACT_WEBHOOK_URL` unset, `/api/contact` returns `503` and the form opens a
pre-filled `mailto:` draft addressed to `socialLinks.email`, so the message still
reaches Borhen through the visitor's own mail client. Nothing is faked: the visitor
is told which route was used, and "Message sent" is only shown when a provider
actually accepted the submission.

Any endpoint that accepts a JSON `POST` works. The payload is:

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "message": "Message body",
  "submittedAt": "2026-01-01T00:00:00.000Z",
  "source": "portfolio-contact-form"
}
```

Options that require no backend work on this side:

- [Formspree](https://formspree.io) / [Basin](https://usebasin.com) — paste the form endpoint URL
- [Zapier](https://zapier.com) or [Make](https://make.com) — use a "Webhooks by Zapier" catch hook
- A [Cloudflare Worker](https://workers.cloudflare.com) that forwards to Resend or SES

The route validates and sanitises input (type checks, length caps, control-character
stripping, email shape), rejects request bodies over 16 KB with `413`, and times out
after 8 seconds. Upstream error details are never forwarded to the client.

### Spam protection

Two layers, both server-side:

1. **Cross-origin guard.** Browsers always send `Origin` on a POST, so a request whose
   origin does not match the site's own is rejected with `403`. Requests without the
   header (`curl`, server-to-server) are allowed through.
2. **Honeypot.** The form carries a `company` field that is hidden with `hidden` (so it
   is removed from the accessibility tree and cannot be tabbed into) but still reaches
   the request body. A filled honeypot gets a normal `{"status":"ok"}` response and the
   submission is discarded without contacting the provider — the bot is told nothing,
   and the payload never leaves the server.

Neither layer invents a captcha, and neither collects telemetry.

---

## Adding a project

Edit `src/data/projects.ts`:

```ts
{
  id: "my-project",
  title: "My Project",
  subtitle: "One line that says what it is",
  description: "Two or three sentences on what it does and why.",
  technologies: ["Spring Boot", "PostgreSQL"],
  category: "Backend",
  context: "Personal project",
  github: "https://github.com/...",   // optional — omitted from the UI when empty
  demo: "https://...",                 // optional
  imageFolder: "/projects/my-project", // optional
  images: [                            // optional
    { file: "overview.png", label: "Application overview", kind: "desktop" },
    { file: "login.png", label: "Login screen", kind: "mobile" },
  ],
  highlights: ["Short bullets shown on the card"],
}
```

`github` and `demo` are optional: if a value is empty, no button is rendered. This
is deliberate — the site never shows a broken link.

The first project with `featured: true` drives the featured-project card and the
case study. Everything else flows into the "Other projects" grid automatically.

## Adding images

1. Put the files in `public/<imageFolder>`.
2. Register them in the project's `images` array.

`ProjectGallery` checks the filesystem at build time. A file that exists is rendered
with `next/image` (lazy-loaded, responsive `sizes`, optimized); a file that does not
exist renders a labelled placeholder with the expected file name. No mock screenshots
are generated or presented as real ones.

For mobile screenshots the gallery wraps the image in a phone-shaped frame so portrait
screenshots are displayed without cropping.

## Adding the CV

### Where to put it

Drop the PDF here, at the root of the `public` folder:

```
public/Borhen-Dkhil-CV.pdf
```

The name must match `cvFileName` in `src/data/site.ts` exactly (capital letters
included). To use a different filename, change that one value.

```
portfolio/
├── public/
│   └── Borhen-Dkhil-CV.pdf   <-- put it here
└── src/
```

### Then rebuild

The check runs at build time, so a newly added PDF needs a rebuild to be picked up:

```bash
npm run build   # or npm run dev, which rebuilds on change
```

There is nothing else to configure — no import, no registration step. `next build`
serves everything in `public/` as static files, and `src/lib/assets.ts` stats the
file to decide what to render.

### What happens either way

| File state       | Result                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| **Present**      | Download CV appears in the navbar and hero, linking to the PDF                |
| **Missing**      | Navbar button is omitted; hero shows a dashed "PDF pending" marker, no link   |

This was verified in both states: with a placeholder PDF in place the site served it
with `200 application/pdf` and switched both buttons to real links; after removing it
the build reverted to the pending marker. No CV is committed to the repository.

## Configuring social links

Edit `src/data/site.ts`:

```ts
export const socialLinks = {
  github: "https://github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  email: "you@example.com",
};
```

Empty values are handled everywhere: the hero falls back to a note pointing at this
file, the footer shows nothing extra, and the contact section hides the email button
and copy-to-clipboard control. No placeholder URLs are used anywhere in the project.

## Education data

`src/data/education.ts` holds the completed engineering degree:

- **Software Engineering Engineer**, Software Engineering, TEK-UP University
- `period` is `"Graduated 2025"` — the graduation year only, since start years were
  never part of the source material. Replace it with a full range if you have one.
- `status: "completed"` drives the badge in the UI (`"In progress"` for the other value).

Earlier qualifications can be added as additional entries in the same array; the
section renders whatever is listed.

---

## Theme and design system

Colours are CSS variables defined once in `src/app/globals.css` and mapped into
Tailwind through `@theme inline`, so `bg-surface`, `text-fg-muted` and `border-line`
resolve correctly in both themes without a single `dark:` variant in the markup.

- Dark mode is the default; light mode is fully supported.
- The stored preference wins, otherwise the system preference is used.
- An inline script in `<head>` applies the theme before first paint, so there is no
  flash of the wrong theme. It also adds a `js` class that gates reveal animations,
  which means **all content is visible when JavaScript is unavailable**.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`)
- Skip-to-content link
- Visible `:focus-visible` outlines on every interactive element
- Labelled form fields with `aria-invalid` and `aria-describedby` error wiring
- `aria-live` regions for the contact form and toasts
- Ordered heading levels with a single `h1`
- `prefers-reduced-motion` disables reveals, transitions and smooth scrolling
- Contrast checked against WCAG AA for both themes

## Performance

- Fully static output — every route except `/api/contact` is prerendered
- Two self-hosted variable font subsets, `display: swap`
- One small client island per interactive feature instead of hydrating the page
- Icons imported individually from `lucide-react`
- No animation library, no background video, no client-side data fetching

---

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub, GitLab or Bitbucket.
2. Import it in [Vercel](https://vercel.com/new). The framework preset is detected
   automatically — no build settings needed.
3. Add `NEXT_PUBLIC_SITE_URL` (and `CONTACT_WEBHOOK_URL` if the contact form should
   deliver) under **Project → Settings → Environment Variables**.
4. Deploy.
5. Set the production domain, then update `siteConfig.seo.url` in `src/data/site.ts`
   so canonical URLs, the sitemap and the robots file point at the real origin.

### Any Node.js host

```bash
npm ci
npm run build
npm run start
```

The app runs on the Node.js runtime and needs no custom server. Set
`NEXT_PUBLIC_SITE_URL` at build time, since it is inlined into the static output.

---

## Content integrity

This portfolio deliberately avoids invented claims. There are no:

- fabricated companies, clients, users, revenue or downloads
- invented years of experience or job titles
- skill proficiency percentages or progress bars
- fake testimonials, awards or certifications
- generated screenshots presented as real application screens

Where information was missing, the site shows a labelled placeholder or a note
explaining where the value belongs. Add real data as it becomes available.