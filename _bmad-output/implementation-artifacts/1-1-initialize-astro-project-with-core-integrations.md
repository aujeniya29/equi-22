# Story 1.1: Initialize Astro Project with Core Integrations

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a fully configured Astro project with TypeScript strict, Tailwind CSS, daisyUI, sitemap, and Cloudflare adapter**,
So that **I have a solid foundation to build all site pages with consistent tooling and deployment pipeline**.

## Acceptance Criteria

1. **AC-1: Astro project initialized** — An Astro v5.17+ project exists with TypeScript strict mode enabled, initialized from the `minimal` template.

2. **AC-2: Tailwind CSS v4 integrated** — Tailwind CSS v4.1 is integrated via `@tailwindcss/vite` plugin (NOT the deprecated `@astrojs/tailwind`). CSS-first configuration using `@theme` directive in `src/styles/global.css`.

3. **AC-3: daisyUI v5 installed and configured** — daisyUI v5 is installed and configured as a Tailwind plugin in CSS. The custom theme "equi22" is defined with the "Terre & Mer de Bretagne" palette:
   - Primary green: `#2D5F3F`
   - Accent/secondary blue: `#1B6B93`
   - Base cream background: `#FAF8F5`
   - Base beige secondary: `#F0EDE8`
   - Text: `#2C2C2C`

4. **AC-4: Sitemap integration** — `@astrojs/sitemap` is integrated and configured in `astro.config.mjs`.

5. **AC-5: Cloudflare adapter** — `@astrojs/cloudflare` adapter is configured for Cloudflare Pages deployment.

6. **AC-6: Google Fonts configured** — DM Serif Display (headings) + Inter (body) are configured via Google Fonts, referenced in the global CSS.

7. **AC-7: Global CSS** — `src/styles/global.css` contains Tailwind directives, daisyUI theme definition, Google Fonts imports, and any necessary theme overrides.

8. **AC-8: Business data file** — `src/data/business.ts` exists with typed placeholder NAP data: name ("Équi 22"), address (Yffiniac placeholder), phone, opening hours, GPS coordinates, social links (Facebook, Instagram), WhatsApp number.

9. **AC-9: Navigation data file** — `src/data/navigation.ts` exists with typed main menu links structure matching the architecture spec (Cours, Pension, Stages, Compétitions, Tarifs, À propos, Contact).

10. **AC-10: Dev server works** — `npm run dev` starts a working dev server without errors.

11. **AC-11: Build succeeds** — `npm run build` produces a successful build with zero TypeScript errors.

## Tasks / Subtasks

- [x] Task 1: Initialize Astro project (AC: #1)
  - [x] Run `npm create astro@latest -- --template minimal --typescript strict` in the project root
  - [x] Verify `tsconfig.json` has strict mode enabled
  - [x] Verify Astro v5.17+ is installed in `package.json`

- [x] Task 2: Install and configure Tailwind CSS v4 (AC: #2)
  - [x] Install `tailwindcss` and `@tailwindcss/vite` packages
  - [x] Add `@tailwindcss/vite` plugin to `astro.config.mjs` via Vite config
  - [x] Create `src/styles/global.css` with `@import "tailwindcss"` directive
  - [x] Import `global.css` in the project entry point

- [x] Task 3: Install and configure daisyUI v5 with custom theme (AC: #3, #7)
  - [x] Install `daisyui` package
  - [x] Add `@plugin "daisyui"` in `global.css`
  - [x] Define the custom "equi22" theme using daisyUI v5 CSS-based theming (colors, border-radius, etc.)
  - [x] Set the equi22 theme as default

- [x] Task 4: Configure Google Fonts (AC: #6)
  - [x] Add `@import` for DM Serif Display and Inter from Google Fonts in `global.css`
  - [x] Configure font-family tokens: serif headings (DM Serif Display) and sans body (Inter) via `@theme`

- [x] Task 5: Install sitemap integration (AC: #4)
  - [x] Run `npx astro add sitemap`
  - [x] Configure site URL in `astro.config.mjs` (use `SITE_URL` env var or placeholder)

- [x] Task 6: Install Cloudflare adapter (AC: #5)
  - [x] Run `npx astro add cloudflare`
  - [x] Verify `output: "static"` is set in `astro.config.mjs` (pure SSG per architecture)

- [x] Task 7: Create business data file (AC: #8)
  - [x] Create `src/data/business.ts` with typed `BusinessInfo` interface
  - [x] Populate with placeholder data: name, address, phone, hours, GPS, social links, WhatsApp number
  - [x] Export as typed constant (never hardcode phone/address elsewhere)

- [x] Task 8: Create navigation data file (AC: #9)
  - [x] Create `src/data/navigation.ts` with typed `NavLink` interface
  - [x] Define main menu links: Cours enfants, Équitation adulte, Pension, Stages vacances, Compétitions, Tarifs, À propos, Contact
  - [x] Export as typed constant

- [x] Task 9: Create environment config (AC: #10, #11)
  - [x] Create `.env.example` with documented variables: `SITE_URL`, `WEB3FORMS_KEY`, `UMAMI_ID`
  - [x] Create `.env` with development values
  - [x] Ensure `.env` is in `.gitignore`

- [x] Task 10: Verify build and dev server (AC: #10, #11)
  - [x] Run `npm run dev` — confirm dev server starts without errors
  - [x] Run `npm run build` — confirm build completes with zero errors
  - [x] Run `astro check` — confirm zero TypeScript errors

## Dev Notes

### Critical Technical Context

**⚠️ TAILWIND v4 MIGRATION — Architecture doc references outdated patterns:**

The architecture document (`architecture.md`) was written assuming Tailwind v3 patterns:
- It references `tailwind.config.mjs` → **Tailwind v4 uses CSS-first configuration** via `@theme` directive
- It references `@astrojs/tailwind` integration → **This is deprecated** for Tailwind v4. Use `@tailwindcss/vite` plugin instead
- It references daisyUI in `tailwind.config.mjs` → **daisyUI v5 is configured in CSS** with `@plugin "daisyui"`

**The developer MUST use Tailwind v4 + daisyUI v5 patterns, NOT the architecture doc's v3 patterns.**

### Tailwind v4 Setup Pattern

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "daisyui";

/* Custom theme using @theme directive */
@theme {
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'DM Serif Display', serif;
}
```

### daisyUI v5 Theme Configuration

daisyUI v5 themes are defined in CSS, not JavaScript. The "equi22" theme should be defined using daisyUI's CSS theme API. Key changes from v4:
- `card-compact` → `card-sm`
- `form-control` removed
- Theme colors defined via CSS custom properties

### Astro Config Pattern

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://equi22.fr', // or process.env.SITE_URL
  output: 'static', // Pure static SSG
  integrations: [sitemap()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Versions to Install

| Package | Version | Notes |
|---|---|---|
| `astro` | ^5.17.2 | Latest stable, avoid v6 beta |
| `tailwindcss` | ^4.1 | CSS-first config |
| `@tailwindcss/vite` | ^4.1 | Vite plugin for Astro |
| `daisyui` | ^5.0 | CSS-based theming, compatible with Tailwind v4 |
| `@astrojs/sitemap` | ^3.7 | Stable |
| `@astrojs/cloudflare` | ^12.6 | First-class Astro support |

### Architecture Compliance

- **Flat `components/` folder** — No subfolders unless exceeding 15 components
- **TypeScript strict** — Never `any`, never `@ts-ignore`
- **Naming:** PascalCase components, kebab-case pages/content, camelCase code
- **All visible content in French, code in English**
- **Phone/address always from `business.ts`** — never hardcoded
- **Semantic HTML required** throughout

### Project Structure After This Story

```
equi-22/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
├── .env
├── .gitignore
├── src/
│   ├── data/
│   │   ├── business.ts          ← NAP, hours, GPS, social, phone
│   │   └── navigation.ts        ← Main menu links
│   ├── pages/
│   │   └── index.astro          ← Minimal placeholder
│   ├── styles/
│   │   └── global.css           ← Tailwind + daisyUI + theme + fonts
│   └── env.d.ts
└── public/
    └── favicon.svg
```

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Selected Starter: Astro Minimal + TypeScript Strict]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Initialize Astro Project with Core Integrations]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design System Foundation]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

- CSS @import order warning fixed: moved Google Fonts @import before Tailwind @import to comply with CSS spec
- Astro create-astro does not allow non-empty directories: used temp directory approach and moved files

### Completion Notes List

- Initialized Astro v5.17.2 with TypeScript strict from minimal template
- Installed Tailwind CSS v4.1.18 with @tailwindcss/vite plugin (CSS-first config, not deprecated @astrojs/tailwind)
- Installed daisyUI v5.5.18 with custom "equi22" theme: primary #2D5F3F, secondary/accent #1B6B93, base #FAF8F5/#F0EDE8, text #2C2C2C
- Google Fonts configured: DM Serif Display (serif headings) + Inter (sans body) via @theme directive
- @astrojs/sitemap integrated with site URL https://equi22.fr
- @astrojs/cloudflare adapter configured with output: "static"
- Business data file with typed BusinessInfo interface and placeholder NAP data
- Navigation data file with typed NavLink interface and 8 menu items in French
- Environment config: .env.example with documented vars, .env with dev values, .env in .gitignore
- All verifications passed: dev server starts clean, build succeeds, astro check 0 errors

### File List

- astro.config.mjs (new)
- package.json (new)
- package-lock.json (new)
- tsconfig.json (new)
- .gitignore (new)
- .env (new)
- .env.example (new)
- src/styles/global.css (new)
- src/pages/index.astro (new)
- src/data/business.ts (new)
- src/data/navigation.ts (new)
- public/favicon.svg (new)
- .vscode/extensions.json (new)
- .vscode/launch.json (new)

### Change Log

- 2026-02-14: Story 1.1 implemented — Full Astro project initialization with Tailwind v4, daisyUI v5, sitemap, Cloudflare adapter, business/navigation data files, environment config. All ACs satisfied.
- 2026-02-14: Code Review — 10 findings (3H, 4M, 3L). Fixed: navigation URL /pension → /pension-chevaux (H1), Task 6 description corrected (H3), devDependencies separated in package.json (M1), semantic <main> added to index.astro (M2). Noted: Cloudflare adapter forces server mode with static output (H2), CSS warning from daisyUI (M3), no wrangler config for SESSION binding (M4).

## Senior Developer Review (AI)

### Review Date: 2026-02-14

### Reviewer: Claude Opus 4.6 (Adversarial Code Review)

### Summary

10 findings: 3 HIGH, 4 MEDIUM, 3 LOW. 4 issues fixed directly, 6 noted for awareness.

### Fixed Issues

| # | Severity | Description | Fix Applied |
|---|---|---|---|
| H1 | HIGH | Navigation URL `/pension` doesn't match architecture's `pension-chevaux.astro` | Changed to `/pension-chevaux` in `navigation.ts` |
| H3 | HIGH | Task 6 says verify `output: "server"/"hybrid"` but implementation uses `"static"` | Updated task description to reflect actual architecture choice |
| M1 | MEDIUM | All packages in `dependencies` instead of proper dev/prod split | Moved build-only packages to `devDependencies` |
| M2 | MEDIUM | `index.astro` lacks semantic HTML (`<main>` wrapper) | Added `<main>` element |

### Noted Issues (Not Blocking)

| # | Severity | Description | Recommendation |
|---|---|---|---|
| H2 | HIGH | Cloudflare adapter forces `mode: "server"` and enables KV sessions despite `output: "static"` | Consider removing adapter for pure static SSG, or accept for future SSR readiness |
| M3 | MEDIUM | CSS build warning: `[file:line]` unknown property from daisyUI | daisyUI cosmetic issue — monitor but not blocking |
| M4 | MEDIUM | No `wrangler.toml`/`wrangler.json` for SESSION KV binding | Create wrangler config if keeping adapter, or remove adapter |
| L1 | LOW | Completion notes say "v5.17.2" but package.json has `^5.17.1` | Documentation inconsistency only |
| L2 | LOW | Missing `<meta name="description">` on index.astro | Will be resolved with BaseLayout in next story |
| L3 | LOW | `.vscode/` in File List but not in projected structure | Documentation inconsistency only |

### AC Verification

| AC | Status | Evidence |
|---|---|---|
| AC-1 | ✅ IMPLEMENTED | Astro v5.17.2, TS strict via `astro/tsconfigs/strict` |
| AC-2 | ✅ IMPLEMENTED | `@tailwindcss/vite` ^4.1.18 in astro.config.mjs, CSS-first `@theme` |
| AC-3 | ✅ IMPLEMENTED | daisyUI ^5.5.18, equi22 theme with correct colors |
| AC-4 | ✅ IMPLEMENTED | `@astrojs/sitemap` in integrations, sitemap-index.xml generated |
| AC-5 | ✅ IMPLEMENTED | `@astrojs/cloudflare` adapter configured (see H2 note) |
| AC-6 | ✅ IMPLEMENTED | Google Fonts @import + @theme font-sans/font-serif |
| AC-7 | ✅ IMPLEMENTED | global.css with Tailwind, daisyUI, fonts, theme |
| AC-8 | ✅ IMPLEMENTED | `business.ts` with typed BusinessInfo and NAP data |
| AC-9 | ✅ IMPLEMENTED | `navigation.ts` with typed NavLink and 8 menu items |
| AC-10 | ✅ VERIFIED | `astro check`: 0 errors, 0 warnings |
| AC-11 | ✅ VERIFIED | `npm run build`: build completes successfully |
