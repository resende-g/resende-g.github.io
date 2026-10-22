# Gabriel Almeida Resende — Portfolio

Bilingual (English / Português-BR) professional portfolio: digital CV, technical projects, and academic presentation at the intersection of law, information security, AI evaluation, data quality, and research.

Static site, hosted for free on GitHub Pages, designed for incremental evolution.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Build | [Vite](https://vite.dev) 8 | Static output, fast dev server, trivial base-path configuration for GitHub Pages. |
| UI | React 19 + TypeScript 5.9 | Typed dictionaries and content: the compiler reports any missing translation or field. |
| Styling | Plain CSS with custom properties | No CSS framework; the glass effect is a few rules with a `@supports` fallback. |
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
│   ├── images/                    # Put the profile photo here (see below)
│   └── cv/                        # Put public CV PDFs here (see below)
├── src/
│   ├── assets/                    # Bundled images: background photo (2 sizes), brand mark (white/black)
│   ├── main.tsx                   # Entry point
│   ├── App.tsx                    # Page composition (panel order)
│   ├── config/site.ts             # Panel ids, CV files, repository URL, base-path helper
│   ├── i18n/
│   │   ├── locales.ts             # Supported locales, default locale, `Localized` type
│   │   ├── locales/en.ts          # English UI strings (defines the dictionary shape)
│   │   ├── locales/pt-BR.ts       # Portuguese UI strings
│   │   ├── LanguageProvider.tsx   # Context, persistence, <html lang>, title/meta updates
│   │   └── index.ts               # Public i18n API
│   ├── content/                   # Professional content (no UI logic)
│   │   ├── profile.ts             # Name, tagline, summary, photo, profile links
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── education.ts           # Degrees and certifications
│   │   ├── research.ts            # Interests, groups, publications, identifiers
│   │   ├── skills.ts
│   │   ├── organizations.ts       # Employers, universities, groups (tiles)
│   │   └── contact.ts
│   ├── components/                # Header, ProfileCard, Panel, Logo, Backdrop, sections/*
│   └── styles/                    # tokens.css, base.css, glass.css, layout.css
└── tests/i18n.test.ts
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

### Profile photo

The current photo is `public/images/profile.jpg` (512×512, supplied by the site owner) and is referenced from `src/content/profile.ts` (`photo: 'images/profile.jpg'`). To replace it, overwrite the file with a square crop (at least 400×400 px); set `photo: null` to show the initials placeholder instead. If the file fails to load, the placeholder is shown automatically.

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

The page follows a dashboard wireframe (desktop, ≥1024px):

```
┌──────────────┬───────────────────┬──────────────┐
│ Recent papers│ Profile card      │ Projects     │
├──────────────┴───────────────────┤              │
│ Curriculum                       ├──────────────┤
│ (experience, education, skills)  │ Organizations│
└──────────────────────────────────┴──────────────┘
```

Below 1024px the panels stack in one column with the profile card first. Areas are defined with CSS grid in `src/styles/layout.css`; panel order in navigation comes from `PANEL_IDS` in `src/config/site.ts`.

### Background photograph and brand mark

- `src/assets/background.jpg` (1440×810, 16:9 crop) and `background-small.jpg` (900×800, for narrow screens) are served through a `<picture>` element. The photograph itself is lightly blurred (`--backdrop-blur`, default 4px, so the Bombe rotors stay recognizable), slightly brightened (`--backdrop-brightness`) and covered by a light darkening gradient (`--overlay`), all in `src/styles/tokens.css`, so the glass panels read as distinct surfaces over it. Replace both files to change the scene; keep the same names or update `src/components/Backdrop.tsx`.
- `src/assets/logo-white.png` / `logo-black.png` are the brand mark with transparent background; `public/favicon.png` and `apple-touch-icon.png` are derived from it. The mark appears in the header and in the profile card.
- Profile links are icon buttons (`src/components/Icons.tsx`). GitHub and ORCID paths come from simple-icons (CC0, inline SVG); the Lattes button uses the supplied mark (`src/assets/lattes-mask.png`) as a CSS mask so it takes the current color; the LinkedIn and e-mail glyphs are simplified in-house drawings. Swap any of them by editing its small component.
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

## Verification performed on the first version

- `npm run check` (typecheck, 11 unit tests, production build) passes.
- Headless Chromium checks (desktop 1280px and 1440px, iPhone-sized 390px with reduced motion): English by default, `<html lang>` and metadata switch to `pt-BR`, preference persisted and restored, keyboard activation of the language switch, skip link as first tab stop, single `h1`, `rel="noopener noreferrer"` on every new-tab link, no horizontal overflow on mobile, profile card first on mobile, photo placeholder horizontally centered, reading position preserved across the language switch.

## Known limitations and pending tasks

- **Background image license:** the Bombe photograph was supplied by the site owner. Its source and license have not been recorded here; confirm them (and add a credit line if the license requires one) or replace it with a licensed or original image (two files under `src/assets/`).
- **Project metrics:** the wireframe labels the right panel "Projects and metrics". No metrics are shown because none are documented; repository statistics could be added later from the GitHub API without inventing figures.
- **Organization links:** the organization tiles are not linked because their URLs were not verified from the build environment; add a `url` field in `src/content/organizations.ts` after checking each one.
- **Light theme:** not active; the dark theme matches the background photograph.
- **CV downloads:** no PDF is included. The bilingual CV used as the content source was not added because publication was not explicitly authorized; add approved files under `public/cv/` and reference them in `src/config/site.ts`.
- **External links:** GitHub repository links were verified. LinkedIn, ORCID, Lattes, and the CARB demo URL are taken from the CV and the project READMEs; they could not be opened from the build environment and should be checked once in a browser.
- **Open Graph in Portuguese:** OG tags are updated client-side when the language changes, but crawlers read the static English tags in `index.html`. Per-language share previews would require separate pre-rendered pages.
- **Publications:** the list is empty by design until there are published works to cite.
- **Mobile navigation:** section links scroll horizontally in the header on narrow screens; a collapsible menu was not built in this version.
- **Pages setup:** the GitHub Pages source must be set to "GitHub Actions" manually before the first deployment works.
- **Palette, iconography, animations:** provisional; to be refined in later iterations.
