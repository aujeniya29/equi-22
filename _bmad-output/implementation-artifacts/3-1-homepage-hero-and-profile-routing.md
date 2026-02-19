# Story 3.1: Homepage Hero & Profile Routing

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to land on a homepage that immediately shows me how to find what I need via profile-based routing**,
so that **I reach the right service page in one tap without guessing the menu structure** (FR1).

## Acceptance Criteria

1. **AC-1: Homepage accessible at / with hero section** — `index.astro` renders at `/` with `BaseLayout.astro`. The `<title>` tag is "Équi 22 — Centre Équestre Yffiniac" (handled automatically by BaseLayout's `isHomepage` logic). The meta description targets primary SEO keywords. `Hero.astro` displays with `homepageHero` image and an emotional French tagline.

2. **AC-2: ProfileRouting embedded in the hero** — `Hero.astro` accepts an optional default `<slot />` rendered after the description paragraph. `ProfileRouting.astro` is passed as a child of `<Hero>` in `index.astro`. The 3 routing buttons are visible in the hero overlay area, at the bottom of the hero section.

3. **AC-3: Correct navigation per button** — "Mon enfant veut monter à cheval" links to `/cours-enfants`. "Je suis adulte" links to `/equitation-adulte`. "Je cherche une pension" links to `/pension-chevaux`.

4. **AC-4: Accessibility** — Each `<a>` button has a unique, descriptive `aria-label` (not just the link text). A `<nav>` wrapper with `aria-label="Navigation par profil visiteur"` wraps the 3 buttons. All buttons have `min-h-[44px]` (44px minimum tap target per FR36).

5. **AC-5: Responsive layout** — On mobile: buttons stack vertically (`flex-col`). On desktop (sm+): buttons are side by side (`sm:flex-row`), each `flex-1` (equal width). Hero height is `min-h-[450px] lg:min-h-[600px]` to accommodate profile routing buttons while still showing ample image above.

6. **AC-6: Hero uses `<Picture>` with optimized formats** — `src/assets/images/hero/homepage.png` is statically imported and passed as `imageSrc` prop. `Hero.astro` renders it via `<Picture>` with `formats={['avif', 'webp']}`, `widths={[640, 960, 1280, 1920]}`, `sizes="100vw"`, and `fetchpriority="high"`.

7. **AC-7: No regression on existing service pages** — The `Hero.astro` changes (`<slot />` + optional `heightClass` prop with default `'h-[300px] lg:h-[450px]'`) are backward-compatible. All 5 existing service pages (`cours-enfants.astro`, `equitation-adulte.astro`, `pension-chevaux.astro`, `stages-vacances.astro`, `competitions.astro`) still render identically — they do not pass children or `heightClass`.

8. **AC-8: Build verification** — `astro check` passes with 0 type errors. `npm run build` completes successfully with `/index.html` in the prerendered pages output.

## Tasks / Subtasks

- [x] Task 1: Add homepage hero image (AC: #6)
  - [x] Place `src/assets/images/hero/homepage.png` — general center photo (or use `cours-enfants.png` as temp placeholder if unavailable)

- [x] Task 2: Modify `Hero.astro` to support optional slot and height override (AC: #2, #5, #7)
  - [x] Add optional `heightClass?: string` prop with default `'h-[300px] lg:h-[450px]'`
  - [x] Replace `class="relative w-full h-[300px] lg:h-[450px] overflow-hidden"` with template literal using `heightClass`
  - [x] Add `mb-4` to the description `<p>` tag (currently no bottom margin)
  - [x] Add `<slot />` after the description `<p>` tag inside the content `<div>`

- [x] Task 3: Create `ProfileRouting.astro` component (AC: #2, #3, #4, #5)
  - [x] Create `src/components/ProfileRouting.astro` with 3 `<a>` buttons in a `<nav>`
  - [x] No TypeScript `interface Props` needed (no external props — routes are hardcoded)
  - [x] Apply `flex flex-col sm:flex-row gap-3` layout on `<nav>`
  - [x] Each button: `btn btn-primary flex-1 min-h-[44px]` with correct `href` and `aria-label`

- [x] Task 4: Update `index.astro` with full homepage (AC: #1, #2, #3, #5, #6)
  - [x] Import `Hero`, `ProfileRouting`, and `homepageHero` image
  - [x] Set `BaseLayout` props: `title`, `description` (≤140 chars, SEO-optimized), `whatsappMessage`
  - [x] Use `<Hero>` with `imageSrc={homepageHero}`, `imageAlt`, tagline `title`, `description`, `heightClass="min-h-[450px] lg:min-h-[600px]"`
  - [x] Pass `<ProfileRouting />` as child of `<Hero>` (default slot)

- [x] Task 5: Build verification (AC: #7, #8)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/index.html` is in the prerendered output
  - [x] Visually verify hero + buttons on mobile viewport (375px) and desktop (1280px)

## Dev Notes

### Critical Context — What Already Exists

**Hero.astro already exists** at `src/components/Hero.astro`. It must be modified (NOT replaced) to add slot support and an optional `heightClass` prop. The current interface is:

```astro
interface Props {
  title: string;
  description: string;
  imageSrc?: ImageMetadata;
  imageAlt: string;
}
```

After modification:
```astro
interface Props {
  title: string;
  description: string;
  imageSrc?: ImageMetadata;
  imageAlt: string;
  heightClass?: string;  // NEW: default 'h-[300px] lg:h-[450px]'
}
```

**Current Hero.astro content (full file — modify in place):**

```astro
---
import { Picture } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  imageSrc?: ImageMetadata;
  imageAlt: string;
}

const { title, description, imageSrc, imageAlt } = Astro.props;
---

<section class="relative w-full h-[300px] lg:h-[450px] overflow-hidden">
  {imageSrc ? (
    <Picture
      src={imageSrc}
      formats={['avif', 'webp']}
      alt={imageAlt}
      widths={[640, 960, 1280, 1920]}
      sizes="100vw"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    <div class="absolute inset-0 bg-base-200"></div>
  )}
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-4 pb-8 lg:pb-12">
    <h1 class="text-3xl lg:text-5xl font-serif text-white mb-2">{title}</h1>
    <p class="text-lg lg:text-xl text-white/90 max-w-2xl">{description}</p>
  </div>
</section>
```

**Modified Hero.astro (complete replacement):**

```astro
---
import { Picture } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  imageSrc?: ImageMetadata;
  imageAlt: string;
  heightClass?: string;
}

const { title, description, imageSrc, imageAlt, heightClass = 'h-[300px] lg:h-[450px]' } = Astro.props;
---

<section class={`relative w-full ${heightClass} overflow-hidden`}>
  {imageSrc ? (
    <Picture
      src={imageSrc}
      formats={['avif', 'webp']}
      alt={imageAlt}
      widths={[640, 960, 1280, 1920]}
      sizes="100vw"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    <div class="absolute inset-0 bg-base-200"></div>
  )}
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-4 pb-8 lg:pb-12">
    <h1 class="text-3xl lg:text-5xl font-serif text-white mb-2">{title}</h1>
    <p class="text-lg lg:text-xl text-white/90 max-w-2xl mb-4">{description}</p>
    <slot />
  </div>
</section>
```

**Why these changes are backward-compatible:**
- `heightClass` defaults to `'h-[300px] lg:h-[450px]'` — all 5 existing service pages that call `<Hero>` without `heightClass` behave identically
- `mb-4` on `<p>`: adds 16px space after description — service pages have empty slot so the extra margin is absorbed by the existing `pb-8` container padding
- `<slot />`: empty for service pages (no children passed) — renders nothing

---

### Complete Implementation — ProfileRouting.astro

Create `src/components/ProfileRouting.astro` with this exact content:

```astro
---
// No external props — routes are hardcoded for the homepage profile routing (FR1)
---

<nav aria-label="Navigation par profil visiteur" class="flex flex-col sm:flex-row gap-3">
  <a
    href="/cours-enfants"
    class="btn btn-primary flex-1 min-h-[44px]"
    aria-label="Voir les cours d'équitation pour enfants et poneys"
  >
    Mon enfant veut monter à cheval
  </a>
  <a
    href="/equitation-adulte"
    class="btn btn-primary flex-1 min-h-[44px]"
    aria-label="Voir les cours d'équitation pour adultes débutants et confirmés"
  >
    Je suis adulte
  </a>
  <a
    href="/pension-chevaux"
    class="btn btn-primary flex-1 min-h-[44px]"
    aria-label="En savoir plus sur la pension pour chevaux et poneys"
  >
    Je cherche une pension
  </a>
</nav>
```

**Design note:** `btn btn-primary` = green (#2D5F3F) with white text — visually prominent against the dark hero overlay (`bg-black/40`). All 3 buttons have equal visual weight (same style) as they are equal routing choices, not a CTA hierarchy. `flex-1` makes them expand equally side-by-side on desktop.

---

### Complete Implementation — index.astro

**Placeholder image strategy:** If `src/assets/images/hero/homepage.png` doesn't exist yet, temporarily import `src/assets/images/hero/cours-enfants.png` and rename the variable. Document this in Dev Agent Record for follow-up.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ProfileRouting from '../components/ProfileRouting.astro';
// Replace with a real center overview photo once available:
import homepageHero from '../assets/images/hero/homepage.png';

const whatsappMessage = "Bonjour, je suis intéressé(e) par les activités du centre équestre Équi 22.";
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
    imageAlt="Vue du centre équestre Équi 22 à Yffiniac — chevaux et cavaliers dans un cadre naturel breton"
    heightClass="min-h-[450px] lg:min-h-[600px]"
  >
    <ProfileRouting />
  </Hero>
</BaseLayout>
```

**Title handling note:** The `title="Accueil"` prop in BaseLayout is overridden automatically by the `isHomepage` logic in `BaseLayout.astro`:
```typescript
const pageTitle = isHomepage ? 'Équi 22 — Centre Équestre Yffiniac' : `${title} | Équi 22`;
```
→ The `<title>` tag will be "Équi 22 — Centre Équestre Yffiniac" ✓ — do NOT change this logic.

**Description note:** "Centre équestre à Yffiniac, Côtes-d'Armor. Cours enfants et adultes, pension chevaux, stages et compétitions. Découvrez Équi 22." = 120 characters ≤ 140 ✓

---

### Hero Height Rationale

**Why `min-h-[450px] lg:min-h-[600px]` for the homepage:**

On mobile (375px width), with 3 stacked buttons, estimated content height in the hero:
- `pb-8` container padding: 32px
- Title (`text-3xl`): ~36px + `mb-2` 8px
- Description (`text-xl`): ~24px + `mb-4` 16px
- 3 × `btn` height (min-h-[44px] actual: ~52px each) + `gap-3` (12px × 2): ~180px

Total content: ~296px. With `min-h-[450px]`, image is visible for ~154px above — sufficient for emotional impact.

On desktop (>1024px), with buttons side-by-side:
- Content: ~36px (title) + 8 + 28px (description) + 16 + 52px (buttons) = ~140px + 48px padding = ~188px
- With `min-h-[600px]`, image visible for ~412px — generous and impactful.

**Why `min-h-` instead of `h-`:** Allows the container to grow on edge cases (very small screens, font zoom), preventing content clipping. `h-full` on the absolutely-positioned image remains correct — it fills the computed section height.

---

### What Story 3.1 Does NOT Include

| Excluded | Reason | Handled By |
|---|---|---|
| `ServiceCard.astro` component | Not part of hero + routing scope | Story 3.2 |
| Service cards grid on homepage | See above | Story 3.2 |
| `news` Content Collection (Zod schema) | Separate feature | Story 3.3 |
| "Actualités" news section on homepage | Requires news collection + freshness logic | Story 3.3 |
| `/a-propos`, `/contact`, `/blog` pages | Different epics | Epics 4-6 |

**Do NOT touch in this story:**
- `src/content.config.ts` — no new collection needed
- `src/data/navigation.ts` — navigation unchanged
- `src/data/business.ts` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- Any service page `.astro` files — not touched
- Any service content `.md` files — not touched
- `src/components/ServicePage.astro` — not touched

---

### Architecture Compliance

| Rule | Status for Story 3.1 |
|---|---|
| **TypeScript strict** | `heightClass?: string` — properly typed optional prop with default. `ProfileRouting.astro` has no interface (no props — allowed when component has no external props) |
| **Tailwind/daisyUI only** | All classes are Tailwind/daisyUI — no inline CSS, no scoped `<style>` |
| **Semantic HTML** | `<section>` for hero, `<nav>` with aria-label for routing, `<a>` tags for navigation |
| **Content in French** | All visible text French; code/variable names English |
| **`<Picture>` for images** | Hero already uses `<Picture>` — homepage passes `imageSrc`, same component |
| **No client-side JS** | ProfileRouting is pure HTML links — zero JS islands |
| **44px tap targets** | `min-h-[44px]` on all 3 routing buttons |
| **Flat `components/` folder** | `ProfileRouting.astro` added at root of `components/` — now 10 components, well under 15 |
| **Never hardcode phone/address** | Phone/WhatsApp data in BaseLayout → StickyContact via `business.ts` — not touched in this story |
| **No new ogImage** | Known 404 pattern — no `ogImage` prop passed to BaseLayout (uses default `/og-default.jpg`) |

---

### Previous Story Intelligence (Story 2.8 Learnings)

| Learning | Impact on Story 3.1 |
|---|---|
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme is in `src/styles/global.css` via `@theme`/`@plugin`. Use only Tailwind utility + daisyUI classes. |
| **`astro check` AND `npm run build` both required** | Run both for verification — `astro check` catches TS errors, `npm run build` catches Vite/runtime issues |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known non-blocking — do not fail the build |
| **Full French diacritics** | Button labels: "Mon enfant veut monter à cheval", "Je cherche une pension" — accents are required |
| **`btn-primary` = green (#2D5F3F)** | The routing buttons use `btn-primary` (green) which is visible against `bg-black/40` overlay |
| **Transient "Duplicate id" warning** | Astro v5 first-sync artifact — disappears on second run, non-blocking |
| **`seoDescription` max ~140 chars** | Homepage description is 120 chars — within limit ✓ |
| **No ogImage prop** | Do not pass `ogImage` to BaseLayout (known 404 bug — no per-page OG images in `public/` yet) |
| **Template literal for dynamic classes** | `class={`relative w-full ${heightClass} overflow-hidden`}` — use backtick template literal for dynamic Tailwind classes |
| **Astro v5 Content Layer API** | Content collections use `glob` loader in `content.config.ts` — not relevant to this story (no new collections) |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `a4e6d49` — Story 2-8 (tarifs.astro — 1 file, data aggregation page)
2. `47be358` — Story 2-7 (competitions page — 3 files: image + .md + .astro)
3. `00e44e9` — Story 2-6 (holiday camps — 3 files)
4. `1b2eaf1` — Story 2-5 (horse boarding — 3 files)
5. `eacbaed` — Story 2-4 (adult riding — 3 files)

**Pattern for Story 3.1:** 3 files modified/created + 1 image asset:
- `src/components/Hero.astro` (MODIFIED — minimal slot addition)
- `src/components/ProfileRouting.astro` (CREATED)
- `src/pages/index.astro` (MODIFIED — replaces minimal placeholder)
- `src/assets/images/hero/homepage.png` (ADDED — or placeholder from existing)

---

### Project Structure Notes

**Current state of `src/components/` (all existing):**
```
src/components/
├── SchemaMarkup.astro   ← exists
├── Navbar.astro         ← exists
├── StickyContact.astro  ← exists
├── Footer.astro         ← exists
├── Hero.astro           ← EXISTS — MODIFY (add slot + heightClass prop)
├── PlanningBlock.astro  ← exists
├── PricingTable.astro   ← exists
├── Testimonial.astro    ← exists
├── ServicePage.astro    ← exists
└── ProfileRouting.astro ← CREATE THIS (3-button homepage routing nav)
```
Total after story: 10 components — well under the 15-component threshold for subfolders.

**Current state of `src/pages/`:**
```
src/pages/
├── index.astro             ← EXISTS (minimal) — REPLACE with full implementation
├── cours-enfants.astro     ← exists (reference — do NOT touch)
├── equitation-adulte.astro ← exists (reference — do NOT touch)
├── pension-chevaux.astro   ← exists (reference — do NOT touch)
├── stages-vacances.astro   ← exists (reference — do NOT touch)
├── competitions.astro      ← exists (reference — do NOT touch)
└── tarifs.astro            ← exists (reference — do NOT touch)
```

**Current state of `src/assets/images/hero/`:**
```
src/assets/images/hero/
├── cours-enfants.png    ← exists (can use as homepage placeholder)
├── equitation-adulte.png ← exists
├── pension-chevaux.png  ← exists
├── stages-vacances.png  ← exists
├── competitions.png     ← exists
└── homepage.png         ← ADD THIS (real center overview photo, or use cours-enfants.png temporarily)
```

**Files to CREATE:**
```
src/components/ProfileRouting.astro     ← new 3-button routing component
src/assets/images/hero/homepage.png     ← homepage hero image
```

**Files to MODIFY:**
```
src/components/Hero.astro               ← add heightClass prop + <slot />
src/pages/index.astro                   ← replace minimal placeholder with full homepage
```

**Files to NOT touch:**
- `src/layouts/BaseLayout.astro` — no changes needed
- `src/content.config.ts` — no new collections
- `src/data/navigation.ts` — no navigation changes
- `src/data/business.ts` — no changes
- `src/styles/global.css` — no theme changes
- `package.json` — no new dependencies
- Any existing service page `.astro` or `.md` files

---

### TypeScript Notes

**Template literal in class attribute:**
Astro supports template literals for dynamic Tailwind classes:
```astro
<section class={`relative w-full ${heightClass} overflow-hidden`}>
```
This is the correct Astro pattern — avoids object notation complexity. TypeScript will type-check that `heightClass` is `string`.

**ImageMetadata type:**
`import homepageHero from '../assets/images/hero/homepage.png'` → type is `ImageMetadata` (from `astro:assets`). This matches `imageSrc?: ImageMetadata` in Hero.astro's `interface Props`. ✓

**No interface for ProfileRouting:**
When an Astro component has no external props (no `Astro.props` usage), no `interface Props` is needed. TypeScript strict mode is satisfied. ✓

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1: Homepage Hero & Profile Routing]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 3: Homepage & Profile Routing — FR1, FR10]
- [Source: _bmad-output/planning-artifacts/epics.md#Additional Requirements — UX Design — Profile routing on homepage]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — ProfileRouting.astro ← FR1]
- [Source: _bmad-output/planning-artifacts/architecture.md#Component Pattern — every Astro component]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — MUST/MUST NOT]
- [Source: src/components/Hero.astro — current implementation to be modified]
- [Source: src/pages/index.astro — current minimal placeholder to be replaced]
- [Source: src/layouts/BaseLayout.astro — isHomepage logic for title, Props interface]
- [Source: src/data/business.ts — whatsappMessage context for StickyContact]
- [Source: src/assets/images/hero/ — existing hero images directory]
- [Source: _bmad-output/implementation-artifacts/2-8-global-pricing-page.md#Previous Story Intelligence]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- `homepage.png` was not available — used `cours-enfants.png` as placeholder copy (to replace with real center overview photo before launch)
- `astro check` warnings: 2 pre-existing hints on `SchemaMarkup.astro` (`is:inline` directive) — non-blocking, not introduced by this story
- `npm run build` CSS warnings: daisyUI `@property --radialprogress` and `[file:line]` CSS — pre-existing, cosmetic, non-blocking

### Completion Notes List

- ✅ Task 1: `src/assets/images/hero/homepage.png` created (placeholder copy of `cours-enfants.png`) — to be replaced with real center overview photo
- ✅ Task 2: `Hero.astro` modified — `heightClass?: string` prop added with default `'h-[300px] lg:h-[450px]'`, `mb-4` on `<p>`, `<slot />` after description
- ✅ Task 3: `ProfileRouting.astro` created — 3 `<a>` buttons in `<nav aria-label="Navigation par profil visiteur">`, `flex-col sm:flex-row`, `btn btn-primary flex-1 min-h-[44px]` with unique `aria-label` attributes
- ✅ Task 4: `index.astro` replaced with full homepage — `BaseLayout` with SEO description (120 chars), `Hero` with `heightClass="min-h-[450px] lg:min-h-[600px]"`, `ProfileRouting` as child slot
- ✅ Task 5: `astro check` → 0 errors, 0 warnings. `npm run build` → complete success. `/index.html` prerendered. All 5 service pages prerendered without regression.
- ✅ Backward compatibility verified: all 5 existing service pages (`cours-enfants`, `equitation-adulte`, `pension-chevaux`, `stages-vacances`, `competitions`) prerendered without errors

### File List

- `src/assets/images/hero/homepage.png` — ADDED (placeholder copy of cours-enfants.png)
- `src/components/Hero.astro` — MODIFIED (heightClass prop + slot; mb-4 removed from `<p>` — see code-review fix)
- `src/components/ProfileRouting.astro` — CREATED (3-button profile routing nav)
- `src/pages/index.astro` — MODIFIED (full homepage implementation)

## Change Log

- 2026-02-19: Story 3-1 implemented — Homepage hero with profile routing. Added `ProfileRouting.astro`, modified `Hero.astro` for slot/heightClass support, replaced `index.astro` placeholder with full homepage. Placeholder image used for homepage hero (to replace with real photo).
- 2026-02-19: Code review fixes — (1) Alt text corrected to match actual placeholder image content (WCAG 1.1.1). (2) `mb-4` moved from `Hero.astro` `<p>` to `ProfileRouting.astro` `<nav>` to restore AC-7 backward compatibility (service pages now render identically to pre-change).
