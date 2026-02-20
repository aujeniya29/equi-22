# Story 3.3: Homepage News Section with Freshness Logic

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see recent news and upcoming events on the homepage**,
so that **I know the center is active and can discover seasonal opportunities** (FR10).

## Acceptance Criteria

1. **AC-1: `news` Content Collection schema** — A `news` collection is defined in `src/content.config.ts` (Astro v5 Content Layer API, `glob` loader) with Zod schema validating: `title` (string), `date` (coerced Date), `excerpt` (string), `link` (optional string). `astro check` passes with zero errors after adding the collection.

2. **AC-2: Freshness filtering at build time** — In `index.astro`, all news items with `date` older than 90 days from build time are excluded. The cutoff is computed as `new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)`. Items are sorted by `date` descending (newest first) and capped at 3. This logic runs entirely in the Astro frontmatter — zero client-side JavaScript.

3. **AC-3: Section rendered only when fresh news exist** — When `recentNews.length > 0`, a `<section aria-labelledby="news-heading">` is rendered in `index.astro` after the service cards section. When `recentNews.length === 0` (no items within 90 days), the section is **not rendered at all** — no empty state, no placeholder.

4. **AC-4: News section visual structure** — The news section displays:
   - A visible `<h2 id="news-heading">` with text "Actualités"
   - A responsive grid of `NewsCard.astro` components (1 column on mobile, up to 3 columns on desktop)
   - Background `bg-base-100` to alternate visually with the preceding service cards section (`bg-base-200`)

5. **AC-5: `NewsCard.astro` content** — Each `NewsCard` displays:
   - `<time>` element with `datetime={date.toISOString()}` and a human-readable French date label (e.g., "Février 2026") — capitalized, month + year only
   - `<h3>` with the news `title`
   - `<p>` with the news `excerpt`
   - If `link` is present: an `<a>` link "En savoir plus →" pointing to `link`; if absent, no link rendered

6. **AC-6: Semantic HTML & accessibility** — `NewsCard` uses `<article>` as the root element. The `<time>` element uses the ISO date string as `datetime`. The news `<section>` uses `aria-labelledby` pointing to the `<h2 id="news-heading">`. All links have visible `focus-visible:ring-2` focus indicators.

7. **AC-7: Sample news content files** — At least 2 sample news Markdown files exist in `src/content/news/` with dates within 90 days of today (≥ 2025-11-20), so the news section renders during development and initial deploy.

8. **AC-8: No regression** — `Hero.astro`, `ProfileRouting.astro`, `ServiceCard.astro`, and all existing service page `.astro` files are NOT modified. `astro check` passes with 0 errors. `npm run build` completes successfully.

## Tasks / Subtasks

- [x] Task 1: Add `news` collection to `src/content.config.ts` (AC: #1)
  - [x] Import `defineCollection`, `glob` loader, and `z` (already imported — reuse)
  - [x] Define `news` collection with `glob` loader targeting `./src/content/news`
  - [x] Zod schema: `title: z.string()`, `date: z.coerce.date()`, `excerpt: z.string()`, `link: z.string().optional()`
  - [x] Add `news` to `export const collections = { services, news }`
  - [x] Run `astro check` — confirm 0 errors

- [x] Task 2: Create sample news content files (AC: #7)
  - [x] Create `src/content/news/` directory
  - [x] Create `src/content/news/stages-ete-2026.md` — camp registration announcement, date 2026-02-15
  - [x] Create `src/content/news/resultats-competition-janvier-2026.md` — competition results, date 2026-01-20
  - [x] Verify both files validate against schema with `astro check`

- [x] Task 3: Create `NewsCard.astro` component (AC: #5, #6)
  - [x] Create `src/components/NewsCard.astro`
  - [x] Props: `interface Props { news: CollectionEntry<'news'>; }`
  - [x] Format date using `Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })` — capitalize first letter
  - [x] Root element: `<article>` with daisyUI card styling
  - [x] Include `<time datetime={isoString}>`, `<h3>`, `<p>` excerpt, optional `<a>` link
  - [x] Add `focus-visible:ring-2 focus-visible:ring-primary` on any interactive elements

- [x] Task 4: Update `index.astro` — add freshness logic and news section (AC: #2, #3, #4)
  - [x] Import `NewsCard` from `../components/NewsCard.astro`
  - [x] Add `getCollection('news')` call in frontmatter
  - [x] Compute `cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)`
  - [x] Filter, sort descending, and slice to 3: `recentNews`
  - [x] Add conditional `{recentNews.length > 0 && <section>...</section>}` after the service cards section
  - [x] Section: `aria-labelledby="news-heading"`, `bg-base-100`, `<h2 id="news-heading">Actualités</h2>`
  - [x] Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

- [x] Task 5: Build verification (AC: #8)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm successful build
  - [x] Verify news section appears in `dist/index.html` (with sample files present)
  - [x] Verify no regression on existing service pages and homepage hero/cards

## Dev Notes

### Critical Context — Current State of the Codebase

**`content.config.ts` is at `src/content.config.ts`** (NOT `src/content/config.ts` — Astro v5 places this file at the src root). The file currently exports only the `services` collection using the Content Layer API (`glob` loader). The `news` collection must be **added** to this file.

**Current `src/content.config.ts` (full content — extend this file):**
```typescript
// Astro v5 Content Layer API
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    // ... existing schema fields ...
  }),
});

export const collections = { services };
```

**`index.astro` currently exports services collection + renders Hero + ServiceCard grid** (Story 3.2). The news fetch and filtering must be added to its frontmatter. The news section must be inserted **after** the service cards `<section>` and **before** `</BaseLayout>`.

**Current component count:** 11 components. Adding `NewsCard.astro` → 12 total, well under the 15-component subfolder threshold.

**`src/content/news/` directory does NOT exist yet** — create it along with the sample `.md` files.

---

### Complete Implementation — `src/content.config.ts` (Modified)

Add the `news` collection to the existing file. The final file should be:

```typescript
// Astro v5 Content Layer API
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    whatsappMessage: z.string(),
    order: z.number().int(),
    pricing: z.array(z.object({
      label: z.string(),
      price: z.string(),
      unit: z.string(),
      highlight: z.boolean().default(false),
    })).min(1),
    pricingNotes: z.array(z.string()).optional(),
    schedule: z.array(z.object({
      day: z.string(),
      time: z.string(),
      level: z.string(),
    })).optional(),
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      stars: z.number().int().min(1).max(5),
    }).optional(),
    serviceType: z.string(),
    serviceDescription: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    link: z.string().optional(),
  }),
});

export const collections = { services, news };
```

**Why `z.coerce.date()`:** YAML frontmatter dates can be parsed as strings or Date objects depending on the YAML parser. `z.coerce.date()` handles both reliably — it converts ISO strings, Date objects, and timestamps all to `Date`. This is the established Astro v5 pattern for date fields.

---

### Complete Implementation — `NewsCard.astro`

Create `src/components/NewsCard.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  news: CollectionEntry<'news'>;
}

const { news } = Astro.props;
const { title, date, excerpt, link } = news.data;

const isoDate = date.toISOString();
const formattedDate = new Intl.DateTimeFormat('fr-FR', {
  month: 'long',
  year: 'numeric',
}).format(date);
const displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
---

<article class="bg-base-100 rounded-2xl border border-base-200 p-6 flex flex-col gap-3 shadow-sm">
  <time datetime={isoDate} class="text-xs font-medium text-base-content/50 uppercase tracking-wide">
    {displayDate}
  </time>
  <h3 class="font-serif text-base text-base-content leading-snug">{title}</h3>
  <p class="text-sm text-base-content/70 leading-relaxed flex-1">{excerpt}</p>
  {link && (
    <a
      href={link}
      class="text-sm text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded self-start"
    >
      En savoir plus →
    </a>
  )}
</article>
```

**Design decisions:**
- `border border-base-200` provides card delineation when the section background is also `bg-base-100` — without this border, cards would be invisible against the section background
- `shadow-sm` (not `shadow-md`) — subtle elevation since news cards are informational, not CTA cards like ServiceCard
- `flex flex-col gap-3` + `flex-1` on the excerpt paragraph ensures consistent card height in a grid row — the excerpt expands to fill available space, pushing the optional link to the bottom
- `<time datetime={isoDate}>` with ISO string satisfies semantic HTML for machine-readable dates while displaying the human-friendly format
- No hover transform effect (unlike ServiceCard) — news cards are not call-to-action, they are informational; only the optional link has underline on hover
- `self-start` on the link prevents it from stretching full width in the flex column

---

### Complete Implementation — `index.astro` (Updated)

Replace the entire `index.astro` content with:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ProfileRouting from '../components/ProfileRouting.astro';
import ServiceCard from '../components/ServiceCard.astro';
import NewsCard from '../components/NewsCard.astro';
import homepageHero from '../assets/images/hero/homepage.png';

const whatsappMessage = "Bonjour, je suis intéressé(e) par les activités du centre équestre Équi 22.";

// Services section
const allServices = await getCollection('services');
const services = [...allServices].sort((a, b) => a.data.order - b.data.order);

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}'
);

const serviceImages = await Promise.all(
  services.map(async (service) => {
    const imageModule = images[service.data.heroImage];
    if (!imageModule) {
      throw new Error(`Hero image not found: ${service.data.heroImage}`);
    }
    return (await imageModule()).default;
  })
);

// News section — build-time freshness filtering
const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
const allNews = await getCollection('news');
const recentNews = [...allNews]
  .filter(item => item.data.date >= cutoffDate)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);
---

<BaseLayout
  title="Accueil"
  description="Centre équestre à Yffiniac, Côtes-d'Armor. Cours enfants et adultes, pension chevaux, stages et compétitions. Découvrez Équi 22."
  whatsappMessage={whatsappMessage}
>
  <Hero
    title="Vivez l'équitation en Bretagne"
    description="Cours pour enfants, adultes, pension chevaux et stages — au cœur des Côtes-d'Armor."
    imageSrc={homepageHero}
    imageAlt="Enfants souriants sur des poneys dans le manège du centre équestre Equi 22"
    heightClass="min-h-[450px] lg:min-h-[600px]"
  >
    <ProfileRouting />
  </Hero>

  <section class="py-12 bg-base-200" aria-labelledby="services-heading">
    <div class="max-w-5xl mx-auto px-4">
      <h2 id="services-heading" class="text-2xl lg:text-3xl font-serif text-center mb-8">Nos services</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard service={service} heroImageSrc={serviceImages[index]} />
        ))}
      </div>
    </div>
  </section>

  {recentNews.length > 0 && (
    <section class="py-12 bg-base-100" aria-labelledby="news-heading">
      <div class="max-w-5xl mx-auto px-4">
        <h2 id="news-heading" class="text-2xl lg:text-3xl font-serif text-center mb-8">Actualités</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNews.map((item) => (
            <NewsCard news={item} />
          ))}
        </div>
      </div>
    </section>
  )}
</BaseLayout>
```

**Why `[...allNews].sort()` (spread before sort):** Avoids in-place mutation of the `allNews` array returned by `getCollection`. Same defensive pattern used in Story 3.2 for services (code review finding L-1).

**Why `Date.now() - 90 * 24 * 60 * 60 * 1000`:** `Date.now()` is the build timestamp. 90 days in milliseconds = `90 * 24 * 60 * 60 * 1000`. Using 90 days as the "3 months" approximation is standard practice (avoids month-length variability). This entire calculation runs once at build time — zero runtime cost.

---

### Sample News Content Files

**`src/content/news/stages-ete-2026.md`:**
```markdown
---
title: "Inscriptions ouvertes — Stages d'été 2026"
date: 2026-02-15
excerpt: "Les stages équestres d'été 2026 sont ouverts aux inscriptions ! Demi-journées pour enfants de 6 à 16 ans. Places limitées."
link: /stages-vacances
---

Les stages d'été 2026 sont ouverts aux inscriptions. Programme du matin (9h-12h) et de l'après-midi (14h-17h). Poneys et chevaux selon l'âge et le niveau. N'attendez pas — les places partent vite !
```

**`src/content/news/resultats-competition-janvier-2026.md`:**
```markdown
---
title: "Beaux résultats au concours de janvier 2026"
date: 2026-01-20
excerpt: "Nos cavaliers ont brillé lors du concours régional de janvier. Bravo à tous les participants et aux lauréats !"
link: /competitions
---

Lors du concours CSO régional de janvier 2026, les cavaliers d'Équi 22 ont décroché plusieurs podiums. Un grand bravo à tous pour leur engagement et leur progression.
```

**Why include a `link` field:** The AC states "each news item links to its full content or relevant page." For MVP (no standalone news pages), linking to the relevant service page is the correct approach. Items without a `link` are valid too — the `link` field is optional.

---

### Architecture Compliance

| Rule | Status for Story 3.3 |
|---|---|
| **TypeScript strict** | `interface Props { news: CollectionEntry<'news'>; }` — fully typed. `CollectionEntry<'news'>` from `astro:content`. `z.coerce.date()` provides `Date` type. |
| **Tailwind/daisyUI only** | All classes are Tailwind utilities and daisyUI tokens — no inline CSS, no `<style>` blocks |
| **Semantic HTML** | `<section>` for news area, `<article>` per card, `<h2>` for section title, `<h3>` per card title, `<time>` for dates |
| **No client-side JS** | All filtering and sorting in Astro frontmatter (build time). `NewsCard` renders pure static HTML. |
| **Content in French** | All visible text ("Actualités", "En savoir plus →", sample content) in French |
| **Flat components/** | `NewsCard.astro` at root of `components/` — total: 12 components, under 15-component threshold |
| **`aria-labelledby` on section** | `<section aria-labelledby="news-heading">` with matching `<h2 id="news-heading">` |
| **Content Collections v5 API** | `glob` loader, `z.coerce.date()`, `getCollection('news')` — consistent with existing services pattern |
| **44px tap targets** | `<a>` links in cards have sufficient padding/size; full-card click not needed (news cards are not primary CTAs) |

---

### Project Structure Notes

**Files to CREATE:**
```
src/components/NewsCard.astro           ← new news card component
src/content/news/                       ← new news collection directory
src/content/news/stages-ete-2026.md     ← sample news item 1
src/content/news/resultats-competition-janvier-2026.md  ← sample news item 2
```

**Files to MODIFY:**
```
src/content.config.ts                   ← add 'news' collection definition + export
src/pages/index.astro                   ← add NewsCard import, news fetch/filter, conditional section
```

**Files to NOT touch:**
- `src/components/Hero.astro` — no changes
- `src/components/ProfileRouting.astro` — no changes
- `src/components/ServiceCard.astro` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `src/data/navigation.ts` — no changes
- `src/data/business.ts` — no changes
- `src/styles/global.css` — no changes
- `package.json` — no new dependencies (no new packages needed)
- Any existing service page `.astro` or `.md` files — NOT touched

**Components state after this story:**
```
src/components/
├── SchemaMarkup.astro     ← exists (unchanged)
├── Navbar.astro           ← exists (unchanged)
├── StickyContact.astro    ← exists (unchanged)
├── Footer.astro           ← exists (unchanged)
├── Hero.astro             ← exists (unchanged)
├── PlanningBlock.astro    ← exists (unchanged)
├── PricingTable.astro     ← exists (unchanged)
├── Testimonial.astro      ← exists (unchanged)
├── ServicePage.astro      ← exists (unchanged)
├── ProfileRouting.astro   ← exists (unchanged)
├── ServiceCard.astro      ← exists (unchanged)
└── NewsCard.astro         ← CREATE THIS (story 3.3)
```
Total: 12 components — under the 15-component threshold for subfolders.

---

### Previous Story Intelligence (Story 3.2 Learnings)

| Learning | Impact on Story 3.3 |
|---|---|
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme tokens are in `src/styles/global.css` via `@theme`/`@plugin`. `bg-base-100`, `bg-base-200`, `text-primary`, `text-base-content`, `font-serif`, `rounded-2xl` all work. |
| **`astro check` AND `npm run build` both required** | Run both: `astro check` catches TypeScript/Zod issues, `npm run build` catches Vite/runtime issues (e.g., missing image, broken import). |
| **daisyUI CSS warnings are cosmetic** | Some daisyUI build warnings are known non-blocking — do not fail the build, do not investigate unless they are new. |
| **Astro v5 Content Layer API** | Collections use `glob` loader in `src/content.config.ts`. `id` = filename without extension. `getCollection('news')` returns `CollectionEntry<'news'>[]`. |
| **`[...array].sort()` instead of `array.sort()`** | Code review fix L-1 from Story 3.2 — always spread before sort to avoid mutating the original array. Apply same pattern for `allNews`. |
| **No ogImage prop on BaseLayout for homepage** | Do not add `ogImage` prop to the homepage `BaseLayout` call — known 404 bug (no per-page OG images yet). |
| **Transient "Duplicate id" warning** | Astro v5 first-sync artifact — appears occasionally on `astro dev`, disappears on restart, non-blocking in build. |
| **`transition-all` vs specific transition** | From code review M-1 in Story 3.2: prefer `transition-[box-shadow,transform]` over `transition-all` for performance. Apply if adding hover transitions to NewsCard. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `048ae15` — Story 3-2: Service Cards Grid on Homepage (`ServiceCard.astro` + `index.astro`)
2. `f8eac4a` — Story 3-1: Homepage hero with profile routing (`Hero.astro` + `ProfileRouting.astro` + `index.astro`)
3. `a4e6d49` — Story 2-8 (tarifs.astro — global pricing page)
4. `47be358` — Story 2-7 (competitions page)
5. `00e44e9` — Story 2-6 (holiday camps)

**Pattern for Story 3.3:** 5 files total:
- `src/components/NewsCard.astro` (CREATED)
- `src/content.config.ts` (MODIFIED — add news collection)
- `src/pages/index.astro` (MODIFIED — add news logic + section)
- `src/content/news/stages-ete-2026.md` (CREATED — sample data)
- `src/content/news/resultats-competition-janvier-2026.md` (CREATED — sample data)

---

### What Story 3.3 Does NOT Include

| Excluded | Reason | Handled By |
|---|---|---|
| Standalone news article pages (`/actualites/[slug]`) | Not in MVP scope for this story | Future epic or V2 CMS |
| News listing page (`/actualites`) | Not in MVP scope — news lives only on homepage | Future epic |
| `blog` Content Collection | Separate epic and collection | Epic 6 (Story 6.1) |
| Google Reviews widget | Separate trust layer | Story 5.3 |
| Image in news cards | News items are text-only in MVP — no hero image field | Future enhancement |
| CMS authoring flow | V2 scope — Aurélien edits Markdown directly in V1 | PRD FR42 (V2) |

**Do NOT create in this story:**
- Dynamic routes for news articles (`src/pages/actualites/[...slug].astro`)
- Blog collection or blog pages
- Any new layout files
- Any new navigation entries

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3: Homepage News Section with Freshness Logic]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 3: Homepage & Profile Routing]
- [Source: _bmad-output/planning-artifacts/architecture.md#Stale Content Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture — Additional Collections]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Pattern de contenu frais / daté]
- [Source: src/content.config.ts — existing services collection pattern to extend]
- [Source: src/pages/index.astro — current implementation (Story 3.2) to extend]
- [Source: _bmad-output/implementation-artifacts/3-2-service-cards-grid-on-homepage.md#Previous Story Intelligence]
- [Source: _bmad-output/implementation-artifacts/3-2-service-cards-grid-on-homepage.md#Dev Agent Record — code review fixes]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (claude-opus-4-6)

### Debug Log References

No issues encountered during implementation.

### Completion Notes List

- ✅ Task 1: Added `news` collection to `src/content.config.ts` with `glob` loader and Zod schema (`title`, `date` with `z.coerce.date()`, `excerpt`, optional `link`). Exported alongside existing `services` collection.
- ✅ Task 2: Created `src/content/news/` directory with 2 sample markdown files (stages-ete-2026.md dated 2026-02-15, resultats-competition-janvier-2026.md dated 2026-01-20). Both within 90-day freshness window.
- ✅ Task 3: Created `NewsCard.astro` component with `<article>` root, `<time>` with ISO datetime, French-formatted date (capitalized month + year), `<h3>` title, `<p>` excerpt, and optional "En savoir plus →" link with `focus-visible:ring-2` indicators.
- ✅ Task 4: Updated `index.astro` with build-time freshness filtering (90-day cutoff), descending sort, max 3 items. Conditional news section renders only when fresh items exist, with `aria-labelledby="news-heading"`, `bg-base-100` background, responsive grid.
- ✅ Task 5: `astro check` passes with 0 errors. `npm run build` completes successfully. News section confirmed in `dist/index.html`. All existing service pages and homepage sections intact — no regressions.

### Change Log

- 2026-02-20: Story 3.3 implementation — Added homepage news section with build-time freshness filtering (90-day cutoff), `news` content collection, `NewsCard.astro` component, and 2 sample news articles.
- 2026-02-20: Code review fixes — [M-1] Removed CSS `uppercase` from `<time>` in NewsCard.astro to match AC-5 "capitalized" spec (displays "Février 2026" not "FÉVRIER 2026"). [M-2] Added `aria-label` on "En savoir plus →" links for screen reader accessibility. [L-1] Resolved automatically with M-1 (JS capitalization no longer redundant).

### File List

- `src/content.config.ts` — MODIFIED (added `news` collection definition and export)
- `src/components/NewsCard.astro` — CREATED (news card component with semantic HTML)
- `src/content/news/stages-ete-2026.md` — CREATED (sample news item)
- `src/content/news/resultats-competition-janvier-2026.md` — CREATED (sample news item)
- `src/pages/index.astro` — MODIFIED (added NewsCard import, news freshness logic, conditional news section)
