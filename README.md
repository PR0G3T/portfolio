# Killian “PR0G3T” OTT — portfolio & one-page CV

A static [SvelteKit](https://svelte.dev/docs/kit) portfolio whose CV can be exported as a **single A4 page** from any modern browser. The same CV data powers the portfolio, the print view and the structured data — there is no second copy to keep in sync.

## Languages

A fixed **FR / EN** selector sits at the bottom-right of the portfolio. It updates the page instantly, stores the choice in `localStorage`, reflects it in the URL (`?lang=fr`), updates `<html lang>` and the social metadata, and carries the language into the download (`/CV.pdf` or `/CV-fr.pdf`) and the preview route (`/cv/?lang=fr`). The whole CV — profile, roles, dates, education, certifications, skills and languages — is translated from the same source data; a completeness test fails if a printable string is missing its French copy.

## One-page guarantee

The `/cv/` route is a dedicated A4 document:

- fixed `210mm × 297mm` sheet, `@page { size: 210mm 297mm; margin: 0 }`;
- a discrete binary search finds the largest type size that fits the content box;
- if the richest document does not fit, optional content is shed in a deterministic order (highlights → projects → summary) rather than shrinking below the readability floor;
- the type scale is searched on a 0.25 pt grid with an 8 px safety margin and sub-pixel verification;
- `overflow: hidden` keeps the page count at one even in a pathological future case, while the test suite fails if that ever happens;
- the browser’s native print engine produces real, selectable text — no screenshot-to-PDF library, no runtime PDF dependency.

The homepage download button serves a **build-time generated, verified PDF** (`CV.pdf` / `CV-fr.pdf`) — no print dialog, no browser margin/paper-size surprises. The same document remains available as `/cv/` for preview and manual printing, including without JavaScript (progressive enhancement).

## Stack

- Svelte 5 (runes) + SvelteKit 3
- Vite 8 (Rolldown), TypeScript 6
- Tailwind CSS 4 for the portfolio screen
- Vitest 5 for pure logic, Playwright 1.65 for browser/PDF tests
- `pdf-lib` + `pdfjs-dist` as dev-only test inspectors
- Node 24 LTS in CI, Node ≥ 22.17 required by SvelteKit 3

TypeScript 6 is intentional: TypeScript 7 is not yet supported by `svelte-check`/`typescript-eslint` without the experimental `tsgo` API.

## Commands

```sh
npm ci              # reproducible install
npm run dev         # http://localhost:5173
npm run check       # svelte-check + generated types
npm run lint        # Prettier + ESLint
npm run test        # Vitest unit tests
npm run test:coverage # 100% statement/branch/function/line coverage on pure logic
npm run test:e2e    # Playwright against the dev server
npm run build       # static build in docs/ + localized PDFs (requires Playwright Chromium)
npm run pdf         # alias for the build + PDF generation
npm run test:e2e:build # Playwright against the production build
```

## Architecture

```
src/lib/data/cv.ts        single source of truth
src/lib/cv/types.ts       domain types
src/lib/cv/model.ts       pure, validated print projection
src/lib/cv/period.ts      human date parsing + recency ordering
src/lib/cv/fit.ts         discrete monotone root search
src/lib/cv/density.ts     lexicographic content/type-size policy
src/lib/cv/fit-controller.ts  DOM measurement adapter
src/lib/cv/preview.ts     screen-only A4 preview scaling
src/lib/cv/Resume.svelte  the A4 document
src/lib/i18n/              UI strings, French CV copy, locale state
src/routes/cv/            print-ready route
scripts/generate-pdfs.mjs build-time A4 PDF generation
```

The fit maths (`src/lib/cv/fit.ts`) is independent from the DOM and property-tested with `fast-check`. The DOM adapter performs at most `ceil(log2(steps + 1)) + 1` reflows per density level.

`npm run build` prints both locales with Chromium, asserts one page, then writes `docs/CV.pdf` / `docs/CV-fr.pdf` and copies them to `static/` for the dev server. The browser tests download and inspect the real files, so a stale PDF fails CI. Run `npx playwright install chromium` once before the first local build.

The French period parser understands both English and French month names, so changing language never changes chronological order.

## Fonts and licensing

The project ships **Inter Display** under the SIL Open Font License 1.1 (`static/fonts/inter-display/LICENSE.txt`). Screen text uses the variable WOFF2; the PDF uses four statically subset WOFF2 weights. Contextual alternates are disabled on the print document because Chrome’s PDF backend otherwise maps `(` and `-` to private-use code points, which breaks copy/paste and ATS parsing.

All code dependencies are MIT, Apache-2.0, BSD or OFL. No copyleft runtime dependency is used.

## Deployment

The GitHub Actions workflow runs lint, type checks, unit coverage, browser tests, the production build and production-build tests before deploying `docs/` to GitHub Pages.

The production site is served at the domain root. If you ever deploy under a sub-path, build with:

```sh
BASE_PATH=/my-sub-path npm run build
```

`BASE_PATH` is consumed by SvelteKit’s `paths.base`; route links, assets and font URLs are resolved through `resolve()`/`asset()`.
