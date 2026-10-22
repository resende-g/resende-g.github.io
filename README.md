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
│   ├── favicon.svg                # Provisional "GR" monogram
│   ├── images/                    # Put the profile photo here (see below)
│   └── cv/                        # Put public CV PDFs here (see below)
├── src/
│   ├── main.tsx                   # Entry point
│   ├── App.tsx                    # Page composition (section order)
│   ├── config/site.ts             # Section ids, CV files, repository URL, base-path helper
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
│   │   └── contact.ts
│   ├── components/                # UI components (Header, Hero, Section, sections/*)
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

1. Place an authorized photo of the site owner at `public/images/profile.jpg` (a square crop of at least 400×400 px is recommended; keep the original aspect ratio and avoid heavy filters).
2. In `src/content/profile.ts`, set `photo: 'images/profile.jpg'`.

Until then, a centered placeholder with initials is shown. If the file is missing or fails to load, the placeholder is shown automatically.

### CV downloads

1. Place PDFs approved for public release under `public/cv/`.
2. In `src/config/site.ts`, set the path per language, e.g. `en: 'cv/Gabriel_Resende_CV_EN.pdf'`.

A "Download CV" button appears for each language that has a file. Review every document before adding it: the repository and the site are public.

### Adding a language

1. Add the BCP 47 tag to `SUPPORTED_LOCALES` and `LOCALE_LABELS` in `src/i18n/locales.ts`.
2. Create `src/i18n/locales/<tag>.ts` typed as `Dictionary` and register it in `src/i18n/index.ts`.
3. Run `npm run typecheck`: it lists every `Localized` content field that still lacks the new language.
4. Add a `CV_FILES` entry (may be `null`).

## Language behavior

- English is always the initial render. A previously chosen language is restored right after mount from `localStorage` (`portfolio.locale`). No geolocation is used.
- Switching updates `<html lang>`, the document title, the meta description, and Open Graph tags without reloading. The reading position is preserved.
- The switch is a button group with `aria-pressed` and accessible names, operable by keyboard.

## Publishing on GitHub Pages (free)

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main` (and on manual dispatch).

One-time setup, done manually in the repository settings:

1. **Settings → Pages → Build and deployment → Source:** select **GitHub Actions**.
2. Merge (or push) this code to `main`. The "Deploy to GitHub Pages" workflow runs and publishes `dist/`.

### Base path

This repository is named `resende.github.io` under the account `resende-g`. GitHub treats a repository as a *user site* only when it is named exactly `<account>.github.io` (here, that would be `resende-g.github.io`). As it stands, GitHub Pages serves this repository as a *project site* at:

```
https://resende-g.github.io/resende.github.io/
```

The workflow detects this and builds with `VITE_BASE_PATH=/resende.github.io/`. If the repository is renamed to `resende-g.github.io`, the site moves to `https://resende-g.github.io/` and the workflow automatically switches the base path to `/`. For a custom domain, add a `CNAME` file under `public/` and set `VITE_BASE_PATH=/`.

To reproduce the production build locally:

```bash
VITE_BASE_PATH=/resende.github.io/ npm run build && npm run preview
```

## Design notes (provisional)

- Visual direction inspired by translucent, layered "liquid glass" interfaces, applied with restraint: glass on the header, hero, and section cards only; `backdrop-filter` with a near-opaque fallback when unsupported.
- Light and dark themes follow `prefers-color-scheme`; `prefers-reduced-motion` disables transitions and smooth scrolling.
- Colors are defined as tokens in `src/styles/tokens.css` and are an initial base, not a final identity.
- System font stack (SF Pro on Apple devices, Segoe UI / Inter / Roboto elsewhere).

## Verification performed on the first version

- `npm run check` (typecheck, 11 unit tests, production build) passes.
- Headless Chromium checks (desktop 1280px light/dark, iPhone-sized 390px with reduced motion): English by default, `<html lang>` and metadata switch to `pt-BR`, preference persisted and restored, keyboard activation of the language switch, skip link as first tab stop, single `h1`, `rel="noopener noreferrer"` on every new-tab link, no horizontal overflow on mobile, photo placeholder horizontally centered, reading position preserved across the language switch.

## Known limitations and pending tasks

- **Profile photo:** no authorized photo exists in the repository; the placeholder is shown. Add one as described above.
- **CV downloads:** no PDF is included. The bilingual CV used as the content source was not added because publication was not explicitly authorized; add approved files under `public/cv/` and reference them in `src/config/site.ts`.
- **External links:** GitHub repository links were verified. LinkedIn, ORCID, Lattes, and the CARB demo URL are taken from the CV and the project READMEs; they could not be opened from the build environment and should be checked once in a browser.
- **Open Graph in Portuguese:** OG tags are updated client-side when the language changes, but crawlers read the static English tags in `index.html`. Per-language share previews would require separate pre-rendered pages.
- **Publications:** the list is empty by design until there are published works to cite.
- **Mobile navigation:** section links scroll horizontally in the header on narrow screens; a collapsible menu was not built in this version.
- **Pages setup:** the GitHub Pages source must be set to "GitHub Actions" manually before the first deployment works.
- **Palette, iconography, animations:** provisional; to be refined in later iterations.
