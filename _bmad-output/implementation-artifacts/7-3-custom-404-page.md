# Story 7.3: Custom 404 Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor who lands on a broken or non-existent URL**,
I want **a warm, helpful 404 page that guides me back to useful content**,
so that **I never feel lost and always have a clear path forward**.

## Acceptance Criteria

1. **AC-1: Custom 404.astro page** — `src/pages/404.astro` is created. When a visitor navigates to any non-existent URL, the custom page is served (not the browser/host default).

2. **AC-2: Warm French message** — The page displays a warm, non-technical message in French. "Error 404" wording is forbidden. Example: "Oups, ce chemin ne mène nulle part ! Mais on peut vous aider :".

3. **AC-3: Popular page suggestions** — The page includes navigation links to at least 4 popular service pages: cours enfants (`/cours-enfants`), équitation adulte (`/equitation-adulte`), pension chevaux (`/pension-chevaux`), tarifs (`/tarifs`).

4. **AC-4: StickyContact bar visible** — The sticky phone + WhatsApp bar is visible at the bottom (automatic via `BaseLayout.astro` including `StickyContact.astro`). No extra work needed — just use `BaseLayout`.

5. **AC-5: BaseLayout with navbar and footer** — The page uses `BaseLayout.astro` with appropriate `title` and `description` props. Navbar and footer are present as a result.

6. **AC-6: Tone is reassuring, never technical** — No "404", "Error", "Page not found" (English), "not found" in heading. Content is entirely in French and warm in tone.

7. **AC-7: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. All existing 15+ pages are unaffected.

## Tasks / Subtasks

- [x] Task 1: Create `src/pages/404.astro` (AC: #1, #2, #3, #4, #5, #6)
  - [x] Import `BaseLayout.astro`
  - [x] Write the warm French heading and sub-message
  - [x] Add 4 navigation card links to popular pages
  - [x] Add secondary CTAs: "Retour à l'accueil" (primary) + "Nous contacter" link to /contact (phone/WhatsApp delegated to StickyContact inherited from BaseLayout)
  - [x] Use semantic HTML (`<main>`, `<section>`) and Tailwind/daisyUI classes only
  - [x] Verify sticky contact bar appears (automatic via BaseLayout)

- [x] Task 2: Build verification (AC: #7)
  - [x] Run `astro check` — confirm 0 errors
  - [x] Run `npm run build` — confirm all pages built successfully (expect 16 pages now)
  - [x] Verify 404 page is in `dist/404.html`
  - [x] No regression on existing pages

## Dev Notes

### Scope — What This Story Is

Story 7.3 is a **single new file**: `src/pages/404.astro`.

- No new components needed
- No new dependencies
- No Content Collections involved
- No client-side JavaScript (no islands)
- StickyContact bar is automatic — BaseLayout includes it on every page

---

### Critical Context — Codebase State After Story 7.2

**Astro version:** v5 (Content Layer API active)

**Pages currently existing** (`src/pages/`):
```
index.astro
cours-enfants.astro
equitation-adulte.astro
pension-chevaux.astro
stages-vacances.astro
competitions.astro
tarifs.astro
a-propos.astro
contact.astro
mentions-legales.astro
politique-confidentialite.astro
blog/index.astro
blog/[...slug].astro
```
— **No `404.astro` exists yet.** Story 7.3 creates it.

**`BaseLayout.astro` current state (after Story 7.2):**

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
// ...
---
```

`StickyContact.astro` is rendered inside `BaseLayout` on every page — the 404 page inherits it automatically by using `BaseLayout`. No `whatsappMessage` prop needed for the 404 page; `StickyContact.astro` will use its default generic message.

---

### Astro 404 Page Behavior

In Astro with Cloudflare Pages adapter:
- `src/pages/404.astro` is the standard file-based route for the 404 page
- Astro generates `dist/404.html` at build time
- Cloudflare Pages automatically serves `404.html` for unmatched routes — no extra config needed
- **No special frontmatter or export is required** — just a normal `.astro` page at this path

---

### Task 1 — Complete `src/pages/404.astro`

**Exact file to create:** `src/pages/404.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page introuvable — Équi 22"
  description="Cette page n'existe pas ou a été déplacée. Revenez à l'accueil ou explorez nos services d'équitation."
>
  <main class="min-h-screen flex items-center justify-center bg-base-100 py-24 px-4">
    <div class="max-w-2xl w-full text-center">

      <p class="text-6xl mb-4" aria-hidden="true">🐴</p>

      <h1 class="text-3xl md:text-4xl font-serif text-base-content mb-4">
        Oups, ce chemin ne mène nulle part !
      </h1>
      <p class="text-base-content/70 text-lg mb-10">
        La page que vous cherchez a peut-être été déplacée ou n'existe plus.<br class="hidden sm:inline" />
        Mais on peut vous aider à trouver ce qu'il vous faut :
      </p>

      <nav aria-label="Pages populaires" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <a
          href="/cours-enfants"
          class="card bg-base-200 hover:bg-base-300 transition-colors border border-base-300 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
        >
          <p class="font-serif text-lg text-base-content mb-1">Cours enfants</p>
          <p class="text-base-content/60 text-sm">Baby poney, enfants, ados — tous niveaux</p>
        </a>

        <a
          href="/equitation-adulte"
          class="card bg-base-200 hover:bg-base-300 transition-colors border border-base-300 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
        >
          <p class="font-serif text-lg text-base-content mb-1">Équitation adulte</p>
          <p class="text-base-content/60 text-sm">Débutants bienvenus, à votre rythme</p>
        </a>

        <a
          href="/pension-chevaux"
          class="card bg-base-200 hover:bg-base-300 transition-colors border border-base-300 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
        >
          <p class="font-serif text-lg text-base-content mb-1">Pension chevaux</p>
          <p class="text-base-content/60 text-sm">Box, paddock, prairie — bien-être animal</p>
        </a>

        <a
          href="/tarifs"
          class="card bg-base-200 hover:bg-base-300 transition-colors border border-base-300 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
        >
          <p class="font-serif text-lg text-base-content mb-1">Nos tarifs</p>
          <p class="text-base-content/60 text-sm">Toutes les formules, transparentes</p>
        </a>
      </nav>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/" class="btn btn-primary btn-wide">
          Retour à l'accueil
        </a>
        <a href="/contact" class="btn btn-outline btn-wide">
          Nous contacter
        </a>
      </div>

    </div>
  </main>
</BaseLayout>
```

**Why emoji instead of image:** No relevant image asset exists for a 404 page. An emoji `🐴` is accessible (marked `aria-hidden`), warm, on-brand, and avoids CLS (no image loading). This is consistent with the UX spec's "warm messages with alternative actions" pattern for error/empty states.

**Why `<nav aria-label="Pages populaires">`:** The suggestion links form a navigation landmark — wrapping them in `<nav>` with a descriptive label is the correct semantic pattern (FR31, WCAG 2.1).

**Why no `whatsappMessage` prop:** `StickyContact.astro` already has a default generic WhatsApp message. The 404 page has no service context, so no override is needed.

---

### Architecture Compliance

| Rule | Status for Story 7.3 |
|---|---|
| **TypeScript strict** | No TypeScript in this file — frontmatter is import-only, no complex logic. `astro check` will still validate. |
| **No `any`, no `@ts-ignore`** | Not applicable. |
| **Tailwind/daisyUI only** | All styling via Tailwind utility classes + daisyUI (`card`, `btn`, `btn-primary`, `btn-outline`). No `<style>` block. |
| **No client-side JS** | No islands, no `<script>` tags. Pure static HTML. |
| **Semantic HTML** | `<main>`, `<nav aria-label>`, `<h1>`, `<p>` — correct structure. |
| **Visible content in French** | All text in French. No English user-facing text. |
| **No `<img>` tags** | Uses emoji only — no images needed. |
| **44px tap targets** | Buttons use `btn btn-wide` (daisyUI default ≥ 48px height). Card links have `p-5` padding providing generous touch targets. |
| **Focus indicators** | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary` on all interactive elements. |
| **BaseLayout** | Used — navbar, footer, StickyContact, SchemaMarkup all included automatically. |
| **No `data-domains` needed on 404** | Umami script in BaseLayout already has `data-domains="equi22.fr"` — covers the 404 page too. |

---

### File Structure Requirements

**Files CREATED:**
```
src/pages/404.astro    ← New file (single task)
```

**Files NOT to touch:**
- `src/layouts/BaseLayout.astro` — no changes needed
- `src/components/StickyContact.astro` — no changes needed
- All existing pages, components, content — no changes

---

### Testing Requirements

1. **Type check:** `astro check` must pass with 0 errors. (2 pre-existing hints in SchemaMarkup.astro are acceptable.)
2. **Build success:** `npm run build` must complete. All pages must build — expect 1 more page than before (dist/404.html).
3. **404.html presence:** Verify `dist/404.html` exists after build.
4. **Content check:** Open `dist/404.html` and confirm:
   - No "Error 404" or "not found" text
   - French heading present (e.g., "Oups, ce chemin ne mène nulle part")
   - Links to `/cours-enfants`, `/equitation-adulte`, `/pension-chevaux`, `/tarifs` present
   - Navbar and footer markup present (from BaseLayout)
   - StickyContact markup present (from BaseLayout)
5. **No regression:** All existing pages unaffected.

---

### Previous Story Intelligence (Story 7.2 Learnings)

| Learning | Impact on Story 7.3 |
|---|---|
| **`astro check` AND `npm run build` both required** | Run both in Task 2. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still acceptable. Target: 0 NEW errors. |
| **Clean atomic commit** | Commit message pattern: `"Story 7-3: Custom 404 page — warm French 404 with service navigation"` |
| **`is:inline` for third-party scripts** | Not applicable — no external scripts in this story. |
| **`import.meta.env` for env vars** | Not applicable — no env vars needed. |
| **BaseLayout includes StickyContact automatically** | Confirmed — no extra work needed for sticky bar on 404 page. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `c70f7b7` — Story 7-2: Analytics integration — Umami Cloud cookieless tracking (1 file modified: BaseLayout.astro)
2. `81b1ea7` — Story 7-1: Legal pages — mentions légales + politique de confidentialité (2 new pages + business.ts)
3. `0cd76c1` — Story 6-3: Event blog articles
4. `aac980a` — Story 6-2: Launch blog articles
5. `35f9620` — Story 6-1: Blog infrastructure and article template

**Pattern:** Clean atomic commits per story. Story 7.3 creates only `src/pages/404.astro`. Very low risk.

**Commit target:** `"Story 7-3: Custom 404 page — warm French 404 with service navigation"`

---

### Project Structure Notes

**Alignment with unified project structure:**
- `src/pages/404.astro` — explicitly listed in `architecture.md` project structure as `404.astro ← Warm 404 page`
- Pattern specified: `404` page uses warm tone, links to popular services, sticky contact (architecture.md § Process Patterns — Error Pages & Recovery)
- UX Design Spec: "404 page: warm tone, suggestions to popular pages + contact" (epics.md § Additional Requirements — From UX Design)

**No conflicts or variances detected.**

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 7.3: Custom 404 Page]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 7: Legal, Analytics & Production Readiness]
- [Source: _bmad-output/planning-artifacts/epics.md#Additional Requirements — From UX Design — 404 page: warm tone]
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns — Error Pages & Recovery]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — src/pages/404.astro]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — ALL agents MUST rules]
- [Source: _bmad-output/implementation-artifacts/7-2-analytics-integration.md — story learnings and codebase state]
- [Source: src/pages/mentions-legales.astro — reference for BaseLayout usage pattern]

## Dev Agent Record

### Agent Model Used

claude-opus-4-6

### Debug Log References

None — clean implementation with no issues.

### Completion Notes List

- Created `src/pages/404.astro` with warm French 404 page using BaseLayout
- Used `<section>` instead of `<main>` in page content to avoid nested `<main>` tags (BaseLayout already wraps slot in `<main>`)
- Emoji 🐴 with `aria-hidden="true"` for decorative warmth
- 4 navigation cards: cours enfants, équitation adulte, pension chevaux, tarifs
- 2 CTA buttons: "Retour à l'accueil" (primary) + "Nous contacter" (outline) — phone/WhatsApp delegated to StickyContact
- Semantic HTML: `<section aria-labelledby="heading-404">`, `<h1 id="heading-404">`, `<nav aria-label>`, focus-visible indicators on all links
- No forbidden text ("Error 404", "not found", English) — verified in dist/404.html
- `astro check`: 0 errors, 0 warnings, 2 pre-existing hints (SchemaMarkup.astro)
- `npm run build`: success, dist/404.html generated (25KB with full layout)
- StickyContact bar inherited automatically via BaseLayout — no extra work needed
- **[Code Review fixes]** `title` prop corrected to `"Page introuvable"` (was `"Page introuvable — Équi 22"`, causing brand name duplication in `<title>` tag)
- **[Code Review fixes]** Added `noindex={true}` prop + `noindex?: boolean` in BaseLayout to inject `<meta name="robots" content="noindex, nofollow">` on 404 page
- **[Code Review fixes]** Added `aria-labelledby="heading-404"` on `<section>` and `id="heading-404"` on `<h1>` for ARIA region landmark

### Change Log

- 2026-02-22: Story 7-3 implemented — custom 404 page with warm French message and service navigation
- 2026-02-22: Code review fixes — title dedup, noindex meta, ARIA region landmark, task description alignment

### File List

- `src/pages/404.astro` (NEW) — Custom 404 page with warm French message and service navigation links
- `src/layouts/BaseLayout.astro` (MODIFIED) — Added `noindex?: boolean` prop for 404 and future error pages
