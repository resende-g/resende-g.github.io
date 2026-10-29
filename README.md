# Gabriel Almeida Resende — Portfolio

Bilingual (English / Português-BR) professional portfolio: digital CV, technical projects, and academic presentation at the intersection of law, information security, AI evaluation, data quality, and research. Frosted glass over a grainy gray photograph, with a polished graphite bust of the owner inside the hero frame; graphite text and blood-red accents.

Static site, hosted for free on GitHub Pages, designed for incremental evolution.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Build | [Vite](https://vite.dev) 8 | Static output, fast dev server, trivial base-path configuration for GitHub Pages. |
| UI | React 19 + TypeScript 5.9 | Typed dictionaries and content: the compiler reports any missing translation or field. |
| Styling | Plain CSS with custom properties | No CSS framework; the glass effect is a few rules with a `@supports` fallback. |
| 3D | three.js (loaded on demand) | Renders the graphite bust in the hero; the library ships in its own chunk, fetched after the page is interactive. |
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
│   └── cv/                        # Put public CV PDFs here (see below)
├── src/
│   ├── assets/                    # Bundled: brand mark (white/black), Lattes mask, bust.glb (3D scan), bust-fallback.webp (static render), background.webp (page background)
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
│   │   ├── contact.ts
│   │   └── impact/                # Data modules: justice.ts, cyber.ts (figures + sources), brazilOutline.ts (generated)
│   ├── hooks/                     # useReducedMotion, useInView
│   ├── components/                # Header, Hero, HeroBust (+ bustScene.ts, three.js), Panel, Logo, impact/*, sections/*
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

Append to `publications` in `src/content/research.ts` (title, venue, year, optional `url` and `identifier` such as a DOI). The Publications block appears in the Research section once the list has at least one entry; while it is empty the block is hidden.

### Presentation without a portrait

The site deliberately shows no photograph of the owner: identity comes from the name, the typography, the content and the bust. `src/content/profile.ts` has no photo field; do not add one back.

### Graphite bust in the hero (`src/components/HeroBust.tsx`, `src/components/bustScene.ts`)

- **Placement:** a transparent canvas inside the `.hero__bust` slot, within the hero's glass frame. CSS decides the slot's size and place (beside the identity text from 860px, a compact slot above it on narrower screens); the scene only fits the bust inside it, bottom-aligned so the flat cut of the scan falls in the slot's faded base (`mask-image`). The bust is never behind text: the text sits beside it on wide screens and starts below the slot, where the faded base ends, on narrow ones.
- **Model:** `src/assets/bust.glb` (≈530 KB, imported through Vite so the published URL carries a content hash and a new scan is never served from a cache of the old one) is derived from the owner's second photogrammetry scan (head and shoulders, 117k triangles) with `scripts/optimize-bust.mjs`: the photographic texture, UVs and baked normals are dropped, positions are welded, the mesh is simplified to ~53k triangles (ratio 0.45, keeping facial detail) and quantized. Normals are recomputed at load time. The original scan is not in the repository.
- **Material:** polished graphite — `MeshPhysicalMaterial` with full metalness, very low roughness and a clear coat, so the room environment (`RoomEnvironment` through `PMREMGenerator`) shows as mirror-like reflections; key, rim and fill lights; a soft shadow behind the figure separates it from the frosted frame.
- **Motion:** the bust turns slightly toward the pointer (hover-capable devices only) and a little further as the hero scrolls away. Nothing moves on its own: frames are rendered only while the bust is settling after an input, and only while the slot is on screen and the tab is visible. With `prefers-reduced-motion` a single frame is rendered. Pixel ratio is capped at 1.5.
- **Fallback:** `src/assets/bust-fallback.webp` (a transparent render of the same scene in the 1440×900 slot, ≈90 KB) fills the slot when WebGL is unavailable or the model fails to load. three.js is imported dynamically, so it is not part of the initial bundle.
- **Cleanup:** geometry, materials, textures, the environment map and the renderer are disposed and the canvas removed on unmount; listeners and observers are detached; a load that resolves after unmount is discarded.
- To regenerate the static image, open the page in a browser with WebGL at 1440×900, hide everything but `.hero__bust`, remove its mask, capture the element with a transparent background and save it as WebP (quality ≈88).

### CV downloads

1. Place PDFs approved for public release under `public/cv/`.
2. In `src/config/site.ts`, set the path per language, e.g. `en: 'cv/Gabriel_Resende_CV_EN.pdf'`.

A "Download CV" action appears in the hero, next to the other actions, for each language that has a file. Review every document before adding it: the repository and the site are public.

### Adding a language

1. Add the BCP 47 tag to `SUPPORTED_LOCALES` and `LOCALE_LABELS` in `src/i18n/locales.ts`.
2. Create `src/i18n/locales/<tag>.ts` typed as `Dictionary` and register it in `src/i18n/index.ts`.
3. Run `npm run typecheck`: it lists every `Localized` content field that still lacks the new language.
4. Add a `CV_FILES` entry (may be `null`).

## Layout

Page order (all widths): hero → curriculum → projects → research → impact section (data modules). The header navigation follows the same order (`NAV_IDS` in `src/config/site.ts`).

Header: two floating glass capsules, the brand on the left and the section links (small uppercase) with the language switch on the right. Below 768px the right capsule becomes a menu behind a toggle button (`aria-expanded`, `aria-controls`); a link, Escape (focus returns to the toggle) or a press outside the header closes it.

Hero: one large glass frame, after the reference design, that starts behind the sticky header so the header's capsules sit inside its top edge. On wide screens (≥860px) the identity text (name, roles, summary, actions, profile links, location) is on the left and the bust on the right, and the frame fills the first screen. Below 860px: a compact bust above the text. The DOM follows the reading order in both cases.

```
┌──────────────────────────┬───────────────────────┐
│ Hero frame: identity     │ Bust (3D)             │
├──────────────────────────┴───────────────────────┤
│ Curriculum: experience (role | text from 1024px), │
│ education, certifications, skills                │
├──────────────────────────────────────────────────┤
│ Projects (cards in two columns from ~1000px)     │
├──────────────────────────────────────────────────┤
│ Research: groups | interests, identifiers        │
├────────────────────────┬─────────────────────────┤
│ Justice (BR vs. EU)    │ Cybersecurity in Brazil │
└────────────────────────┴─────────────────────────┘
```

Grids are defined in `src/styles/layout.css` and `src/styles/impact.css`. Anchors land below the sticky header through `scroll-padding-top`, using the header height that `Header.tsx` measures into `--header-offset`; the hero frame uses the same value to start behind the header.

## Impact modules (`src/components/impact`)

Two short modules close the page, after Research. They give context for the CV; they are not a dashboard. Their figures live in `src/content/impact/*.ts`, each with unit, period, scope and source, and are covered by `tests/impact.test.ts`. The comments at the top of those files record how each number was verified and what could not be verified.

### Justice: Brazil and the European Union (`justice.ts`)

- Reference year **2024**, from CNJ's *Justiça em Números 2025* and its international comparison built on CEPEJ data; starting point was the ConJur report of 25 Sep 2025. Rates are **per 100 inhabitants** (the report prints "per 100 thousand", which the arithmetic rules out: 39.4 M new cases over ~212 M inhabitants ≈ 18.5 per 100).
- Two indicators are charted: new cases per 100 inhabitants and new cases per judge. The statue (`JusticeStatue.tsx`) is a geometric SVG illustration of Ceschiatti's *A Justiça* in front of the STF: its silhouette and shade planes are traced from a cut-out photograph with `scripts/trace-statue.py` (numpy + Pillow; the photograph is not in the repository), and the blindfold and sword are drawn on top.
- Bars grow when the chart enters the viewport (complete from the start with `prefers-reduced-motion`). The values are always the real figures in the DOM, so screen readers and reader modes never read a placeholder.
- A newer edition exists (*Justiça em Números 2026*, base year 2025). The module keeps 2024 on purpose; migrate figures and sources together.

### Cybersecurity in Brazil (`cyber.ts`, `BrazilMap.tsx`)

- **The map is a simulation.** `BrazilMap.tsx` draws Brazil's outline (`brazilOutline.ts`, Natural Earth 1:50m, simplified) as a glass slab on a 2D canvas and animates synthetic silver streaks "falling" onto random points inside it, generated by a seeded PRNG in `brazilMap.ts`. Nothing is fetched; no telemetry, no real-time data. The note under the map says so in the interface; keep it. Do not present it as monitoring.
- The animation is always running by default while the map is on screen and the tab is visible. A small icon-only control (28px, named "Pause animation"/"Resume animation") keeps it pausable, as WCAG 2.2.2 requires for automatic motion longer than five seconds; frames are capped at ~30/s and the pixel ratio at 2. With `prefers-reduced-motion`, or when a 2D context is unavailable, a static SVG version with a few fixed streaks is rendered with a one-line explanation.
- **Figures** come from the executive summary of Brasscom's *Relatório de Cibersegurança 2025: Panorama e Insights* (July 2025): attack attempts against Brazil in 2023, average data-breach cost in Brazil in 2024 (US dollars), projected investment 2025–2028 and the most common attack. Each tile states its period; the report compiles third-party data, and its underlying sources could not be read from the build environment.

### Regenerating the Brazil outline

```bash
mkdir /tmp/geo && cd /tmp/geo && npm i world-atlas@2 topojson-client@3 && cd -
NODE_PATH=/tmp/geo/node_modules node scripts/build-brazil-outline.mjs > src/content/impact/brazilOutline.ts
```

The packages are used only by the script and are not project dependencies. Data: Natural Earth 1:50m countries (public domain) via `world-atlas`.

### Brand mark and icons

- `src/assets/logo-white.png` / `logo-black.png` are the brand mark with transparent background. `public/favicon.png` is the black mark centered on a transparent square (256 px); `apple-touch-icon.png` keeps the white mark on a dark tile, because iOS fills transparent icons with black. The black mark appears in the header.
- Profile links are icon pills in the hero's identity card (`src/components/Icons.tsx`). GitHub and ORCID paths come from simple-icons (CC0, inline SVG); the Lattes button uses the supplied mark (`src/assets/lattes-mask.png`) as a CSS mask so it takes the current color; the LinkedIn, e-mail, pause and play glyphs are simplified in-house drawings. Swap any of them by editing its small component.
- The theme is light-first (frosted glass over a grainy gray photograph, graphite text, blood-red accent, the graphite bust in the hero frame). A dark token set is kept under `:root[data-theme="dark"]` in `src/styles/tokens.css` for a future toggle; it is not active.

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

- Visual direction: frosted glass over a grainy gray photograph (`src/assets/background.webp`, on a fixed layer), after the "Clarity Engine" reference design: one large glass frame for the hero with the header's capsules inside its top edge, then glass panels and modules. The grain outside the glass and its smooth blur inside are what make the surfaces read as glass; a bright rim, a top highlight and a corner sheen mark their edges. The graphite bust sits inside the frame and never behind text; `backdrop-filter` with a near-opaque fallback when unsupported.
- Every block of text sits on glass: the photograph runs from dark gray to near white and is never read on directly. Glass opacities in `tokens.css` are set against the darkest blurred pixel of the photograph that each surface can pass over.
- `prefers-reduced-motion` disables transitions, smooth scrolling, the bust's motion and the map animation.
- Colors are defined as tokens in `src/styles/tokens.css`.
- System font stack (SF Pro on Apple devices, Segoe UI / Inter / Roboto elsewhere).

## Verification performed

- `npm run check` (typecheck, 22 unit tests, production build) passes.
- Hero bust (headless Chromium with SwiftShader WebGL): the model loads and the slot reports `ready` at 16 viewports from 320×568 to 1920×1080, including 844×390; the bust never overlaps the identity card on wide screens; with `prefers-reduced-motion` it renders once and does not change on scroll; with WebGL disabled the static WebP fills the slot; no console errors. Frame rate on real GPUs could not be measured in this environment.
- Text contrast measured per pixel on rendered frames (text made transparent, same WebGL frame) at 320, 390 and 1440px, top to bottom, and with reduced motion: no line below 4.5:1 (3:1 for large text). Re-measured after the glass redesign at 1440×900 with the hero at the top and with the Cybersecurity module over the darkest corner of the background: lowest line 4.86:1 (hero lowest 6.2:1); the worst case for every surface is also computed from the darkest blurred pixel of the background (comments in `tokens.css`).
- Header after the glass redesign: capsules align (40 px wide screens, 44 px narrow); the menu opens and closes by its toggle, a link, Escape (focus back on the toggle) and a press outside the header, and anchors land below the header; no horizontal overflow at 320, 390, 768, 1024 and 1440px in both languages.
- Headless Chromium checks (desktop 1440px and 1280px, iPhone-sized 390px, in both languages): no horizontal overflow; single `h1`; every `<img>` has `alt`; no reference to a profile photo; `rel="noopener noreferrer"` on every new-tab link; the five profile links point to the expected URLs; the Brazil map canvas has an accessible name and the simulation notice is present; the pause button works by keyboard and announces its state; the map loop issues no frames while it is off screen; with `prefers-reduced-motion` and when the 2D context is unavailable the static SVG map is rendered with its explanation.

## Known limitations and pending tasks

- **Impact figures were verified through search-engine excerpts** of the primary pages (CNJ, Brasscom) and the ConJur report, because those hosts were not reachable from the build environment; the reference year of the European (CEPEJ) figures inside the CNJ comparison is not stated in the module, and the third-party studies behind Brasscom's summary could not be read. Open the CNJ executive summary and the Brasscom report once and confirm the values in `src/content/impact/*.ts`.
- **The Brazil map has no data source by design.** Connecting it to a real feed would require a public, licensed, documented API (Kaspersky's map does not offer one) and a static-site-compatible way to fetch it; keep the simulation labelling until then.
- **Dark theme:** not active; tokens are kept for a future toggle.
- **CV downloads:** no PDF is included. The bilingual CV used as the content source was not added because publication was not explicitly authorized; add approved files under `public/cv/` and reference them in `src/config/site.ts`.
- **External links:** GitHub repository links were verified. LinkedIn, ORCID, Lattes, and the CARB demo URL are taken from the CV and the project READMEs; they could not be opened from the build environment and should be checked once in a browser.
- **Open Graph in Portuguese:** OG tags are updated client-side when the language changes, but crawlers read the static English tags in `index.html`. Per-language share previews would require separate pre-rendered pages.
- **Publications:** the list is empty by design until there are published works to cite; the block stays hidden until then.
- **Favicon on dark browser themes:** the black mark on a transparent background has little contrast on dark tab strips.
- **Statue illustration:** a simplified geometric SVG; a modelled or photographed version would need a licensed source.
- **Bust performance on low-end GPUs:** the clear-coated metallic material is the most expensive part; the canvas is now limited to the hero slot and renders only while on screen, but if it still proves heavy on phones, render the static image below a viewport width. Measured only with software rendering here.
- **Pages setup:** the GitHub Pages source must be set to "GitHub Actions" manually before the first deployment works.
- **Palette, iconography, animations:** provisional; to be refined in later iterations.
