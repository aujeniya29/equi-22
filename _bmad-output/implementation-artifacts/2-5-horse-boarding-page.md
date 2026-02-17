# Story 2.5: Horse Boarding Page (Claire)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **horse owner (Claire)**,
I want **a dedicated boarding page with facility details, inclusions checklist, welfare proof, and transparent pricing**,
So that **I can evaluate if my horse will be well cared for and compare value with my current facility**.

## Acceptance Criteria

1. **AC-1: Page accessible at /pension-chevaux** — The page renders at `/pension-chevaux` using `pension-chevaux.astro` with the `ServicePage.astro` template component. Navigation link already exists in `navigation.ts`.

2. **AC-2: Hero section** — The hero displays a placeholder hero image (beige 1920x800 PNG, same pattern as `cours-enfants.png` and `equitation-adulte.png`) with title "Pension chevaux" and description from frontmatter, with dark overlay for readable contrast.

3. **AC-3: Content with "what's included" checklist** — The Markdown body of `pension-chevaux.md` contains a detailed "what's included" checklist covering: cleaning frequency, feed details, paddock access, vet protocol, and farrier coordination (FR19). The checklist must be concrete and transparent — no vague claims, only verifiable facts.

4. **AC-4: Animal welfare evidence** — The Markdown body includes concrete animal welfare details: matelas de box, foin a volonte, osteopathe, dentiste equin, protocole vermifuge, acces quotidien au paddock. These must be factual claims, not marketing language — "show, don't tell" per UX design principles.

5. **AC-5: Pricing table with boarding formulas** — Pricing formulas in frontmatter render via `PricingTable.astro`: box, paddock, pre. All inclusions transparent — no asterisks, no hidden fees (FR3). Pricing notes include what's included in the base price.

6. **AC-6: Horse owner testimonial** — `Testimonial.astro` renders a testimonial from a horse owner (Claire-like persona) providing trust proof about facility quality and horse welfare. (FR16)

7. **AC-7: Contextual WhatsApp message** — The CTA section WhatsApp link pre-fills: "Bonjour, je suis interesse(e) par la pension chevaux. Pourriez-vous me donner des informations sur les formules et organiser une visite des installations ?"

8. **AC-8: SEO targeting** — `seoTitle` targeting "pension chevaux Saint-Brieuc" and `seoDescription` targeting horse owners seeking quality boarding near Yffiniac/Saint-Brieuc. (FR30)

9. **AC-9: Service schema markup** — `serviceType` and `serviceDescription` in frontmatter, injected via `SchemaMarkup.astro` through `BaseLayout`. (FR26)

10. **AC-10: No schedule section** — The boarding page does NOT include a schedule/planning block (schedule is optional in the Zod schema). Boarding is not a time-slotted service like lessons.

11. **AC-11: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build with the page prerendered.

## Tasks / Subtasks

- [x] Task 1: Create placeholder hero image (AC: #2)
  - [x] Create `src/assets/images/hero/pension-chevaux.png` — 1920x800 beige placeholder PNG (same pattern as `cours-enfants.png`)

- [x] Task 2: Create pension-chevaux.md content file (AC: #3, #4, #5, #6, #7, #8, #9, #10)
  - [x] Create `src/content/services/pension-chevaux.md` with complete YAML frontmatter
  - [x] Frontmatter: title, description, seoTitle, seoDescription, heroImage, heroImageAlt, whatsappMessage, order (3), pricing, pricingNotes, testimonial, serviceType, serviceDescription
  - [x] NO schedule field in frontmatter (boarding has no time slots)
  - [x] Markdown body: facilities presentation, "what's included" checklist (FR19), animal welfare evidence, boarding formulas description
  - [x] Tone: transparent, factual, concrete — Claire compares facilities and needs verifiable details

- [x] Task 3: Create pension-chevaux.astro page (AC: #1)
  - [x] Create `src/pages/pension-chevaux.astro` — minimal wrapper using `ServicePage.astro` (same pattern as `equitation-adulte.astro`)
  - [x] Use `import.meta.glob` for dynamic hero image loading
  - [x] Use `getEntry('services', 'pension-chevaux')` to fetch content

- [x] Task 4: Build verification (AC: #11)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/pension-chevaux` is included in the prerendered pages output

## Dev Notes

### Critical Context — What Already Exists

**This story follows the exact same pattern as Stories 2.3 and 2.4.** Story 2.2 created:
- `src/components/ServicePage.astro` — full page skeleton (Hero -> Content -> Planning -> Pricing -> Testimonial -> CTA)
- All core components: `Hero.astro`, `PlanningBlock.astro`, `PricingTable.astro`, `Testimonial.astro`
- `src/content.config.ts` — Zod schema for services collection (fully typed)

**The `schedule` field is optional in the Zod schema.** Omitting it from the frontmatter means `ServicePage.astro` will NOT render the PlanningBlock section. This is correct for boarding — it's not a time-slotted service.

**The implementation work for Story 2.5 is:**
1. Create a beige placeholder hero image (`pension-chevaux.png`)
2. Create the content Markdown file (`pension-chevaux.md`) with frontmatter + body
3. Create the page route file (`pension-chevaux.astro`) — minimal wrapper

**Do NOT:**
- Create new components (not needed — `ServicePage.astro` handles everything)
- Modify `ServicePage.astro` (it's working correctly)
- Modify the Zod schema in `content.config.ts` (no new fields needed)
- Modify `navigation.ts` (link to `/pension-chevaux` already exists)
- Modify `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, `StickyContact.astro`
- Add an `ogImage` field (known 404 bug from Story 2.4 — the file doesn't exist in public/)

### Page Route Pattern (copy from equitation-adulte.astro)

Create `src/pages/pension-chevaux.astro` with this exact pattern:

```astro
---
import { getEntry } from 'astro:content';
import ServicePage from '../components/ServicePage.astro';

const entry = await getEntry('services', 'pension-chevaux');
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

Create `src/content/services/pension-chevaux.md` with frontmatter matching the Zod schema exactly:

```yaml
---
title: "Pension chevaux"
description: "Pension pour chevaux et poneys a Yffiniac. Box, paddock ou pre — des installations soignees, une alimentation de qualite et un suivi veterinaire rigoureux."
seoTitle: "Pension chevaux Saint-Brieuc Yffiniac | Equi 22"
seoDescription: "Pension pour chevaux a Yffiniac pres de Saint-Brieuc. Box, paddock, pre. Installations entretenues, foin a volonte, suivi veterinaire. Visitez nos installations."
heroImage: "/src/assets/images/hero/pension-chevaux.png"
heroImageAlt: "Installations de pension pour chevaux au centre equestre Equi 22 a Yffiniac"
whatsappMessage: "Bonjour, je suis interesse(e) par la pension chevaux. Pourriez-vous me donner des informations sur les formules et organiser une visite des installations ?"
order: 3
pricing:
  - label: "Box individuel"
    price: "350"
    unit: "mois"
    highlight: false
  - label: "Paddock avec abri"
    price: "280"
    unit: "mois"
    highlight: true
  - label: "Pre"
    price: "200"
    unit: "mois"
    highlight: false
  - label: "Demi-pension"
    price: "180"
    unit: "mois"
    highlight: false
pricingNotes:
  - "Tous les tarifs incluent : alimentation (foin a volonte + complements), sortie quotidienne au paddock, suivi veterinaire de base"
  - "Vermifuge et soins dentaires organises collectivement (cout au reel)"
  - "Marechal-ferrant coordonne par le centre (cout au reel)"
testimonial:
  quote: "Depuis que mes chevaux sont a Equi 22, je dors tranquille. Les installations sont impeccables et Aurelia me tient informee au moindre souci."
  author: "Claire, proprietaire de 2 chevaux"
  stars: 5
serviceType: "Pension pour chevaux et poneys"
serviceDescription: "Pension equine au centre equestre Equi 22 a Yffiniac. Box, paddock et pre avec alimentation de qualite, suivi veterinaire et acces aux installations du centre."
---
```

### Content File — Markdown Body (FR19 Checklist + Welfare Focus)

The Markdown body should follow this structure — **significantly richer than lessons pages** because Claire needs more detail before calling (higher commitment = more information needed):

```markdown
## Des installations pensees pour le bien-etre de votre cheval

Au centre equestre Equi 22, la pension n'est pas un service annexe — c'est un engagement. Chaque cheval est accueilli comme un membre de la famille. Nos installations a Yffiniac, entre campagne et littoral breton, offrent un cadre de vie ideal : espace, calme et air frais.

## Ce qui est inclus dans votre pension

Chez nous, pas de petites lignes ni de supplements caches. Voici ce que chaque formule de pension inclut :

- **Alimentation** — Foin a volonte distribue matin et soir, complements alimentaires adaptes au besoin de chaque cheval
- **Sortie quotidienne** — Acces au paddock tous les jours, quelle que soit la formule choisie
- **Nettoyage** — Box cure et litiere refaite quotidiennement (formule box)
- **Suivi veterinaire** — Surveillance quotidienne par notre equipe, appel veterinaire en cas de besoin
- **Coordination marechal-ferrant** — Organisation des rendez-vous, vous n'avez qu'a valider
- **Protocole vermifuge** — Vermifugation collective organisee par le centre (4 fois par an)
- **Acces aux installations** — Carriere, manege couvert et chemins de balade accessibles aux proprietaires

## Le bien-etre animal, en actes

On ne vous dira pas "nous aimons les chevaux" — on vous montre comment :

- **Matelas de box** — Litiere epaisse et confortable, renouvelee chaque jour
- **Foin a volonte** — Pas de rationnement, distribution genereuse matin et soir
- **Osteopathe et dentiste equin** — Interventions organisees regulierement par le centre
- **Paddocks spacieux** — Rotation des parcelles pour preserver la qualite des sols
- **Pas de box 24h/24** — Chaque cheval sort tous les jours, sans exception
- **Surveillance attentive** — Notre equipe connait chaque cheval par son nom et ses habitudes

## Trois formules, une meme exigence de qualite

Que vous choisissiez le box, le paddock ou le pre, le niveau de soin est identique. Seul l'hebergement change — l'alimentation, le suivi et l'acces aux installations sont les memes pour tous.

### Box individuel
Un box spacieux avec matelas de litiere, cure et refait chaque jour. Ideal pour les chevaux qui ont besoin d'un espace personnel au calme.

### Paddock avec abri
Un paddock individuel ou en petit groupe avec abri couvert. Le meilleur rapport espace/confort pour les chevaux qui aiment vivre dehors.

### Pre
La vie au grand air dans nos prairies bretonnes. Ideal pour les chevaux au repos ou les poneys rustiques.

## Vous etes proprietaire ? Venez visiter.

La meilleure facon de juger une pension, c'est de la voir. Appelez-nous pour planifier une visite des installations — on vous montre tout, sans rendez-vous formel. Vous pourrez rencontrer l'equipe, voir les chevaux au paddock et poser toutes vos questions.
```

### Placeholder Hero Image

Create `src/assets/images/hero/pension-chevaux.png`:
- Same dimensions as `cours-enfants.png` and `equitation-adulte.png` (1920x800)
- Solid beige fill (#F0EDE8) — matches the design system placeholder convention
- When real facility photos are available, replace the file at this path (keep same filename) — no code change needed

### Architecture Compliance

| Rule | Status for Story 2.5 |
|---|---|
| **TypeScript strict** | `pension-chevaux.astro` page file uses typed Content Collections (same as equitation-adulte.astro) |
| **Tailwind/daisyUI only** | Markdown body styled via `prose prose-lg` (Tailwind Typography) |
| **Semantic HTML** | `<Content />` renders Markdown headings as `<h2>`, lists as `<ul>/<li>` |
| **Content in French** | All Markdown content and frontmatter visible text in French |
| **No new components** | Uses existing `ServicePage.astro` template — no new components |
| **No unit tests** | Per architecture: "No unit tests for MVP" |
| **Images via `<Picture>`** | Hero rendered via `<Picture>` through `Hero.astro` component |
| **Never hardcode phone/address** | CTA uses `business.ts` data via `ServicePage.astro` |
| **No ogImage field** | Known bug from Story 2.4 — field omitted intentionally |

### Previous Story Intelligence (Stories 2.3 + 2.4)

| Learning | Impact on Story 2.5 |
|---|---|
| **Only 3 files to create** | Stories 2.3 and 2.4 both created exactly 3 files — same pattern here |
| **`heroImage` path must be `/src/assets/` prefix** | Set frontmatter to `/src/assets/images/hero/pension-chevaux.png` |
| **`import.meta.glob` for dynamic images** | Page file must use same glob pattern as `equitation-adulte.astro` |
| **`astro check` AND `npm run build` both required** | Run both to verify — `astro check` catches TypeScript, `npm run build` catches runtime |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme/plugins in `src/styles/global.css` via `@theme`/`@plugin` |
| **Alternating backgrounds computed dynamically** | `ServicePage.astro` handles `bg-base-200`/`bg-base-100` alternation automatically |
| **WhatsApp inline style** | `style="background-color: #25D366"` — brand color, intentional inline exception |
| **Markdown prose styling** | Full Tailwind Typography (`prose prose-lg`) renders headings, paragraphs, lists |
| **Avoid equestrian jargon** | Use plain French accessible to non-expert horse owners — no FFE codes, no technical terms without explanation |
| **Don't add ogImage field** | Known 404 bug — the public/ folder doesn't have per-service OG images yet |
| **`serviceType` used as JSON-LD name** | Use descriptive French label, not schema.org technical type |
| **Schedule is optional** | Omit `schedule` from frontmatter — `ServicePage.astro` skips `PlanningBlock` when absent |

### Git Intelligence (Recent Work)

Most recent commits:
1. `eacbaed` — Story 2-4 (Adult riding page — 3 files created)
2. `637a029` — Story 2-3 (Children's lessons page content)
3. `e187272` — Story 2-2 (ServicePage template + components)
4. `28610a1` — Story 2-1 (Content Collections schema)
5. `c8a1848` — Epic 1 complete (Foundation & Layout)

Repository is clean — no uncommitted changes.

### UX-Specific Notes for Boarding Page

Per UX Design Specification, Claire's journey is **longer than Sophie/Marc**:
- Higher commitment (monthly boarding) = needs more information before calling
- The conversion is "planifier une visite", NOT "reserver un essai"
- Key emotional triggers: facility photos, inclusion checklist, welfare proof
- Claire is **comparing** with her current facility — transparency is the differentiator
- The Markdown body is intentionally richer and longer than lessons pages

The CTA text in `ServicePage.astro` uses the service title. The WhatsApp pre-fill message explicitly mentions "organiser une visite des installations" to match Claire's journey.

### Project Structure Context

```
src/
├── assets/images/hero/
│   ├── cours-enfants.png           <- EXISTS (placeholder, beige)
│   ├── equitation-adulte.png       <- EXISTS (placeholder, beige)
│   └── pension-chevaux.png         <- CREATE THIS (placeholder, beige, 1920x800)
├── components/
│   ├── Hero.astro                  <- EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── PlanningBlock.astro         <- EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── PricingTable.astro          <- EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── Testimonial.astro           <- EXISTS (Story 2.2) — DO NOT MODIFY
│   ├── ServicePage.astro           <- EXISTS (Story 2.2) — CORE TEMPLATE — DO NOT MODIFY
│   ├── Navbar.astro                <- Epic 1 — DO NOT MODIFY
│   ├── Footer.astro                <- Epic 1 — DO NOT MODIFY
│   ├── StickyContact.astro         <- Epic 1 — DO NOT MODIFY
│   └── SchemaMarkup.astro          <- Epic 1 — DO NOT MODIFY
├── content/services/
│   ├── cours-enfants.md            <- EXISTS (reference for frontmatter structure)
│   ├── equitation-adulte.md        <- EXISTS (reference for frontmatter structure)
│   └── pension-chevaux.md          <- CREATE THIS (frontmatter + boarding content body)
├── content.config.ts               <- EXISTS — DO NOT MODIFY (Zod schema handles all fields)
├── pages/
│   ├── cours-enfants.astro         <- EXISTS (reference for page pattern)
│   ├── equitation-adulte.astro     <- EXISTS (reference for page pattern)
│   └── pension-chevaux.astro       <- CREATE THIS (minimal wrapper, copy pattern)
├── layouts/
│   └── BaseLayout.astro            <- Epic 1 — DO NOT MODIFY
└── data/
    ├── business.ts                 <- Epic 1 — DO NOT MODIFY
    └── navigation.ts               <- Epic 1 — already has /pension-chevaux link
```

### File List — Changes Expected

**Files to CREATE (3 files):**
```
src/assets/images/hero/pension-chevaux.png   <- Placeholder hero image (1920x800, beige #F0EDE8)
src/content/services/pension-chevaux.md      <- Service content with frontmatter + body
src/pages/pension-chevaux.astro              <- Minimal page wrapper (copy equitation-adulte.astro pattern)
```

**Files to NOT touch:**
- `src/components/ServicePage.astro` — works correctly
- `src/components/Hero.astro` — works correctly
- `src/components/PlanningBlock.astro` — works correctly (skipped when no schedule)
- `src/components/PricingTable.astro` — works correctly
- `src/components/Testimonial.astro` — works correctly
- `src/content.config.ts` — no new schema fields needed
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — link already exists
- `src/styles/global.css` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `package.json` — no new dependencies

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.5: Horse Boarding Page (Claire)]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory FR3, FR16, FR19, FR26, FR30]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Journey 3: Claire — Pension pour mon cheval]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Flow Optimization Principles]
- [Source: _bmad-output/implementation-artifacts/2-4-adult-riding-page.md#Completion Notes List]
- [Source: _bmad-output/implementation-artifacts/2-4-adult-riding-page.md#Previous Story Intelligence]
- [Source: src/content.config.ts — Zod schema for services collection (schedule is optional)]
- [Source: src/content/services/equitation-adulte.md — reference frontmatter structure]
- [Source: src/pages/equitation-adulte.astro — reference page wrapper pattern]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

No issues encountered. Implementation followed the exact same pattern as Stories 2.3 and 2.4.

### Completion Notes List

- Created beige placeholder hero image (1920x800, #F0EDE8) using pure Python PNG generation — matches pattern of existing `cours-enfants.png` and `equitation-adulte.png`
- Created `pension-chevaux.md` with complete frontmatter: all required fields present, NO `schedule` field (boarding is not a time-slotted service), NO `ogImage` field (known bug from Story 2.4)
- Content body is intentionally richer than lessons pages — Claire (horse owner persona) needs more detail before committing to monthly boarding: includes FR19 "what's included" checklist, concrete animal welfare evidence (matelas de box, foin a volonte, osteopathe, dentiste equin, protocole vermifuge, acces quotidien au paddock), three formula descriptions
- Created `pension-chevaux.astro` as minimal wrapper — identical pattern to `equitation-adulte.astro` with `import.meta.glob` for dynamic hero image loading
- `astro check`: 0 errors, 0 warnings (2 pre-existing hints in SchemaMarkup.astro, unrelated to this story)
- `npm run build`: successful — `/pension-chevaux/index.html` prerendered, 12 optimized image variants generated
- No existing components, schema, or navigation modified — architecture compliance confirmed

### File List

- `src/assets/images/hero/pension-chevaux.png` (created)
- `src/content/services/pension-chevaux.md` (created, updated by code review)
- `src/pages/pension-chevaux.astro` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

### Change Log

- 2026-02-17: Story 2.5 implemented — Horse Boarding Page (/pension-chevaux) created with hero image, content file (frontmatter + rich Markdown body), and page route. Build verified.
- 2026-02-17: Code review fixes applied — (1) Added full French diacritics throughout pension-chevaux.md (frontmatter + Markdown body); (2) Replaced marketing intro language with factual description; (3) Renamed "Trois formules" → "Nos formules de pension" and added Demi-pension section in body; (4) Moved "Nettoyage (box only)" out of general inclusions list into Box individuel section; (5) Added sprint-status.yaml to File List.
