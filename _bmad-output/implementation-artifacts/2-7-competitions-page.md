# Story 2.7: Competitions Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **rider**,
I want **a dedicated competitions page with the center's competition program and results**,
So that **I can see the competition culture and plan my participation**.

## Acceptance Criteria

1. **AC-1: Page accessible at /competitions** — The page renders at `/competitions` using `competitions.astro` with the `ServicePage.astro` template component. Navigation link already exists in `navigation.ts`.

2. **AC-2: Hero section** — The hero displays a placeholder hero image (beige 1920x800 PNG, same pattern as `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png`, `stages-vacances.png`) with title "Compétitions équestres" and description from frontmatter, with dark overlay for readable contrast.

3. **AC-3: Competition content — disciplines and philosophy** — The Markdown body of `competitions.md` describes the disciplines practised (CSO — Concours de Saut d'Obstacles, Hunter), the competition philosophy (progression, fun, participation over podium), and the level requirement (from Galop 4 onwards). Content targets the rider persona who wants to know if competition is accessible to them.

4. **AC-4: Seasonal competition dates** — Dates use seasonal labels only ("Saison printanière", "Saison automnale", etc.) — never absolute calendar dates. A "Prochain concours à venir — contactez-nous pour le calendrier" message is included for off-season periods. No build-time date comparison logic is implemented (same approach as Story 2.6: dates handled via seasonal labels in Markdown body; `ServicePage.astro` not modified).

5. **AC-5: Pricing table with competition-related costs** — Pricing formulas in frontmatter render via `PricingTable.astro`: séance de préparation CSO, pack saison compétition (highlighted as best value), participation aux frais de transport par concours. Pricing notes clarify that FFE licence is mandatory and droits d'engagement are set by the organising federation (not included in center fees). (FR3)

6. **AC-6: Rider testimonial** — `Testimonial.astro` renders a testimonial from a rider who competed with the center, providing social proof about the supportive coaching and fun atmosphere. (FR16)

7. **AC-7: Contextual WhatsApp message** — The CTA section WhatsApp link pre-fills: "Bonjour, je suis intéressé(e) par les compétitions équestres. Pourriez-vous me donner des informations sur le programme de la saison et les conditions de participation ?"

8. **AC-8: SEO targeting** — `seoTitle` targeting "compétition équitation Côtes-d'Armor" and `seoDescription` targeting riders seeking competition opportunities near Yffiniac/Saint-Brieuc. (FR30)

9. **AC-9: Service schema markup** — `serviceType` and `serviceDescription` in frontmatter, injected via `SchemaMarkup.astro` through `BaseLayout`. (FR26)

10. **AC-10: No schedule section** — The competitions page does NOT include a weekly planning block (`schedule` field omitted from frontmatter). Competitions have a seasonal calendar, not recurring weekly slots — the `PlanningBlock.astro` component is designed for weekly timetables.

11. **AC-11: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build with the page prerendered.

## Tasks / Subtasks

- [x] Task 1: Create placeholder hero image (AC: #2)
  - [x] Create `src/assets/images/hero/competitions.png` — 1920x800 beige placeholder PNG using pure Python PNG generation (same method as `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png`, `stages-vacances.png`)

- [x] Task 2: Create competitions.md content file (AC: #3, #4, #5, #6, #7, #8, #9, #10)
  - [x] Create `src/content/services/competitions.md` with complete YAML frontmatter
  - [x] Frontmatter: title, description, seoTitle, seoDescription, heroImage, heroImageAlt, whatsappMessage, order (5), pricing (3 formulas), pricingNotes, testimonial, serviceType, serviceDescription
  - [x] NO schedule field in frontmatter (seasonal competition calendar, not weekly slots)
  - [x] NO ogImage field (known 404 bug from Stories 2.4/2.5 — no per-service OG images in public/ yet)
  - [x] Markdown body: disciplines description, competition philosophy, level requirements, seasonal calendar messaging

- [x] Task 3: Create competitions.astro page (AC: #1)
  - [x] Create `src/pages/competitions.astro` — minimal wrapper using `ServicePage.astro` (same pattern as `stages-vacances.astro`)
  - [x] Use `import.meta.glob` for dynamic hero image loading
  - [x] Use `getEntry('services', 'competitions')` to fetch content

- [x] Task 4: Build verification (AC: #11)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/competitions` is included in the prerendered pages output

## Dev Notes

### Critical Context — What Already Exists

**This story follows the exact same pattern as Stories 2.3, 2.4, 2.5, and 2.6.** Story 2.2 created:
- `src/components/ServicePage.astro` — full page skeleton (Hero → Content → Planning → Pricing → Testimonial → CTA)
- All core components: `Hero.astro`, `PlanningBlock.astro`, `PricingTable.astro`, `Testimonial.astro`
- `src/content.config.ts` — Zod schema for services collection (fully typed)

**The `schedule` field is optional in the Zod schema.** Omitting it from the frontmatter means `ServicePage.astro` will NOT render the PlanningBlock section. Correct for competitions — they have a seasonal calendar, not fixed weekly recurring slots.

**Navigation already exists.** `src/data/navigation.ts` already contains `{ label: 'Compétitions', href: '/competitions' }`. Do NOT modify `navigation.ts`.

**The implementation work for Story 2.7 is:**
1. Create a beige placeholder hero image (`competitions.png`)
2. Create the content Markdown file (`competitions.md`) with frontmatter + body
3. Create the page route file (`competitions.astro`) — minimal wrapper

**Do NOT:**
- Create new components (not needed — `ServicePage.astro` handles everything)
- Modify `ServicePage.astro` (it's working correctly)
- Modify the Zod schema in `content.config.ts` (no new fields needed)
- Modify `navigation.ts` (link to `/competitions` already exists)
- Modify `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, `StickyContact.astro`
- Add an `ogImage` field (known 404 bug from Story 2.4 — the file doesn't exist in public/)
- Implement actual build-time date comparison logic (out of scope — same decision as Story 2.6)

### Page Route Pattern (copy from stages-vacances.astro)

Create `src/pages/competitions.astro` with this exact pattern:

```astro
---
import { getEntry } from 'astro:content';
import ServicePage from '../components/ServicePage.astro';

const entry = await getEntry('services', 'competitions');
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

Create `src/content/services/competitions.md` with frontmatter matching the Zod schema exactly:

```yaml
---
title: "Compétitions équestres"
description: "Participez aux concours CSO et Hunter avec Equi 22 — de la Galop 4 au niveau régional. Encadrement compétition, préparation mentale et logistique inclus."
seoTitle: "Compétition équitation Côtes-d'Armor Yffiniac | Equi 22"
seoDescription: "Compétitions équestres CSO et Hunter près de Saint-Brieuc. Préparation et accompagnement dès la Galop 4. Programme saison et inscription — Equi 22 Yffiniac."
heroImage: "/src/assets/images/hero/competitions.png"
heroImageAlt: "Cavalier franchissant un obstacle lors d'un concours de saut d'obstacles au centre équestre Equi 22 à Yffiniac"
whatsappMessage: "Bonjour, je suis intéressé(e) par les compétitions équestres. Pourriez-vous me donner des informations sur le programme de la saison et les conditions de participation ?"
order: 5
pricing:
  - label: "Séance de préparation CSO"
    price: "30"
    unit: "séance"
    highlight: false
  - label: "Pack Saison Compétition"
    price: "180"
    unit: "saison"
    highlight: true
  - label: "Participation transport"
    price: "20"
    unit: "concours"
    highlight: false
pricingNotes:
  - "Licence FFE compétition obligatoire (non incluse — environ 55€/an adulte, 45€/an jeune)"
  - "Droits d'engagement fixés par l'organisateur (non inclus — généralement 15–40€ par épreuve)"
  - "Équipement de compétition conforme FFE requis — disponible à la location sur demande"
  - "Pack Saison inclut 6 séances de préparation spécialisée + accompagnement coach sur les concours"
testimonial:
  quote: "Mon premier concours, j'étais terrifiée. Avec le soutien de l'équipe, j'ai franchi mes premiers obstacles et j'en veux encore !"
  author: "Céline, cavalière adulte (Galop 5)"
  stars: 5
serviceType: "Préparation et accompagnement compétition équestre"
serviceDescription: "Préparation aux concours de saut d'obstacles (CSO) et Hunter au centre équestre Equi 22 à Yffiniac. Encadrement diplômé, logistique transport, programme saison pour cavaliers à partir de la Galop 4."
---
```

### Content File — Markdown Body

The Markdown body should be inspiring and accessible for riders wanting to enter competition, covering disciplines, philosophy, level requirements, and seasonal calendar messaging:

```markdown
## La compétition : une aventure à vivre ensemble

Participer à un concours, ce n'est pas seulement chercher un podium — c'est se dépasser, partager une journée intense avec son cheval, et rentrer le soir avec des souvenirs qui durent. Chez Equi 22, nous accompagnons nos cavaliers en compétition avec une philosophie simple : **la progression passe avant le classement**.

Nos cavaliers participent aux compétitions organisées sous l'égide de la **Fédération Française d'Équitation (FFE)**, principalement en Bretagne et dans les Côtes-d'Armor.

## Les disciplines pratiquées

### Concours de Saut d'Obstacles (CSO)

Le CSO est la discipline phare de notre club. Nos cavaliers participent à des épreuves allant de la **Basse Compétition** (obstacles de 60 à 80 cm) jusqu'au niveau régional pour les plus confirmés. L'objectif : progresser à son rythme, d'un obstacle à l'autre, d'un concours à l'autre.

### Hunter

Plus technique, le Hunter juge à la fois la régularité des allures, l'expression du cheval et la fluidité du parcours. Une discipline qui récompense la qualité de la relation entre le cavalier et son cheval — parfaite pour ceux qui aiment le travail de précision.

## Conditions de participation

Pour concourir avec Equi 22, il faut :

- Avoir obtenu le **Galop 4** (niveau minimum pour la Basse Compétition)
- Détenir une **licence FFE compétition** (nous pouvons vous accompagner pour l'inscription)
- Présenter un équipement conforme aux règlements FFE (bombe homologuée, tenue de concours, protège-bottes)
- Avoir l'accord de votre monitrice après évaluation de votre niveau et de votre préparation

Pas encore à ce niveau ? Parlez-en à votre monitrice — une saison de préparation ciblée peut changer les choses plus vite que vous ne le pensez.

## Préparer un concours sérieusement

La différence entre un concours réussi et une journée stressante, c'est souvent la préparation. Nos séances de préparation spécifiques au concours travaillent :

- **La technique de saut** — impulsion, trajectoire, réception
- **La gestion du stress** — exercices de respiration, simulation de parcours en loge
- **La lecture de parcours** — analyser les combinaisons, repérer les pièges
- **La logistique** — pansage de concours, tenue, timing de la journée

Le **Pack Saison Compétition** inclut 6 séances dédiées + l'accompagnement de votre coach sur les concours auxquels vous participez.

## Le calendrier des concours

Nos cavaliers participent principalement aux concours régionaux organisés par les comités équestres bretons :

- **Saison printanière** — concours locaux à partir de mars, montée en puissance jusqu'en juin
- **Pause estivale** — quelques concours outdoor juillet–août selon les opportunités
- **Saison automnale** — reprise des concours en septembre, clôture de saison en novembre

> **Prochain concours à venir** — Le programme de la saison est partagé par WhatsApp et affiché à l'écurie dès que les dates sont publiées par les organisateurs. Contactez-nous pour rejoindre la liste de diffusion compétition.

## Une ambiance de club avant tout

Ce que nos compétiteurs retiennent souvent, ce n'est pas leur classement — c'est le trajet en van avec leurs amis, l'adrénaline du paddock de détente, et le café chaud après le passage en piste. La compétition est une façon de vivre l'équitation autrement, en équipe, dans une ambiance que seuls ceux qui l'ont vécu peuvent vraiment décrire.

Envie de tenter l'aventure ? Parlez-en à votre monitrice, ou envoyez-nous un message.
```

### Placeholder Hero Image

Create `src/assets/images/hero/competitions.png`:
- Same dimensions as `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png`, `stages-vacances.png` (1920x800)
- Solid beige fill (#F0EDE8) — matches the design system placeholder convention
- Use the same pure Python PNG generation method used in previous stories
- When real competition photos are available, replace the file at this path (keep same filename) — no code change needed

Python snippet to generate the placeholder (same as previous stories):
```python
import struct, zlib

def make_beige_png(width, height, filename):
    r, g, b = 0xF0, 0xED, 0xE8
    raw = (bytes([0]) + bytes([r, g, b] * width)) * height
    def chunk(name, data):
        c = zlib.crc32(name + data) & 0xFFFFFFFF
        return struct.pack('>I', len(data)) + name + data + struct.pack('>I', c)
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    idat = zlib.compress(raw)
    with open(filename, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR', ihdr))
        f.write(chunk(b'IDAT', idat))
        f.write(chunk(b'IEND', b''))

make_beige_png(1920, 800, 'src/assets/images/hero/competitions.png')
```

### Architecture Compliance

| Rule | Status for Story 2.7 |
|---|---|
| **TypeScript strict** | `competitions.astro` page file uses typed Content Collections (same as `stages-vacances.astro`) |
| **Tailwind/daisyUI only** | Markdown body styled via `prose prose-lg` (Tailwind Typography) |
| **Semantic HTML** | `<Content />` renders Markdown headings as `<h2>`, lists as `<ul>/<li>` |
| **Content in French** | All Markdown content and frontmatter visible text in French |
| **No new components** | Uses existing `ServicePage.astro` template — no new components |
| **No unit tests** | Per architecture: "No unit tests for MVP" |
| **Images via `<Picture>`** | Hero rendered via `<Picture>` through `Hero.astro` component |
| **Never hardcode phone/address** | CTA uses `business.ts` data via `ServicePage.astro` |
| **No ogImage field** | Known bug from Story 2.4 — field omitted intentionally |
| **No build-time date logic** | Not implemented in this story — dates handled via seasonal labels in Markdown; `ServicePage.astro` not modified |

### Previous Story Intelligence (Stories 2.3–2.6)

| Learning | Impact on Story 2.7 |
|---|---|
| **Only 3 files to create** | Stories 2.3–2.6 all created exactly 3 files — same pattern here |
| **`heroImage` path must be `/src/assets/` prefix** | Set frontmatter to `/src/assets/images/hero/competitions.png` |
| **`import.meta.glob` for dynamic images** | Page file must use same glob pattern as `stages-vacances.astro` |
| **`astro check` AND `npm run build` both required** | Run both to verify — `astro check` catches TypeScript, `npm run build` catches runtime |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme/plugins in `src/styles/global.css` via `@theme`/`@plugin` |
| **Alternating backgrounds computed dynamically** | `ServicePage.astro` handles `bg-base-200`/`bg-base-100` alternation automatically |
| **WhatsApp inline style** | `style="background-color: #25D366"` — brand color, intentional inline exception |
| **Markdown prose styling** | Full Tailwind Typography (`prose prose-lg`) renders headings, paragraphs, lists |
| **Full French diacritics** | All content must use proper French diacritics — équitation, Côtes-d'Armor, etc. |
| **Don't add ogImage field** | Known 404 bug — the public/ folder doesn't have per-service OG images yet |
| **`serviceType` used as JSON-LD name** | Use descriptive French label, not schema.org technical type |
| **Schedule is optional** | Omit `schedule` from frontmatter — `ServicePage.astro` skips `PlanningBlock` when absent |
| **Pure Python PNG generation** | Use same Python snippet as previous stories for beige placeholder |
| **`seoDescription` max ~140 chars** | Longer descriptions get truncated in SERPs (Code Review finding from Story 2.6) |
| **Transient "Duplicate id" warning** | Astro v5 first-sync artifact — disappears on second run, non-blocking |

### Git Intelligence (Recent Work)

Most recent commits:
1. `00e44e9` — Story 2-6 (Holiday camps page — 3 files created, code review fixes applied)
2. `1b2eaf1` — Story 2-5 (Horse boarding page — 3 files created, code review fixes applied)
3. `eacbaed` — Story 2-4 (Adult riding page — 3 files created)
4. `637a029` — Story 2-3 (Children's lessons page content)
5. `e187272` — Story 2-2 (ServicePage template + components)

Repository is clean — no uncommitted changes.

### Project Structure Context

```
src/
├── assets/images/hero/
│   ├── cours-enfants.png           <- EXISTS (placeholder, beige)
│   ├── equitation-adulte.png       <- EXISTS (placeholder, beige)
│   ├── pension-chevaux.png         <- EXISTS (placeholder, beige)
│   ├── stages-vacances.png         <- EXISTS (placeholder, beige)
│   └── competitions.png            <- CREATE THIS (placeholder, beige, 1920x800)
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
│   ├── pension-chevaux.md          <- EXISTS (reference for frontmatter structure)
│   ├── stages-vacances.md          <- EXISTS (reference for frontmatter structure)
│   └── competitions.md             <- CREATE THIS (frontmatter + competitions content body)
├── content.config.ts               <- EXISTS — DO NOT MODIFY (Zod schema handles all fields)
├── pages/
│   ├── cours-enfants.astro         <- EXISTS (reference for page pattern)
│   ├── equitation-adulte.astro     <- EXISTS (reference for page pattern)
│   ├── pension-chevaux.astro       <- EXISTS (reference for page pattern)
│   ├── stages-vacances.astro       <- EXISTS (reference for page pattern)
│   └── competitions.astro          <- CREATE THIS (minimal wrapper, copy stages-vacances.astro pattern)
├── layouts/
│   └── BaseLayout.astro            <- Epic 1 — DO NOT MODIFY
└── data/
    ├── business.ts                 <- Epic 1 — DO NOT MODIFY
    └── navigation.ts               <- Epic 1 — already has /competitions link
```

### File List — Changes Expected

**Files to CREATE (3 files):**
```
src/assets/images/hero/competitions.png      <- Placeholder hero image (1920x800, beige #F0EDE8)
src/content/services/competitions.md         <- Service content with frontmatter + body
src/pages/competitions.astro                 <- Minimal page wrapper (copy stages-vacances.astro pattern)
```

**Files to NOT touch:**
- `src/components/ServicePage.astro` — works correctly
- `src/components/Hero.astro` — works correctly
- `src/components/PlanningBlock.astro` — works correctly (skipped when no schedule)
- `src/components/PricingTable.astro` — works correctly
- `src/components/Testimonial.astro` — works correctly
- `src/content.config.ts` — no new schema fields needed
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — link already exists (`/competitions`)
- `src/styles/global.css` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `package.json` — no new dependencies

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.7: Competitions Page]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory FR2, FR3, FR16, FR26, FR30]
- [Source: _bmad-output/implementation-artifacts/2-6-holiday-camps-page.md#Dev Notes — full pattern documentation]
- [Source: _bmad-output/implementation-artifacts/2-6-holiday-camps-page.md#Previous Story Intelligence]
- [Source: src/content.config.ts — Zod schema (schedule optional, ogImage optional)]
- [Source: src/content/services/stages-vacances.md — reference frontmatter + content structure]
- [Source: src/components/ServicePage.astro — template handles all conditional sections]
- [Source: src/pages/stages-vacances.astro — reference page wrapper pattern]
- [Source: src/data/navigation.ts — /competitions link already present]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — implementation followed established pattern from Stories 2.3–2.6 without issues.

### Completion Notes List

- Created 3 files following exact same pattern as `stages-vacances` (Story 2.6)
- Beige placeholder hero image generated using pure Python PNG (1920×800, #F0EDE8)
- Frontmatter omits `schedule` field intentionally — `ServicePage.astro` skips `PlanningBlock` automatically
- Frontmatter omits `ogImage` field — known 404 bug from Story 2.4 (no per-service OG images in public/ yet)
- `seoDescription` kept under 140 chars per code review finding from Story 2.6
- `astro check` passed with 0 errors, 0 warnings (2 pre-existing hints on `SchemaMarkup.astro`)
- `npm run build` succeeded; `/competitions/index.html` confirmed prerendered
- All 11 Acceptance Criteria satisfied

### File List

src/assets/images/hero/competitions.png
src/content/services/competitions.md
src/pages/competitions.astro
_bmad-output/implementation-artifacts/sprint-status.yaml

## Change Log

- 2026-02-18: Story 2.7 implemented — created competitions hero image, content file, and page route. All 11 ACs satisfied, build verified. Status: review.
- 2026-02-18: Code review fixes applied — seoDescription adds "équestres" keyword (L-1); pricing label "Participation transport" → "Participation aux frais de transport" (L-3); pricingNotes and Markdown body aligned on "6 séances de préparation spécialisée" (L-2); month names in seasonal calendar replaced by seasonal-label-only wording (M-2); sprint-status.yaml added to File List (M-1). Status: done.
