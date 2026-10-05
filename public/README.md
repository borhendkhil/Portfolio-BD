# Public assets

Everything in this folder is served as a static file at the site root, so
`public/borhen.pdf` becomes `https://your-domain.com/borhen.pdf`.

## CV — add your file here

Put your PDF in this folder, named exactly:

```
public/Borhen-Dkhil-CV.pdf
```

The filename is referenced in `src/data/site.ts` as `cvFileName`. Change that value
if you prefer a different name.

Then rebuild (`npm run build`, or `npm run dev`). The check is a build-time
filesystem stat, so no import or registration is needed:

- **File present** → the **Download CV** button links to it in the navbar and hero.
- **File absent** → the navbar button is omitted and the hero shows a clearly
  marked, non-clickable "PDF pending" marker. No broken link, no fabricated PDF.

Keep the PDF reasonably small (under ~2 MB) so it downloads quickly.

## Project screenshots

See `public/projects/fruit-traceability/README.md`.

## Generated files

`favicon`/app icon, Open Graph image and web manifest are generated at build time
from `src/app/icon.tsx`, `src/app/opengraph-image.tsx` and `src/app/manifest.ts`.
No static icon assets are required.

## Project screenshots

See `public/projects/fruit-traceability/README.md`.

## Generated files

`favicon`/app icon, Open Graph image and web manifest are generated at build time
from `src/app/icon.tsx`, `src/app/opengraph-image.tsx` and `src/app/manifest.ts`.
No static icon assets are required.