# Gabriel Almeida Resende — Portfolio

Bilingual (English / Português-BR) professional portfolio: digital CV, technical projects, and academic presentation at the intersection of law, information security, AI evaluation, data quality, and research. Light-silver page (after the silver finish of a laptop lid) with a polished graphite bust of the owner rendered behind translucent panels; blood-red accents.

Static site, hosted for free on GitHub Pages, designed for incremental evolution.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Build | [Vite](https://vite.dev) 8 | Static output, fast dev server, trivial base-path configuration for GitHub Pages. |
| UI | React 19 + TypeScript 5.9 | Typed dictionaries and content: the compiler reports any missing translation or field. |
| Styling | Plain CSS with custom properties | No CSS framework; the glass effect is a few rules with a `@supports` fallback. |
| 3D | three.js (loaded on demand) | Renders the graphite bust that fills the page background; the library ships in its own chunk, fetched after the page is interactive. |
| Tests | Vitest | Checks translation parity, non-empty strings, and link hygiene. |
| Deploy | GitHub Actions → GitHub Pages | Free static hosting; no backend, database, tracking, or external runtime services. |

No analytics, telemetry, fonts, or scripts are loaded from third parties. The site uses the system font stack.

## Directory structure

```
.
├── .github/workflows/deploy.yml   # Build + publish to GitHub Pages
├── index.html                     # HTML shell, English meta tags, Open Graph
├── public/
│   ├── favicon.png, apple-touch-icon.png   # Generated from the brand mark
│   ├── images/bust-backdrop.png   # Static render of the bust (no-WebGL fallback)
│   ├── models/bust.glb            # Simplified, texture-free 3D scan used by the bust
│   └── cv/                        # Put public CV PDFs here (see below)
├── src/
│   ├── assets/                    # Bundled images: brand mark (white/black), Lattes mask
│   ├── main.tsx                   # Entry point
│   ├── App.tsx                    # Page composition (panel order)
│   ├── config/site.ts             # Panel ids, navigation order, CV files, repository URL, base-path helper
│   ├── i18n/
│   │   ├── locales.ts             # Supported locales, default locale, `Localized` type
│   │   ├── locales/en.ts          # English UI strings (defines the dictionary shape)
│   │   ├── locales/pt-BR.ts       # Portuguese UI strings
│   │   ├── LanguageProvider.tsx   # Context, persistence, <html lang>, title/meta updates
│   │   └── index.ts               # Public i18n API
│   ├── content/                   # Professional content (no UI logic)
│   │   ├── profile.ts             # Name, tagline, summary, profile links
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── education.ts           # Degrees and certifications
│   │   ├── research.ts            # Interests, groups, publications, identifiers
│   │   ├── skills.ts
│   │   ├── organizations.ts       # Employers, universities, groups (tiles)
│   │   ├── contact.ts
│   │   └── impact/                # Data modules: justice.ts, cyber.ts (figures + sources), brazilOutline.ts (generated)
│   ├── hooks/                     # useReducedMotion, useInView, useCountUp
│   ├── components/                # Header, Hero, BustBackdrop (+ bustScene.ts, three.js), Panel, Logo, impact/*, sections/*
│   └── styles/                    # tokens.css, base.css, glass.css, layout.css, impact.css
├── scripts/build-brazil-outline.mjs # Regenerates src/content/impact/brazilOutline.ts from Natural Earth polygons
├── scripts/optimize-bust.mjs      # Prepares public/models/bust.glb from the owner's 3D scan
└── tests/                         # i18n.test.ts, impact.test.ts
```

Content, translations, and components are deliberately separated: edit `src/content` to change what is said, `src/i18n/locales` to change interface labels, and `src/components` only to change how things are rendered.

## Running locally

Requires Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run typecheck  # tsc -b
npm test           # vitest
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally
npm run check      # typecheck + test + build
```

## Editing content and translations

### Interface strings

`src/i18n/locales/en.ts` is the source of truth for the dictionary shape. `pt-BR.ts` must provide every key; if a key is missing or extra, `npm run typecheck` fails and `npm test` reports the path.

### Professional content

Every user-facing text in `src/content/*.ts` is a `Localized` object:

```ts
{ en: 'Legal Quality Analyst', 'pt-BR': 'Analista de Qualidade Jurídica' }
```

Names of organizations, technologies, and URLs are plain strings. Keep content aligned with verifiable sources (CV, repositories); do not add metrics, titles, or results that are not documented. Employer-related text stays generic: role, employer and period only where already public, activities described as transferable skills, no internal team or system names, metrics, volumes or process details.

### Adding a project

Append an entry to `src/content/projects.ts`:

```ts
{
  id: 'my-project',
  name: 'My Project',
  description: { en: '…', 'pt-BR': '…' },
  technologies: ['TypeScript'],
  status: 'prototype',          // 'experimental' | 'prototype' | 'mvp' | 'firstRelease'
  contribution: { en: '…', 'pt-BR': '…' },  // optional
  repositoryUrl: 'https://github.com/…',
  demoUrl: 'https://…',         // optional; only if documented in the project's README
}
```

To add a status value, extend `ProjectStatus` and add its label under `projects.statusValues` in both dictionaries.

### Adding a publication

Append to `publications` in `src/content/research.ts` (title, venue, year, optional `url` and `identifier` such as a DOI). The section shows a placeholder message while the list is empty.

### Presentation without a portrait

The site deliberately shows no photograph of the owner: identity comes from the name, the typography, the content and the bust. `src/content/profile.ts` has no photo field; do not add one back.

### Graphite bust as the page background (`src/components/BustBackdrop.tsx`, `src/components/bustScene.ts`)

- **Placement:** a fixed, full-viewport canvas behind every panel (z-index −1), clearing to the page color. The bust is centered in the upper part of the first screen, between the two columns of hero buttons on wide screens; the name and presentation follow below it.
- **Model:** `public/models/bust.glb` (≈530 KB) is derived from the owner's second photogrammetry scan (head and shoulders, 117k triangles) with `scripts/optimize-bust.mjs`: the photographic texture, UVs and baked normals are dropped, positions are welded, the mesh is simplified to ~53k triangles (ratio 0.45, keeping facial detail) and quantized. Normals are recomputed at load time. The original scan is not in the repository.
- **Material:** polished graphite — `MeshPhysicalMaterial` with full metalness, very low roughness and a clear coat, so the room environment (`RoomEnvironment` through `PMREMGenerator`) shows as mirror-like reflections; key, rim and fill lights; a soft shadow behind the figure separates it from the silver ground.
- **Motion:** the bust turns slightly toward the pointer (hover-capable devices only) and, as the page is scrolled, turns a little further and drifts down behind the content. Nothing moves on its own: frames are rendered only while the bust is settling after an input. With `prefers-reduced-motion` a single frame is rendered. The loop is paused while the tab is hidden; pixel ratio is capped at 1.5.
- **Fallback:** `public/images/bust-backdrop.png` (a render of the same scene, central part of a 1440×900 viewport) is used as the background image when WebGL is unavailable or the model fails to load. three.js is imported dynamically, so it is not part of the initial bundle.
- **Cleanup:** geometry, materials, textures, the environment map and the renderer are disposed and the canvas removed on unmount; listeners and observers are detached; a load that resolves after unmount is discarded.
- To regenerate the static image, open the page in a browser with WebGL at 1440×900, capture the viewport before scrolling and keep the central 720 px.

### CV downloads

1. Place PDFs approved for public release under `public/cv/`.
2. In `src/config/site.ts`, set the path per language, e.g. `en: 'cv/Gabriel_Resende_CV_EN.pdf'`.

A "Download CV" button appears for each language that has a file. Review every document before adding it: the repository and the site are public.

### Adding a language

1. Add the BCP 47 tag to `SUPPORTED_LOCALES` and `LOCALE_LABELS` in `src/i18n/locales.ts`.
2. Create `src/i18n/locales/<tag>.ts` typed as `Dictionary` and register it in `src/i18n/index.ts`.
3. Run `npm run typecheck`: it lists every `Localized` content field that still lacks the new language.
4. Add a `CV_FILES` entry (may be `null`).

## Layout

Page order (all widths): hero (two columns of buttons beside the bust, then name, identification and summary) → impact section (two data cards of equal height: law on the left, cybersecurity on the right) → curriculum (full width) → projects (left) and papers (right) → organizations (full width). The bust is behind all of it.

Dashboard on desktop (≥1024px):

```
┌───────────────────────────┬───────────────────────────┐
│ Justice (BR vs. EU)       │ Cybersecurity in Brazil   │
├───────────────────────────┴───────────────────────────┤
│ Curriculum (experience, education, skills)            │
├───────────────────────────┬───────────────────────────┤
│ Projects                  │ Recent papers             │
├───────────────────────────┴───────────────────────────┤
│ Organizations                                         │
└───────────────────────────────────────────────────────┘
```

Below 1024px every row stacks in one column in the same order. Grids are defined in `src/styles/layout.css` and `src/styles/impact.css`; the header navigation order comes from `NAV_IDS` in `src/config/site.ts`.

## Impact modules (`src/components/impact`)

Two short modules sit right after the hero. They give context for the CV; they are not a dashboard. Their figures live in `src/content/impact/*.ts`, each with unit, period, scope and source, and are covered by `tests/impact.test.ts`. The comments at the top of those files record how each number was verified and what could not be verified.

### Justice: Brazil and the European Union (`justice.ts`)

- Reference year **2024**, from CNJ's *Justiça em Números 2025* and its international comparison built on CEPEJ data; starting point was the ConJur report of 25 Sep 2025. Rates are **per 100 inhabitants** (the report prints "per 100 thousand", which the arithmetic rules out: 39.4 M new cases over ~212 M inhabitants ≈ 18.5 per 100).
- Two indicators are charted: new cases per 100 inhabitants and new cases per judge. The statue (`JusticeStatue.tsx`) is a geometric SVG illustration of Ceschiatti's *A Justiça* in front of the STF: its silhouette and shade planes are traced from a cut-out photograph with `scripts/trace-statue.py` (numpy + Pillow; the photograph is not in the repository), and the blindfold and sword are drawn on top.
- Bars reveal and the values count up when the chart enters the viewport; with `prefers-reduced-motion` they render complete immediately.
- A newer edition exists (*Justiça em Números 2026*, base year 2025). The module keeps 2024 on purpose; migrate figures and sources together.

### Cybersecurity in Brazil (`cyber.ts`, `BrazilMap.tsx`)

- **The map is a simulation.** `BrazilMap.tsx` draws Brazil's outline (`brazilOutline.ts`, Natural Earth 1:50m, simplified) as a glass slab on a 2D canvas and animates synthetic silver streaks "falling" onto random points inside it, generated by a seeded PRNG in `brazilMap.ts`. Nothing is fetched; no telemetry, no real-time data. The badge and the note say so in the interface. Do not present it as monitoring.
- The animation runs only while the map is on screen, the tab is visible and the user has not paused it (button, keyboard-accessible); frames are capped at ~30/s and the pixel ratio at 2. With `prefers-reduced-motion`, or when a 2D context is unavailable, a static SVG version with a few fixed streaks is rendered with a one-line explanation.
- **Figures** come from the executive summary of Brasscom's *Relatório de Cibersegurança 2025: Panorama e Insights* (July 2025): attack attempts against Brazil in 2023, average data-breach cost in Brazil in 2024 (US dollars), projected investment 2025–2028 and the most common attack. Each tile states its period; the report compiles third-party data, and its underlying sources could not be read from the build environment.

### Regenerating the Brazil outline

```bash
mkdir /tmp/geo && cd /tmp/geo && npm i world-atlas@2 topojson-client@3 && cd -
NODE_PATH=/tmp/geo/node_modules node scripts/build-brazil-outline.mjs > src/content/impact/brazilOutline.ts
```

The packages are used only by the script and are not project dependencies. Data: Natural Earth 1:50m countries (public domain) via `world-atlas`.

### Brand mark and icons

- `src/assets/logo-white.png` / `logo-black.png` are the brand mark with transparent background; `public/favicon.png` and `apple-touch-icon.png` are derived from it. The black mark appears in the header.
- Profile links are icon pills in the hero (`src/components/Icons.tsx`). GitHub and ORCID paths come from simple-icons (CC0, inline SVG); the Lattes button uses the supplied mark (`src/assets/lattes-mask.png`) as a CSS mask so it takes the current color; the LinkedIn and e-mail glyphs are simplified in-house drawings. Swap any of them by editing its small component.
- The theme is light-first (light-silver page, graphite text, blood-red accent, translucent panels over the graphite bust). A dark token set is kept under `:root[data-theme="dark"]` in `src/styles/tokens.css` for a future toggle; it is not active.

## Language behavior

- English is always the initial render. A previously chosen language is restored right after mount from `localStorage` (`portfolio.locale`). No geolocation is used.
- Switching updates `<html lang>`, the document title, the meta description, and Open Graph tags without reloading. The reading position is preserved.
- The switch is a button group with `aria-pressed` and accessible names, operable by keyboard.

## Publishing on GitHub Pages (free)

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main` (and on manual dispatch).

One-time setup, done manually in the repository settings:

1. **Settings → General:** repository name `resende-g.github.io`; default branch `main`.
2. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
3. Push to `main`. The "Deploy to GitHub Pages" workflow runs and publishes `dist/`.

### Base path

The repository is published as a *user site*: it must be named exactly `resende-g.github.io` (the GitHub account followed by `.github.io`), and GitHub then serves it at:

```
https://resende-g.github.io/
```

The workflow detects that name and builds with the base path `/`. If the repository ever carries another name, GitHub serves it as a *project site* at `https://resende-g.github.io/<repo>/` and the workflow switches to `VITE_BASE_PATH=/<repo>/` automatically. For a custom domain, add a `CNAME` file under `public/`.

To reproduce the production build locally:

```bash
npm run build && npm run preview
```

## Design notes (provisional)

- Visual direction: translucent, layered "liquid glass" over a light-silver ground, applied with restraint: glass on the header and the section cards, the graphite bust behind them; `backdrop-filter` with a near-opaque fallback when unsupported.
- `prefers-reduced-motion` disables transitions, smooth scrolling, the bust's motion and the map animation.
- Colors are defined as tokens in `src/styles/tokens.css`.
- System font stack (SF Pro on Apple devices, Segoe UI / Inter / Roboto elsewhere).

## Verification performed

- `npm run check` (typecheck, 22 unit tests, production build) passes.
- Glass bust (headless Chromium with SwiftShader WebGL): model loads and the backdrop reports `ready`; pointer movement and scrolling turn the bust; frames are only issued while it is still settling; with `prefers-reduced-motion` it renders once and issues no frames; with WebGL disabled no canvas is created and the static image is set as the background; no console errors. Frame rate on real GPUs could not be measured in this environment.
- Headless Chromium checks (desktop 1440px and 1280px, iPhone-sized 390px, in both languages): no horizontal overflow; single `h1`; every `<img>` has `alt`; no reference to a profile photo; `rel="noopener noreferrer"` on every new-tab link; the five profile links point to the expected URLs; the Brazil map canvas has an accessible name and the simulation notice is present; the pause button works by keyboard and announces its state; the map loop issues no frames while it is off screen; with `prefers-reduced-motion` and when the 2D context is unavailable the static SVG map is rendered with its explanation.

## Known limitations and pending tasks

- **Impact figures were verified through search-engine excerpts** of the primary pages (CNJ, Brasscom) and the ConJur report, because those hosts were not reachable from the build environment; the reference year of the European (CEPEJ) figures inside the CNJ comparison is not stated in the module, and the third-party studies behind Brasscom's summary could not be read. Open the CNJ executive summary and the Brasscom report once and confirm the values in `src/content/impact/*.ts`.
- **The Brazil map has no data source by design.** Connecting it to a real feed would require a public, licensed, documented API (Kaspersky's map does not offer one) and a static-site-compatible way to fetch it; keep the simulation labelling until then.
- **Organization links:** the organization tiles are not linked because their URLs were not verified from the build environment; add a `url` field in `src/content/organizations.ts` after checking each one.
- **Dark theme:** not active; tokens are kept for a future toggle.
- **CV downloads:** no PDF is included. The bilingual CV used as the content source was not added because publication was not explicitly authorized; add approved files under `public/cv/` and reference them in `src/config/site.ts`.
- **External links:** GitHub repository links were verified. LinkedIn, ORCID, Lattes, and the CARB demo URL are taken from the CV and the project READMEs; they could not be opened from the build environment and should be checked once in a browser.
- **Open Graph in Portuguese:** OG tags are updated client-side when the language changes, but crawlers read the static English tags in `index.html`. Per-language share previews would require separate pre-rendered pages.
- **Publications:** the list is empty by design until there are published works to cite.
- **Mobile navigation:** section links scroll horizontally in the header on narrow screens; a collapsible menu was not built in this version.
- **Statue illustration:** a simplified geometric SVG; a modelled or photographed version would need a licensed source.
- **Bust performance on low-end GPUs:** transmission is the most expensive part of the material; if it proves heavy on phones, lower `transmission`/`thickness` or render the static image below a viewport width. Measured only with software rendering here.
- **Pages setup:** the GitHub Pages source must be set to "GitHub Actions" manually before the first deployment works.
- **Palette, iconography, animations:** provisional; to be refined in later iterations.
