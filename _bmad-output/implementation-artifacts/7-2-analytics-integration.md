# Story 7.2: Analytics Integration (Umami Cloud)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **center manager**,
I want **to measure site traffic and page views without requiring cookie consent**,
so that **I can track which pages convert visitors and make data-driven decisions**.

## Acceptance Criteria

1. **AC-1: Umami script in BaseLayout** — `src/layouts/BaseLayout.astro` is modified. When any page is loaded, the Umami Cloud tracking script is included in the `<head>` asynchronously.

2. **AC-2: Tracking ID from env var** — The Umami `data-website-id` attribute is populated from the environment variable `UMAMI_ID` (read via `import.meta.env.UMAMI_ID` in the frontmatter). If `UMAMI_ID` is not set, the script tag is not rendered (safe in dev/preview without prod key).

3. **AC-3: Non-blocking script** — The script tag uses the `async` attribute, ensuring zero impact on LCP or FID (NFR2, NFR3, NFR6). No render-blocking behavior.

4. **AC-4: Cookieless & RGPD-compliant** — Umami Cloud is cookieless by design. No cookie consent banner is required (NFR14). This is already documented in `politique-confidentialite.astro` (Story 7.1).

5. **AC-5: `.env.example` already documented** — `UMAMI_ID=your-umami-id` is already present in `.env.example`. No change required.

6. **AC-6: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. All existing pages are unaffected.

## Tasks / Subtasks

- [x] Task 1: Add Umami script to `src/layouts/BaseLayout.astro` (AC: #1, #2, #3)
  - [x] In the frontmatter, read `const umamiId = import.meta.env.UMAMI_ID;`
  - [x] In the `<head>`, conditionally render the script tag (see Dev Notes below for exact code)
  - [x] Verify the script renders before `</head>` and after other meta tags

- [x] Task 2: Build verification (AC: #6)
  - [x] Run `astro check` — confirm 0 errors (2 pre-existing hints in SchemaMarkup.astro acceptable)
  - [x] Run `npm run build` — confirm all pages built successfully
  - [x] Inspect build output: confirm `<script async src="https://cloud.umami.is/script.js"` appears in any generated HTML page

## Dev Notes

### Scope — What This Story Is

Story 7.2 is a **one-file change**: add 5 lines to `src/layouts/BaseLayout.astro`.

- 1 line in the frontmatter (`const umamiId = ...`)
- 4 lines in the `<head>` (conditional script tag)

No new files. No new dependencies. No Content Collections. No client-side JS islands. No components to create.

The `.env.example` already has `UMAMI_ID` documented — no change needed there.

---

### Critical Context — Codebase State After Story 7.1

**Astro version:** v5 (Content Layer API active)

**Current `BaseLayout.astro` frontmatter** (start of file):
```typescript
---
import '../styles/global.css';
import SchemaMarkup from '../components/SchemaMarkup.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import StickyContact from '../components/StickyContact.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  serviceType?: string;
  serviceDescription?: string;
  whatsappMessage?: string;
}

const {
  title,
  description,
  ogImage = '/og-default.jpg',
  ogType = 'website',
  canonicalPath: canonicalPathProp,
  serviceType,
  serviceDescription,
  whatsappMessage,
} = Astro.props;

const siteName = 'Équi 22';
const isHomepage = Astro.url.pathname === '/' || Astro.url.pathname === '';
const pageTitle = isHomepage ? 'Équi 22 — Centre Équestre Yffiniac' : `${title} | Équi 22`;
const resolvedCanonical = new URL(
  (canonicalPathProp || Astro.url.pathname).replace(/\/$/, '') || '/',
  Astro.site
).href;
const ogImageUrl = new URL(ogImage, Astro.site).href;
---
```

**Current `<head>` section** (lines 40-61 of BaseLayout.astro):
```html
<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width" />
  <meta name="generator" content={Astro.generator} />
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={resolvedCanonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:url" content={resolvedCanonical} />
  <meta property="og:type" content={ogType} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="fr_FR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
  <SchemaMarkup serviceType={serviceType} serviceDescription={serviceDescription} />
</head>
```

No Umami script currently exists — Story 7.2 is the first implementation.

**Environment variables:**
- `.env.example`: `UMAMI_ID=your-umami-id` ← already present, no change needed
- `.env` (local dev): `UMAMI_ID=test-id` ← already present, works for dev testing

---

### Task 1 — Exact Code Changes to `BaseLayout.astro`

**File:** `src/layouts/BaseLayout.astro`
**Action:** MODIFY (2 locations)

**Change 1 — Frontmatter** (add 1 line after `const ogImageUrl = ...`):

```typescript
const umamiId = import.meta.env.UMAMI_ID;
```

**Change 2 — `<head>` section** (add 4 lines before `</head>`):

```astro
{umamiId && (
  <script is:inline async src="https://cloud.umami.is/script.js" data-website-id={umamiId} />
)}
```

**Complete resulting `<head>` section after the change:**

```astro
<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width" />
  <meta name="generator" content={Astro.generator} />
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={resolvedCanonical} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:url" content={resolvedCanonical} />
  <meta property="og:type" content={ogType} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content="fr_FR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImageUrl} />
  <SchemaMarkup serviceType={serviceType} serviceDescription={serviceDescription} />
  {umamiId && (
    <script is:inline async src="https://cloud.umami.is/script.js" data-website-id={umamiId} />
  )}
</head>
```

**Why `is:inline`:** In Astro, `<script>` tags in templates are normally processed and bundled by Astro. Using `is:inline` prevents Astro from processing this external third-party script, rendering it as a raw HTML tag. This is the correct pattern for third-party tracking scripts. Dynamic expressions (`{umamiId}`) still work in HTML attributes in Astro templates even with `is:inline`.

**Why conditional `{umamiId && (...)}:`** Prevents a broken script tag if `UMAMI_ID` is undefined (e.g., missing in Cloudflare dashboard environment). Safe no-op in environments where the variable is not set.

---

### Architecture Compliance

| Rule | Status for Story 7.2 |
|---|---|
| **TypeScript strict** | `import.meta.env.UMAMI_ID` returns `string \| undefined` — conditional render handles the undefined case. No type issues. |
| **No `any`, no `@ts-ignore`** | Not applicable — no complex logic. |
| **Tailwind/daisyUI only** | Not applicable — no styling on a script tag. |
| **No client-side JS** | The Umami script itself is third-party, loaded as an async external script. No Astro islands created. `is:inline` prevents Astro island bundling. |
| **No render-blocking JS** | `async` attribute ensures the script is non-blocking (NFR6). |
| **Performance (NFR2, NFR3, NFR6)** | `async` script loads after parsing, does not block LCP, FID, or CLS. Umami script (~5KB) has negligible performance impact. |
| **RGPD-compliant** | Umami Cloud is cookieless. No consent banner required (NFR14). Already documented in `politique-confidentialite.astro`. |
| **Env var pattern** | `import.meta.env.UMAMI_ID` — consistent with how `WEB3FORMS_KEY` is accessed in `ContactForm.astro`. |
| **BaseLayout is the single entry point** | Every page uses `BaseLayout.astro`. Adding the script here ensures 100% page coverage automatically. |

---

### File Structure Requirements

**Files MODIFIED:**
```
src/layouts/BaseLayout.astro    ← +1 line frontmatter, +3 lines in <head>
```

**Files NOT to touch:**
- `.env.example` — `UMAMI_ID` already documented
- `.env` — already has `UMAMI_ID=test-id` for local dev
- All pages, components, content — no changes
- `politique-confidentialite.astro` — already mentions Umami cookieless (Story 7.1)

---

### Testing Requirements

1. **Type check:** `astro check` must pass with 0 errors. (2 pre-existing hints in SchemaMarkup.astro are acceptable.)
2. **Build success:** `npm run build` must complete. All pages must build successfully.
3. **Script presence in build output:** Inspect `dist/index.html` (or any page) — confirm the Umami script tag is present in `<head>`:
   ```html
   <script async src="https://cloud.umami.is/script.js" data-website-id="test-id"></script>
   ```
   (Using `test-id` from local `.env`)
4. **No regression:** All existing pages load correctly with navbar and footer intact.

---

### Previous Story Intelligence (Story 7.1 Learnings)

| Learning | Impact on Story 7.2 |
|---|---|
| **`astro check` AND `npm run build` both required** | Run both in Task 2. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still acceptable. Target: 0 NEW errors. |
| **Clean atomic commit** | Commit message pattern: `"Story 7-2: Analytics integration — Umami Cloud cookieless tracking"` |
| **`is:inline` for third-party scripts** | Use `is:inline` on the script tag to prevent Astro bundling of the external Umami script. |
| **Conditional rendering for env vars** | Pattern: `{envVar && (<tag />)}` — prevents broken markup when env var is missing. |
| **`import.meta.env` for env vars** | Same pattern as `WEB3FORMS_KEY` in `ContactForm.astro` — confirmed working in this project. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `81b1ea7` — Story 7-1: Legal pages — mentions légales + politique de confidentialité (2 pages created, business.ts modified)
2. `0cd76c1` — Story 6-3: Event blog articles — anniversaire poney, sortie scolaire, team-building
3. `aac980a` — Story 6-2: Launch blog articles
4. `35f9620` — Story 6-1: Blog infrastructure and article template
5. `bc92e7d` — Story 5-3: Code review fixes — contrast, bg alternation, a11y

**Pattern:** Clean atomic commits per story. Story 7.2 modifies only `BaseLayout.astro`. Target commit: `"Story 7-2: Analytics integration — Umami Cloud cookieless tracking"`.

**Note:** This is the smallest code change in the entire project — 5 lines added to one file. Very low risk. The `.env.example` was already prepared in Story 1.1 and `.env` already has a test value. The only production task is setting `UMAMI_ID` in the Cloudflare Pages dashboard with the real Umami website ID.

---

### Project Structure Notes

**Alignment with unified project structure:**
- `BaseLayout.astro` → Umami: Script tag in `<head>`, Tracking ID (env var) — matches architecture spec (architecture.md, Component Integration Map)
- Integration point: `https://cloud.umami.is/script.js` — Umami Cloud SaaS, free tier, 100K events/month (architecture.md, Additional Technology Decisions)

**No conflicts or variances detected.**

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 7.2: Analytics Integration (Umami Cloud)]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 7: Legal, Analytics & Production Readiness — NFR14]
- [Source: _bmad-output/planning-artifacts/architecture.md#Additional Technology Decisions — Umami Cloud: cookieless, RGPD-compliant]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component Integration Map — BaseLayout → Umami: Script tag in head, Tracking ID env var]
- [Source: _bmad-output/planning-artifacts/architecture.md#External Integration Points — Umami Cloud: async script in BaseLayout.astro head]
- [Source: src/layouts/BaseLayout.astro — current state (no Umami script yet)]
- [Source: .env.example — UMAMI_ID already documented]
- [Source: _bmad-output/implementation-artifacts/7-1-legal-pages.md — story learnings]
- [Source: https://cloud.umami.is/script.js — Umami Cloud tracking script URL]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — implementation was straightforward, no issues encountered.

### Completion Notes List

- Added `const umamiId = import.meta.env.UMAMI_ID;` to BaseLayout.astro frontmatter (after `ogImageUrl` line).
- Added conditional `{umamiId && (<script is:inline async ...></script>)}` block before `</head>` in BaseLayout.astro.
- Used `is:inline` directive to prevent Astro from processing this third-party external script.
- Used explicit `</script>` closing tag (HTML5 spec: `<script>` is not a void element; self-closing `/>` is invalid).
- Added `data-domains="equi22.fr"` to restrict tracking to production domain only — prevents Cloudflare preview deployments from polluting analytics data.
- `astro check`: 0 errors, 0 warnings, 2 pre-existing hints in SchemaMarkup.astro (expected).
- `npm run build`: all 15 pages built successfully, 0 regressions.
- Verified `dist/index.html` contains `<script async src="https://cloud.umami.is/script.js" data-website-id="test-id">`.
- No new dependencies. No new files. One file modified: `src/layouts/BaseLayout.astro`.

### File List

- src/layouts/BaseLayout.astro (modified)

## Change Log

- 2026-02-22: Story 7-2 implemented — Added Umami Cloud analytics script to BaseLayout.astro. Cookieless tracking active on all pages via async script tag. UMAMI_ID read from env var, conditional render prevents broken markup when var is absent.
- 2026-02-22: Code review fixes — Replaced self-closing `<script />` with explicit `<script></script>` for HTML5 validity; added `data-domains="equi22.fr"` to restrict tracking to production domain only.
