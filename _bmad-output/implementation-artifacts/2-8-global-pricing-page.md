# Story 2.8: Global Pricing Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a single page consolidating all pricing across all services**,
so that **I can compare formulas and understand the full cost without navigating between pages** (FR3).

## Acceptance Criteria

1. **AC-1: Page accessible at /tarifs** — The page renders at `/tarifs` using `tarifs.astro` with `BaseLayout.astro`. The navigation link already exists in `navigation.ts` — do NOT modify `navigation.ts`.

2. **AC-2: All service pricing displayed by category** — The page displays pricing for all 5 services in order: cours enfants, équitation adulte, pension chevaux, stages vacances, compétitions. Data is sourced from Content Collections via `getCollection('services')` sorted by the `order` field. Each service section displays the full pricing array (desktop table + mobile stacked cards, same visual pattern as `PricingTable.astro`) and the `pricingNotes` array.

3. **AC-3: Link to detailed service page per section** — Each service pricing section includes a prominent "Voir la page complète →" link pointing to the correct service URL.

4. **AC-4: Licence FFE information consolidated** — A dedicated "Informations générales" section clearly lists all Licence FFE costs: 25 €/an (jeune/mineur), 36 €/an (adulte), ~55 €/an (compétition adulte).

5. **AC-5: Family/multi-enrollment reductions highlighted** — The informations générales section highlights the -10% reduction from the 2nd child, applicable to cours enfants and stages vacances from the same family.

6. **AC-6: SEO targeting** — The BaseLayout `title` prop is `"Tarifs équitation Yffiniac"` (rendered as "Tarifs équitation Yffiniac | Équi 22" in the `<title>` tag). The `description` prop is ≤140 characters and targets visitors comparing pricing before deciding on an activity.

7. **AC-7: No new components created** — The page uses `BaseLayout.astro` and inline pricing rendering. No new `.astro` component files are created.

8. **AC-8: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build with the page prerendered at `/tarifs/index.html`.

## Tasks / Subtasks

- [x] Task 1: Create tarifs.astro page (AC: #1, #2, #3, #4, #5, #6, #7)
  - [x] Create `src/pages/tarifs.astro` using `getCollection('services')` sorted by `order`
  - [x] Render per-service pricing sections with desktop table + mobile cards (matching `PricingTable.astro` visual pattern)
  - [x] Add "Voir la page complète →" link per service section (use `serviceHrefs` map keyed on `service.id`)
  - [x] Add "Informations générales" section with Licence FFE breakdown and family reduction highlight
  - [x] Add CTA section (phone + WhatsApp) using `business.ts` data
  - [x] Set `title`, `description`, and `whatsappMessage` props on `BaseLayout`

- [x] Task 2: Build verification (AC: #8)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/tarifs` is included in the prerendered pages output

## Dev Notes

### Critical Context — What Already Exists

**This story is STRUCTURALLY DIFFERENT from Stories 2.3–2.7.** It is NOT a service page — it does NOT use `ServicePage.astro` and does NOT create a content file in `src/content/services/`. It is a **data aggregation page** that pulls from all existing service entries.

**Only 1 file to create:** `src/pages/tarifs.astro`

**Navigation already exists.** `src/data/navigation.ts` already contains `{ label: 'Tarifs', href: '/tarifs' }`. Do NOT modify `navigation.ts`.

**Do NOT:**
- Create a Markdown file in `src/content/services/` — no new service entry needed
- Create a hero image — this page has no hero image
- Use `ServicePage.astro` — this is a custom multi-service aggregation page
- Modify `ServicePage.astro`, `PricingTable.astro`, or any existing component
- Modify `content.config.ts` (no new schema fields needed)
- Modify `navigation.ts`, `business.ts`, `BaseLayout.astro`
- Add inline styles except for WhatsApp brand color (`style="background-color: #25D366"`)

### Complete Implementation — tarifs.astro

Create `src/pages/tarifs.astro` with this exact pattern:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import { business } from '../data/business';

const services = await getCollection('services');
const sorted = services.sort((a, b) => a.data.order - b.data.order);

// Map slug → URL for "Voir la page complète" links
const serviceHrefs: Record<string, string> = {
  'cours-enfants':     '/cours-enfants',
  'equitation-adulte': '/equitation-adulte',
  'pension-chevaux':   '/pension-chevaux',
  'stages-vacances':   '/stages-vacances',
  'competitions':      '/competitions',
};

const phoneUrl = `tel:${business.phone.replace(/\s/g, '')}`;
const whatsappNumber = business.whatsapp.replace(/[^\d]/g, '');
const whatsappMessage = "Bonjour, je souhaite des informations sur les tarifs du centre équestre Equi 22.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
---

<BaseLayout
  title="Tarifs équitation Yffiniac"
  description="Tarifs équitation à Yffiniac : cours enfants, adulte, pension chevaux, stages vacances, compétitions. Comparez les formules Equi 22."
  whatsappMessage={whatsappMessage}
>
  <!-- Page header -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h1 class="text-3xl lg:text-4xl font-serif text-base-content mb-4">Nos tarifs</h1>
      <p class="text-base-content/70 max-w-2xl mx-auto">
        Retrouvez ici tous les tarifs du centre équestre Equi 22. Cliquez sur « Voir la page complète » pour en savoir plus sur chaque activité.
      </p>
    </div>
  </section>

  <!-- Per-service pricing sections (data-driven from Content Collections) -->
  {sorted.map((service, i) => {
    const bgClass = i % 2 === 0 ? 'bg-base-100' : 'bg-base-200';
    const href = serviceHrefs[service.id] ?? `/${service.id}`;
    return (
      <section class={`py-12 lg:py-16 ${bgClass}`}>
        <div class="max-w-4xl mx-auto px-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <h2 class="text-2xl lg:text-3xl font-serif text-base-content">{service.data.title}</h2>
            <a href={href} class="link link-primary text-sm font-medium shrink-0">
              Voir la page complète →
            </a>
          </div>

          <!-- Desktop table -->
          <div class="hidden lg:block overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Formule</th>
                  <th>Tarif</th>
                  <th>Unité</th>
                </tr>
              </thead>
              <tbody>
                {service.data.pricing.map((row) => (
                  <tr class={row.highlight ? 'bg-primary/5 border-l-4 border-primary' : ''}>
                    <td class="font-medium">
                      {row.label}
                      {row.highlight && <span class="badge badge-primary badge-sm ml-2">Meilleur rapport</span>}
                    </td>
                    <td class="text-lg font-bold">{row.price}€</td>
                    <td class="text-base-content/60">/{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <!-- Mobile stacked cards -->
          <div class="lg:hidden space-y-3">
            {service.data.pricing.map((row) => (
              <div class={`card bg-base-100 shadow-sm p-4 ${row.highlight ? 'border-2 border-primary' : ''}`}>
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">{row.label}</p>
                    {row.highlight && <span class="badge badge-primary badge-sm mt-1">Meilleur rapport</span>}
                  </div>
                  <div class="text-right">
                    <p class="text-xl font-bold">{row.price}€</p>
                    <p class="text-sm text-base-content/60">/{row.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <!-- Service-specific pricing notes -->
          {service.data.pricingNotes && service.data.pricingNotes.length > 0 && (
            <ul class="mt-6 space-y-1 text-sm text-base-content/70">
              {service.data.pricingNotes.map((note) => (
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 mt-0.5 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  })}

  <!-- Global information section (Licences FFE + Réductions) -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-6">Informations générales</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- FFE licence costs -->
        <div class="card bg-base-100 p-6">
          <h3 class="font-semibold text-base-content mb-3">Licence FFE</h3>
          <p class="text-sm text-base-content/70 mb-3">
            Une licence fédérale est obligatoire pour monter à cheval au centre équestre :
          </p>
          <ul class="space-y-2 text-sm text-base-content/70">
            <li class="flex justify-between items-center border-b border-base-200 pb-1">
              <span>Licence jeune (mineur)</span>
              <span class="font-semibold text-base-content">25 €/an</span>
            </li>
            <li class="flex justify-between items-center border-b border-base-200 pb-1">
              <span>Licence adulte</span>
              <span class="font-semibold text-base-content">36 €/an</span>
            </li>
            <li class="flex justify-between items-center">
              <span>Licence compétition adulte</span>
              <span class="font-semibold text-base-content">~55 €/an</span>
            </li>
          </ul>
        </div>
        <!-- Family reductions -->
        <div class="card bg-base-100 p-6">
          <h3 class="font-semibold text-base-content mb-3">Réductions famille</h3>
          <ul class="space-y-3 text-sm text-base-content/70">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 mt-0.5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span><strong class="text-base-content">−10 % dès le 2e enfant</strong> — applicable sur les cours enfants et les stages vacances de la même famille.</span>
            </li>
          </ul>
          <p class="text-xs text-base-content/50 mt-4">
            Réductions non cumulables. Contactez-nous pour toute situation particulière.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA section -->
  <section class="py-12 lg:py-16 bg-base-100">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-4">
        Une question sur nos tarifs ?
      </h2>
      <p class="text-base-content/70 mb-8 max-w-xl mx-auto">
        Appelez-nous ou envoyez un message WhatsApp — on vous répond avec plaisir et sans engagement.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={phoneUrl}
          class="btn btn-primary btn-lg min-h-[44px]"
          aria-label="Appeler le centre équestre Equi 22"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Appeler
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-lg min-h-[44px] text-white"
          style="background-color: #25D366; border-color: #25D366;"
          aria-label="Envoyer un message WhatsApp au centre équestre"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
```

### Background Alternation Logic

The page header uses `bg-base-200`. The 5 service sections alternate starting with `bg-base-100` (index 0):

| Section | Class |
|---|---|
| Page header | `bg-base-200` |
| i=0 cours-enfants | `bg-base-100` |
| i=1 équitation-adulte | `bg-base-200` |
| i=2 pension-chevaux | `bg-base-100` |
| i=3 stages-vacances | `bg-base-200` |
| i=4 compétitions | `bg-base-100` |
| Informations générales | `bg-base-200` |
| CTA | `bg-base-100` |

This produces a clean, visually consistent rhythm through the page.

### Service ID → URL Map (Critical)

In Astro Content Collections v5, `service.id` is the file slug (filename without extension). These slugs map to URLs as follows:

| `service.id` | URL |
|---|---|
| `cours-enfants` | `/cours-enfants` |
| `equitation-adulte` | `/equitation-adulte` |
| `pension-chevaux` | `/pension-chevaux` |
| `stages-vacances` | `/stages-vacances` |
| `competitions` | `/competitions` |

The fallback `?? \`/${service.id}\`` handles any future service without needing to update the map.

### Pricing Data — Consolidated Reference

All data sourced from Content Collections at build time — this is the current snapshot for reference only:

**Cours enfants** (order: 1) → `/cours-enfants`
- Cours à l'unité: 25 €/séance
- Carte 10 séances: 220 €/carte
- Forfait annuel 40 séances: 700 €/an ⭐
- Stage vacances (5 jours): 180 €/stage
- Notes: Licence FFE 25 €/an mineurs ; −10 % dès le 2e enfant

**Cours adulte** (order: 2) → `/equitation-adulte`
- Cours à l'unité: 30 €/séance
- Carte 10 séances: 270 €/carte
- Forfait annuel 40 séances: 850 €/an ⭐
- Notes: Licence FFE 36 €/an ; casque prêté

**Pension chevaux** (order: 3) → `/pension-chevaux`
- Box individuel: 350 €/mois
- Paddock avec abri: 280 €/mois ⭐
- Pré: 200 €/mois
- Demi-pension: 180 €/mois
- Notes: Inclusions (foin, sortie paddock, suivi véto) ; vermifuge + maréchal-ferrant au réel

**Stages vacances** (order: 4) → `/stages-vacances`
- Demi-journée: 35 €/demi-journée
- Journée complète: 60 €/jour
- Mini-stage 3 jours: 165 €/stage
- Stage complet 5 jours: 250 €/semaine ⭐
- Notes: Licence FFE journalière incluse ; −10 % 2e enfant

**Compétitions** (order: 5) → `/competitions`
- Séance de préparation CSO: 30 €/séance
- Pack Saison Compétition: 180 €/saison ⭐
- Participation aux frais de transport: 20 €/concours
- Notes: Licence FFE compétition ~55 €/an ; droits d'engagement au réel

### Architecture Compliance

| Rule | Status for Story 2.8 |
|---|---|
| **TypeScript strict** | `getCollection()` returns `CollectionEntry<'services'>[]` — fully typed, no `any` |
| **Tailwind/daisyUI only** | All classes are Tailwind/daisyUI — no custom CSS; WhatsApp brand color via inline style (intentional architectural exception) |
| **Semantic HTML** | `<section>`, `<h1>`, `<h2>`, `<h3>`, `<table>`, `<ul>` — semantic throughout |
| **Content in French** | All visible text French; code/variable names English |
| **No new components** | Single page file only — existing `BaseLayout.astro` used |
| **No unit tests** | Per architecture: "No unit tests for MVP" |
| **Never hardcode phone/address** | CTA uses `business.ts` data for `phoneUrl` and `whatsappUrl` |
| **No ogImage field** | Known 404 bug from Story 2.4 — no `ogImage` prop passed to BaseLayout (uses default `/og-default.jpg`) |
| **No client-side JS** | Page is fully static — no interactive islands |
| **Tap targets ≥ 44px** | Both CTA buttons use `btn-lg min-h-[44px]` |

### Previous Story Intelligence (Stories 2.3–2.7)

| Learning | Impact on Story 2.8 |
|---|---|
| **Navigation already has /tarifs** | `navigation.ts` already has `{ label: 'Tarifs', href: '/tarifs' }` — confirmed. Do NOT touch. |
| **`getCollection()` for multi-service pages** | Story 2.8 is the first page to use `getCollection` instead of `getEntry` — standard Astro v5 API |
| **`astro check` AND `npm run build` both required** | Run both to verify — `astro check` catches TypeScript, `npm run build` catches runtime |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme/plugins in `src/styles/global.css` via `@theme`/`@plugin` |
| **WhatsApp inline style** | `style="background-color: #25D366"` — brand color, intentional inline exception |
| **Full French diacritics** | All content must use proper French diacritics — équitation, Côtes-d'Armor, etc. |
| **Don't add ogImage field** | Known 404 bug — the `public/` folder doesn't have per-service OG images yet |
| **`seoDescription` max ~140 chars** | Longer descriptions get truncated in SERPs (finding from Story 2.6) |
| **Transient "Duplicate id" warning** | Astro v5 first-sync artifact — disappears on second run, non-blocking |
| **ServicePage.astro uses BG[idx] alternation** | tarifs.astro uses simpler `i % 2` approach since all sections are always present |

### Git Intelligence (Recent Work)

Most recent commits:
1. `47be358` — Story 2-7 (Competitions page — 3 files created)
2. `00e44e9` — Story 2-6 (Holiday camps page — 3 files created)
3. `1b2eaf1` — Story 2-5 (Horse boarding page — 3 files created)
4. `eacbaed` — Story 2-4 (Adult riding page — 3 files created)
5. `637a029` — Story 2-3 (Children's lessons page content)

**Key pattern recognized:** Stories 2.3–2.7 each created 3 files (hero image + content .md + page .astro). Story 2.8 breaks this pattern — only 1 file is created because the tarifs page aggregates existing data rather than introducing new service content.

Repository is clean — no uncommitted changes.

### Project Structure Notes

**Current state of src/pages/ (all existing):**
```
src/pages/
├── index.astro             ← EXISTS
├── cours-enfants.astro     ← EXISTS (reference)
├── equitation-adulte.astro ← EXISTS (reference)
├── pension-chevaux.astro   ← EXISTS (reference)
├── stages-vacances.astro   ← EXISTS (reference)
├── competitions.astro      ← EXISTS (reference)
└── tarifs.astro            ← CREATE THIS (global pricing aggregation page)
```

**Files to CREATE (1 file only):**
```
src/pages/tarifs.astro   ← Custom pricing page using getCollection('services')
```

**Files to NOT touch:**
- `src/components/ServicePage.astro` — this page doesn't use it
- `src/components/PricingTable.astro` — inline pricing used in tarifs.astro instead (same pattern, custom headers)
- `src/content.config.ts` — no new schema fields needed
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — link `/tarifs` already exists
- `src/styles/global.css` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `package.json` — no new dependencies
- Any existing service `.md` files — data read-only at build time

### Key Technical Notes

**`getCollection('services')` vs `getEntry('services', slug)`:**
- Previous service pages used `getEntry` to load a single specific entry
- tarifs.astro uses `getCollection` to load ALL entries at once — standard Astro v5 API
- No need for `import.meta.glob` for images on this page — no hero image

**TypeScript note on `service.id`:**
- `CollectionEntry<'services'>` exposes `id: string` — the slug derived from the filename
- `service.id` for `src/content/services/cours-enfants.md` = `'cours-enfants'` (no .md extension)
- The `serviceHrefs` Record uses these slugs as keys

**TypeScript note on `service.data.pricing`:**
- Zod schema defines `pricing` as `z.array(z.object({...}))` — non-optional, always present
- TypeScript knows `pricing` is always an array — no null check needed
- `pricingNotes` is `z.array(z.string()).optional()` — check before rendering (already handled with conditional in the template)

**Astro JSX return from `.map()`:**
- In Astro, `.map()` in the template returns JSX directly — no explicit `return` keyword inside `.map((item, i) => (...))` callback with implicit return (arrow function with parentheses, not braces)
- The template above uses `(service, i) => (...)` with parentheses — this is the correct Astro JSX pattern

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.8: Global Pricing Page]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory FR3, FR30]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture — Content Collections schema]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: src/content.config.ts — Zod schema (pricing required array, pricingNotes optional)]
- [Source: src/content/services/cours-enfants.md — pricing data: 25€/séance, 220€/carte, 700€/an, 180€/stage]
- [Source: src/content/services/equitation-adulte.md — pricing data: 30€/séance, 270€/carte, 850€/an]
- [Source: src/content/services/pension-chevaux.md — pricing data: 350€/mois box, 280€/mois paddock, 200€/mois pré, 180€/mois demi-pension]
- [Source: src/content/services/stages-vacances.md — pricing data: 35€/demi-journée, 60€/jour, 165€/stage, 250€/semaine]
- [Source: src/content/services/competitions.md — pricing data: 30€/séance, 180€/saison, 20€/concours]
- [Source: src/data/navigation.ts — /tarifs link already present]
- [Source: src/layouts/BaseLayout.astro — Props interface (title, description, ogImage optional, whatsappMessage optional)]
- [Source: src/data/business.ts — phone, whatsapp fields for CTA URLs]
- [Source: src/components/PricingTable.astro — visual pattern replicated inline in tarifs.astro]
- [Source: _bmad-output/implementation-artifacts/2-7-competitions-page.md#Previous Story Intelligence — architecture compliance table]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None — implementation proceeded without issues._

### Completion Notes List

- Created `src/pages/tarifs.astro` as a data-aggregation page using `getCollection('services')` sorted by `order` field.
- Page renders 5 service pricing sections with alternating backgrounds (`i % 2`), desktop table + mobile stacked cards pattern (same visual as `PricingTable.astro`, inline).
- Each service section includes a "Voir la page complète →" link via `serviceHrefs` map keyed on `service.id`.
- "Informations générales" section includes Licence FFE breakdown (25€/36€/~55€/an) and −10% family reduction highlight.
- CTA section uses `business.ts` for phone and WhatsApp URLs; WhatsApp brand color applied via inline style (`#25D366`) per architectural exception.
- `BaseLayout` props: `title="Tarifs équitation Yffiniac"`, `description` ~132 chars (≤140), `whatsappMessage` passed.
- `astro check`: 0 errors, 0 warnings (2 pre-existing hints from `SchemaMarkup.astro`).
- `npm run build`: successful, `/tarifs/index.html` prerendered correctly.
- No new components created; no existing files modified. Navigation link already existed in `navigation.ts`.

### Code Review Fixes Applied

- **M1 [MEDIUM]** `aria-label` différenciant ajouté sur chaque lien "Voir la page complète →" : `aria-label={`Voir la page complète de ${service.data.title}`}` — accessibilité lecteur d'écran.
- **L1 [LOW]** `services.sort()` → `[...services].sort()` pour éviter la mutation du tableau source.
- **L3 [LOW]** Compte de chars de la description corrigé dans les Completion Notes : 97 → ~132 (toujours ≤140, conforme AC-6).
- **L4 [LOW]** Variable `cardBgClass` ajoutée dans le `.map()` pour que les cartes mobiles aient un fond en contraste avec leur section (`bg-base-200` si section `bg-base-100`, et vice-versa).
- **L5 [LOW]** `<caption class="sr-only">Tarifs {service.data.title}</caption>` ajouté dans chaque `<table>` pour l'accessibilité.

### File List

- `src/pages/tarifs.astro` (created, updated by code review)
