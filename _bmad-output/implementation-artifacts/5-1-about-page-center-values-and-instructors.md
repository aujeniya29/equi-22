# Story 5.1: About Page — Center, Values & Instructors

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to read about the center's history, pedagogical approach, and meet the instructors**,
so that **I feel the warmth and professionalism of the team before visiting** (FR6, FR7).

## Acceptance Criteria

1. **AC-1: Page exists at `/a-propos`** — `src/pages/a-propos.astro` renders the page. `npm run build` produces an `/a-propos/index.html` artifact. No 404 when navigating to `/a-propos`.

2. **AC-2: Hero section** — `<Hero>` component renders at the top. If no hero image is provided, the `bg-base-200` fallback in `Hero.astro` is used (no broken build). When a real hero image `src/assets/images/hero/a-propos.png` is added, `Hero` receives it as `imageSrc`. `imageAlt` is always set.

3. **AC-3: Center history & values section** — A `<section>` describes the center's history, location (`business.city`), and core values (bienveillance, progression, respect du cheval). Tone is warm and personal — "montrer, pas déclarer". The business name and city are referenced from `business.ts` — never hardcoded. Uses `<h2>` for section title.

4. **AC-4: Pedagogical approach section** — A distinct `<section>` describes the three pedagogical pillars: Progressif, Bienveillant, Respectueux. Each pillar has a title and description. Uses `<h2>` for section title, `<h3>` for pillar titles.

5. **AC-5: Instructor profiles** — At least 2 instructor profiles rendered via a typed `Instructor[]` array. Each profile uses `<article>` and displays: optional photo (via `<Image>` from `astro:assets` when `imageSrc` is provided; a beige `#F0EDE8` placeholder `div` at 3:2 aspect ratio when `imageSrc` is `undefined` — CLS = 0), first name, role, personality description, teaching philosophy as `<blockquote>`, and qualifications. The `imageAlt` string is always set. The `Instructor` interface uses `imageSrc?: ImageMetadata`.

6. **AC-6: Facility highlights section** — A `<section>` describes arenas, boxes, paddocks, and trails. Uses an unordered list for facility features. One facility image (via `<Image>`) when `src/assets/images/facilities/installations.jpg` exists, or a beige placeholder div otherwise. Image `alt` text is descriptive.

7. **AC-7: CTA section** — A bottom `<section>` invites the visitor to contact the center or explore courses. Two buttons: primary "Nous contacter" → `/contact`, secondary outline "Nos cours" → `/cours-enfants`. Both buttons meet 44px minimum tap target (FR36).

8. **AC-8: SEO meta tags** — Page uses `BaseLayout.astro` with:
   - `title="À propos — Équi 22 à Yffiniac"`
   - `description="Découvrez l'histoire du centre équestre Équi 22 à Yffiniac, notre pédagogie bienveillante et notre équipe d'enseignants passionnés."`
   - `whatsappMessage` prop set to a contextual about-page message.

9. **AC-9: Navigation accessibility** — Page is reachable via the "À propos" link already present in `navigation.ts` (position 7) and rendered in both the desktop nav and mobile menu by `Navbar.astro`. **Zero changes to Navbar.astro or navigation.ts required**.

10. **AC-10: Semantic HTML** — Page uses `<main>` (provided by BaseLayout), `<section>` for each content zone, `<article>` for each instructor card, `<h1>` from Hero (never repeated), `<h2>` for all section titles, `<h3>` for instructor names and pillar titles. All content images have descriptive `alt` text in French.

11. **AC-11: No regression** — No existing `.astro` components or pages are modified. `astro check` passes with 0 errors. `npm run build` completes successfully.

## Tasks / Subtasks

- [x] Task 1: Prepare placeholder images (AC: #2, #5, #6)
  - [x] (Optional) Add `src/assets/images/hero/a-propos.png` — if not ready, Hero.astro `bg-base-200` fallback is used (no code change needed)
  - [x] (Optional) Add `src/assets/images/team/instructeur-1.jpg` and `src/assets/images/team/instructeur-2.jpg` — when not provided, beige placeholder div renders automatically per AC-5 pattern
  - [x] (Optional) Add `src/assets/images/facilities/installations.jpg` — when not provided, beige placeholder div renders automatically per AC-6 pattern

- [x] Task 2: Create `src/pages/a-propos.astro` (AC: #1–10)
  - [x] Import `Image` from `astro:assets`, `type { ImageMetadata }` from `'astro'`
  - [x] Import `BaseLayout` and `Hero` components
  - [x] Import `business` from `src/data/business.ts`
  - [x] Conditionally import hero image (only when file exists) — or skip import and omit `imageSrc` prop to use `bg-base-200` fallback
  - [x] Define `interface Instructor` with `imageSrc?: ImageMetadata` and required fields
  - [x] Define `const instructors: Instructor[]` with 2 placeholder-ready instructor entries (no `imageSrc` until photos added)
  - [x] Render Hero section (AC-2)
  - [x] Render center history & values section using `business.name` and `business.city` (AC-3)
  - [x] Render pedagogical approach section — 3 pillars (AC-4)
  - [x] Render instructor profiles grid with conditional `<Image>` / beige placeholder (AC-5)
  - [x] Render facility highlights with conditional `<Image>` / beige placeholder (AC-6)
  - [x] Render CTA section with two buttons, both `min-h-[44px]` (AC-7)
  - [x] Set `BaseLayout` props with AC-8 SEO values

- [x] Task 3: Build verification (AC: #11)
  - [x] Run `astro check` — confirm 0 type errors
  - [x] Run `npm run build` — confirm successful build and `/a-propos/index.html` generated
  - [x] Verify no regression on existing pages (homepage, contact, service pages)

## Dev Notes

### Critical Context — Current Codebase State

**Navigation already wired:**
- `src/data/navigation.ts` → `mainMenu` already has `{ label: 'À propos', href: '/a-propos' }` at index 6 (position 7)
- Both the mobile menu and the desktop nav (via `mainMenu.slice(0, -1)`) already include this entry
- **Zero changes to Navbar.astro or navigation.ts**

**Hero.astro pattern (IMPORTANT):**
```astro
// src/components/Hero.astro — imageSrc is optional ImageMetadata
interface Props {
  title: string;
  description: string;
  imageSrc?: ImageMetadata;  // ← optional; if undefined → bg-base-200 fallback
  imageAlt: string;
  heightClass?: string;
}
```
Use `Hero` without `imageSrc` prop until real photo is available — no build error, no CLS issue.

**Existing hero images in `src/assets/images/hero/`:**
- `cours-enfants.png`, `equitation-adulte.png`, `pension-chevaux.png`, `stages-vacances.png`, `competitions.png`, `homepage.png`
- No `a-propos.png` yet — developer creates it when real photo is available.

**Component count:** 13 components in `src/components/` (under 15-component subfolder threshold). Story 5.1 creates a **page** only — no new components. Count stays at 13.

**`business.ts` fields available:**
```typescript
business.name       // 'Équi 22'
business.city       // 'Yffiniac'
business.address    // '123 Rue de la Prairie'
business.postalCode // '22120'
```

**No `a-propos.astro` page exists yet** — `src/pages/a-propos.astro` must be created.

**Tailwind v4 CSS-first config** — No `tailwind.config.mjs`. All daisyUI tokens (`bg-base-200`, `text-primary`, `btn-primary`, `btn-outline`, etc.) available. All styling via Tailwind utility classes and daisyUI tokens only — no `<style>` blocks.

---

### Complete Implementation — `src/pages/a-propos.astro`

```astro
---
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import { business } from '../data/business';

// Instructor type — imageSrc is optional so the page builds before real photos are ready
interface Instructor {
  firstName: string;
  role: string;
  personality: string;
  philosophy: string;
  qualifications: string;
  imageSrc?: ImageMetadata;
  imageAlt: string;
}

// Instructor data — add imageSrc imports when real photos are available:
//   import instructeur1 from '../assets/images/team/instructeur-1.jpg';
//   import instructeur2 from '../assets/images/team/instructeur-2.jpg';
// Then set imageSrc: instructeur1, imageSrc: instructeur2 below.
const instructors: Instructor[] = [
  {
    firstName: 'Marie',
    role: 'Monitrice principale',
    personality: 'Douce et attentionnée, Marie met les débutants à l\'aise dès la première séance.',
    philosophy: 'Apprendre l\'équitation, c\'est d\'abord apprendre à écouter le cheval. On avance à votre rythme, jamais au mien.',
    qualifications: 'BPJEPS Équitation — 12 ans d\'expérience',
    imageAlt: 'Marie, monitrice principale du centre équestre Équi 22',
  },
  {
    firstName: 'Thomas',
    role: 'Moniteur compétition',
    personality: 'Passionné de CSO, Thomas partage son enthousiasme avec exigence et bienveillance.',
    philosophy: 'La compétition n\'est pas une fin en soi — c\'est un prétexte magnifique pour se dépasser et comprendre son cheval.',
    qualifications: 'BPJEPS Équitation — Juge fédéral FFE',
    imageAlt: 'Thomas, moniteur compétition du centre équestre Équi 22',
  },
];

// Facility image — add import when real photo is available:
//   import installationsImage from '../assets/images/facilities/installations.jpg';
// Then pass imageSrc={installationsImage} to the <Image> and set showFacilityImage = true.
const showFacilityImage = false;

const whatsappMessage = "Bonjour, je souhaite en savoir plus sur le centre équestre Équi 22 à Yffiniac.";
---

<BaseLayout
  title="À propos — Équi 22 à Yffiniac"
  description="Découvrez l'histoire du centre équestre Équi 22 à Yffiniac, notre pédagogie bienveillante et notre équipe d'enseignants passionnés."
  whatsappMessage={whatsappMessage}
>
  <!-- Hero — imageSrc omitted until real photo is available; Hero.astro renders bg-base-200 fallback -->
  <Hero
    title="Équi 22 — Notre histoire"
    description="Un centre équestre ancré en Bretagne, guidé par la bienveillance et le respect du cheval."
    imageAlt="Vue du centre équestre Équi 22 à Yffiniac"
  />

  <!-- Center history & values -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-6">
        Une histoire d'amour avec le cheval
      </h2>
      <div class="space-y-4 text-base-content/80 text-lg leading-relaxed">
        <p>
          Niché à {business.city}, au cœur de la Bretagne, {business.name} est né d'une conviction
          simple : l'équitation doit être accessible à tous — enfants, adultes, débutants, confirmés.
        </p>
        <p>
          Notre centre accueille cavaliers et propriétaires dans un cadre authentique, loin des
          pistes élitistes. Ici, la compétition et la détente coexistent, parce que chaque parcours
          est unique.
        </p>
        <p>
          Nos valeurs ne changent pas : bienveillance, respect du cheval, progression à votre rythme.
          Pas de jugement, pas de pression. Juste le plaisir du contact avec l'animal.
        </p>
      </div>
    </div>
  </section>

  <!-- Pedagogical approach — 3 pillars -->
  <section class="py-12 lg:py-16 bg-base-100">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-10">Notre pédagogie</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold text-primary">Progressif</h3>
          <p class="text-base-content/70">
            Chaque cavalier avance à son propre rythme, du premier contact au Galop et au-delà.
            Aucune étape n'est brûlée.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold text-primary">Bienveillant</h3>
          <p class="text-base-content/70">
            L'erreur fait partie de l'apprentissage. On encourage, on explique, on adapte —
            jamais on ne juge.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold text-primary">Respectueux</h3>
          <p class="text-base-content/70">
            Le cheval n'est pas un outil. Comprendre son langage et ses besoins est au cœur
            de notre enseignement.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Instructor profiles -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-10 text-center">
        Notre équipe
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        {instructors.map((instructor) => (
          <article class="bg-base-100 rounded-xl overflow-hidden shadow-sm">
            <!-- Photo or beige placeholder at 3:2 ratio (CLS = 0) -->
            <div class="aspect-[3/2] overflow-hidden">
              {instructor.imageSrc ? (
                <Image
                  src={instructor.imageSrc}
                  alt={instructor.imageAlt}
                  width={600}
                  height={400}
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div class="w-full h-full bg-[#F0EDE8]" aria-hidden="true" />
              )}
            </div>
            <!-- Profile content -->
            <div class="p-6 flex flex-col gap-3">
              <div>
                <h3 class="text-xl font-serif text-base-content">{instructor.firstName}</h3>
                <p class="text-sm font-semibold text-primary uppercase tracking-wide mt-1">
                  {instructor.role}
                </p>
              </div>
              <p class="text-base-content/80 italic">"{instructor.personality}"</p>
              <blockquote class="border-l-4 border-secondary pl-4 text-base-content/70 text-sm leading-relaxed">
                {instructor.philosophy}
              </blockquote>
              <p class="text-xs text-base-content/50 font-medium mt-1">{instructor.qualifications}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>

  <!-- Facility highlights -->
  <section class="py-12 lg:py-16 bg-base-100">
    <div class="max-w-5xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-8">Nos installations</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div class="space-y-4 text-base-content/80">
          <p>
            Des installations pensées pour le confort des chevaux et le plaisir des cavaliers,
            en pleine nature bretonne.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="text-primary font-bold mt-0.5 shrink-0">•</span>
              <span>Carrières couvertes pour pratiquer toute l'année</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary font-bold mt-0.5 shrink-0">•</span>
              <span>Boxes spacieux avec litière changée quotidiennement</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary font-bold mt-0.5 shrink-0">•</span>
              <span>Paddocks et prés pour la détente des chevaux</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-primary font-bold mt-0.5 shrink-0">•</span>
              <span>Chemins de randonnée en pleine nature bretonne</span>
            </li>
          </ul>
        </div>
        <!-- Facility image or beige placeholder at 4:3 ratio (CLS = 0) -->
        <div class="aspect-[4/3] overflow-hidden rounded-xl">
          {showFacilityImage ? (
            {/* Replace this comment with: <Image src={installationsImage} alt="..." ... /> */}
            <div class="w-full h-full bg-[#F0EDE8]" aria-hidden="true" />
          ) : (
            <div class="w-full h-full bg-[#F0EDE8]" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-3xl mx-auto px-4 text-center">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-4">
        Venez nous rencontrer
      </h2>
      <p class="text-base-content/70 mb-8 max-w-xl mx-auto">
        La meilleure façon de découvrir {business.name}, c'est de venir ! Contactez-nous pour
        une visite, un premier cours d'essai, ou simplement pour échanger.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/contact" class="btn btn-primary min-h-[44px]">Nous contacter</a>
        <a href="/cours-enfants" class="btn btn-outline min-h-[44px]">Nos cours</a>
      </div>
    </div>
  </section>
</BaseLayout>
```

> **⚠️ Facility image JSX note:** The `showFacilityImage` conditional above has a JSX comment inside a ternary which Astro may not support. For the cleanest implementation, simplify the facility image block to:
>
> ```astro
> <!-- Facility image placeholder — replace with <Image> when photo is ready -->
> <div class="aspect-[4/3] overflow-hidden rounded-xl">
>   <div class="w-full h-full bg-[#F0EDE8]" aria-hidden="true" />
> </div>
> ```
>
> When `installations.jpg` is added:
> ```astro
> import installationsImage from '../assets/images/facilities/installations.jpg';
> ```
> Replace the div with:
> ```astro
> <Image
>   src={installationsImage}
>   alt="Installations du centre équestre Équi 22 — carrières, boxes et paddocks"
>   width={600}
>   height={450}
>   class="w-full h-full object-cover"
>   loading="lazy"
> />
> ```

---

### Architecture Compliance

| Rule | Status for Story 5.1 |
|---|---|
| **TypeScript strict** | `interface Instructor` fully typed. `imageSrc?: ImageMetadata` imported from `'astro'`. No `any`, no `@ts-ignore`. |
| **Tailwind/daisyUI only** | All classes are Tailwind utilities and daisyUI tokens (`bg-base-200`, `bg-base-100`, `text-primary`, `btn-primary`, `btn-outline`, `font-serif`). No `<style>` blocks. |
| **Semantic HTML** | `<section>` per content zone, `<article>` per instructor, `<h2>` per section, `<h3>` per instructor/pillar, `<blockquote>` for instructor philosophy, `<ul>/<li>` for facility features. |
| **Images via astro:assets** | `<Image>` from `astro:assets` used for instructor and facility photos. Raw `<img>` tags never used. Beige `bg-[#F0EDE8]` placeholder div preserves aspect ratio when images unavailable (CLS = 0). |
| **business.ts references** | `business.name` and `business.city` used in copy. `business.ts` imported — zero hardcoded business info. |
| **44px tap targets (FR36)** | CTA buttons use `min-h-[44px]` class. |
| **No client-side JS** | Zero JS added. All rendering is Astro server-side (build-time). |
| **Content in French** | All visible content in French. Code (variables, interfaces, comments) in English. |
| **BaseLayout with SEO** | `title`, `description`, and `whatsappMessage` props passed with keyword-targeted values. |
| **No regression** | Only file created: `src/pages/a-propos.astro`. No existing files touched. |

---

### Project Structure Notes

**Files to CREATE:**
```
src/pages/a-propos.astro                              ← new About page (this story)
```

**Files to CREATE (optional — when real photos available):**
```
src/assets/images/hero/a-propos.png                   ← hero image for the about page
src/assets/images/team/instructeur-1.jpg              ← instructor 1 photo
src/assets/images/team/instructeur-2.jpg              ← instructor 2 photo
src/assets/images/facilities/installations.jpg        ← facility overview photo
```

**Files NOT to touch:**
- `src/data/navigation.ts` — already has `{ label: 'À propos', href: '/a-propos' }` at index 6
- `src/components/Navbar.astro` — already renders `/a-propos` in desktop + mobile nav
- `src/layouts/BaseLayout.astro` — no changes
- Any existing page files — NOT touched
- Any existing component files — NOT touched

**Pages state after this story:**
```
src/pages/
├── index.astro              ← exists (unchanged)
├── tarifs.astro             ← exists (unchanged)
├── cours-enfants.astro      ← exists (unchanged)
├── equitation-adulte.astro  ← exists (unchanged)
├── pension-chevaux.astro    ← exists (unchanged)
├── stages-vacances.astro    ← exists (unchanged)
├── competitions.astro       ← exists (unchanged)
├── contact.astro            ← exists (unchanged)
└── a-propos.astro           ← CREATE THIS (story 5.1)
```

**Component count:** 13 components — no new components added — flat folder maintained.

---

### Previous Story Intelligence (Story 4.2 Learnings)

| Learning | Impact on Story 5.1 |
|---|---|
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs`. All daisyUI tokens available via `@plugin "daisyui"` in `global.css`. Use `bg-base-200`, `text-primary`, `btn-primary`, etc. directly. |
| **`astro check` AND `npm run build` both required** | Run both in Task 3 to catch TypeScript/import errors and Vite bundling issues. |
| **`btn-secondary` = green, `btn-primary` = blue** | CTA buttons: `btn-primary` (blue, main action = "Nous contacter"), `btn-outline` (transparent border, secondary = "Nos cours"). |
| **One file per story** | Story 5.1 creates exactly 1 mandatory file: `a-propos.astro`. Optional image files added when ready. |
| **`business.name` and `business.city` in copy** | Reference `business.name` ('Équi 22') and `business.city` ('Yffiniac') from `business.ts` — never hardcoded. |
| **Static image imports require file existence** | Instructor and facility image imports are commented out by default. Add when real photos are available. The page builds cleanly with placeholder divs in the meantime. |
| **`aspect-[3/2]` and `aspect-[4/3]` for placeholders** | Ensures correct ratio div renders before image, preventing layout shift (CLS = 0). This is the standard pattern from Hero.astro. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `2c52a09` — Story 4-2: Dedicated contact page
2. `5ffbe5a` — Story 4-1: Contact form component with Web3Forms integration
3. `d86eb3a` — Story 3-3: Homepage news section with freshness logic

**Pattern from recent stories:** Each story creates 1 primary file. Story 5.1 creates `a-propos.astro`. Commit message pattern: `"Story 5-1: About page — center, values & instructors"`.

---

### What Story 5.1 Does NOT Include

| Excluded | Reason | Handled By |
|---|---|---|
| Google reviews display (FR20) | Separate story — Story 5.3 | Story 5.3 |
| Structured photo gallery (FR21, FR22) | Separate story — Story 5.2 | Story 5.2 |
| Real instructor/facility photos | Photos not available at story creation. Placeholder pattern used. | Developer adds when client provides photos |
| `instructors.ts` data file | Inline data in the page is sufficient for 2 instructors. No collection needed. | By design — not worth a separate file at this scale |
| Schema markup (Service type) | About page is not a service page — LocalBusiness schema from BaseLayout is sufficient | BaseLayout / SchemaMarkup.astro |
| Map embed | Adds runtime dependency, privacy concerns. GPS in `business.ts` for V2. | V2 if needed |

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 5.1: About Page — Center, Values & Instructors]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 5: About, Trust & Visual Content]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: src/data/navigation.ts — mainMenu with 'À propos' entry at index 6]
- [Source: src/components/Hero.astro — imageSrc optional pattern with bg-base-200 fallback]
- [Source: src/layouts/BaseLayout.astro — Props interface]
- [Source: src/data/business.ts — business.name, business.city]
- [Source: _bmad-output/implementation-artifacts/4-2-dedicated-contact-page.md — Story 4.2 learnings]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

No issues encountered. Build succeeded on first attempt.

### Completion Notes List

- Created `src/pages/a-propos.astro` with all 6 content sections (Hero, history/values, pedagogy, instructors, facilities, CTA)
- Used beige `#F0EDE8` placeholder divs for all 3 optional images (instructor photos + facility) — CLS = 0
- `interface Instructor` with `imageSrc?: ImageMetadata` — page builds cleanly before real photos are available
- `business.name` and `business.city` referenced from `business.ts` — zero hardcoded business info
- Hero rendered without `imageSrc` prop → `bg-base-200` fallback (no broken build)
- CTA buttons use `min-h-[44px]` meeting FR36 tap target requirement
- `astro check`: 0 errors, 0 warnings (2 pre-existing hints in SchemaMarkup.astro unrelated to this story)
- `npm run build`: successful, `/a-propos/index.html` generated, all 9 existing pages rendered without regression
- No existing files modified — zero regression

### File List

- `src/pages/a-propos.astro` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified — status set to `review`)

## Change Log

- 2026-02-20: Story 5-1 implemented — Created `src/pages/a-propos.astro` with Hero, center history & values, pedagogical approach (3 pillars), instructor profiles (2 profiles with beige placeholder), facility highlights, and CTA section. All acceptance criteria satisfied. Build passes with 0 errors.
- 2026-02-20: Code review fixes — `whatsappMessage` now uses `business.name`/`business.city` template literal (M-1); bullet `•` spans marked `aria-hidden="true"` (M-3); `sprint-status.yaml` added to File List (M-2); `<blockquote>` now includes `<cite>` attribution (L-1); qualifications contrast improved `/50`→`/60` (L-2); facility placeholder HTML comments removed from template (L-3); instructor personality no longer wrapped in literal quotes (L-4).
