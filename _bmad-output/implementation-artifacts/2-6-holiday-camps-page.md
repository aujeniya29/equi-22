# Story 2.6: Holiday Camps Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **parent**,
I want **a dedicated holiday camps page with dates, age groups, activities, and pricing**,
So that **I can plan my child's school holiday activities and register for camps**.

## Acceptance Criteria

1. **AC-1: Page accessible at /stages-vacances** — The page renders at `/stages-vacances` using `stages-vacances.astro` with the `ServicePage.astro` template component. Navigation link already exists in `navigation.ts`.

2. **AC-2: Hero section** — The hero displays a placeholder hero image (beige 1920x800 PNG, same pattern as `cours-enfants.png`, `equitation-adulte.png`, and `pension-chevaux.png`) with title "Stages vacances équitation" and description from frontmatter, with dark overlay for readable contrast.

3. **AC-3: Camp content — activities, daily schedule, what to bring** — The Markdown body of `stages-vacances.md` describes camp activities (riding sessions, pony care, outdoor games, discovery exercises), a sample daily schedule, and a practical "what to bring" list. Content targets the parent persona who needs reassurance that their child will be well supervised and have fun.

4. **AC-4: Seasonal date labels** — Dates use seasonal labels only ("Vacances de la Toussaint", "Vacances de Noël", "Vacances d'hiver", "Vacances de printemps", "Vacances d'été") — never absolute calendar dates. A "Prochain stage à venir — contactez-nous pour les dates" message is included for off-season periods. No build-time date comparison logic is implemented (would require schema extension and component modification beyond this story's scope; the content body handles the messaging statically with seasonal labels that never age).

5. **AC-5: Pricing table with camp formulas by duration** — Pricing formulas in frontmatter render via `PricingTable.astro`: demi-journée (half-day), journée (full-day), mini-stage 3 jours, stage complet 5 jours (highlighted as best value). Pricing notes include what's included (supervision, equipment, insurance) (FR3).

6. **AC-6: Parent testimonial** — `Testimonial.astro` renders a testimonial from a parent whose child attended a camp, providing social proof about supervision quality and child enjoyment. (FR16)

7. **AC-7: Contextual WhatsApp message** — The CTA section WhatsApp link pre-fills: "Bonjour, je suis intéressé(e) par les stages vacances équitation. Pourriez-vous me donner des informations sur les prochains stages et les places disponibles ?"

8. **AC-8: SEO targeting** — `seoTitle` targeting "stage équitation vacances Côtes-d'Armor" and `seoDescription` targeting parents seeking equestrian holiday camps near Yffiniac/Saint-Brieuc. (FR30)

9. **AC-9: Service schema markup** — `serviceType` and `serviceDescription` in frontmatter, injected via `SchemaMarkup.astro` through `BaseLayout`. (FR26)

10. **AC-10: No schedule section** — The camps page does NOT include a weekly planning block (schedule is optional in the Zod schema). Camp schedules are seasonal, not recurring weekly slots — the `PlanningBlock.astro` component is for weekly timetables.

11. **AC-11: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build with the page prerendered.

## Tasks / Subtasks

- [x] Task 1: Create placeholder hero image (AC: #2)
  - [x] Create `src/assets/images/hero/stages-vacances.png` — 1920x800 beige placeholder PNG using pure Python PNG generation (same method as `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png`)

- [x] Task 2: Create stages-vacances.md content file (AC: #3, #4, #5, #6, #7, #8, #9, #10)
  - [x] Create `src/content/services/stages-vacances.md` with complete YAML frontmatter
  - [x] Frontmatter: title, description, seoTitle, seoDescription, heroImage, heroImageAlt, whatsappMessage, order (4), pricing (4 formulas), pricingNotes, testimonial, serviceType, serviceDescription
  - [x] NO schedule field in frontmatter (camps are seasonal, not weekly slots)
  - [x] NO ogImage field (known 404 bug from Stories 2.4/2.5 — no per-service OG images in public/ yet)
  - [x] Markdown body: camp description, activities, sample daily schedule (as prose, not a PlanningBlock), what to bring, seasonal labels, "Prochain stage" messaging

- [x] Task 3: Create stages-vacances.astro page (AC: #1)
  - [x] Create `src/pages/stages-vacances.astro` — minimal wrapper using `ServicePage.astro` (same pattern as `pension-chevaux.astro`)
  - [x] Use `import.meta.glob` for dynamic hero image loading
  - [x] Use `getEntry('services', 'stages-vacances')` to fetch content

- [x] Task 4: Build verification (AC: #11)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/stages-vacances` is included in the prerendered pages output

## Dev Notes

### Critical Context — What Already Exists

**This story follows the exact same pattern as Stories 2.3, 2.4, and 2.5.** Story 2.2 created:
- `src/components/ServicePage.astro` — full page skeleton (Hero → Content → Planning → Pricing → Testimonial → CTA)
- All core components: `Hero.astro`, `PlanningBlock.astro`, `PricingTable.astro`, `Testimonial.astro`
- `src/content.config.ts` — Zod schema for services collection (fully typed)

**The `schedule` field is optional in the Zod schema.** Omitting it from the frontmatter means `ServicePage.astro` will NOT render the PlanningBlock section. Correct for holiday camps — they are seasonal, not weekly.

**Navigation already exists.** `src/data/navigation.ts` already contains `{ label: 'Stages vacances', href: '/stages-vacances' }`. Do NOT modify `navigation.ts`.

**The implementation work for Story 2.6 is:**
1. Create a beige placeholder hero image (`stages-vacances.png`)
2. Create the content Markdown file (`stages-vacances.md`) with frontmatter + body
3. Create the page route file (`stages-vacances.astro`) — minimal wrapper

**Do NOT:**
- Create new components (not needed — `ServicePage.astro` handles everything)
- Modify `ServicePage.astro` (it's working correctly)
- Modify the Zod schema in `content.config.ts` (no new fields needed)
- Modify `navigation.ts` (link to `/stages-vacances` already exists)
- Modify `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, `StickyContact.astro`
- Add an `ogImage` field (known 404 bug from Story 2.4 — the file doesn't exist in public/)
- Implement actual build-time date comparison logic (out of scope — would require schema changes, component modifications, and is not supported by the current ServicePage.astro architecture)

### Page Route Pattern (copy from pension-chevaux.astro)

Create `src/pages/stages-vacances.astro` with this exact pattern:

```astro
---
import { getEntry } from 'astro:content';
import ServicePage from '../components/ServicePage.astro';

const entry = await getEntry('services', 'stages-vacances');
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

Create `src/content/services/stages-vacances.md` with frontmatter matching the Zod schema exactly:

```yaml
---
title: "Stages vacances équitation"
description: "Stages d'équitation pendant les vacances scolaires à Yffiniac. Demi-journée, journée ou semaine complète — pour les enfants de 5 à 14 ans, tous niveaux."
seoTitle: "Stage équitation vacances Côtes-d'Armor Yffiniac | Equi 22"
seoDescription: "Stages équitation pendant les vacances à Yffiniac près de Saint-Brieuc. Demi-journée, journée, 3 jours ou semaine. Encadrement diplômé, matériel fourni. Renseignements et inscriptions."
heroImage: "/src/assets/images/hero/stages-vacances.png"
heroImageAlt: "Groupe d'enfants souriant pendant un stage vacances équitation au centre Equi 22 à Yffiniac"
whatsappMessage: "Bonjour, je suis intéressé(e) par les stages vacances équitation. Pourriez-vous me donner des informations sur les prochains stages et les places disponibles ?"
order: 4
pricing:
  - label: "Demi-journée"
    price: "35"
    unit: "séance"
    highlight: false
  - label: "Journée complète"
    price: "60"
    unit: "jour"
    highlight: false
  - label: "Mini-stage 3 jours"
    price: "165"
    unit: "stage"
    highlight: false
  - label: "Stage complet 5 jours"
    price: "250"
    unit: "semaine"
    highlight: true
pricingNotes:
  - "Encadrement diplômé, assurance et matériel de sécurité inclus"
  - "Pique-nique ou repas non fourni — prévoir le repas pour les journées complètes"
  - "Licence FFE journalière incluse pour les non-licenciés"
  - "Réduction de 10% à partir du 2e enfant de la même famille"
testimonial:
  quote: "Mon fils a passé une semaine formidable. Il parle encore de son cheval préféré et réclame le prochain stage !"
  author: "Nathalie, maman de Tom (9 ans)"
  stars: 5
serviceType: "Stages vacances équitation pour enfants"
serviceDescription: "Stages équitation pendant les vacances scolaires au centre équestre Equi 22 à Yffiniac. Formules demi-journée, journée, 3 jours ou semaine complète pour les 5-14 ans, tous niveaux."
---
```

### Content File — Markdown Body

The Markdown body should be warm and reassuring for parents, covering activities, daily schedule as prose, what to bring, and seasonal availability messaging:

```markdown
## Une semaine (ou une journée) dans la peau d'un cavalier

Nos stages vacances permettent aux enfants de vivre l'équitation de l'intérieur : monter à cheval bien sûr, mais aussi apprendre à s'occuper des poneys, comprendre leurs besoins et créer un vrai lien. À la fin de la semaine, votre enfant repart avec une vraie autonomie — et l'impatience du prochain stage.

Les stages sont ouverts aux enfants de **5 à 14 ans**, de tous niveaux — du grand débutant qui n'a jamais approché un poney jusqu'aux cavaliers déjà licenciés. Nos monitrices diplômées forment des groupes homogènes par niveau et par âge pour que chacun progresse à son rythme.

## Au programme du stage

Chaque journée de stage est construite autour de l'équitation et du soin aux animaux :

- **Séances de monte** — En manège ou en carrière selon le niveau, 2 séances par journée complète
- **Soins aux poneys** — Brossage, curage des pieds, harnachement : votre enfant apprend les gestes du cavalier responsable
- **Activités ludiques** — Jeux à poney, gymkhana, quiz équestre : l'apprentissage par le jeu
- **Découverte de l'écurie** — Alimentation, observation du comportement des chevaux, vocabulaire équestre
- **Temps libre** — Goûter et échanges avec les autres enfants du stage dans un cadre convivial

## Une journée type au stage

- **Matin (9h–12h)** : Accueil, soins aux poneys, séance de monte (1h)
- **Pause repas (12h–13h30)** : Repas apporté par l'enfant, temps libre
- **Après-midi (13h30–17h)** : Activité équestre, séance de monte (1h), rangement et soins du soir

Pour les demi-journées, deux créneaux sont disponibles : matin (9h–12h) ou après-midi (13h30–17h).

## Ce qu'il faut apporter

- Casque d'équitation homologué CEI (obligatoire — nous en avons en prêt si nécessaire)
- Bottes ou chaussures à talon (minimum 1 cm) — protège-tibias recommandés
- Tenue confortable et adaptée au mouvement
- Pique-nique et gourde pour les journées complètes
- Crème solaire les jours de beau temps

Pas de surbottes, pas de vêtements synthétiques glissants. En cas de doute, contactez-nous.

## Quand ont lieu nos stages ?

Nous organisons des stages pendant **toutes les vacances scolaires** :

- **Vacances de la Toussaint** — Stage de 3 ou 5 jours
- **Vacances de Noël** — Stage de 3 jours (selon demandes)
- **Vacances d'hiver** — Stage de 5 jours
- **Vacances de printemps** — Stage de 5 jours + demi-journées
- **Vacances d'été** — Stages intensifs semaine par semaine, de juillet à mi-août

**Prochain stage à venir** — Les dates et les places disponibles sont communiquées par WhatsApp et sur notre page Facebook. Contactez-nous pour rejoindre la liste d'attente ou réserver votre place dès l'ouverture des inscriptions.

## Des places limitées pour un encadrement de qualité

Nous limitons volontairement nos groupes à **8 enfants par groupe** pour garantir un encadrement individuel. Les stages affichent souvent complets plusieurs semaines à l'avance — n'attendez pas les dernières vacances pour réserver.
```

### Placeholder Hero Image

Create `src/assets/images/hero/stages-vacances.png`:
- Same dimensions as `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png` (1920x800)
- Solid beige fill (#F0EDE8) — matches the design system placeholder convention
- Use the same pure Python PNG generation method used in previous stories
- When real camp photos are available, replace the file at this path (keep same filename) — no code change needed

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

make_beige_png(1920, 800, 'src/assets/images/hero/stages-vacances.png')
```

### Architecture Compliance

| Rule | Status for Story 2.6 |
|---|---|
| **TypeScript strict** | `stages-vacances.astro` page file uses typed Content Collections (same as pension-chevaux.astro) |
| **Tailwind/daisyUI only** | Markdown body styled via `prose prose-lg` (Tailwind Typography) |
| **Semantic HTML** | `<Content />` renders Markdown headings as `<h2>`, lists as `<ul>/<li>` |
| **Content in French** | All Markdown content and frontmatter visible text in French |
| **No new components** | Uses existing `ServicePage.astro` template — no new components |
| **No unit tests** | Per architecture: "No unit tests for MVP" |
| **Images via `<Picture>`** | Hero rendered via `<Picture>` through `Hero.astro` component |
| **Never hardcode phone/address** | CTA uses `business.ts` data via `ServicePage.astro` |
| **No ogImage field** | Known bug from Story 2.4 — field omitted intentionally |
| **No build-time date logic** | Not implemented in this story — dates handled via seasonal labels in Markdown; ServicePage.astro not modified |

### Previous Story Intelligence (Stories 2.3 + 2.4 + 2.5)

| Learning | Impact on Story 2.6 |
|---|---|
| **Only 3 files to create** | Stories 2.3, 2.4, and 2.5 all created exactly 3 files — same pattern here |
| **`heroImage` path must be `/src/assets/` prefix** | Set frontmatter to `/src/assets/images/hero/stages-vacances.png` |
| **`import.meta.glob` for dynamic images** | Page file must use same glob pattern as `pension-chevaux.astro` |
| **`astro check` AND `npm run build` both required** | Run both to verify — `astro check` catches TypeScript, `npm run build` catches runtime |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme/plugins in `src/styles/global.css` via `@theme`/`@plugin` |
| **Alternating backgrounds computed dynamically** | `ServicePage.astro` handles `bg-base-200`/`bg-base-100` alternation automatically |
| **WhatsApp inline style** | `style="background-color: #25D366"` — brand color, intentional inline exception |
| **Markdown prose styling** | Full Tailwind Typography (`prose prose-lg`) renders headings, paragraphs, lists |
| **Avoid equestrian jargon** | Use plain French accessible to non-expert parents — explain FFE license, etc. |
| **Don't add ogImage field** | Known 404 bug — the public/ folder doesn't have per-service OG images yet |
| **`serviceType` used as JSON-LD name** | Use descriptive French label, not schema.org technical type |
| **Schedule is optional** | Omit `schedule` from frontmatter — `ServicePage.astro` skips `PlanningBlock` when absent |
| **Pure Python PNG generation** | Use same Python snippet as previous stories for beige placeholder |
| **Full French diacritics** | All content must use proper French diacritics — été, équitation, Côtes-d'Armor, etc. |

### Git Intelligence (Recent Work)

Most recent commits:
1. `1b2eaf1` — Story 2-5 (Horse boarding page — 3 files created, code review fixes applied)
2. `eacbaed` — Story 2-4 (Adult riding page — 3 files created)
3. `637a029` — Story 2-3 (Children's lessons page content)
4. `e187272` — Story 2-2 (ServicePage template + components)
5. `28610a1` — Story 2-1 (Content Collections schema)

Repository is clean — no uncommitted changes.

### UX-Specific Notes for Holiday Camps Page

Per UX Design Specification:
- Holiday camps target **Sophie's persona** (parent with child) — same reassurance-first tone as children's lessons page
- Key parent questions: "Will my child be safe?", "What will they actually do?", "How many kids in the group?"
- Conversion action is **registering for a specific upcoming camp session** — the CTA is about joining a waiting list / reserving a spot
- The "limited spots" message is a conversion lever — 8 kids max per group is a genuine differentiator
- Daily schedule as prose (not a `PlanningBlock.astro` table) — camps have varied daily programs, not fixed weekly slots

### Project Structure Context

```
src/
├── assets/images/hero/
│   ├── cours-enfants.png           <- EXISTS (placeholder, beige)
│   ├── equitation-adulte.png       <- EXISTS (placeholder, beige)
│   ├── pension-chevaux.png         <- EXISTS (placeholder, beige)
│   └── stages-vacances.png         <- CREATE THIS (placeholder, beige, 1920x800)
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
│   └── stages-vacances.md          <- CREATE THIS (frontmatter + camps content body)
├── content.config.ts               <- EXISTS — DO NOT MODIFY (Zod schema handles all fields)
├── pages/
│   ├── cours-enfants.astro         <- EXISTS (reference for page pattern)
│   ├── equitation-adulte.astro     <- EXISTS (reference for page pattern)
│   ├── pension-chevaux.astro       <- EXISTS (reference for page pattern)
│   └── stages-vacances.astro       <- CREATE THIS (minimal wrapper, copy pension-chevaux.astro pattern)
├── layouts/
│   └── BaseLayout.astro            <- Epic 1 — DO NOT MODIFY
└── data/
    ├── business.ts                 <- Epic 1 — DO NOT MODIFY
    └── navigation.ts               <- Epic 1 — already has /stages-vacances link
```

### File List — Changes Expected

**Files to CREATE (3 files):**
```
src/assets/images/hero/stages-vacances.png   <- Placeholder hero image (1920x800, beige #F0EDE8)
src/content/services/stages-vacances.md      <- Service content with frontmatter + body
src/pages/stages-vacances.astro              <- Minimal page wrapper (copy pension-chevaux.astro pattern)
```

**Files to NOT touch:**
- `src/components/ServicePage.astro` — works correctly
- `src/components/Hero.astro` — works correctly
- `src/components/PlanningBlock.astro` — works correctly (skipped when no schedule)
- `src/components/PricingTable.astro` — works correctly
- `src/components/Testimonial.astro` — works correctly
- `src/content.config.ts` — no new schema fields needed
- `src/data/business.ts` — no changes
- `src/data/navigation.ts` — link already exists (`/stages-vacances`)
- `src/styles/global.css` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `package.json` — no new dependencies

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.6: Holiday Camps Page]
- [Source: _bmad-output/planning-artifacts/epics.md#Requirements Inventory FR2, FR3, FR16, FR26, FR30]
- [Source: _bmad-output/planning-artifacts/epics.md#Additional Requirements — stale content handling]
- [Source: _bmad-output/implementation-artifacts/2-5-horse-boarding-page.md#Dev Notes — full pattern documentation]
- [Source: _bmad-output/implementation-artifacts/2-5-horse-boarding-page.md#Previous Story Intelligence]
- [Source: src/content.config.ts — Zod schema (schedule optional, ogImage optional)]
- [Source: src/content/services/cours-enfants.md — reference frontmatter + content structure]
- [Source: src/components/ServicePage.astro — template handles all conditional sections]
- [Source: src/pages/pension-chevaux.astro — reference page wrapper pattern]
- [Source: src/data/navigation.ts — /stages-vacances link already present]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No issues encountered. Implementation followed the exact same pattern as Stories 2.3, 2.4, and 2.5.

### Completion Notes List

- Created 3 files following the established service page pattern (identical to `pension-chevaux.astro`)
- Hero image generated with pure Python PNG (1920x800, beige #F0EDE8) — consistent with existing placeholders
- Content file frontmatter omits `schedule` (seasonal camps, not weekly slots) and `ogImage` (known 404 bug)
- 4 pricing formulas rendered via `PricingTable.astro` with "Stage complet 5 jours" highlighted as best value
- Parent testimonial included for social proof (AC-6)
- WhatsApp message pre-filled with camps-specific text (AC-7)
- Seasonal labels used throughout content — no build-time date comparison logic (AC-4 / AC-10)
- `astro check`: 0 errors, 0 warnings (2 pre-existing hints in SchemaMarkup.astro, unrelated)
- `npm run build`: successful — `/stages-vacances/index.html` prerendered

### Code Review Fixes Applied

- **Finding #1 (Medium):** `seoDescription` shortened from ~185 to ~140 chars — Google-visible CTA no longer truncated in SERPs.
- **Finding #2 (Medium):** "CEI" jargon replaced with "CE (norme EN 1384)" — accessible to non-equestrian parents.
- **Finding #3 (Medium):** Pricing `unit` for "Demi-journée" corrected from "séance" to "demi-journée" — consistent with label and with other pricing rows.
- **Finding #4 (Medium):** Build independently verified via `astro check` (0 errors) and `npm run build` (successful, `/stages-vacances/index.html` prerendered). Transient "Duplicate id" warning on first `astro check` is an Astro v5 first-sync artifact — absent on second run.
- **Finding #5 (Low):** `description` (hero) updated to include "mini-stage 3 jours" — all 4 pricing tiers now visible from first scroll.
- **Finding #6 (Low):** "Prochain stage à venir" converted to a Markdown blockquote (`>`) for visual prominence in the prose section.
- **Finding #7 (Low):** "notre page Facebook" replaced with "nos réseaux sociaux" — platform-agnostic, won't become stale.

### File List

- `src/assets/images/hero/stages-vacances.png` (created)
- `src/content/services/stages-vacances.md` (created + review fixes)
- `src/pages/stages-vacances.astro` (created)
- `_bmad-output/implementation-artifacts/2-6-holiday-camps-page.md` (updated — status: done + review record)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (updated — status: done)
