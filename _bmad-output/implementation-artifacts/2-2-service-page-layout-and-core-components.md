# Story 2.2: Service Page Layout & Core Components

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **each service page to follow a consistent layout with hero, planning, pricing, testimonial, and CTA sections**,
So that **I learn the page pattern once and find information in the same place on every service**.

**Epic Context:** Epic 2 — Service Pages (Core Conversion Pages). This is the layout & component story that creates the reusable page skeleton and all 4 core service components (Hero, PlanningBlock, PricingTable, Testimonial). Every service page (Stories 2.3-2.8) will be assembled from these building blocks. Getting the components right here means consistent, high-quality service pages everywhere.

**Business Value:** This story creates the visual conversion engine — the constant Hero → Promise → Planning → Pricing → Testimonial → CTA skeleton that guides visitors (Sophie, Marc, Claire) from emotional first impression to rational decision to action (phone call / WhatsApp). The consistent layout reduces cognitive load and lets visitors find information in the same place on every service page.

## Acceptance Criteria

1. **AC-1: Constant page skeleton** — When a visitor views any service page, the page follows the constant skeleton order: Hero → Promise/narrative (Markdown content body) → Planning → Pricing → Testimonial → CTA. All sections render in this exact order without exception.

2. **AC-2: Hero component (service variant)** — `Hero.astro` displays the hero image via `<Picture>` (WebP/AVIF, srcset) with the service title and description overlaid with readable contrast (dark overlay on image). The hero image, title, and alt text come from the service's Content Collection frontmatter. Hero dimensions are responsive: full-width, ~300px height on mobile, ~450px on desktop.

3. **AC-3: PlanningBlock component** — `PlanningBlock.astro` renders the schedule as a semantic `<table>` with day (bold, primary green), time, and level/category (daisyUI badge). The table is responsive: on mobile, each row is visually distinct with adequate spacing. If no schedule data exists in frontmatter, the planning section is not rendered.

4. **AC-4: PricingTable component** — `PricingTable.astro` renders pricing rows in a responsive table (columns on desktop, stacked cards on mobile) with optional highlight on best value (primary color border/badge). Pricing notes (license, reductions) are displayed below the table. The table uses semantic `<table>` on desktop and card-based layout on mobile.

5. **AC-5: Testimonial component** — `Testimonial.astro` renders a `<blockquote>` with left accent border (secondary blue), star rating (filled/empty stars), quote (max ~150 chars), and author with `<cite>`. If no testimonial data exists in frontmatter, the testimonial section is not rendered.

6. **AC-6: CTA section** — A CTA section at the bottom invites the visitor to call or WhatsApp with a service-specific action text. The CTA uses the phone number from `business.ts` and the contextual WhatsApp message from frontmatter.

7. **AC-7: Alternating section backgrounds** — Sections alternate cream (#F0EDE8 / `bg-base-200`) and white (#FAF8F5 / `bg-base-100`) backgrounds for visual rhythm, as specified in the UX design direction.

8. **AC-8: Image handling** — All images use Astro `<Image>` or `<Picture>` — never raw `<img>`. Hero images from Content Collection use `<Picture>` with `formats={['avif', 'webp']}` for optimized delivery.

9. **AC-9: Service page template** — A reusable `ServicePage.astro` component exists that takes a Content Collection service entry as input and renders the complete page skeleton (BaseLayout + all sections). Individual service page files (e.g., `cours-enfants.astro`) are minimal wrappers using this template.

10. **AC-10: First service page renders** — `src/pages/cours-enfants.astro` renders correctly using the existing `cours-enfants.md` sample content from Story 2.1. The page is accessible at `/cours-enfants` and displays all sections populated from frontmatter data.

11. **AC-11: Build verification** — `astro check` passes with zero type errors and `npm run build` produces a successful build.

## Tasks / Subtasks

- [x] Task 1: Create Hero.astro component (AC: #2, #8)
  - [x] Create `src/components/Hero.astro` with typed `interface Props`
  - [x] Accept props: `title`, `description`, `imageSrc`, `imageAlt`
  - [x] Render hero section with dark overlay for text contrast
  - [x] Use `<Picture>` from `astro:assets` for image with `formats={['avif', 'webp']}`
  - [x] Handle both imported images (src/assets) and public folder fallback
  - [x] Responsive: full-width, ~300px mobile / ~450px desktop height
  - [x] Title in DM Serif Display (font-serif), description in Inter (font-sans)

- [x] Task 2: Create PlanningBlock.astro component (AC: #3)
  - [x] Create `src/components/PlanningBlock.astro` with typed props
  - [x] Accept `schedule` array prop: `{ day: string, time: string, level: string }[]`
  - [x] Render semantic `<table>` with `<thead>`, `<tbody>`, `<th>` elements
  - [x] Day column: bold, primary green text
  - [x] Level column: daisyUI `badge badge-outline` styling
  - [x] Use daisyUI `table` class with responsive wrapper (`overflow-x-auto`)
  - [x] Section not rendered if schedule array is empty or undefined

- [x] Task 3: Create PricingTable.astro component (AC: #4)
  - [x] Create `src/components/PricingTable.astro` with typed props
  - [x] Accept `pricing` array and optional `pricingNotes` array
  - [x] Desktop: semantic `<table>` with label, price, unit columns
  - [x] Mobile: stacked card layout for each pricing row
  - [x] Highlighted row: primary color border or `badge badge-primary` marker
  - [x] Pricing notes rendered as `<ul>` below the table with info icon
  - [x] Price formatted with `€` symbol and unit

- [x] Task 4: Create Testimonial.astro component (AC: #5)
  - [x] Create `src/components/Testimonial.astro` with typed props
  - [x] Accept `testimonial` object: `{ quote: string, author: string, stars: number }`
  - [x] Render `<blockquote>` with left border in secondary blue (`border-l-4 border-secondary`)
  - [x] Star rating: filled stars (primary color) + empty stars
  - [x] Author in `<cite>` element
  - [x] Section not rendered if testimonial is undefined

- [x] Task 5: Create ServicePage.astro template component (AC: #1, #6, #7, #9)
  - [x] Create `src/components/ServicePage.astro`
  - [x] Accept a Content Collection service entry as prop
  - [x] Render BaseLayout with SEO props from entry data
  - [x] Assemble sections in order: Hero → Content (slot) → Planning → Pricing → Testimonial → CTA
  - [x] Alternate section backgrounds: base-200 / base-100
  - [x] CTA section with phone link from `business.ts` + WhatsApp link from frontmatter
  - [x] Pass `whatsappMessage` and `serviceType`/`serviceDescription` to BaseLayout

- [x] Task 6: Create cours-enfants.astro page (AC: #10)
  - [x] Create `src/pages/cours-enfants.astro`
  - [x] Query `getEntry('services', 'cours-enfants')` from content collection
  - [x] Render using `ServicePage.astro` with entry data
  - [x] Render Markdown content body via `render()` from `astro:content`
  - [x] Verify page accessible at `/cours-enfants`

- [x] Task 7: Add placeholder hero image (AC: #8, #10)
  - [x] Create `src/assets/images/hero/` directory
  - [x] Add a placeholder image for cours-enfants (can be a simple colored rectangle or stock photo)
  - [x] Update `cours-enfants.md` frontmatter `heroImage` to reference the `src/assets/` path
  - [x] Verify `<Picture>` renders correctly with the image

- [x] Task 8: Build verification (AC: #11)
  - [x] Run `astro check` — confirm zero type errors
  - [x] Run `npm run build` — confirm build completes successfully
  - [x] Verify `/cours-enfants` page renders all sections correctly in dev server

## Dev Notes

### Critical Technical Context

**This story creates 4 new components + 1 template + 1 page.** It's the most component-heavy story so far. All components must follow the established patterns from Epic 1 (TypeScript strict, typed Props interface, Tailwind/daisyUI classes, semantic HTML).

### Hero Component Implementation

```astro
---
// src/components/Hero.astro
import { Picture } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  imageSrc: ImageMetadata;
  imageAlt: string;
}

const { title, description, imageSrc, imageAlt } = Astro.props;
---

<section class="relative w-full h-[300px] lg:h-[450px] overflow-hidden">
  <Picture
    src={imageSrc}
    formats={['avif', 'webp']}
    alt={imageAlt}
    widths={[640, 960, 1280, 1920]}
    sizes="100vw"
    class="absolute inset-0 w-full h-full object-cover"
  />
  <div class="absolute inset-0 bg-black/40"></div>
  <div class="relative z-10 flex flex-col justify-end h-full max-w-5xl mx-auto px-4 pb-8 lg:pb-12">
    <h1 class="text-3xl lg:text-5xl font-serif text-white mb-2">{title}</h1>
    <p class="text-lg lg:text-xl text-white/90 max-w-2xl">{description}</p>
  </div>
</section>
```

**Image handling strategy:**

Since the architecture specifies `src/assets/images/` for optimized images, hero images should be placed there and dynamically imported. The service frontmatter `heroImage` field should reference paths like `/src/assets/images/hero/cours-enfants.jpg`.

**Dynamic image import pattern for Content Collection entries:**

```astro
---
// In ServicePage.astro or the page file
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}'
);

const heroImagePath = entry.data.heroImage; // e.g., "/src/assets/images/hero/cours-enfants.jpg"
const heroImageModule = images[heroImagePath];

if (!heroImageModule) {
  throw new Error(`Hero image not found: ${heroImagePath}. Place image in src/assets/images/`);
}

const heroImage = (await heroImageModule()).default;
---

<Hero
  title={entry.data.title}
  description={entry.data.description}
  imageSrc={heroImage}
  imageAlt={entry.data.heroImageAlt}
/>
```

**IMPORTANT:** The `cours-enfants.md` frontmatter currently has `heroImage: "/images/hero/cours-enfants.jpg"` (public path). This MUST be updated to `heroImage: "/src/assets/images/hero/cours-enfants.jpg"` so Astro can optimize the image. Place the actual image file at `src/assets/images/hero/cours-enfants.jpg`.

**Placeholder image approach:** Until real photos are available, create a simple placeholder image (1920x800px, solid beige #F0EDE8 color with center name overlay). This prevents build errors while keeping the layout accurate. A simple way is to use a colored div as temporary placeholder if no image exists:

```astro
{heroImage ? (
  <Picture src={heroImage} ... />
) : (
  <div class="absolute inset-0 bg-base-200"></div>
)}
```

### PlanningBlock Component Implementation

```astro
---
// src/components/PlanningBlock.astro
interface ScheduleItem {
  day: string;
  time: string;
  level: string;
}

interface Props {
  schedule: ScheduleItem[];
}

const { schedule } = Astro.props;
---

{schedule && schedule.length > 0 && (
  <section class="py-12 lg:py-16 bg-base-100">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-8">Planning</h2>
      <div class="overflow-x-auto">
        <table class="table table-lg">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Horaire</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot) => (
              <tr>
                <td class="font-semibold text-primary">{slot.day}</td>
                <td>{slot.time}</td>
                <td><span class="badge badge-outline">{slot.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
)}
```

### PricingTable Component Implementation

```astro
---
// src/components/PricingTable.astro
interface PricingRow {
  label: string;
  price: string;
  unit: string;
  highlight: boolean;
}

interface Props {
  pricing: PricingRow[];
  pricingNotes?: string[];
}

const { pricing, pricingNotes } = Astro.props;
---

<section class="py-12 lg:py-16 bg-base-200">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-8">Tarifs</h2>

    <!-- Desktop table -->
    <div class="hidden lg:block overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Formule</th>
            <th>Tarif</th>
            <th>Unite</th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((row) => (
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
      {pricing.map((row) => (
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

    {pricingNotes && pricingNotes.length > 0 && (
      <ul class="mt-6 space-y-1 text-sm text-base-content/70">
        {pricingNotes.map((note) => (
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
```

### Testimonial Component Implementation

```astro
---
// src/components/Testimonial.astro
interface Props {
  quote: string;
  author: string;
  stars: number;
}

const { quote, author, stars } = Astro.props;
---

<section class="py-12 lg:py-16 bg-base-100">
  <div class="max-w-4xl mx-auto px-4">
    <blockquote class="border-l-4 border-secondary pl-6 py-4">
      <div class="flex gap-1 mb-3" aria-label={`${stars} etoiles sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            class={`w-5 h-5 ${i < stars ? 'text-yellow-400 fill-current' : 'text-base-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p class="text-lg italic text-base-content/80 mb-3">"{quote}"</p>
      <cite class="not-italic text-sm font-medium text-base-content/60">— {author}</cite>
    </blockquote>
  </div>
</section>
```

### ServicePage Template Component

```astro
---
// src/components/ServicePage.astro
import type { CollectionEntry } from 'astro:content';
import { render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from './Hero.astro';
import PlanningBlock from './PlanningBlock.astro';
import PricingTable from './PricingTable.astro';
import Testimonial from './Testimonial.astro';
import { business } from '../data/business';

interface Props {
  entry: CollectionEntry<'services'>;
  heroImage: ImageMetadata;
}

const { entry, heroImage } = Astro.props;
const { data } = entry;
const { Content } = await render(entry);

const phoneUrl = `tel:${business.phone.replace(/\s/g, '')}`;
const whatsappNumber = business.whatsapp.replace(/[^\d]/g, '');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(data.whatsappMessage)}`;
---

<BaseLayout
  title={data.seoTitle}
  description={data.seoDescription}
  ogImage={data.ogImage}
  serviceType={data.serviceType}
  serviceDescription={data.serviceDescription}
  whatsappMessage={data.whatsappMessage}
>
  <!-- Hero Section -->
  <Hero
    title={data.title}
    description={data.description}
    imageSrc={heroImage}
    imageAlt={data.heroImageAlt}
  />

  <!-- Promise / Narrative Content (from Markdown body) -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-4xl mx-auto px-4 prose prose-lg max-w-none">
      <Content />
    </div>
  </section>

  <!-- Planning Section (conditional) -->
  {data.schedule && data.schedule.length > 0 && (
    <PlanningBlock schedule={data.schedule} />
  )}

  <!-- Pricing Section -->
  <PricingTable pricing={data.pricing} pricingNotes={data.pricingNotes} />

  <!-- Testimonial Section (conditional) -->
  {data.testimonial && (
    <Testimonial
      quote={data.testimonial.quote}
      author={data.testimonial.author}
      stars={data.testimonial.stars}
    />
  )}

  <!-- CTA Section -->
  <section class="py-12 lg:py-16 bg-base-200">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h2 class="text-2xl lg:text-3xl font-serif text-base-content mb-4">
        Envie d'en savoir plus ?
      </h2>
      <p class="text-base-content/70 mb-8 max-w-xl mx-auto">
        Appelez-nous ou envoyez un message WhatsApp pour toute question.
        On vous repond avec plaisir !
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={phoneUrl}
          class="btn btn-primary btn-lg min-h-[44px]"
          aria-label="Appeler le centre equestre"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Appeler
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          class="btn btn-lg min-h-[44px] text-white"
          style="background-color: #25D366; border-color: #25D366;"
          aria-label="Envoyer un message WhatsApp"
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

### Service Page File Pattern

```astro
---
// src/pages/cours-enfants.astro — minimal wrapper
import { getEntry } from 'astro:content';
import ServicePage from '../components/ServicePage.astro';

const entry = await getEntry('services', 'cours-enfants');
if (!entry) return Astro.redirect('/404');

// Dynamic image import
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}'
);
const heroImageModule = images[entry.data.heroImage];
if (!heroImageModule) {
  throw new Error(`Hero image not found: ${entry.data.heroImage}`);
}
const heroImage = (await heroImageModule()).default;
---

<ServicePage entry={entry} heroImage={heroImage} />
```

**Each future service page (Stories 2.3-2.8) follows the exact same pattern** — only the service ID changes (e.g., `'equitation-adulte'`, `'pension-chevaux'`). This is the intended low-duplication approach.

### Frontmatter heroImage Path Update

The `cours-enfants.md` frontmatter must be updated from:
```yaml
heroImage: "/images/hero/cours-enfants.jpg"
```
To:
```yaml
heroImage: "/src/assets/images/hero/cours-enfants.jpg"
```

This enables Astro's image optimization pipeline (WebP/AVIF generation, srcset, responsive sizing).

### Prose Styling for Markdown Content

The Markdown content body (promise/narrative section) needs Tailwind Typography plugin OR manual prose styling. Since the architecture specifies "Tailwind/daisyUI classes only" and no extra dependencies, use daisyUI's built-in prose styling or manual Tailwind classes:

```astro
<!-- Option 1: If @tailwindcss/typography is added -->
<div class="prose prose-lg max-w-none">
  <Content />
</div>

<!-- Option 2: Manual styling without typography plugin -->
<div class="[&>h2]:text-2xl [&>h2]:font-serif [&>h2]:mb-4 [&>h2]:mt-8 [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-base-content/80">
  <Content />
</div>
```

**Recommendation:** Install `@tailwindcss/typography` as a dev dependency. It's a Tailwind official plugin, minimal footprint, and provides excellent Markdown rendering. Add it to global.css:
```css
@plugin "@tailwindcss/typography";
```

### Project Structure Notes

**Files to CREATE:**

```
src/
├── assets/
│   └── images/
│       └── hero/
│           └── cours-enfants.jpg      ← NEW: Placeholder hero image
├── components/
│   ├── Hero.astro                     ← NEW: Hero section component
│   ├── PlanningBlock.astro            ← NEW: Schedule table component
│   ├── PricingTable.astro             ← NEW: Pricing table/cards component
│   ├── Testimonial.astro              ← NEW: Testimonial blockquote component
│   └── ServicePage.astro              ← NEW: Service page template
├── pages/
│   └── cours-enfants.astro            ← NEW: First service page
```

**Files to MODIFY:**

```
src/
├── content/
│   └── services/
│       └── cours-enfants.md           ← MODIFY: Update heroImage path to src/assets
```

**Files NOT to touch:**

- `astro.config.mjs` — No changes needed
- `src/layouts/BaseLayout.astro` — Already complete from Epic 1
- `src/components/Navbar.astro` — No changes
- `src/components/Footer.astro` — No changes
- `src/components/StickyContact.astro` — No changes
- `src/components/SchemaMarkup.astro` — No changes
- `src/data/business.ts` — No changes
- `src/data/navigation.ts` — No changes
- `src/content.config.ts` — No changes (schema already supports all needed fields)
- `src/pages/index.astro` — No changes (homepage is Epic 3)

**Potential new dependency:**

```bash
npm install -D @tailwindcss/typography
```

Then add to `src/styles/global.css`:
```css
@plugin "@tailwindcss/typography";
```

### Architecture Compliance

**MUST follow — established project patterns from Epic 1 + Story 2.1:**

| Rule | Compliance |
|---|---|
| **TypeScript strict** | All components have typed `interface Props`. Never `any`, never `@ts-ignore` |
| **PascalCase components** | `Hero.astro`, `PlanningBlock.astro`, `PricingTable.astro`, `Testimonial.astro`, `ServicePage.astro` |
| **Tailwind/daisyUI only** | No inline CSS, no scoped `<style>`. Exception: WhatsApp button `style` for brand color #25D366 (not in theme) |
| **Semantic HTML** | `<section>` wrappers, `<table>` for data, `<blockquote>` for quotes, `<cite>` for attribution |
| **Content in French, code in English** | All visible text in French, variable names and types in English |
| **No subfolders in components/** | All 5 new components go directly in `src/components/` (total: 10 components — under the 15 limit) |
| **`<Image>` or `<Picture>` for images** | Hero uses `<Picture>` with formats. Never raw `<img>` |
| **44px minimum tap targets** | All buttons and links meet 44px minimum via `min-h-[44px]` and adequate padding |
| **Alt text on all images** | Hero image alt from frontmatter `heroImageAlt` field |
| **Data from `business.ts`** | Phone number and WhatsApp number from `business.ts`, never hardcoded |
| **Conditional rendering** | PlanningBlock and Testimonial only render if data exists in frontmatter |

### Library & Framework Requirements

**Installed versions (from `package.json`):**

| Package | Version | Relevance to Story 2.2 |
|---|---|---|
| `astro` | ^5.17.1 | `<Picture>` from `astro:assets`, Content Layer API, `render()` |
| `tailwindcss` | ^4.1.18 | All component styling via utility classes |
| `daisyui` | ^5.5.18 | `table`, `badge`, `btn`, `card` components |
| `typescript` | ^5.9.3 | Strict mode, typed Props interfaces |

**New dependency (recommended):**

| Package | Version | Purpose |
|---|---|---|
| `@tailwindcss/typography` | ^0.5.x | Prose styling for Markdown content body. Without it, the Markdown rendered via `<Content />` will be unstyled. |

### Testing Requirements

**Build-time validation (primary gate):**

1. **`astro check`** — Validates TypeScript types for all new components (Props interfaces, Content Collection types)
2. **`npm run build`** — Full build including Content Collection processing and image optimization
3. **Visual verification** — Load `/cours-enfants` in dev server and confirm:
   - Hero image renders with overlay and text
   - Planning table displays all 5 schedule entries
   - Pricing section shows 4 formulas with highlight on "Forfait annuel"
   - Testimonial displays with stars, quote, and author
   - CTA section shows phone and WhatsApp buttons
   - Sections alternate cream/white backgrounds
   - Mobile responsive: all sections stack correctly

**No unit tests required** — per architecture: "No unit tests for MVP."

### Previous Story Intelligence (Story 2.1)

| Learning | Source | Impact on Story 2.2 |
|---|---|---|
| **Astro v5 Content Layer API** | Story 2.1 | Use `getEntry('services', 'cours-enfants')` + `render()` from `astro:content` |
| **`entry.id` not `entry.slug`** | Story 2.1 | Content entries use `id` field for identification |
| **`getEntry()` returns undefined** | Story 2.1 | MUST null-check before using: `if (!entry) return Astro.redirect('/404')` |
| **camelCase frontmatter** | Story 2.1 | All frontmatter keys are camelCase (heroImage, whatsappMessage, pricingNotes) |
| **Architecture doc patterns outdated** | Stories 1.1, 2.1 | Architecture doc shows v4 patterns — always use v5 API |
| **Build verification: both commands** | All stories | Run `astro check` AND `npm run build` to validate |
| **Inline SVG icons, no library** | Stories 1.3-1.5 | Continue using inline SVGs for phone, WhatsApp, info icons |
| **daisyUI CSS warnings are cosmetic** | Story 1.1 | Some build warnings from daisyUI are known and non-blocking |
| **Tailwind v4 CSS-first config** | Story 1.1 | Theme defined in global.css with `@theme` and `@plugin`, not tailwind.config.mjs |

### Latest Technical Information

**Astro v5 `<Picture>` component (verified February 2026):**

- Import: `import { Picture } from 'astro:assets';`
- Props: `src` (ImageMetadata), `formats` (array like `['avif', 'webp']`), `alt`, `widths`, `sizes`
- For dynamic images from Content Collections, use `import.meta.glob()` to load the ImageMetadata
- `<Picture>` generates `<source>` elements for each format + fallback `<img>`
- The `widths` prop generates multiple srcset entries for responsive loading

**Astro v5 `<Image>` component:**

- Import: `import { Image } from 'astro:assets';`
- For images in `src/assets/`, Astro auto-infers width/height
- For public folder images, width/height must be explicit
- Default output format: WebP

**DaisyUI v5 table classes:**

- `table` — base table styling
- `table-zebra` — alternating row colors
- `table-lg` / `table-sm` — size variants
- `table-pin-rows` — sticky headers
- Wrap in `overflow-x-auto` for horizontal scroll on mobile

**Tailwind Typography plugin (v4 compatible):**

- In Tailwind v4, use `@plugin "@tailwindcss/typography";` in CSS (not config file)
- Provides `prose`, `prose-lg`, `prose-base-content` classes
- Critical for rendering Markdown content body with proper heading, paragraph, and list styles

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2: Service Page Layout & Core Components]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design Direction Decision]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Visual Design Foundation]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX Consistency Patterns]
- [Source: _bmad-output/implementation-artifacts/2-1-content-collections-schema-and-service-data-structure.md#Dev Notes]
- [Source: Astro v5 Image & Picture Documentation — https://docs.astro.build/en/guides/images/]
- [Source: Astro v5 Content Collections — https://docs.astro.build/en/guides/content-collections/]
- [Source: DaisyUI v5 Table Component — https://daisyui.com/components/table/]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

None — clean implementation, no blocking issues.

### Completion Notes List

- Implemented 4 new reusable components: Hero.astro, PlanningBlock.astro, PricingTable.astro, Testimonial.astro — all with typed Props interfaces (TypeScript strict)
- Implemented ServicePage.astro template that assembles the full page skeleton from a Content Collection entry
- Implemented cours-enfants.astro as a minimal wrapper (pattern for all future service pages)
- Added placeholder hero image (1920×800 beige PNG) at src/assets/images/hero/cours-enfants.png
- Updated cours-enfants.md heroImage path from public `/images/` to `src/assets/` for Astro image optimization
- Installed @tailwindcss/typography dev dependency and added `@plugin "@tailwindcss/typography"` to global.css for Markdown prose styling
- astro check: 0 errors, 0 warnings (2 pre-existing hints in SchemaMarkup.astro, not related to this story)
- npm run build: Complete — 12 optimized images generated (AVIF + WebP in 4 widths), /cours-enfants page prerendered
- Section backgrounds alternate correctly: Hero (image) → Prose (base-200) → PlanningBlock (base-100) → PricingTable (base-200) → Testimonial (base-100) → CTA (base-200)

### File List

**New files:**
- src/components/Hero.astro
- src/components/PlanningBlock.astro
- src/components/PricingTable.astro
- src/components/Testimonial.astro
- src/components/ServicePage.astro
- src/pages/cours-enfants.astro
- src/assets/images/hero/cours-enfants.png

**Modified files:**
- src/content/services/cours-enfants.md (heroImage path updated to src/assets)
- src/styles/global.css (@plugin "@tailwindcss/typography" added)
- package.json (devDependencies: @tailwindcss/typography added)
- package-lock.json (lockfile updated)
- _bmad-output/implementation-artifacts/sprint-status.yaml (story status updated to review)

## Change Log

- 2026-02-17: Story 2.2 implemented — created Hero, PlanningBlock, PricingTable, Testimonial, ServicePage components and cours-enfants page. Added @tailwindcss/typography. Build passes (astro check: 0 errors, npm run build: Complete).
- 2026-02-17: Code review fixes applied — Hero: optional imageSrc + fallback div + fetchpriority="high". Testimonial: fill-current on all stars. PlanningBlock: bgClass prop + mobile card layout. PricingTable/Testimonial: bgClass prop. ServicePage: dynamic background alternation, service-specific CTA title, fix max-w conflict (nested div), rel="noopener noreferrer", conditional PricingTable guard. Sprint-status.yaml added to File List. Build passes (astro check: 0 errors, npm run build: Complete).
