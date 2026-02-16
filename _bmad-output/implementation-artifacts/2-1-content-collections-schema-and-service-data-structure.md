# Story 2.1: Content Collections Schema & Service Data Structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a typed Content Collections schema for services with Zod validation**,
So that **all service content (pricing, schedule, testimonials, SEO) is structured, validated, and consistently formatted across pages**.

**Epic Context:** Epic 2 — Service Pages (Core Conversion Pages). This is the foundational data story that establishes the content architecture all service pages (Stories 2.2-2.8) will build upon. Getting the schema right here prevents cascading rework across all service pages.

**Business Value:** This story creates the typed, validated content structure that ensures every service page (cours enfants, equitation adulte, pension, stages, competitions) has consistent pricing, schedule, testimonials, and SEO data — directly enabling the conversion-focused service pages that drive phone calls and WhatsApp messages.

## Acceptance Criteria

1. **AC-1: Content config file location** — `src/content.config.ts` exists at the correct Astro v5 location (NOT `src/content/config.ts` which was the v4 pattern). Uses `defineCollection` from `astro:content` and `glob` loader from `astro/loaders`.

2. **AC-2: Services collection schema** — A `services` collection is defined with a Zod schema (from `astro/zod`) validating all required fields:
   - `title` (string, required)
   - `description` (string, required)
   - `seoTitle` (string, required)
   - `seoDescription` (string, required)
   - `ogImage` (string, optional)
   - `heroImage` (string, required) — path to hero image
   - `heroImageAlt` (string, required) — descriptive alt text in French
   - `whatsappMessage` (string, required) — contextual pre-filled WhatsApp message
   - `order` (number, required) — display order for service cards
   - `pricing` (array, required) — each item: `{ label: string, price: string, unit: string, highlight: boolean (default false) }`
   - `pricingNotes` (array of strings, optional) — license fees, reductions, footnotes
   - `schedule` (array, optional) — each item: `{ day: string, time: string, level: string }`
   - `testimonial` (object, optional) — `{ quote: string, author: string, stars: number (1-5) }`
   - `serviceType` (string, required) — for Schema.org Service markup
   - `serviceDescription` (string, required) — for Schema.org Service markup

3. **AC-3: Glob loader configuration** — The services collection uses `glob({ pattern: '**/*.md', base: './src/content/services' })` to load Markdown files from `src/content/services/`.

4. **AC-4: Collections export** — The config file exports `collections` object containing the `services` collection (and future-ready for `blog` and `news` collections to be added in later epics).

5. **AC-5: Sample service file** — At least one sample service Markdown file (`src/content/services/cours-enfants.md`) exists with placeholder content that validates against the schema. Frontmatter keys use camelCase convention. Content body contains narrative/emotional text in French.

6. **AC-6: Content directory structure** — `src/content/services/` directory exists with the sample file. The directory follows the architecture spec's flat content structure.

7. **AC-7: Type safety** — `astro check` passes with zero type errors after adding the content config and sample file.

8. **AC-8: Build succeeds** — `npm run build` produces a successful build with zero errors.

9. **AC-9: Collection queryable** — The services collection can be queried in an Astro component using `getCollection('services')` and returns typed entries with validated data matching the schema.

## Tasks / Subtasks

- [x] Task 1: Create content config file with services collection (AC: #1, #2, #3, #4)
  - [x] Create `src/content.config.ts` (Astro v5 location — NOT `src/content/config.ts`)
  - [x] Import `defineCollection` from `astro:content`
  - [x] Import `glob` from `astro/loaders`
  - [x] Import `z` from `astro/zod`
  - [x] Define `services` collection with `glob({ pattern: '**/*.md', base: './src/content/services' })`
  - [x] Define complete Zod schema with all fields (see Dev Notes for exact schema)
  - [x] Export `collections` object: `export const collections = { services };`

- [x] Task 2: Create content directory structure (AC: #6)
  - [x] Create `src/content/` directory
  - [x] Create `src/content/services/` subdirectory

- [x] Task 3: Create sample service file — cours-enfants.md (AC: #5)
  - [x] Create `src/content/services/cours-enfants.md` with complete frontmatter
  - [x] All frontmatter keys in camelCase
  - [x] Include realistic placeholder pricing data (3-4 formulas)
  - [x] Include placeholder schedule data (3-4 time slots by age group)
  - [x] Include placeholder testimonial from a parent
  - [x] Include service schema markup data (serviceType, serviceDescription)
  - [x] Include WhatsApp contextual message for children's lessons
  - [x] Content body in French with emotional/narrative placeholder text

- [x] Task 4: Verify collection is queryable (AC: #9)
  - [x] Update `src/pages/index.astro` to import and query `getCollection('services')`
  - [x] Verify typed data is accessible (`entry.data.title`, `entry.data.pricing`, etc.)
  - [x] Remove or comment out the test query after verification (keep index.astro clean)

- [x] Task 5: Build verification (AC: #7, #8)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify no new warnings related to content collections

## Dev Notes

### Critical Technical Context

**⚠️ ASTRO v5 CONTENT LAYER API — Architecture doc references OUTDATED v4 patterns:**

The architecture document (`architecture.md`) was written assuming Astro v4 Content Collections:
- It references `src/content/config.ts` → **Astro v5 uses `src/content.config.ts`** (at src root, NOT inside content/)
- It references `type: 'content'` → **Astro v5 uses `loader: glob()` from `astro/loaders`**
- It references `entry.slug` → **Astro v5 uses `entry.id`**
- It references `entry.render()` → **Astro v5 uses `import { render } from 'astro:content'; render(entry)`**

**The developer MUST use Astro v5 Content Layer API patterns, NOT the architecture doc's v4 patterns.**

This is the same situation as Story 1.1 where the architecture doc referenced Tailwind v3 patterns but the project uses Tailwind v4. The architecture doc's *intent* is correct (typed Content Collections with Zod validation), but the *API syntax* must be updated to v5.

### Exact Content Config Implementation

```typescript
// src/content.config.ts — ASTRO v5 LOCATION (NOT src/content/config.ts)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    // Basic info
    title: z.string(),
    description: z.string(),

    // SEO
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),

    // Hero
    heroImage: z.string(),
    heroImageAlt: z.string(),

    // Contact
    whatsappMessage: z.string(),

    // Display
    order: z.number(),

    // Pricing
    pricing: z.array(z.object({
      label: z.string(),
      price: z.string(),
      unit: z.string(),
      highlight: z.boolean().default(false),
    })),
    pricingNotes: z.array(z.string()).optional(),

    // Schedule
    schedule: z.array(z.object({
      day: z.string(),
      time: z.string(),
      level: z.string(),
    })).optional(),

    // Testimonial
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      stars: z.number().min(1).max(5),
    }).optional(),

    // Schema markup
    serviceType: z.string(),
    serviceDescription: z.string(),
  }),
});

export const collections = { services };
```

### Sample Service Frontmatter Structure

```yaml
---
title: "Cours d'equitation enfants"
description: "Des cours adaptes a chaque age, du baby poney aux Galops, dans un environnement bienveillant et securise."
seoTitle: "Cours equitation enfants Yffiniac Saint-Brieuc | Equi 22"
seoDescription: "Cours d'equitation pour enfants des 3 ans a Yffiniac. Baby poney, initiation, perfectionnement. Planning, tarifs et inscriptions."
ogImage: "/images/services/cours-enfants-og.jpg"
heroImage: "/images/hero/cours-enfants.jpg"
heroImageAlt: "Enfants souriants sur des poneys dans le manege du centre equestre Equi 22"
whatsappMessage: "Bonjour, je suis interesse(e) par les cours enfants. Pourriez-vous me donner des informations sur les horaires et les tarifs ?"
order: 1
pricing:
  - label: "Cours a l'unite"
    price: "25"
    unit: "seance"
    highlight: false
  - label: "Carte 10 seances"
    price: "220"
    unit: "carte"
    highlight: false
  - label: "Forfait annuel 40 seances"
    price: "700"
    unit: "an"
    highlight: true
pricingNotes:
  - "Licence FFE obligatoire (25€/an pour les mineurs)"
  - "Reduction de 10% a partir du 2e enfant"
schedule:
  - day: "Mercredi"
    time: "14h00 - 15h00"
    level: "Baby poney (3-5 ans)"
  - day: "Mercredi"
    time: "15h00 - 16h00"
    level: "Decouverte (6-8 ans)"
  - day: "Mercredi"
    time: "16h00 - 17h00"
    level: "Galop 1-3 (8-12 ans)"
  - day: "Samedi"
    time: "10h00 - 11h00"
    level: "Baby poney (3-5 ans)"
  - day: "Samedi"
    time: "11h00 - 12h00"
    level: "Tous niveaux (6-14 ans)"
testimonial:
  quote: "Ma fille attend le mercredi avec impatience ! Les monitrices sont adorables et tres pedagogues."
  author: "Sophie, maman de Lea (8 ans)"
  stars: 5
serviceType: "EducationalService"
serviceDescription: "Cours d'equitation pour enfants de 3 a 14 ans, du baby poney aux Galops, au centre equestre Equi 22 a Yffiniac."
---
```

### Querying Collections in Astro v5

```typescript
// In any .astro component:
import { getCollection, getEntry, render } from 'astro:content';

// Get all services
const allServices = await getCollection('services');

// Get sorted by order
const sortedServices = allServices.sort((a, b) => a.data.order - b.data.order);

// Get single entry (returns T | undefined — MUST null-check)
const service = await getEntry('services', 'cours-enfants');
if (!service) return Astro.redirect('/404');

// Access typed data
const { title, pricing, schedule } = service.data;

// Render markdown body
const { Content, headings } = await render(service);
```

**IMPORTANT:** In Astro v5, `getCollection()` returns entries in non-deterministic order. ALWAYS sort manually when display order matters (use the `order` field).

**IMPORTANT:** In Astro v5, `getEntry()` returns `T | undefined`. ALWAYS null-check before using.

### Architecture Compliance

**MUST follow — established project patterns from Epic 1:**

| Rule | Compliance |
|---|---|
| **TypeScript strict** | All code in `content.config.ts` must be typed. Never `any`, never `@ts-ignore` |
| **Naming: camelCase frontmatter** | All frontmatter keys use camelCase: `seoTitle`, `heroImage`, `whatsappMessage`, `pricingNotes` |
| **Naming: kebab-case content files** | Markdown files use kebab-case: `cours-enfants.md`, `equitation-adulte.md` |
| **Naming: PascalCase types** | Any exported types use PascalCase (e.g., if exporting schema type) |
| **Content in French, code in English** | Frontmatter values (titles, descriptions) in French. Variable names and types in English |
| **No subfolders in components/** | This story doesn't add components, but `content/services/` is a valid content subdirectory |
| **Data from `business.ts`** | `whatsappMessage` in frontmatter provides per-service context, but the phone number itself comes from `business.ts` at render time (Story 2.2+) |
| **Semantic content** | Markdown body uses proper heading hierarchy (## for sections, ### for subsections) |

**Architecture doc intent preserved, syntax updated:**

| Architecture Doc Says | Actual Implementation (v5) | Rationale |
|---|---|---|
| `src/content/config.ts` | `src/content.config.ts` | Astro v5 moved config to src root |
| `type: 'content'` | `loader: glob({ ... })` | Astro v5 Content Layer API |
| `defineCollection` from `astro:content` | Same | ✅ Unchanged |
| `z` from `astro/zod` | Same | ✅ Unchanged |
| Schema fields (pricing, schedule, etc.) | Same fields, same structure | ✅ Unchanged |
| `src/content/services/*.md` file location | Same | ✅ Unchanged (glob base points here) |

### Library & Framework Requirements

**Installed versions (from `package.json` — Story 1.1):**

| Package | Version | Relevance |
|---|---|---|
| `astro` | ^5.17.1 | Content Collections v5 API, `astro:content` module, `astro/loaders`, `astro/zod` |
| `tailwindcss` | ^4.1.18 | Not directly used in this story |
| `daisyui` | ^5.5.18 | Not directly used in this story |
| `typescript` | ^5.9.3 | Strict mode, type checking for schemas |

**No new packages required.** Astro v5 includes Content Collections, Zod, and the glob loader natively. Do NOT install `zod` separately — use `astro/zod` re-export.

### File Structure Requirements

**Files to CREATE:**

```
src/
├── content.config.ts              ← NEW: Collection definitions (Astro v5 location)
├── content/
│   └── services/
│       └── cours-enfants.md       ← NEW: Sample service content
```

**Files to MODIFY (temporarily for verification):**

```
src/
├── pages/
│   └── index.astro               ← MODIFY: Add test query (then clean up)
```

**Files NOT to touch:**

- `astro.config.mjs` — No changes needed, Content Collections are auto-detected
- `src/styles/global.css` — No styling in this story
- `src/data/business.ts` — Data already correct, referenced at render time in future stories
- `src/layouts/BaseLayout.astro` — No layout changes
- `src/components/*` — No component changes

### Testing Requirements

**Build-time validation (the only testing gate for this story):**

1. **`astro check`** — Validates TypeScript types including Content Collection schemas. If the Zod schema has errors or the sample Markdown frontmatter doesn't match, this will catch it.

2. **`npm run build`** — Full build including content collection processing. The build will FAIL if:
   - Frontmatter doesn't match Zod schema
   - Required fields are missing in Markdown files
   - Type errors in `content.config.ts`

3. **Manual verification** — Query the collection in a test component to confirm typed data is accessible and correctly shaped.

**No unit tests required** — per architecture decision: "No unit tests for MVP. Static site with Zod-validated content + TypeScript strict + `astro check` covers type errors."

### Previous Story Intelligence (Epic 1)

**Key learnings from Stories 1.1-1.5 that impact this story:**

| Learning | Source | Impact on Story 2.1 |
|---|---|---|
| **Architecture doc patterns are outdated** | Story 1.1 (Tailwind v4 vs v3) | Same situation here: architecture doc shows v4 Content Collections API, we must use v5 API |
| **Tailwind v4 CSS-first config** | Story 1.1 | Already set up correctly — `@tailwindcss/vite`, `@theme` in global.css |
| **daisyUI v5 theming** | Story 1.1 | Theme tokens available: `--color-primary`, `--color-base-100`, etc. Not directly used in this story but available for future service page components |
| **BaseLayout has whatsappMessage prop** | Story 1.2, 1.5 | The prop chain is ready: Page → BaseLayout → StickyContact. Service pages (Story 2.2+) will pass `whatsappMessage` from content collection frontmatter through this chain |
| **Inline SVG icons, no library** | Stories 1.3-1.5 | Pattern established — continue in future stories |
| **`business.ts` data patterns** | Stories 1.1, 1.4, 1.5 | Phone/WhatsApp numbers from `business.ts`, never hardcoded. Service-specific WhatsApp messages come from content frontmatter |
| **Build verification: always run both** | All stories | Run `astro check` AND `npm run build` to validate |
| **daisyUI CSS warnings are cosmetic** | Story 1.1 | Some build warnings from daisyUI are known and non-blocking |

**Existing project structure (after Epic 1):**

```
src/
├── components/
│   ├── Footer.astro
│   ├── Navbar.astro
│   ├── SchemaMarkup.astro
│   └── StickyContact.astro
├── data/
│   ├── business.ts
│   └── navigation.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

### Latest Technical Information (Astro v5 Content Layer)

**Astro v5 Content Layer API — verified via official docs (February 2026):**

- **Config location:** `src/content.config.ts` (or `.mts`, `.js`, `.mjs`)
- **Imports:** `defineCollection` from `astro:content`, `glob` from `astro/loaders`, `z` from `astro/zod`
- **Loader:** `glob({ pattern: '**/*.md', base: './src/content/services' })` — supports md, mdx, json, yaml, toml
- **Entry identifier:** `entry.id` (NOT `entry.slug` — slug was v4)
- **Render:** `import { render } from 'astro:content'; const { Content } = await render(entry);`
- **Null safety:** `getEntry()` returns `T | undefined` — must null-check
- **Sort order:** Non-deterministic — must sort manually
- **Schema validation:** Runs at build time — invalid frontmatter fails the build
- **No `type` field needed** — loaders replace the old `type: 'content'` / `type: 'data'` distinction

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1: Content Collections Schema & Service Data Structure]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements — FR2, FR3, FR4, FR5, FR16, FR17, FR18, FR19]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy]
- [Source: _bmad-output/implementation-artifacts/1-1-initialize-astro-project-with-core-integrations.md#Dev Notes]
- [Source: _bmad-output/implementation-artifacts/1-5-sticky-contact-bar.md#Dev Notes]
- [Source: Astro v5 Content Collections Documentation — https://docs.astro.build/en/guides/content-collections/]
- [Source: Astro v5 Migration Guide — https://docs.astro.build/en/guides/upgrade-to/v5/]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

None — Implementation completed without errors on first attempt.

### Completion Notes List

✅ **All tasks completed successfully (2026-02-16)**

**Implementation Summary:**
- Created Astro v5 Content Collections architecture for services data
- Established typed schema with Zod validation for all service content (pricing, schedule, testimonials, SEO)
- Sample service file (cours-enfants) validates against schema and is queryable
- All acceptance criteria validated through build-time checks

**Key Technical Decisions:**
- Used Astro v5 Content Layer API (NOT v4 patterns from architecture doc)
- Config location: `src/content.config.ts` at src root (v5 standard)
- Loader: `glob()` from `astro/loaders` (replaces v4 `type: 'content'`)
- Schema: Complete Zod validation for all service fields including pricing array, schedule array, testimonial object

**Build Verification Results:**
- `astro check`: 0 type errors ✅
- `npm run build`: Build succeeded ✅
- Collection query test: Successfully retrieved typed service data ✅
- Console proof: "Found 1 service(s), First service: Cours d'équitation enfants, Pricing items: 4"

**Architecture Compliance:**
- camelCase frontmatter keys (seoTitle, heroImage, whatsappMessage)
- kebab-case content filenames (cours-enfants.md)
- TypeScript strict mode maintained
- Content in French, code in English
- Semantic markdown structure in content body

**Foundation Ready:**
This story establishes the data architecture that all service pages (Stories 2.2-2.8) will consume. Schema is production-ready and extensible for future services.

### File List

**Files created:**
- `src/content.config.ts` — Content Collections config with services schema
- `src/content/services/cours-enfants.md` — Sample service content file with complete frontmatter

**Files modified:**
- `src/pages/index.astro` — Test verification code added then fully removed during code review (clean state)

**Code Review Fixes Applied (2026-02-16):**
- `src/content.config.ts` — Added `.int()` to `order` and `stars` fields, `.min(1)` to `pricing` array, simplified header comment
- `src/pages/index.astro` — Removed 10 lines of commented-out test scaffolding
