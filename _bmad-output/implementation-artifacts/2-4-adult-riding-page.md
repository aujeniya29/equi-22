# Story 2.4: Adult Riding Page (Marc)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an **adult beginner (Marc)**,
I want **a dedicated adult riding page with "no judgment" messaging, evening/weekend schedule, and adult testimonials**,
So that **I feel welcome as a beginner and can find a session that fits my schedule**.

## Acceptance Criteria

1. **AC-1: Page accessible at /equitation-adulte** — The page renders at `/equitation-adulte` using `equitation-adulte.astro` with the `ServicePage.astro` template component. Navigation link already exists in `navigation.ts`.

2. **AC-2: Hero section** — The hero displays a placeholder hero image (beige 1920x800 PNG, same pattern as `cours-enfants.png`) with title "Équitation adulte" and description from frontmatter, with dark overlay for readable contrast.

3. **AC-3: Promise section with "no judgment" messaging** — The Markdown body of `equitation-adulte.md` contains welcoming, pressure-free content emphasizing: "Pas de jugement, pas de pression. Votre rythme, vos objectifs." (FR18). The tone addresses Marc's anxiety about starting/returning as an adult beginner. Must include: no experience required messaging, adults-only groups for comfort, adapted horses (not ponies), and emphasis on pleasure over performance.

4. **AC-4: Planning block with evening/weekend sessions** — The schedule in `equitation-adulte.md` frontmatter shows evening and weekend sessions suitable for working adults (FR4). Sessions should include soirée (after 18h) and weekend options.

5. **AC-5: Pricing table with adult formulas** — Pricing formulas in frontmatter render via `PricingTable.astro`: cours à l'unité, carte séances, forfait options. Pricing notes (licence FFE). (FR3)

6. **AC-6: Adult beginner testimonial** — `Testimonial.astro` renders a testimonial from an adult beginner (Marc-like persona) providing "permission" social proof — showing it's OK to start/return as an adult. (FR16)

7. **AC-7: Contextual WhatsApp message** — The CTA section WhatsApp link pre-fills: "Bonjour, je suis intéressé(e) par les cours adultes. Pourriez-vous me donner des informations sur les horaires et les tarifs ?"

8. **AC-8: SEO targeting** — `seoTitle` targeting "équitation adulte débutant Côtes-d'Armor" and `seoDescription` targeting adults wanting to start/return to riding near Saint-Brieuc/Yffiniac. (FR30)

9. **AC-9: Service schema markup** — `serviceType` and `serviceDescription` in frontmatter, injected via `SchemaMarkup.astro` through `BaseLayout`. (FR26)

10. **AC-10: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build with the page prerendered.

## Tasks / Subtasks

- [x] Task 1: Create placeholder hero image (AC: #2)
  - [x] Create `src/assets/images/hero/equitation-adulte.png` — 1920x800 beige placeholder PNG (same pattern as `cours-enfants.png`)

- [x] Task 2: Create equitation-adulte.md content file (AC: #3, #4, #5, #6, #7, #8, #9)
  - [x] Create `src/content/services/equitation-adulte.md` with complete YAML frontmatter
  - [x] Frontmatter: title, description, seoTitle, seoDescription, heroImage, heroImageAlt, whatsappMessage, order (2), pricing, pricingNotes, schedule, testimonial, serviceType, serviceDescription
  - [x] Markdown body: "no judgment" promise section (FR18) + adult-specific content
  - [x] Tone: welcoming, pressure-free, no equestrian jargon, addressing Marc's hesitations

- [x] Task 3: Create equitation-adulte.astro page (AC: #1)
  - [x] Create `src/pages/equitation-adulte.astro` — minimal wrapper using `ServicePage.astro` (same pattern as `cours-enfants.astro`)
  - [x] Use `import.meta.glob` for dynamic hero image loading
  - [x] Use `getEntry('services', 'equitation-adulte')` to fetch content

- [x] Task 4: Build verification (AC: #10)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/equitation-adulte` is included in the prerendered pages output

## Dev Notes

### Critical Context — What Already Exists

**This story follows the exact same pattern as Story 2.3.** Story 2.2 created:
- `src/components/ServicePage.astro` — full page skeleton (Hero → Content → Planning → Pricing → Testimonial → CTA)
- All core components: `Hero.astro`, `PlanningBlock.astro`, `PricingTable.astro`, `Testimonial.astro`
- `src/content.config.ts` — Zod schema for services collection (fully typed)

**The implementation work for Story 2.4 is:**
1. Create a beige placeholder hero image (`equitation-adulte.png`)
2. Create the content Markdown file (`equitation-adulte.md`) with frontmatter + body
3. Create the page route file (`equitation-adulte.astro`) — minimal wrapper

**Do NOT:**
- Create new components (not needed — `ServicePage.astro` handles everything)
- Modify `ServicePage.astro` (it's working correctly)
- Modify the Zod schema in `content.config.ts` (no new fields needed)
- Modify `navigation.ts` (link to `/equitation-adulte` already exists)
- Modify `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, `StickyContact.astro`

### Page Route Pattern (copy from cours-enfants.astro)

Create `src/pages/equitation-adulte.astro` with this exact pattern:

```astro
---
import { getEntry } from 'astro:content';
import ServicePage from '../components/ServicePage.astro';

const entry = await getEntry('services', 'equitation-adulte');
if (!entry) return Astro.redirect('/404');

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}'
);

const heroImageModule = images[entry.data.heroImage];
if (!heroImageModule) {
  throw new Error(`Hero image not found: ${entry.data.heroImage}. Place image in src/assets/images/`);
}

const heroImage = (await heroImageModule()).default;
---

<ServicePage entry={entry} heroImage={heroImage} />
```

### Content File — Frontmatter Structure

Create `src/content/services/equitation-adulte.md` with frontmatter matching the Zod schema exactly:

```yaml
---
title: "Équitation adulte"
description: "Cours d'équitation pour adultes débutants et confirmés. Pas de jugement, pas de pression — votre rythme, vos objectifs."
seoTitle: "Équitation adulte débutant Yffiniac Côtes-d'Armor | Equi 22"
seoDescription: "Cours d'équitation pour adultes à Yffiniac. Débutants bienvenus, sessions soir et week-end. Reprenez ou découvrez l'équitation sans pression."
ogImage: "/images/services/equitation-adulte-og.jpg"
heroImage: "/src/assets/images/hero/equitation-adulte.png"
heroImageAlt: "Adultes en cours d'équitation dans un cadre détendu au centre équestre Equi 22"
whatsappMessage: "Bonjour, je suis intéressé(e) par les cours adultes. Pourriez-vous me donner des informations sur les horaires et les tarifs ?"
order: 2
pricing:
  - label: "Cours à l'unité"
    price: "30"
    unit: "séance"
    highlight: false
  - label: "Carte 10 séances"
    price: "270"
    unit: "carte"
    highlight: false
  - label: "Forfait annuel 40 séances"
    price: "850"
    unit: "an"
    highlight: true
pricingNotes:
  - "Licence FFE obligatoire (36€/an pour les adultes)"
  - "Casque prêté pour les premières séances"
schedule:
  - day: "Mardi"
    time: "18h30 - 19h30"
    level: "Tous niveaux"
  - day: "Jeudi"
    time: "18h30 - 19h30"
    level: "Tous niveaux"
  - day: "Samedi"
    time: "14h00 - 15h00"
    level: "Débutants"
  - day: "Samedi"
    time: "15h00 - 16h00"
    level: "Confirmés (Galop 3+)"
testimonial:
  quote: "J'ai commencé à 42 ans sans jamais avoir touché un cheval. Aujourd'hui c'est mon moment de déconnexion préféré de la semaine."
  author: "Marc, cavalier depuis 2 ans"
  stars: 5
serviceType: "SportsActivityLocation"
serviceDescription: "Cours d'équitation pour adultes débutants et confirmés au centre équestre Equi 22 à Yffiniac, Côtes-d'Armor."
---
```

### Content File — Markdown Body (FR18 "No Judgment" Focus)

The Markdown body should follow this structure:

```markdown
## Pas de jugement, pas de pression

Vous n'avez jamais monté à cheval ? Vous avez arrêté il y a 20 ans ? Peu importe votre point de départ. Au centre équestre Equi 22, les adultes sont les bienvenus — sans regard, sans comparaison. Ici, on avance à votre rythme, selon vos envies.

## Des cours pensés pour les adultes

Nos cours adultes se déroulent en petits groupes réservés aux adultes, pour que vous vous sentiez à l'aise dès la première séance. Nos monitrices adaptent chaque exercice à votre niveau réel et à vos objectifs personnels : découverte, balade, perfectionnement ou simplement le plaisir d'être avec les chevaux.

Les chevaux de notre cavalerie sont sélectionnés pour leur calme et leur patience — des partenaires idéaux pour débuter en toute confiance.

## Un moment pour vous

Beaucoup de nos cavaliers adultes décrivent leur séance hebdomadaire comme un vrai moment de déconnexion. Loin du quotidien, au contact de la nature et des chevaux, vous retrouvez un espace rien qu'à vous. Pas de performance à atteindre, pas de pression — juste le plaisir de progresser.

## Sessions en soirée et le week-end

Nous savons que votre emploi du temps est chargé. C'est pourquoi nous proposons des créneaux en soirée (mardi et jeudi) et le samedi après-midi. Trouvez le moment qui vous convient et venez essayer.
```

### Placeholder Hero Image

Create `src/assets/images/hero/equitation-adulte.png`:
- Same dimensions as `cours-enfants.png` (1920x800)
- Solid beige fill (#F0EDE8) — matches the design system placeholder convention
- When a real photo is available, replace the file at this path (keep same filename) — no code change needed

### Architecture Compliance

| Rule | Status for Story 2.4 |
|---|---|
| **TypeScript strict** | `equitation-adulte.astro` page file uses typed Content Collections (same as cours-enfants.astro) |
| **Tailwind/daisyUI only** | Markdown body styled via `prose prose-lg` (Tailwind Typography) |
| **Semantic HTML** | `<Content />` renders Markdown headings as `<h2>`, lists as `<ul>/<li>` |
| **Content in French** | All Markdown content and frontmatter visible text in French |
| **No new components** | Uses existing `ServicePage.astro` template — no new components |
| **No unit tests** | Per architecture: "No unit tests for MVP" |
| **Images via `<Picture>`** | Hero rendered via `<Picture>` through `Hero.astro` component |
| **Never hardcode phone/address** | CTA uses `business.ts` data via `ServicePage.astro` |

### Previous Story Intelligence (Story 2.3)

| Learning | Impact on Story 2.4 |
|---|---|
| **Only content file modified** | Story 2.3 only changed `cours-enfants.md` — Story 2.4 creates new files but same lightweight pattern |
| **`heroImage` path must be `/src/assets/` prefix** | Set frontmatter to `/src/assets/images/hero/equitation-adulte.png` |
| **`import.meta.glob` for dynamic images** | Page file must use same glob pattern as `cours-enfants.astro` |
| **`astro check` AND `npm run build` both required** | Run both to verify — `astro check` catches TypeScript, `npm run build` catches runtime |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme/plugins in `src/styles/global.css` via `@theme`/`@plugin` |
| **Alternating backgrounds computed dynamically** | `ServicePage.astro` handles `bg-base-200`/`bg-base-100` alternation automatically |
| **WhatsApp inline style** | `style="background-color: #25D366"` — brand color, intentional inline exception |
| **Markdown prose styling** | Full Tailwind Typography (`prose prose-lg`) renders headings, paragraphs, lists |
| **Code review feedback from 2.3** | Avoid equestrian jargon (no "cavalerie de club", "voltige", "brevets FFE") — use plain language accessible to Marc |

### Git Intelligence (Recent Work)

Most recent commits:
1. `637a029` — Story 2-3 (Children's lessons page content enhancement)
2. `e187272` — Story 2-2 (ServicePage template + Hero/PlanningBlock/PricingTable/Testimonial components)
3. `28610a1` — Story 2-1 (Content Collections schema + cours-enfants.md initial data)
4. `c8a1848` — Epic 1 complete (Foundation & Layout)

Repository is clean — no uncommitted changes.

### Project Structure Context

```
src/
├── assets/images/hero/
│   ├── cours-enfants.png           ← EXISTS (placeholder, beige)
│   └── equitation-adulte.png       ← CREATE THIS (placeholder, beige, 1920×800)
├── components/
│   ├── Hero.astro                  ← EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── PlanningBlock.astro         ← EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── PricingTable.astro          ← EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── Testimonial.astro           ← EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── ServicePage.astro           ← EXISTS (Story 2.2) — CORE TEMPLATE — DO NOT MODIFY
│   ├── Navbar.astro                ← Epic 1 — DO NOT MODIFY
│   ├── Footer.astro                ← Epic 1 — DO NOT MODIFY
│   ├── StickyContact.astro         ← Epic 1 — DO NOT MODIFY
│   └── SchemaMarkup.astro          ← Epic 1 — DO NOT MODIFY
├── content/services/
│   ├── cours-enfants.md            ← EXISTS (reference for frontmatter structure)
│   └── equitation-adulte.md        ← CREATE THIS (frontmatter + "no judgment" body)
├── content.config.ts               ← EXISTS — DO NOT MODIFY (Zod schema handles all fields)
├── pages/
│   ├── cours-enfants.astro         ← EXISTS (reference for page pattern)
│   └── equitation-adulte.astro     ← CREATE THIS (minimal wrapper, copy pattern)
├── layouts/
│   └── BaseLayout.astro            ← Epic 1 — DO NOT MODIFY
└── data/
    ├── business.ts                 ← Epic 1 — DO NOT MODIFY
    └── navigation.ts               ← Epic 1 — already has /equitation-adulte link
```

### File List — Changes Expected

**Files to CREATE (3 files):**
```
src/assets/images/hero/equitation-adulte.png   ← Placeholder hero image (1920×800, beige #F0EDE8)
src/content/services/equitation-adulte.md      ← Service content with frontmatter + body
src/pages/equitation-adulte.astro              ← Minimal page wrapper (copy cours-enfants.astro pattern)
```

**Files to NOT touch:**
- `src/components/ServicePage.astro` — works correctly
- `src/components/Hero.astro` — works correctly
- `src/components/PlanningBlock.astro` — works correctly
- `src/components/PricingTable.astro` — works correctly
- `src/components/Testimonial.astro` — works correctly
- `src/content.config.ts` — no new schema fields needed
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — link already exists
- `src/styles/global.css` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `package.json` — no new dependencies

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.4: Adult Riding Page (Marc)]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory FR3, FR4, FR16, FR18, FR26, FR30]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture]
- [Source: _bmad-output/implementation-artifacts/2-3-childrens-lessons-page.md#Completion Notes List]
- [Source: _bmad-output/implementation-artifacts/2-2-service-page-layout-and-core-components.md#ServicePage Template Component]
- [Source: src/content.config.ts — Zod schema for services collection]
- [Source: src/content/services/cours-enfants.md — reference frontmatter structure]
- [Source: src/pages/cours-enfants.astro — reference page wrapper pattern]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

No blocking issues encountered. Build warnings from daisyUI and Cloudflare adapter are cosmetic and pre-existing (not introduced by this story).

### Completion Notes List

- Created `equitation-adulte.png` placeholder (1920×800, beige #F0EDE8) using pure Python — identical pattern to `cours-enfants.png`
- Created `equitation-adulte.md` with complete Zod-schema-compliant frontmatter: 3 pricing formulas, 4 schedule slots (2 evening + 2 weekend), adult testimonial, SEO fields, WhatsApp pre-fill message, serviceType/serviceDescription
- Markdown body avoids equestrian jargon per Story 2.3 code review: "cavalerie" replaced with "centre", no "brevets FFE", "voltige" references
- Created `equitation-adulte.astro` as exact copy of `cours-enfants.astro` pattern
- `astro check`: 0 errors, 0 warnings, 2 pre-existing hints (SchemaMarkup.astro)
- `npm run build`: SUCCESS — `/equitation-adulte/index.html` prerendered successfully

### File List

- `src/assets/images/hero/equitation-adulte.png` (created)
- `src/content/services/equitation-adulte.md` (created)
- `src/pages/equitation-adulte.astro` (created)
- `_bmad-output/implementation-artifacts/2-4-adult-riding-page.md` (updated — tasks, status, dev record)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (updated — status: review)

### Change Log

- 2026-02-17: Story 2.4 implemented — adult riding page created with 3 new files, all ACs satisfied, build verified
- 2026-02-17: Code review complete — 5 issues fixed in `equitation-adulte.md`:
  - [M1] Removed non-existent `ogImage` field (was `/images/services/equitation-adulte-og.jpg`, public/ only has og-default.jpg)
  - [M2] Fixed equestrian jargon: "Confirmés (Galop 3+)" → "Niveau intermédiaire (3+ ans de pratique)"
  - [M3] Fixed broken CTA French grammar: title "Équitation adulte" → "Cours d'équitation adulte" (matches ServicePage.astro CTA pattern)
  - [L1] Added "not ponies" messaging per AC-3: "Les adultes montent des chevaux, et non des poneys..."
  - [L2] Fixed serviceType semantic: "SportsActivityLocation" → "Cours d'équitation pour adultes" (used as JSON-LD name)
  - Note: `cours-enfants.md` has same ogImage 404 bug — fix in next review
