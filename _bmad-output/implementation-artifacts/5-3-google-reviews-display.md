# Story 5.3: Google Reviews Display

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see Google review ratings displayed on the site**,
so that **I have third-party social proof that reinforces trust before making a decision** (FR20).

## Acceptance Criteria

1. **AC-1: Rating data in `business.ts`** — The `BusinessInfo` interface has a new `googleReviews` field (typed, non-optional) containing: `rating: number`, `reviewCount: number`, and `googleBusinessUrl: string`. Placeholder values are filled in: rating `4.8`, reviewCount `32`, and a valid Google Business Profile URL pattern. `astro check` passes with 0 errors.

2. **AC-2: `GoogleReviews.astro` component created** — A new `src/components/GoogleReviews.astro` component exists. It accepts a `variant` prop (`'badge' | 'inline'`, defaults to `'badge'`). Both variants display: star icon (⭐ or SVG), numeric rating, review count, "avis Google" label, and a link to the Google Business Profile URL. All data is imported from `business.ts` — no hardcoding.

3. **AC-3: Non-intrusive badge — no runtime API call** — The component renders pure static HTML. There is no `fetch()`, no `import.meta.env` lookups, no island hydration (`client:*` directives). All data comes from the `business` const imported from `src/data/business.ts`.

4. **AC-4: Displayed on homepage** — `src/pages/index.astro` renders `<GoogleReviews />` in a trust-signal position (below the profile-routing hero section, above the service cards grid). The badge is visible without scrolling on mobile.

5. **AC-5: Displayed on About page** — `src/pages/a-propos.astro` renders `<GoogleReviews />` in the center-history/values section or as an inline element within the intro paragraph area. It is integrated naturally, not dropped in isolation.

6. **AC-6: Displayed on service pages** — `src/components/ServicePage.astro` (the shared service page layout component) renders `<GoogleReviews />` near the testimonial section. This means all 5 service pages automatically display the badge with a single component change.

7. **AC-7: Links to Google Business Profile** — The badge wraps its content in an `<a>` tag pointing to `business.googleReviews.googleBusinessUrl` with `target="_blank"` and `rel="noopener noreferrer"`. Accessible `aria-label` is set: `"Voir les avis Google de {business.name}"`.

8. **AC-8: Rating is not the sole trust vector** — On each placement, the badge is accompanied by adjacent context (e.g., a testimonial, a CTA text, or the surrounding section copy). The component itself includes a small subtitle hint "Avis vérifiés Google" as a secondary line.

9. **AC-9: Accessible & keyboard-navigable** — The link has a visible focus ring (Tailwind `focus:ring` utilities). The star icon is decorative (`aria-hidden="true"`). All text content is readable without the icon. Color contrast meets WCAG AA.

10. **AC-10: No regression** — `astro check` passes with 0 errors after all changes. `npm run build` completes successfully. All existing pages render correctly. The gallery section in `a-propos.astro` and all other Epic 5.1–5.2 work is unaffected.

## Tasks / Subtasks

- [x] Task 1: Extend `src/data/business.ts` (AC: #1)
  - [x] Add `googleReviews` field to `BusinessInfo` interface: `{ rating: number; reviewCount: number; googleBusinessUrl: string }`
  - [x] Fill in placeholder values on `business` const: `rating: 4.8`, `reviewCount: 32`, `googleBusinessUrl: 'https://g.page/r/PLACEHOLDER/review'`
  - [x] Run `astro check` — confirm 0 errors

- [x] Task 2: Create `src/components/GoogleReviews.astro` (AC: #2, #3, #7, #8, #9)
  - [x] Define `interface Props` with `variant?: 'badge' | 'inline'` (default `'badge'`)
  - [x] Import `business` from `src/data/business.ts`
  - [x] Render badge: star icon (`aria-hidden="true"`), rating number (e.g. `4.8`), `/5`, review count (e.g. `32 avis Google`), secondary line "Avis vérifiés Google"
  - [x] Wrap in `<a>` linking to `business.googleReviews.googleBusinessUrl` with `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`
  - [x] Use `badge` variant as default (compact pill), `inline` variant for text flow usage
  - [x] Apply Tailwind/daisyUI classes only — no inline CSS, no `<style>` blocks
  - [x] Verify: 0 client-side JS, 0 `client:*` directives

- [x] Task 3: Add `<GoogleReviews />` to `src/pages/index.astro` (AC: #4)
  - [x] Import `GoogleReviews` in frontmatter
  - [x] Place badge after the hero/profile-routing section and before the service cards grid
  - [x] Wrap in a brief trust-signal container (centered, subtle background or divider)

- [x] Task 4: Add `<GoogleReviews />` to `src/pages/a-propos.astro` (AC: #5)
  - [x] Import `GoogleReviews` in frontmatter
  - [x] Place badge in the "Une histoire d'amour avec le cheval" or "Notre pédagogie" section — inline variant works here
  - [x] Ensure it is visually integrated (not floating in isolation)

- [x] Task 5: Add `<GoogleReviews />` to `src/components/ServicePage.astro` (AC: #6)
  - [x] Import `GoogleReviews` in frontmatter
  - [x] Place badge in the testimonial section or just above the CTA section
  - [x] Confirm all 5 service pages render correctly via `npm run build`

- [x] Task 6: Build verification (AC: #10)
  - [x] Run `astro check` — confirm 0 errors, 0 warnings (2 pre-existing hints in SchemaMarkup.astro are acceptable)
  - [x] Run `npm run build` — confirm all pages build successfully
  - [x] Verify homepage, about page, and all service pages render the badge
  - [x] Confirm gallery section in `a-propos.astro` is unaffected (no regression)

## Dev Notes

### Critical Context — Current Codebase State

**Component count before this story: 13**
```
src/components/
├── Breadcrumb.astro
├── ContactForm.astro
├── Footer.astro
├── Hero.astro
├── Navbar.astro
├── NewsCard.astro
├── PlanningBlock.astro
├── PricingTable.astro
├── ProfileRouting.astro
├── SchemaMarkup.astro
├── ServiceCard.astro
├── ServicePage.astro
├── StickyContact.astro
└── Testimonial.astro
```
→ After Story 5.3: **14 components** (threshold for subfolders is 15 — still flat, no subfolders needed).

**`src/data/business.ts` current interface:**
```typescript
export interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: OpeningHours[];
  gps: GpsCoordinates;
  social: SocialLinks;
}
```
→ **Add `googleReviews` field** (see Task 1 below).

**`src/pages/a-propos.astro` current sections (in order after Story 5.2):**
1. `<Hero>` — no imageSrc (bg-base-200 fallback)
2. "Une histoire d'amour avec le cheval" — `bg-base-200`
3. "Notre pédagogie" (3 pillars) — `bg-base-100`
4. "Notre équipe" (instructor profiles) — `bg-base-200`
5. "Nos installations" — `bg-base-100`
6. "Notre galerie" (NEW in 5.2) — `bg-base-100`
7. "Venez nous rencontrer" (CTA) — `bg-base-200`

→ **Best placement for `<GoogleReviews />` in `a-propos.astro`:** Inside section 2 ("Une histoire d'amour avec le cheval") or at the end of section 2, as a trust signal reinforcing the center's identity. Use `variant="inline"` for natural text flow.

**`src/pages/index.astro` current sections:**
1. Hero + ProfileRouting (bg varies)
2. Service cards grid
3. News section (conditional on freshness)

→ **Best placement for `<GoogleReviews />` in `index.astro`:** A small trust bar or centered badge between section 1 (hero) and section 2 (service cards). No full-width section needed — a compact centered div with `py-4` is sufficient.

---

### Complete Implementation

#### Task 1 — `src/data/business.ts` modifications

**Add to interface:**
```typescript
export interface GoogleReviews {
  rating: number;
  reviewCount: number;
  googleBusinessUrl: string;
}

export interface BusinessInfo {
  // ... existing fields ...
  googleReviews: GoogleReviews;
}
```

**Add to `business` const:**
```typescript
export const business: BusinessInfo = {
  // ... existing fields ...
  googleReviews: {
    rating: 4.8,
    reviewCount: 32,
    googleBusinessUrl: 'https://g.page/r/PLACEHOLDER/review',
  },
};
```
> **Client note:** Replace `'https://g.page/r/PLACEHOLDER/review'` with the actual Google Business Profile URL once available. Also update `rating` and `reviewCount` whenever the center's actual score is known.

---

#### Task 2 — `src/components/GoogleReviews.astro`

```astro
---
import { business } from '../data/business.ts';

interface Props {
  variant?: 'badge' | 'inline';
}

const { variant = 'badge' } = Astro.props;
const { rating, reviewCount, googleBusinessUrl } = business.googleReviews;
---

{variant === 'badge' ? (
  <a
    href={googleBusinessUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Voir les avis Google de ${business.name}`}
    class="inline-flex flex-col items-center gap-1 rounded-xl border border-base-300 bg-base-100 px-4 py-3 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  >
    <div class="flex items-center gap-1.5">
      <span aria-hidden="true" class="text-yellow-400 text-lg">★</span>
      <span class="text-lg font-bold text-base-content">{rating}</span>
      <span class="text-base-content/60">/5</span>
      <span class="text-sm text-base-content/70">— {reviewCount} avis Google</span>
    </div>
    <span class="text-xs text-base-content/50">Avis vérifiés Google</span>
  </a>
) : (
  <a
    href={googleBusinessUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Voir les avis Google de ${business.name}`}
    class="inline-flex items-center gap-1.5 text-sm text-base-content/70 hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded"
  >
    <span aria-hidden="true" class="text-yellow-400">★</span>
    <span class="font-semibold text-base-content">{rating}/5</span>
    <span>({reviewCount} avis Google)</span>
  </a>
)}
```

**Variant usage guide:**
- `variant="badge"` (default) — standalone display: for homepage trust bar, service page testimonial area
- `variant="inline"` — for embedding within a sentence or paragraph in the about page

---

#### Task 3 — `src/pages/index.astro` insertion point

Insert between the `<Hero>` + `<ProfileRouting>` section and the service cards `<section>`:

```astro
<!-- Google reviews trust signal — between hero and service cards -->
<div class="flex justify-center py-6 bg-base-100">
  <GoogleReviews />
</div>
```

---

#### Task 4 — `src/pages/a-propos.astro` insertion point

Inside the "Une histoire d'amour avec le cheval" section, at the end of the section just before the closing `</section>` tag:

```astro
<div class="mt-6">
  <GoogleReviews variant="inline" />
</div>
```

**⚠️ DO NOT** alter the `import { Image, Picture } from 'astro:assets'` line or the `galleryZones` data added in Story 5.2.

---

#### Task 5 — `src/components/ServicePage.astro` insertion point

Import `GoogleReviews` and insert it just above or below the `<Testimonial>` component usage within the ServicePage template:

```astro
import GoogleReviews from './GoogleReviews.astro';
// ... (in template:)
<div class="flex justify-center py-4">
  <GoogleReviews />
</div>
```

---

### Architecture Compliance

| Rule | Status for Story 5.3 |
|---|---|
| **TypeScript strict** | `interface Props`, `interface GoogleReviews` — all fully typed. `rating: number`, `reviewCount: number`, `googleBusinessUrl: string` — no `any`, no `@ts-ignore`. |
| **Data source: `business.ts`** | `googleReviews` field added to `BusinessInfo` interface and `business` const. Never hardcoded in component or pages. |
| **No runtime API call** | Pure static component. No `fetch()`, no `import.meta.env`. Data read at build time from typed const. |
| **No client-side JS** | Zero `client:*` directives. No islands. No event handlers. Pure Astro SSG output. |
| **Tailwind/daisyUI only** | All classes are Tailwind utilities or daisyUI tokens (`bg-base-100`, `text-base-content`, `rounded-xl`, `shadow-sm`). No `<style>` blocks. |
| **Semantic HTML** | Badge is an `<a>` element (correct — it navigates to an external resource). `aria-label` set. Star icon marked `aria-hidden="true"`. |
| **Accessible link** | `target="_blank"` + `rel="noopener noreferrer"` on external link. Visible focus ring via `focus:ring-2`. |
| **French visible content** | "avis Google", "Avis vérifiés Google", `aria-label` in French. |
| **Code in English** | Variables: `rating`, `reviewCount`, `googleBusinessUrl`, `variant`. |
| **Flat `components/` folder** | 14 components after story. Threshold is 15. Flat structure maintained. |
| **No subfolders in `components/`** | No new subdirectories created. |

---

### Project Structure Notes

**Files MODIFIED:**
```
src/data/business.ts                              ← add GoogleReviews interface + googleReviews field
src/pages/index.astro                             ← import + add <GoogleReviews /> between hero and cards
src/pages/a-propos.astro                          ← import + add <GoogleReviews variant="inline" /> in history section
src/components/ServicePage.astro                  ← import + add <GoogleReviews /> near testimonial
_bmad-output/implementation-artifacts/sprint-status.yaml  ← status → ready-for-dev
```

**Files CREATED:**
```
src/components/GoogleReviews.astro                ← new badge component
```

**Files NOT to touch:**
- `src/layouts/BaseLayout.astro` — not needed
- `src/content/**` — no content changes
- `src/data/navigation.ts` — navigation unchanged
- `src/pages/cours-enfants.astro`, `equitation-adulte.astro`, etc. — covered by ServicePage.astro change
- Gallery section in `a-propos.astro` — leave untouched (added in Story 5.2)
- `SchemaMarkup.astro`, `Navbar.astro`, `Footer.astro`, etc. — not involved

**Pages affected after this story (all via single component change to ServicePage.astro):**
```
src/pages/index.astro             ← MODIFIED (badge added)
src/pages/a-propos.astro          ← MODIFIED (badge added)
src/pages/cours-enfants.astro     ← indirectly updated via ServicePage.astro
src/pages/equitation-adulte.astro ← indirectly updated via ServicePage.astro
src/pages/pension-chevaux.astro   ← indirectly updated via ServicePage.astro
src/pages/stages-vacances.astro   ← indirectly updated via ServicePage.astro
src/pages/competitions.astro      ← indirectly updated via ServicePage.astro
```

**Component count: 14** (from 13 → 14, well under 15 threshold).

---

### Previous Story Intelligence (Story 5.2 Learnings)

| Learning | Impact on Story 5.3 |
|---|---|
| **Tailwind v4 CSS-first** | No `tailwind.config.mjs`. Use `bg-base-100`, `text-base-content`, `rounded-xl`, daisyUI tokens directly. Confirmed working. |
| **`astro check` AND `npm run build` both required** | Run both in Task 6. `astro check` for TypeScript, `npm run build` for Vite bundling issues. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still present and acceptable. Target: 0 errors, 0 warnings in all newly modified files. |
| **`a-propos.astro` current structure** | 7 sections (documented above). The gallery section from 5.2 is between "Nos installations" and the CTA. Do not displace or alter it. |
| **No JSX comments inside ternaries** | `GoogleReviews.astro` uses `{variant === 'badge' ? (...) : (...)}` pattern — no comments inside JSX branches. |
| **Minimal change principle** | 1 new component + 3 file modifications. No new pages, no layout changes. |
| **Each story = 1-commit pattern** | Commit message: `"Story 5-3: Google reviews display"` |
| **`import { Image, Picture } from 'astro:assets'` already in a-propos.astro** | When adding the import for GoogleReviews in `a-propos.astro`, add it alongside the existing imports — do NOT remove or replace the `astro:assets` import line. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `690eff9` — Story 5-2: Structured photo gallery → `src/pages/a-propos.astro` (+110 lines), sprint-status.yaml
2. `a0d815d` — Story 5-1: About page — center, values & instructors → created `src/pages/a-propos.astro`
3. `2c52a09` — Story 4-2: Dedicated contact page
4. `5ffbe5a` — Story 4-1: Contact form component with Web3Forms integration

**Pattern confirmed:** One primary file change per story (+ sprint-status.yaml). Story 5.3 touches 4 files (business.ts + index.astro + a-propos.astro + ServicePage.astro + new component) — slightly larger than usual, but all changes are minimal and well-scoped.

**From commit `690eff9` analysis:**
- `src/pages/a-propos.astro` now includes Picture + galleryZones + gallery HTML
- Import line is: `import { Image, Picture } from 'astro:assets';`
- `import type { ImageMetadata } from 'astro';` also present
- Gallery section exists between "Nos installations" and CTA

---

### What Story 5.3 Does NOT Include

| Excluded | Reason | Future |
|---|---|---|
| Live Google API integration | No runtime dependencies (NFR31). Static data in `business.ts` only. AC explicitly says "no runtime API call". | V2 if needed |
| Individual review text/cards | Out of scope. AC focuses on rating badge only, not full review listing. | V2 if review feed is desired |
| Review schema markup (AggregateRating) | Would require JSON-LD update in SchemaMarkup.astro. Not in this story's ACs but valuable — defer to Epic 7 (Story 7.4 accessibility & schema). | Epic 7 |
| Google widget iframe | Third-party JS dependency — violates "no JS without justification" rule. | Never |
| Review submission CTA ("Laisser un avis") | Out of scope for Story 5.3. Could be added to service pages in a later story. | V2 |

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.3: Google Reviews Display]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5: About, Trust & Visual Content — FR20]
- [Source: _bmad-output/planning-artifacts/epics.md#FR20 — Google review ratings]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — no hardcoded phone/address, always reference business.ts]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns — no client-side JS without justification]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — src/components/ flat, max 15 before subfolders]
- [Source: src/data/business.ts — BusinessInfo interface (current state, requires googleReviews addition)]
- [Source: _bmad-output/implementation-artifacts/5-2-structured-photo-gallery.md — a-propos.astro current section order, Tailwind v4 learnings, component count]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_No issues encountered. Clean build first pass._

### Completion Notes List

- Added `GoogleReviews` interface and `googleReviews` field to `BusinessInfo` in `business.ts` — fully typed, no `any`.
- Created `src/components/GoogleReviews.astro` with `badge` (default) and `inline` variants. Pure static HTML — zero `client:*` directives, zero `fetch()`.
- Integrated badge on homepage (`index.astro`) in a centered trust-signal div between hero and service cards grid.
- Integrated inline badge in "Une histoire d'amour avec le cheval" section of `a-propos.astro`, preserving all Story 5.2 gallery code unchanged.
- Integrated badge in `ServicePage.astro` near testimonial section — all 5 service pages automatically updated.
- `astro check`: 0 errors, 0 warnings, 2 pre-existing hints in SchemaMarkup.astro (acceptable).
- `npm run build`: all pages built successfully, no regressions.

### File List

- `src/data/business.ts` (modified)
- `src/components/GoogleReviews.astro` (created)
- `src/pages/index.astro` (modified)
- `src/pages/a-propos.astro` (modified)
- `src/components/ServicePage.astro` (modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
- `_bmad-output/implementation-artifacts/5-3-google-reviews-display.md` (modified)

## Change Log

| Date | Change |
|---|---|
| 2026-02-20 | Story 5-3 implemented: GoogleReviews component created and integrated on homepage, about page, and all 5 service pages via ServicePage.astro |
