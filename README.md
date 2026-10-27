# Gabriel Almeida Resende — Portfolio

Bilingual (English / Português-BR) professional portfolio: digital CV, technical projects, and academic presentation at the intersection of law, information security, AI evaluation, data quality, and research.

Static site, hosted for free on GitHub Pages, designed for incremental evolution.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Build | [Vite](https://vite.dev) 8 | Static output, fast dev server, trivial base-path configuration for GitHub Pages. |
| UI | React 19 + TypeScript 5.9 | Typed dictionaries and content: the compiler reports any missing translation or field. |
| Styling | Plain CSS with custom properties | No CSS framework; the glass effect is a few rules with a `@supports` fallback. |
| 3D | three.js (loaded on demand) | Renders the glass bust in the hero; the library ships in its own chunk, fetched after the page is interactive. |
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
│   ├── images/bust-static.png     # Static render of the glass bust (placeholder + no-WebGL fallback)
│   ├── models/bust.glb            # Simplified, texture-free 3D scan used by the glass bust
│   └── cv/                        # Put public CV PDFs here (see below)
├── src/
│   ├── assets/                    # Bundled images: background photo (2 sizes), brand mark (white/black)
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
│   │   └── impact/                # Data modules: justice.ts, cyber.ts (figures + sources), worldGrid.ts (generated)
│   ├── hooks/                     # useReducedMotion, useInView, useCountUp
│   ├── components/                # Header, Hero, Bust (+ bustScene.ts, three.js), Panel, Logo, Backdrop, impact/*, sections/*
│   └── styles/                    # tokens.css, base.css, glass.css, layout.css, impact.css
├── scripts/build-world-grid.mjs   # Regenerates src/content/impact/worldGrid.ts from Natural Earth land polygons
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

Names of organizations, technologies, and URLs are plain strings. Keep content aligned with verifiable sources (CV, repositories); do not add metrics, titles, or results that are not documented.

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

The site deliberately shows no photograph of the owner: identity comes from the name, the typography, the content and the glass bust. `src/content/profile.ts` has no photo field; do not add one back.

### Glass bust (`src/components/Bust.tsx`, `src/components/bustScene.ts`)

- **Model:** `public/models/bust.glb` (≈160 KB) is derived from the owner's photogrammetry scan with `scripts/optimize-bust.mjs`: the photographic texture, UVs and baked normals are dropped, positions are welded, the mesh is simplified to ~16k triangles and quantized. Normals are recomputed at load time. The original scan is not in the repository.
- **Material:** `MeshPhysicalMaterial` with transmission, thickness, IOR, attenuation color, clearcoat and an image-based environment (`RoomEnvironment` through `PMREMGenerator`), plus a key, a rim and a fill light. A soft dark disc sits behind the bust so the glass has something to refract on a transparent canvas; it reads as a faint shadow on the page.
- **Motion:** the bust turns slightly toward the pointer (hover-capable devices only, smoothed per frame) with a slow idle sway. With `prefers-reduced-motion` a single frame is rendered and nothing moves. The frame loop runs only while the bust is on screen and the tab is visible; pixel ratio is capped at 2 and the transmission pass renders at half resolution.
- **Fallback and loading:** `public/images/bust-static.png` (a render of the same scene) is shown immediately and stays when WebGL is unavailable or the model fails to load; the live canvas fades in over it once ready. three.js is imported dynamically, so it is not part of the initial bundle.
- **Cleanup:** geometry, materials, textures, the environment map and the renderer are disposed and the canvas removed on unmount; listeners and observers are detached; a load that resolves after unmount is discarded.
- To regenerate the static image, render the page in a browser with WebGL, capture the `.bust` element with a transparent background and save it at 600×690.

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

Page order (all widths): hero (name, identification, summary, links) → impact section (two data modules) → dashboard of panels.

Dashboard on desktop (≥1024px):

```
┌───────────────────┬──────────────────────────────────┐
│ Projects          │ Curriculum                       │
│ Organizations     │ (experience, education, skills)  │
├───────────────────┤                                  │
│ Recent papers     │                                  │
└───────────────────┴──────────────────────────────────┘
```

Below 1024px the panels stack in one column: projects, curriculum, papers, organizations. Areas are defined with CSS grid in `src/styles/layout.css`; the header navigation order comes from `NAV_IDS` in `src/config/site.ts`.

## Impact modules (`src/components/impact`)

Two modules sit right after the hero. Their figures live in `src/content/impact/*.ts`, each with unit, period, scope and source, and are covered by `tests/impact.test.ts`. The comments at the top of those files record how each number was verified and what could not be verified.

### Justice: Brazil and the European Union (`justice.ts`)

- Reference year **2024**, from CNJ's *Justiça em Números 2025* and its international comparison built on CEPEJ data; starting point was the ConJur report of 25 Sep 2025. Rates are **per 100 inhabitants** (part of the press coverage printed "per 100 thousand", which the arithmetic rules out: 39.4 M new cases over ~212 M inhabitants ≈ 18.5 per 100).
- Three primary indicators are charted (new cases per 100 inhabitants, pending cases per 100 inhabitants, new cases per judge); the rest (resolved cases, resolved cases per judge, judges per 100 thousand inhabitants) are in the expandable table. The 80.6 million stock is shown as an absolute national total.
- The statue is an original SVG illustration inspired by Ceschiatti's *A Justiça* (`JusticeStatue.tsx`), not a photograph.
- Bars reveal and the values count up when the chart enters the viewport; with `prefers-reduced-motion` they render complete immediately.
- A newer edition exists (*Justiça em Números 2026*, base year 2025, 75.5 million pending). The module keeps 2024 on purpose; migrate figures and sources together.

### Cyber threats (`cyber.ts`)

- **The map is a simulation.** `ThreatMap.tsx` draws a dotted world (land mask in `worldGrid.ts`) on a 2D canvas and animates synthetic arcs between a fixed list of cities, generated by a seeded PRNG in `threatSim.ts`. Nothing is fetched; no telemetry, no real-time data. The badge, the legend and the notice say so in the interface. Do not present it as monitoring.
- The animation runs only while the map is on screen, the tab is visible and the user has not paused it (button, keyboard-accessible); frames are capped at ~30/s and the pixel ratio at 2; the canvas, observers and listeners are released on unmount. With `prefers-reduced-motion`, or when a 2D context is unavailable, `StaticThreatMap.tsx` renders the same map as a static SVG with a few fixed arcs and a one-line explanation.
- Figures for **2025** (global and Brazil) come from Kaspersky's Security Bulletin 2025 press release, Securelist's "Spam and phishing in 2025" and Kaspersky Latin America's release; each tile states scope, period and what is counted. They measure different things (files detected, link clicks blocked, share of users affected, change in detections) and must not be summed or compared with each other.

### Regenerating the land mask

```bash
mkdir /tmp/geo && cd /tmp/geo && npm i world-atlas@2 topojson-client@3 d3-geo@3 && cd -
NODE_PATH=/tmp/geo/node_modules node scripts/build-world-grid.mjs > src/content/impact/worldGrid.ts
```

The packages are used only by the script and are not project dependencies. Data: Natural Earth 1:50m land (public domain) via `world-atlas`.

### Background photograph and brand mark

- `src/assets/background.jpg` (1440×810, 16:9 crop) and `background-small.jpg` (900×800, for narrow screens) are served through a `<picture>` element. The photograph itself is lightly blurred (`--backdrop-blur`, default 4px, so the Bombe rotors stay recognizable), brightened (`--backdrop-brightness`, since the files themselves are pre-darkened) and covered by a light darkening gradient (`--overlay`), all in `src/styles/tokens.css`, so the glass panels read as distinct surfaces over it. Replace both files to change the scene; keep the same names or update `src/components/Backdrop.tsx`.
- `src/assets/logo-white.png` / `logo-black.png` are the brand mark with transparent background; `public/favicon.png` and `apple-touch-icon.png` are derived from it. The mark appears in the header and in the hero.
- Profile links are icon pills in the hero (`src/components/Icons.tsx`). GitHub and ORCID paths come from simple-icons (CC0, inline SVG); the Lattes button uses the supplied mark (`src/assets/lattes-mask.png`) as a CSS mask so it takes the current color; the LinkedIn and e-mail glyphs are simplified in-house drawings. Swap any of them by editing its small component.
- The theme is dark-first because the photograph (a black-and-white picture of a Bombe codebreaking machine) is toned down in the files themselves so the glass panels stay legible over it. A light token set is kept under `:root[data-theme="light"]` in `src/styles/tokens.css` for a future toggle; it is not active.

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

- Visual direction inspired by translucent, layered "liquid glass" interfaces, applied with restraint: glass on the header, hero, and section cards only; `backdrop-filter` with a near-opaque fallback when unsupported.
- Light and dark themes follow `prefers-color-scheme`; `prefers-reduced-motion` disables transitions and smooth scrolling.
- Colors are defined as tokens in `src/styles/tokens.css` and are an initial base, not a final identity.
- System font stack (SF Pro on Apple devices, Segoe UI / Inter / Roboto elsewhere).

## Verification performed

- `npm run check` (typecheck, 23 unit tests, production build) passes.
- Glass bust (headless Chromium with SwiftShader WebGL): model loads and the canvas reports `ready`; pointer movement turns the bust; no animation frames while the hero is scrolled off screen; with `prefers-reduced-motion` the bust renders once and issues no frames; with WebGL disabled the static image remains with its alt text and no canvas is created; no console errors. Frame rate on real GPUs could not be measured in this environment.
- Headless Chromium checks (desktop 1440px and 1280px, tablet 820px, iPhone-sized 390px, in both languages): no horizontal overflow; single `h1`; every `<img>` has `alt`; no reference to a profile photo; `rel="noopener noreferrer"` on every new-tab link; the five profile links point to the expected URLs; the map canvas has an accessible name; the pause button works by keyboard and announces its state; the indicator table opens by keyboard; the animation loop issues no frames while the map is off screen; with `prefers-reduced-motion` and when `getContext('2d')` is unavailable the static SVG map is rendered with its explanation.

## Known limitations and pending tasks

- **Background image license:** the Bombe photograph was supplied by the site owner. Its source and license have not been recorded here; confirm them (and add a credit line if the license requires one) or replace it with a licensed or original image (two files under `src/assets/`).
- **Impact figures were verified through search-engine excerpts** of the primary pages (CNJ, Securelist, Kaspersky), because those hosts were not reachable from the build environment. In the justice module, 21.07 / 4.48, 37.93 / 2.58 and 2,389 / 252 rest on the ConJur report; the reference year of the European (CEPEJ) figures inside the CNJ comparison is not stated in the module. Open the CNJ executive summary and the Securelist report once and confirm the values in `src/content/impact/*.ts`.
- **The threat map has no data source by design.** Connecting it to a real feed would require a public, licensed, documented API (Kaspersky's map does not offer one) and a static-site-compatible way to fetch it; keep the simulation labelling until then.
- **Organization links:** the organization tiles are not linked because their URLs were not verified from the build environment; add a `url` field in `src/content/organizations.ts` after checking each one.
- **Light theme:** not active; the dark theme matches the background photograph.
- **CV downloads:** no PDF is included. The bilingual CV used as the content source was not added because publication was not explicitly authorized; add approved files under `public/cv/` and reference them in `src/config/site.ts`.
- **External links:** GitHub repository links were verified. LinkedIn, ORCID, Lattes, and the CARB demo URL are taken from the CV and the project READMEs; they could not be opened from the build environment and should be checked once in a browser.
- **Open Graph in Portuguese:** OG tags are updated client-side when the language changes, but crawlers read the static English tags in `index.html`. Per-language share previews would require separate pre-rendered pages.
- **Publications:** the list is empty by design until there are published works to cite.
- **Mobile navigation:** section links scroll horizontally in the header on narrow screens; a collapsible menu was not built in this version.
- **Statue illustration:** a simplified geometric SVG; a modelled or photographed version would need a licensed source.
- **Bust performance on low-end GPUs:** transmission is the most expensive part of the material; if it proves heavy on phones, lower `transmission`/`thickness` or render the static image below a viewport width. Measured only with software rendering here.
- **Pages setup:** the GitHub Pages source must be set to "GitHub Actions" manually before the first deployment works.
- **Palette, iconography, animations:** provisional; to be refined in later iterations.
