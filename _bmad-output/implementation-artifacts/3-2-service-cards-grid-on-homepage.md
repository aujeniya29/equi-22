# Story 3.2: Service Cards Grid on Homepage

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see all available services as visual cards on the homepage**,
so that **I can discover the full range of offerings and navigate to any service**.

## Acceptance Criteria

1. **AC-1: Service cards grid rendered after the hero** — After scrolling past the Hero section in `index.astro`, a `<section>` containing a grid of `ServiceCard.astro` components is displayed, one card per service (children's lessons, adult riding, boarding, camps, competitions) — 5 cards total, in `order` field sequence.

2. **AC-2: Card content** — Each `ServiceCard` displays:
   - Hero image at 3:2 ratio via `<Image>` (not `<Picture>`, not `<img>`) with `loading="lazy"`
   - Service title (from `service.data.title`)
   - Starting price label: "Dès {pricing[0].price}€/{pricing[0].unit}"
   - Short description (from `service.data.description`) — visually truncated to 2 lines via `line-clamp-2`

3. **AC-3: Card navigation** — Tapping or clicking a card navigates to `/{service.id}` (e.g., `/cours-enfants`, `/equitation-adulte`, `/pension-chevaux`, `/stages-vacances`, `/competitions`). The entire card is wrapped in a single `<a>` tag — no nested interactive elements.

4. **AC-4: Keyboard accessibility** — The card link is keyboard-focusable with a visible `focus-visible:ring-2 focus-visible:ring-primary` focus ring. No interactive elements inside the card other than the wrapping `<a>`.

5. **AC-5: Responsive layout**
   - **Mobile (default, below `sm`):** Cards stacked 1-column grid. Each card has a lateral image layout: image on the left (~120px wide, `self-stretch`), text content on the right. `flex-row` within the card.
   - **Desktop (`sm:` breakpoint and above):** Cards in a responsive grid: `sm:grid-cols-2 lg:grid-cols-3`. Each card has vertical layout: full-width image (3:2 aspect ratio) on top, text content below. `sm:flex-col` within the card.

6. **AC-6: Hover effect on desktop** — On hover, the card gains a subtle `hover:shadow-lg` and `hover:-translate-y-1` effect (smooth CSS transition, `duration-200`). Effect only visible on desktop; on mobile it is harmless (touch doesn't trigger hover state persistently).

7. **AC-7: Image optimization** — All card images use Astro `<Image>` with `width={400} height={267}` (3:2 ratio), `loading="lazy"`. Images are resolved via `import.meta.glob` in `index.astro` (same pattern as existing service pages) and passed as `heroImageSrc: ImageMetadata` prop to `ServiceCard`.

8. **AC-8: No regression** — `Hero.astro`, `ProfileRouting.astro`, and all 5 existing service page `.astro` files are NOT modified. `astro check` passes with 0 errors. `npm run build` completes successfully.

9. **AC-9: Section accessibility** — The service cards section uses a `<section>` with `aria-labelledby` pointing to a visible `<h2>` heading ("Nos services"). This ensures screen reader users understand the purpose of the section.

## Tasks / Subtasks

- [x] Task 1: Create `ServiceCard.astro` component (AC: #2, #3, #4, #5, #6, #7)
  - [x] Create `src/components/ServiceCard.astro` with `interface Props { service: CollectionEntry<'services'>; heroImageSrc: ImageMetadata; }`
  - [x] Implement lateral mobile layout (`flex-row`) + vertical desktop layout (`sm:flex-col`)
  - [x] Wrap entire card content in a single `<a>` tag for full-card click target
  - [x] Use `<Image>` from `astro:assets` with `width={400} height={267} loading="lazy"`
  - [x] Add hover effects: `hover:shadow-lg hover:-translate-y-1 transition-all duration-200`
  - [x] Add focus-visible ring for keyboard accessibility

- [x] Task 2: Update `index.astro` to load services and render grid (AC: #1, #7, #9)
  - [x] Add `getCollection` import from `astro:content`
  - [x] Add `ServiceCard` import
  - [x] Fetch all services via `getCollection('services')`, sort by `order`
  - [x] Resolve hero images via `import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}')`
  - [x] Add service cards `<section>` after `<Hero>` in the template

- [x] Task 3: Build verification (AC: #8)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm successful build
  - [x] Verify all 5 service cards appear in `/index.html` output
  - [x] Verify no regression on existing service pages

## Dev Notes

### Critical Context — Current State of the Codebase

**`ServiceCard.astro` does NOT exist yet** — it must be CREATED at `src/components/ServiceCard.astro`. This is the only new component in this story.

**`index.astro` already exists** (implemented in Story 3.1). It must be MODIFIED to:
1. Import `getCollection` and `ServiceCard`
2. Add async `getCollection` call + image resolution in frontmatter
3. Add the service cards section below `<Hero>` in the template

**Current `index.astro` (complete content — modify this):**
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
    imageAlt="Enfants souriants sur des poneys dans le manège du centre équestre Equi 22"
    heightClass="min-h-[450px] lg:min-h-[600px]"
  >
    <ProfileRouting />
  </Hero>
</BaseLayout>
```

---

### Complete Implementation — ServiceCard.astro

Create `src/components/ServiceCard.astro` with this content:

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

interface Props {
  service: CollectionEntry<'services'>;
  heroImageSrc: ImageMetadata;
}

const { service, heroImageSrc } = Astro.props;
const { title, description, pricing, heroImageAlt } = service.data;
const startingPrice = pricing[0];
const serviceUrl = `/${service.id}`;
---

<article class="bg-base-100 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
  <a
    href={serviceUrl}
    class="flex flex-row sm:flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
    aria-label={`Découvrir ${title}`}
  >
    <div class="w-[120px] shrink-0 self-stretch sm:w-full sm:aspect-[3/2] overflow-hidden">
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        width={400}
        height={267}
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="flex-1 p-4 flex flex-col justify-center sm:justify-start">
      <h3 class="font-serif text-base sm:text-lg text-base-content leading-snug">{title}</h3>
      <p class="text-primary font-semibold text-sm mt-1">Dès {startingPrice.price}€/{startingPrice.unit}</p>
      <p class="text-xs sm:text-sm text-base-content/60 mt-2 line-clamp-2">{description}</p>
    </div>
  </a>
</article>
```

**Design decisions:**
- `rounded-2xl` on both `<article>` and `<a>` ensures the focus ring follows the card border-radius on keyboard navigation
- `h-full` on `<a>` ensures equal-height cards in the same grid row (desktop)
- `self-stretch` on the image `<div>` ensures the image fills the card height on mobile lateral layout
- `sm:aspect-[3/2]` creates the exact 3:2 ratio container on desktop; `overflow-hidden` clips the image
- `line-clamp-2` visually truncates description without any JS — pure CSS
- `justify-center sm:justify-start`: vertically centers text in mobile lateral layout; top-aligns on desktop
- The `<article>` element is semantic (represents a standalone card) — aligns with architecture requirements

---

### Complete Implementation — index.astro (Modified)

Replace the entire `index.astro` content with:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ProfileRouting from '../components/ProfileRouting.astro';
import ServiceCard from '../components/ServiceCard.astro';
import homepageHero from '../assets/images/hero/homepage.png';

const whatsappMessage = "Bonjour, je suis intéressé(e) par les activités du centre équestre Équi 22.";

const allServices = await getCollection('services');
const services = allServices.sort((a, b) => a.data.order - b.data.order);

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
</BaseLayout>
```

**Why this approach:**
- `getCollection('services')` loads all 5 service entries with full typed frontmatter
- `.sort((a, b) => a.data.order - b.data.order)` preserves the intended display order (1=enfants, 2=adulte, 3=pension, 4=stages, 5=compétitions)
- `import.meta.glob` follows the exact same image resolution pattern as `cours-enfants.astro` and all other service pages — this is the established project pattern for resolving Astro static image imports from Content Collection string paths
- `Promise.all` resolves all 5 image modules in parallel (build-time, no performance penalty)
- `serviceImages[index]` maps to the sorted service at the same index — safe because `sort` is synchronous before `Promise.all`

---

### Service Data Reference

| Service slug (= `service.id`) | `title` | `pricing[0].price` | `pricing[0].unit` | Hero image path |
|---|---|---|---|---|
| `cours-enfants` | "Cours d'équitation enfants" | 25 | séance | `/src/assets/images/hero/cours-enfants.png` |
| `equitation-adulte` | "Cours d'équitation adulte" | 30 | séance | `/src/assets/images/hero/equitation-adulte.png` |
| `pension-chevaux` | "Pension chevaux" | 350 | mois | `/src/assets/images/hero/pension-chevaux.png` |
| `stages-vacances` | "Stages vacances équitation" | 35 | demi-journée | `/src/assets/images/hero/stages-vacances.png` |
| `competitions` | "Compétitions équestres" | 30 | séance | `/src/assets/images/hero/competitions.png` |

**URL mapping:** `service.id` === filename without extension === Astro page route. Each card links to `/{service.id}` which directly matches the page file at `src/pages/{service.id}.astro`.

---

### Architecture Compliance

| Rule | Status for Story 3.2 |
|---|---|
| **TypeScript strict** | `interface Props { service: CollectionEntry<'services'>; heroImageSrc: ImageMetadata; }` — fully typed, no `any`. `CollectionEntry` is from `astro:content`. |
| **Tailwind/daisyUI only** | All classes Tailwind/daisyUI — no inline CSS, no scoped `<style>` |
| **Semantic HTML** | `<section>` for the grid area, `<article>` for each card, `<h2>` for section title, `<h3>` for card titles, `<a>` for card link |
| **`<Image>` for images** | `<Image>` from `astro:assets` — never raw `<img>`. `<Picture>` not used for cards (single format is sufficient at this size) |
| **Descriptive alt text** | `heroImageAlt` from service frontmatter — already described in French per service |
| **No client-side JS** | `ServiceCard` is pure static HTML — zero JS islands |
| **Content in French** | All visible text (card labels, section title "Nos services") in French |
| **Flat components/** | `ServiceCard.astro` at root of `components/` — total: 11 components, well under 15 threshold |
| **Never hardcode URLs** | All URLs derived from `service.id` — no hardcoded paths |
| **44px tap targets** | Cards are full-height `<a>` tags — inherently larger than 44px on any device |
| **aria-labelledby on section** | `<section aria-labelledby="services-heading">` with matching `<h2 id="services-heading">` |

---

### Project Structure Notes

**Files to CREATE:**
```
src/components/ServiceCard.astro     ← new service card component
```

**Files to MODIFY:**
```
src/pages/index.astro                ← add getCollection + ServiceCard grid section
```

**Files to NOT touch:**
- `src/components/Hero.astro` — no changes
- `src/components/ProfileRouting.astro` — no changes
- `src/layouts/BaseLayout.astro` — no changes
- `src/content.config.ts` — no new collections
- `src/data/navigation.ts` — no changes
- `src/data/business.ts` — no changes
- `src/styles/global.css` — no changes
- `package.json` — no new dependencies
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
└── ServiceCard.astro      ← CREATE THIS (story 3.2)
```
Total: 11 components — well under the 15-component threshold for subfolders.

---

### Previous Story Intelligence (Story 3.1 Learnings)

| Learning | Impact on Story 3.2 |
|---|---|
| **Tailwind v4 CSS-first config** | No `tailwind.config.mjs` — theme is in `src/styles/global.css` via `@theme`/`@plugin`. Use only Tailwind utility + daisyUI classes. `bg-base-100`, `bg-base-200`, `text-primary`, `text-base-content`, `font-serif` all work as expected. |
| **`astro check` AND `npm run build` both required** | Run both to catch TS errors (check) and Vite/runtime issues (build) |
| **daisyUI CSS warnings are cosmetic** | Some build warnings from daisyUI are known non-blocking — do not fail the build |
| **`import.meta.glob` image pattern** | Pattern `'/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}'` resolves image string paths from Content Collections. Already used in all 5 service pages. Use exact same pattern in `index.astro`. |
| **Template literal for dynamic classes** | If conditionals needed, use template literals: `` class={`... ${variable} ...`} `` |
| **`mb-4` moved to ProfileRouting.astro** | The `<p>` description in `Hero.astro` has no extra bottom margin. The `<slot />` content (ProfileRouting) has its own `mt-4` or the nav gap handles spacing. Do NOT change `Hero.astro` in this story. |
| **Transient "Duplicate id" warning** | Astro v5 first-sync artifact — disappears on second run, non-blocking |
| **No ogImage prop** | Do not pass `ogImage` to BaseLayout from `index.astro` (known 404 bug — no per-page OG images in `public/` yet) |
| **Astro v5 Content Layer API** | Collections use `glob` loader in `content.config.ts`. Use `getCollection('services')` (not `getEntries`). The `id` field = filename without extension (e.g., `cours-enfants`). |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `f8eac4a` — Story 3-1: Homepage hero with profile routing (Hero.astro + ProfileRouting.astro + index.astro)
2. `a4e6d49` — Story 2-8 (tarifs.astro — global pricing page)
3. `47be358` — Story 2-7 (competitions page)
4. `00e44e9` — Story 2-6 (holiday camps)
5. `1b2eaf1` — Story 2-5 (horse boarding)

**Pattern for Story 3.2:** 2 files:
- `src/components/ServiceCard.astro` (CREATED)
- `src/pages/index.astro` (MODIFIED — add getCollection + ServiceCard grid)

---

### What Story 3.2 Does NOT Include

| Excluded | Reason | Handled By |
|---|---|---|
| `news` Content Collection (Zod schema) | Separate feature requiring new collection | Story 3.3 |
| "Actualités" news section on homepage | Requires news collection + freshness logic | Story 3.3 |
| Breadcrumb navigation | Not relevant to homepage cards | Epic 6 (blog) |
| Google Reviews on homepage | Trust layer — separate story | Story 5.3 |
| ContactForm on homepage | No contact form on homepage in MVP | Epic 4 |

**Do NOT create in this story:**
- Any new content collection (`news`, `blog`)
- `Breadcrumb.astro`
- Any new pages

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2: Service Cards Grid on Homepage]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 3: Homepage & Profile Routing]
- [Source: _bmad-output/planning-artifacts/architecture.md#Pattern Examples — ServiceCard.astro good example]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — MUST/MUST NOT]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — ServiceCard.astro]
- [Source: src/pages/cours-enfants.astro — import.meta.glob image resolution pattern to replicate]
- [Source: src/content.config.ts — services collection Zod schema (title, description, pricing, heroImage, heroImageAlt, order)]
- [Source: src/content/services/cours-enfants.md — order: 1, pricing[0]: 25€/séance]
- [Source: src/content/services/equitation-adulte.md — order: 2, pricing[0]: 30€/séance]
- [Source: src/content/services/pension-chevaux.md — order: 3, pricing[0]: 350€/mois]
- [Source: src/content/services/stages-vacances.md — order: 4, pricing[0]: 35€/demi-journée]
- [Source: src/content/services/competitions.md — order: 5, pricing[0]: 30€/séance]
- [Source: src/pages/index.astro — current implementation (Story 3.1) to be extended]
- [Source: _bmad-output/implementation-artifacts/3-1-homepage-hero-and-profile-routing.md#Previous Story Intelligence]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_No debug issues encountered._

### Completion Notes List

- Created `src/components/ServiceCard.astro` with responsive layout (mobile lateral `flex-row`, desktop vertical `sm:flex-col`), `<Image>` optimization, hover effects, focus-visible ring, and full-card `<a>` tag.
- Updated `src/pages/index.astro` to import `getCollection`, resolve hero images via `import.meta.glob`, sort services by `order`, and render a `<section aria-labelledby="services-heading">` grid of `ServiceCard` components after `<Hero>`.
- `astro check`: 0 errors, 0 warnings (2 pre-existing cosmetic hints in `SchemaMarkup.astro`).
- `npm run build`: successful, all 5 service pages prerendered, 26 optimized images generated.
- All 5 service card links (`/cours-enfants`, `/equitation-adulte`, `/pension-chevaux`, `/stages-vacances`, `/competitions`) confirmed in `dist/index.html`.
- Zero regressions: all existing service pages built successfully.

### File List

- `src/components/ServiceCard.astro` (CREATED)
- `src/pages/index.astro` (MODIFIED)

### Change Log

- 2026-02-19: Story 3-2 implemented — Service Cards Grid on Homepage (ServiceCard.astro created, index.astro updated with getCollection + responsive grid)
- 2026-02-19: Code review fixes — `transition-all` → `transition-[box-shadow,transform]` (M-1), added `sizes` prop on `<Image>` (M-2), `[...allServices].sort()` to avoid in-place mutation (L-1)
