# Story 6.1: Blog Infrastructure & Article Template

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a blog Content Collection with listing page and dynamic article pages**,
so that **long-tail SEO articles can be published and indexed to capture organic traffic** (FR8).

## Acceptance Criteria

1. **AC-1: `blog` collection added to `src/content.config.ts`** — The `blog` collection is defined using Astro v5 Content Layer API (`defineCollection` + `glob` loader). Zod schema validates: `title: z.string()`, `date: z.coerce.date()`, `tags: z.array(z.string())`, `seoTitle: z.string()`, `seoDescription: z.string()`, `ogImage: z.string().optional()`, `excerpt: z.string()`. `astro check` passes with 0 errors after the addition.

2. **AC-2: Placeholder blog article exists** — At least one article file exists in `src/content/blog/` (e.g., `reprendre-equitation-40-ans.md`) with valid frontmatter matching the Zod schema, so the dynamic route `[...slug].astro` generates at least one static page and `npm run build` succeeds. This article is a content placeholder (real content written in Story 6.2).

3. **AC-3: `src/components/Breadcrumb.astro` created** — A new component exists accepting a typed prop `items: { label: string; href?: string }[]`. It renders a semantic `<nav aria-label="Fil d'Ariane">` with `<ol>` containing `<li>` items. Non-final items are `<a>` links; the final item is `<span aria-current="page">`. JSON-LD BreadcrumbList schema is NOT required in this story (deferred to Epic 7). Accessible focus ring on links. No `client:*` directives.

4. **AC-4: `src/pages/blog/index.astro` created** — The blog listing page exists at `/blog`. It fetches all entries from the `blog` collection, sorts them by date descending (newest first), and renders each with: article title (h2, links to article), date in French format (e.g., "Février 2026"), excerpt, and a "Lire l'article →" read-more link. Uses `BaseLayout.astro` with SEO meta (`seoTitle: "Blog | Equi 22"`, `seoDescription` describing the blog). Renders a warm empty state ("Nos premiers articles arrivent bientôt !") if no articles exist.

5. **AC-5: `src/pages/blog/[...slug].astro` created** — Dynamic route exists at `/blog/{slug}`. Each article page uses `BaseLayout.astro` with SEO props from frontmatter (`seoTitle`, `seoDescription`, `ogImage`). Page renders: `<Breadcrumb>` (Accueil → Blog → Article title), article `<header>` with `<h1>` (article title) + date in French format, rendered Markdown body via `<Content />`, CTA section at the end (see AC-6). URLs follow `/blog/{slug}` in kebab-case (NFR27). `getStaticPaths()` is defined correctly for Astro v5 Content Layer API.

6. **AC-6: CTA section on each article** — Every article page ends with a section inviting the visitor to explore the center. Minimum: a warm heading ("Envie de passer à l'action ?"), a paragraph linking to relevant service pages (children's lessons, adult riding, boarding), and visible contact options (phone/WhatsApp links from `business.ts`). The CTA uses Tailwind/daisyUI classes only — no inline CSS.

7. **AC-7: Blog accessible from navigation** — The "Blog" link (`/blog`) is added to `src/data/navigation.ts` `mainMenu` array (label: `"Blog"`, href: `"/blog"`). Position: between "Tarifs" and "À propos" (or at the end, developer's judgment). The Navbar automatically picks up the new link with no other changes needed.

8. **AC-8: Sitemap includes blog URLs** — After `npm run build`, `dist/sitemap-*.xml` includes `/blog` and `/blog/{slug}` URLs. `@astrojs/sitemap` handles this automatically as long as the pages are statically generated.

9. **AC-9: Accessible & standards-compliant** — All interactive elements (links, breadcrumb) have visible focus rings. Article body is rendered in a `<article>` semantic element. Date displays use a `<time datetime="ISO-date">` element. Color contrast meets WCAG AA. No raw `<img>` tags — any images use `<Image>` or `<Picture>`.

10. **AC-10: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. All existing pages render correctly. The existing `services` and `news` collections are unaffected. Sprint status updated: `epic-6` → `in-progress`, `6-1-blog-infrastructure-and-article-template` → `ready-for-dev`.

## Tasks / Subtasks

- [x] Task 1: Add `blog` collection to `src/content.config.ts` (AC: #1)
  - [x] Add `blog` collection with `glob` loader pointing to `./src/content/blog`
  - [x] Define Zod schema: title, date (z.coerce.date), tags (array), seoTitle, seoDescription, ogImage (optional), excerpt
  - [x] Export `blog` in the `collections` object alongside existing `services` and `news`
  - [x] Run `astro check` — confirm 0 errors

- [x] Task 2: Create `src/content/blog/` directory with placeholder article (AC: #2)
  - [x] Create directory `src/content/blog/`
  - [x] Create `src/content/blog/reprendre-equitation-40-ans.md` with valid frontmatter and placeholder content body
  - [x] Confirm frontmatter validates against Zod schema (date in ISO 8601, tags as array, etc.)

- [x] Task 3: Create `src/components/Breadcrumb.astro` (AC: #3, #9)
  - [x] Define `interface Props { items: { label: string; href?: string }[] }`
  - [x] Render `<nav aria-label="Fil d'Ariane"><ol>` with `<li>` per item
  - [x] Non-final items: `<a href={href}>` with focus ring classes
  - [x] Final item: `<span aria-current="page">`
  - [x] Add separator (e.g., `›`) between items (decorative, `aria-hidden="true"`)
  - [x] Use Tailwind/daisyUI only — no `<style>` blocks

- [x] Task 4: Create `src/pages/blog/index.astro` (AC: #4, #7, #8)
  - [x] Import `getCollection` from `astro:content`
  - [x] Fetch all blog entries and sort by date descending
  - [x] Render each as article card: title (h2 + link), `<time datetime>`, excerpt, read-more link
  - [x] Date formatted with `toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })`
  - [x] Use `BaseLayout` with SEO props
  - [x] Add warm empty-state fallback if no articles
  - [x] Use `<article>` or `<li>` semantic wrapper per post card

- [x] Task 5: Create `src/pages/blog/[...slug].astro` (AC: #5, #6, #9)
  - [x] Implement `getStaticPaths()` using `getCollection('blog')` → map `post.id` to params
  - [x] Import `render` from `astro:content` for `<Content />` rendering
  - [x] Render `<Breadcrumb>` with items: `[{ label: 'Accueil', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.data.title }]`
  - [x] Render article `<header>`: `<h1>` + `<time datetime={ISO}>` formatted in French
  - [x] Render `<Content />` inside `<article>` element with prose styling
  - [x] Render CTA section (warm heading + service page links + phone/WhatsApp from `business.ts`)
  - [x] Pass `seoTitle`, `seoDescription`, `ogImage` to `BaseLayout`

- [x] Task 6: Update `src/data/navigation.ts` (AC: #7)
  - [x] Add `{ label: 'Blog', href: '/blog' }` to `mainMenu` array
  - [x] Position it logically (after 'Tarifs', before 'À propos' recommended)

- [x] Task 7: Build verification (AC: #10)
  - [x] Run `astro check` — confirm 0 errors (2 pre-existing hints in SchemaMarkup.astro are acceptable)
  - [x] Run `npm run build` — confirm all pages built successfully
  - [x] Verify `/blog` and `/blog/reprendre-equitation-40-ans` appear in built output
  - [x] Verify sitemap includes blog URLs
  - [x] Confirm no regression on existing pages

## Dev Notes

### Critical Context — Current Codebase State

**Astro version: v5.x — Content Layer API (NOT the legacy API)**

> ⚠️ CRITICAL: The config file is `src/content.config.ts` at the root of `src/` — **NOT** `src/content/config.ts`. This is the Astro v5 Content Layer API. Import `glob` from `'astro/loaders'` and `z` from `'astro/zod'`.

Current `src/content.config.ts` (must be extended, NOT replaced):
```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// (services and news collections already defined)
export const collections = { services, news };
```
→ **Add `blog` collection and include it in the `collections` export.**

**Component count before this story: 14**
```
src/components/
├── ContactForm.astro
├── Footer.astro
├── GoogleReviews.astro
├── Hero.astro
├── Navbar.astro
├── NewsCard.astro
├── PlanningBlock.astro
├── PricingTable.astro
├── ProfileRouting.astro
├── SchemaMarkup.astro
├── ServiceCard.astro
├── ServicePage.astro
├── StickyContact.astro
└── Testimonial.astro
```
→ After Story 6.1: **15 components** (Breadcrumb added). Architecture threshold is "exceeding 15" = 16+, so flat structure remains valid.

**Tailwind v4 — CSS-first (no `tailwind.config.mjs`)**
- Do NOT look for `tailwind.config.mjs` — it doesn't exist in this project
- Use daisyUI semantic tokens: `bg-base-100`, `bg-base-200`, `text-base-content`, `text-base-content/70`, `btn btn-primary`, `btn btn-outline`, `rounded-xl`, `shadow-sm`, etc.
- Font: `font-serif` = DM Serif Display (headings), `font-sans` = Inter (body)
- No `<style>` blocks — Tailwind utilities only

**`src/pages/blog/` directory does NOT exist yet** — create it.

**`src/content/blog/` directory does NOT exist yet** — create it.

**`Breadcrumb.astro` does NOT exist yet** — this is its first creation.

---

### Complete Implementation

#### Task 1 — `src/content.config.ts` additions

Add the `blog` collection and include it in the export:

```typescript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { services, news, blog };
```

---

#### Task 2 — Placeholder article `src/content/blog/reprendre-equitation-40-ans.md`

```markdown
---
title: "Reprendre l'équitation à 40 ans : c'est possible (et formidable)"
date: 2026-02-20
tags: ["équitation adulte", "débutant", "reprendre"]
seoTitle: "Reprendre l'équitation à 40 ans | Equi 22 — Yffiniac"
seoDescription: "Vous avez envie de reprendre l'équitation après des années d'absence ? Ou de commencer adulte sans avoir d'expérience ? Voici pourquoi c'est une excellente idée."
excerpt: "L'équitation n'a pas d'âge. Que vous ayez pratiqué enfant ou jamais touché à un cheval, il n'est jamais trop tard pour se lancer. Voici ce que vous devez savoir."
---

L'équitation n'a pas d'âge. Que vous ayez pratiqué enfant ou jamais touché à un cheval, reprendre — ou commencer — à 40 ans est non seulement possible, mais souvent transformateur.

## Pourquoi l'équitation adulte est différente

Contrairement aux idées reçues, les adultes apprennent souvent plus vite que les enfants sur certains aspects : ils comprennent les consignes, ils ont la patience, et ils savent ce qu'ils veulent.

Chez Equi 22, nos cours adultes sont conçus sans jugement et sans pression. Votre rythme, vos objectifs.

## Ce qu'on vous propose à Yffiniac

Des créneaux en soirée et le week-end, adaptés à vos contraintes professionnelles. Des chevaux calmes et bien éduqués. Une équipe pédagogique bienveillante.

La première séance est souvent la plus intimidante — et la plus mémorable.
```

> **Note pour Story 6.2 :** Ce fichier sera remplacé ou enrichi avec le contenu définitif en Story 6.2.

---

#### Task 3 — `src/components/Breadcrumb.astro`

```astro
---
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="Fil d'Ariane" class="py-3 px-4 bg-base-200">
  <ol class="flex flex-wrap items-center gap-1 text-sm text-base-content/70">
    {items.map((item, index) => (
      <li class="flex items-center gap-1">
        {index > 0 && (
          <span aria-hidden="true" class="text-base-content/40">›</span>
        )}
        {item.href ? (
          <a
            href={item.href}
            class="hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded transition"
          >
            {item.label}
          </a>
        ) : (
          <span aria-current="page" class="text-base-content font-medium">
            {item.label}
          </span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

#### Task 4 — `src/pages/blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const allPosts = await getCollection('blog');
const posts = allPosts.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
---

<BaseLayout
  title="Blog | Equi 22"
  description="Conseils, histoires et ressources sur l'équitation à Yffiniac et en Côtes-d'Armor."
  seoTitle="Blog | Equi 22"
  seoDescription="Conseils, histoires et ressources sur l'équitation à Yffiniac et en Côtes-d'Armor."
>
  <main>
    <section class="py-16 bg-base-100">
      <div class="container mx-auto max-w-3xl px-4">
        <h1 class="text-4xl font-serif text-base-content mb-4">Blog</h1>
        <p class="text-base-content/70 mb-12">
          Conseils, histoires et ressources pour tous les passionnés de cheval.
        </p>

        {posts.length === 0 ? (
          <p class="text-base-content/60 text-center py-16">
            Nos premiers articles arrivent bientôt !
          </p>
        ) : (
          <ul class="flex flex-col gap-10">
            {posts.map((post) => (
              <li>
                <article class="border-b border-base-300 pb-10">
                  <time
                    datetime={post.data.date.toISOString()}
                    class="text-sm text-base-content/50 uppercase tracking-wide"
                  >
                    {formatDate(post.data.date)}
                  </time>
                  <h2 class="text-2xl font-serif text-base-content mt-1 mb-3">
                    <a
                      href={`/blog/${post.id}`}
                      class="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded transition"
                    >
                      {post.data.title}
                    </a>
                  </h2>
                  <p class="text-base-content/70 mb-4">{post.data.excerpt}</p>
                  <a
                    href={`/blog/${post.id}`}
                    class="text-primary font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
                    aria-label={`Lire l'article : ${post.data.title}`}
                  >
                    Lire l'article →
                  </a>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  </main>
</BaseLayout>
```

---

#### Task 5 — `src/pages/blog/[...slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import { business } from '../../data/business.ts';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);

const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Bonjour, j'ai lu votre article et je souhaite en savoir plus sur vos cours.")}`;
---

<BaseLayout
  title={post.data.seoTitle}
  description={post.data.seoDescription}
  seoTitle={post.data.seoTitle}
  seoDescription={post.data.seoDescription}
  ogImage={post.data.ogImage}
>
  <main>
    <Breadcrumb
      items={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.data.title },
      ]}
    />

    <article class="py-12 bg-base-100">
      <div class="container mx-auto max-w-3xl px-4">
        <header class="mb-10">
          <time
            datetime={post.data.date.toISOString()}
            class="text-sm text-base-content/50 uppercase tracking-wide"
          >
            {formatDate(post.data.date)}
          </time>
          <h1 class="text-4xl font-serif text-base-content mt-2 leading-tight">
            {post.data.title}
          </h1>
        </header>

        <div class="prose prose-lg max-w-none text-base-content">
          <Content />
        </div>
      </div>
    </article>

    <!-- CTA section -->
    <section
      class="py-16 bg-base-200"
      aria-labelledby="blog-cta-heading"
    >
      <div class="container mx-auto max-w-2xl px-4 text-center">
        <h2 id="blog-cta-heading" class="text-3xl font-serif text-base-content mb-4">
          Envie de passer à l'action ?
        </h2>
        <p class="text-base-content/70 mb-8">
          Nos équipes vous attendent à Yffiniac. Découvrez nos cours, nos stages et nos formules d'accueil.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <a href="/cours-enfants" class="btn btn-outline btn-sm">Cours enfants</a>
          <a href="/equitation-adulte" class="btn btn-outline btn-sm">Équitation adulte</a>
          <a href="/pension-chevaux" class="btn btn-outline btn-sm">Pension chevaux</a>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${business.phone}`}
            class="btn btn-primary"
            aria-label="Appeler le centre équestre"
          >
            Appeler
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
            aria-label="Contacter via WhatsApp (nouvel onglet)"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>
```

---

#### Task 6 — `src/data/navigation.ts` update

Add Blog link after "Tarifs":

```typescript
export const mainMenu: NavLink[] = [
  { label: 'Cours enfants', href: '/cours-enfants' },
  { label: 'Équitation adulte', href: '/equitation-adulte' },
  { label: 'Pension', href: '/pension-chevaux' },
  { label: 'Stages vacances', href: '/stages-vacances' },
  { label: 'Compétitions', href: '/competitions' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Blog', href: '/blog' },          // ← ADD THIS LINE
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];
```

---

### Architecture Compliance

| Rule | Status for Story 6.1 |
|---|---|
| **TypeScript strict** | `interface BreadcrumbItem`, `interface Props`, typed `post`, typed `getStaticPaths` return — no `any`, no `@ts-ignore`. |
| **Content Layer API (Astro v5)** | `glob` loader from `'astro/loaders'`, `z` from `'astro/zod'`, `render()` from `'astro:content'` for body rendering. |
| **Astro v5 routing** | `params: { slug: post.id }` — `post.id` is the filename without extension in Content Layer API. Route is `/blog/[...slug]` to support nested slugs if ever needed. |
| **`src/content.config.ts` location** | File at `src/content.config.ts` — NOT `src/content/config.ts`. Extend, do not replace. |
| **No raw `<img>`** | If blog articles contain images, they must use `<Image>` or `<Picture>`. For Markdown body images, note the limitation — Markdown `![alt](src)` uses raw img by default. If image optimization for blog body is needed, defer to Epic 7 or use a remark plugin. |
| **Tailwind/daisyUI only** | All classes are Tailwind utilities or daisyUI tokens. No `<style>` blocks. `prose` classes require `@tailwindcss/typography` — see note below. |
| **Semantic HTML** | `<article>`, `<nav>` (breadcrumb), `<header>`, `<section>`, `<time datetime>`, `<ol>` (breadcrumb list), `<ul>` (post list), `<li>`. |
| **French visible content** | All user-facing text in French. Code variables in English. |
| **`business.ts` for contact data** | Phone and WhatsApp URLs built from `business.phone` and `business.whatsapp` — never hardcoded. |
| **Flat `components/` folder** | 15 components after story. "Exceeding 15" threshold (> 15) not yet reached — flat structure maintained. |
| **No client-side JS** | Zero `client:*` directives on any new component. Breadcrumb is pure static HTML. Blog pages are SSG. |

> **⚠️ `prose` classes note:** The `prose prose-lg` class on the article body requires `@tailwindcss/typography` plugin. Check if it's already installed by running `npm list @tailwindcss/typography`. If not installed, either:
> - Install it: `npm install @tailwindcss/typography` and add `@plugin "@tailwindcss/typography"` to `src/styles/global.css` (Tailwind v4 plugin syntax)
> - OR use a custom prose equivalent with Tailwind utilities: `class="[&_h2]:text-2xl [&_h2]:font-serif [&_p]:text-base-content/80 [&_p]:mb-4 [&_a]:text-primary [&_a]:underline"`
>
> Recommend installing `@tailwindcss/typography` as it provides rich article typography out of the box.

---

### Project Structure Notes

**Files CREATED:**
```
src/content/blog/                                          ← new directory
src/content/blog/reprendre-equitation-40-ans.md           ← placeholder article
src/components/Breadcrumb.astro                           ← new component
src/pages/blog/                                           ← new directory
src/pages/blog/index.astro                                ← blog listing
src/pages/blog/[...slug].astro                            ← dynamic article page
```

**Files MODIFIED:**
```
src/content.config.ts                                     ← add blog collection + export
src/data/navigation.ts                                    ← add Blog link to mainMenu
_bmad-output/implementation-artifacts/sprint-status.yaml  ← epic-6 → in-progress, story → ready-for-dev
```

**Files NOT to touch:**
- `src/layouts/BaseLayout.astro` — no changes needed; pass SEO props as-is
- `src/components/Navbar.astro` — automatically picks up new nav entry from navigation.ts
- `src/content.config.ts` `services` and `news` collections — leave untouched
- All existing pages — no changes needed
- `src/components/SchemaMarkup.astro` — pre-existing hints are acceptable (0 errors)

**Pages generated after this story:**
```
/blog                                     ← new (listing)
/blog/reprendre-equitation-40-ans         ← new (placeholder article from Story 6.1)
```
→ Story 6.2 will add 2+ real articles, replacing/augmenting the placeholder.

---

### Previous Story Intelligence (Story 5.3 Learnings)

| Learning | Impact on Story 6.1 |
|---|---|
| **Tailwind v4 CSS-first** | No `tailwind.config.mjs`. Use daisyUI tokens directly. `bg-base-100`, `bg-base-200`, `text-base-content`, etc. |
| **`astro check` AND `npm run build` both required** | Run both in Task 7. `astro check` for TypeScript, `npm run build` for Vite bundling. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still present and acceptable. Target: 0 errors in all newly modified/created files. |
| **No JSX comments inside ternaries** | The `{posts.length === 0 ? (...) : (...)}` pattern in blog/index.astro — no comments inside branches. |
| **Minimal change principle** | Don't touch files not in scope. Existing pages, layouts, collections are untouched. |
| **Each story = 1-commit pattern** | Target commit message: `"Story 6-1: Blog infrastructure and article template"` |
| **`import { Image } from 'astro:assets'`** | If any image is used in blog pages/components, always use this import — never raw `<img>`. |
| **Component count threshold at 15** | After this story: 15 components. Next story adding a component will reach 16 — evaluate subfolder need at that point. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `bc92e7d` — Story 5-3: Code review fixes (contrast, bg alternation, a11y) → ServicePage.astro, GoogleReviews.astro, index.astro, business.ts
2. `cce45c0` — Story 5-3: Google reviews display → GoogleReviews.astro created, integrated in 4 files
3. `690eff9` — Story 5-2: Structured photo gallery → a-propos.astro (+110 lines)
4. `a0d815d` — Story 5-1: About page — center, values & instructors
5. `2c52a09` — Story 4-2: Dedicated contact page

**Pattern confirmed:** Clean, atomic commits per story. Story 6.1 will touch more files than usual (2 new directories, 3 new files, 2 modified) but all changes are contained and well-scoped.

**From Epic 5 work:** `ServicePage.astro` and `Breadcrumb.astro` are both known patterns — ServicePage uses `interface Props` with `CollectionEntry<'services'>` typing. Breadcrumb will use a simpler typed array prop.

---

### Astro v5 Content Layer API — Key Differences from Legacy

This project uses Astro v5 Content Layer API. Critical differences from older Astro docs:

| Aspect | Legacy (Astro <5) | Current (Astro v5) |
|---|---|---|
| Config location | `src/content/config.ts` | `src/content.config.ts` |
| Collection definition | `defineCollection({ type, schema })` | `defineCollection({ loader, schema })` |
| Loader | Not used | `glob({ pattern, base })` from `'astro/loaders'` |
| Zod import | `{ z }` from `'astro:content'` | `{ z }` from `'astro/zod'` |
| Body rendering | `entry.render()` | `render(entry)` from `'astro:content'` |
| Entry ID | `entry.slug` | `entry.id` (full path without extension) |
| getStaticPaths | `params: { slug: entry.slug }` | `params: { slug: entry.id }` |

⚠️ **Use `entry.id` NOT `entry.slug`** for routing in Astro v5.

---

### What Story 6.1 Does NOT Include

| Excluded | Reason | Future |
|---|---|---|
| Real blog article content | Story 6.2 handles content (2 launch articles). Story 6.1 sets up infrastructure only. | Story 6.2 |
| Event blog articles | Story 6.3 (conditional MVP). | Story 6.3 |
| Article schema (BlogPosting JSON-LD) | BaseLayout provides LocalBusiness schema. Article-specific schema is an enhancement. | Epic 7 |
| BreadcrumbList JSON-LD | Breadcrumb is visual only in Story 6.1. JSON-LD for breadcrumb is deferred to Epic 7. | Epic 7 |
| Tag filtering / tag pages | Not in ACs. Simple blog listing only. | V2 if needed |
| Estimated reading time | Nice-to-have, not in ACs. | V2 if needed |
| Related articles section | Not in ACs. | V2 |
| Comment system | Out of scope (static site). | Never / V3 |
| Image in blog frontmatter | `ogImage` is optional and used for OG meta only — not displayed in article header. | V2 |

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.1: Blog Infrastructure & Article Template]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6: Blog & SEO Content — FR8, FR9]
- [Source: _bmad-output/planning-artifacts/architecture.md#Content Architecture — blog collection]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure — src/pages/blog/, src/content/blog/]
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming Patterns — kebab-case pages, PascalCase components]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines]
- [Source: src/content.config.ts — Astro v5 Content Layer API, existing collections pattern]
- [Source: src/data/navigation.ts — mainMenu structure to extend]
- [Source: _bmad-output/implementation-artifacts/5-3-google-reviews-display.md — Tailwind v4 learnings, component count, Astro patterns]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

- Fixed `seoTitle`/`seoDescription` props in `blog/index.astro` — BaseLayout only accepts `title` and `description`; these template props are not valid and caused a TS error. Removed them.
- Used `business.whatsapp.replace(/[^\d]/g, '')` for wa.me URL, consistent with all other pages in the codebase.
- `@tailwindcss/typography` was already installed and configured in `global.css` — `prose` classes work out of the box.

### Completion Notes List

- All 7 tasks completed. `astro check` reports 0 errors (2 pre-existing hints in SchemaMarkup.astro unchanged).
- `npm run build` succeeds. `/blog` and `/blog/reprendre-equitation-40-ans` both built as static pages.
- Sitemap includes `/blog` and `/blog/reprendre-equitation-40-ans`.
- `Breadcrumb.astro` created as a pure static component (no client:* directives).
- Blog link added to navigation between "Tarifs" and "À propos".
- Article ID in Astro v5 Content Layer API is `post.id` (filename without extension), not `post.slug`.

### File List

- `src/content.config.ts` — modified (added blog collection)
- `src/content/blog/reprendre-equitation-40-ans.md` — created (placeholder article)
- `src/components/Breadcrumb.astro` — created (new component)
- `src/pages/blog/index.astro` — created (blog listing page)
- `src/pages/blog/[...slug].astro` — created (dynamic article page)
- `src/data/navigation.ts` — modified (added Blog link)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — modified (6-1 → in-progress then review)
- `_bmad-output/implementation-artifacts/6-1-blog-infrastructure-and-article-template.md` — modified (story updates)

### Change Log

- 2026-02-20: Story 6-1 implemented — blog infrastructure (collection, listing page, dynamic article page, breadcrumb component, navigation link). All ACs satisfied. Build verified.
- 2026-02-20: Code review fixes — (1) `title` prop fixed in `blog/index.astro` ("Blog" not "Blog | Equi 22") and `[...slug].astro` (`post.data.title` not `seoTitle`) to avoid double branding in `<title>` tag. (2) Removed nested `<main>` wrappers from both blog pages (BaseLayout already provides `<main>`). (3) Added `ogType="article"` to `[...slug].astro`. (4) Homogenized focus rings to `focus:ring-2` in `Breadcrumb.astro` and `blog/index.astro`.
