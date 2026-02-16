---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowCompleted: true
lastStep: 8
status: 'complete'
completedAt: '2026-02-14'
inputDocuments:
  - product-brief-equi-22-2026-02-13.md
  - prd.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'equi-22'
user_name: 'Aurélien'
date: '2026-02-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

43 FRs organisées en 7 domaines :

| Domaine | FRs | Implications architecturales |
|---|---|---|
| Contenu & Information Architecture | FR1-FR10 | Système de pages service avec layout constant (hero → planning → tarifs → témoignage → CTA). Navigation hybride (menu service + aiguillage profil homepage). Blog avec structure SEO. |
| Contact & Conversion | FR11-FR15 | Composants sticky (phone + WhatsApp) sur toutes les pages. Formulaires contextuels avec variantes par service. Service externe pour traitement et notification des soumissions. |
| Confiance & Réassurance | FR16-FR20 | Contenu persona-spécifique intégré dans chaque page service. Intégration avis Google (V1.1+). |
| Visuel & Média | FR21-FR24 | Pipeline d'images au build : resize, conversion WebP/AVIF, srcset. Galerie structurée par zone. Lazy loading natif. |
| SEO & Découvrabilité | FR25-FR30 | Schema markup (LocalBusiness + Service) sur chaque page. Sitemap, robots.txt, OG/Twitter Cards. Meta tags uniques par page. Structure URL optimisée. |
| Accessibilité & Utilisabilité | FR31-FR36 | WCAG 2.1 AA : focus visible, alt-text, labels formulaires, contraste, prefers-reduced-motion, tap targets 44px. |
| Gestion de contenu & Déploiement | FR37-FR43 | Markdown + YAML frontmatter. Pipeline Git → build → CDN. Cycle de mise à jour < 5 min. CMS contraint en V2. |

**Non-Functional Requirements:**

32 NFRs qui façonnent l'architecture :

| Domaine | NFRs | Contraintes architecturales clés |
|---|---|---|
| Performance | NFR1-7 | Lighthouse 90+, LCP < 1.5s, CLS < 0.1, poids < 500KB, zéro JS bloquant, images next-gen |
| Sécurité & Vie privée | NFR8-14 | HTTPS, anti-spam honeypot + rate limiting, zéro stockage données serveur, RGPD, consentement conditionnel |
| Accessibilité | NFR15-19 | Lighthouse Accessibilité 90+, WCAG 2.1 AA, zéro violation critique axe-core, zoom 200% |
| Conformité légale | NFR20-22 | Mentions légales, politique de confidentialité, consentement cookies CNIL |
| Qualité SEO | NFR23-27 | Lighthouse SEO 90+, Mobile-Friendly Test, structured data valide, zéro liens cassés, URLs SEO-friendly |
| Maintenabilité | NFR28-32 | Build < 30s, deploy < 2min, cycle update < 5min, zéro dépendance runtime, contenu portable |

**Scale & Complexity:**

- Primary domain: **Static website / SSG**
- Complexity level: **Low-to-moderate**
- Estimated architectural components: **~15** (7 composants custom + navbar + footer + layouts + pages + schema + image pipeline + form service + analytics)

### Technical Constraints & Dependencies

| Contrainte | Source | Impact |
|---|---|---|
| Pure statique — zéro runtime serveur | PRD, NFR31 | Pas de backend, pas de BDD. Tout est au build. Les formulaires nécessitent un service tiers. |
| Hébergement CDN gratuit ou quasi-gratuit | PRD, NFR, Brief | Cloudflare Pages, Netlify ou Vercel free tier. Contrainte sur les limites de build et de bande passante. |
| Markdown + YAML = format de contenu | FR39, NFR32 | Portabilité entre frameworks SSG. Le contenu survit au changement d'outil. |
| Images optimisées au build | FR23-24, NFR5-7 | Le framework SSG doit supporter un pipeline d'images intégré (resize, format, srcset). |
| Formulaires avec notification immédiate | FR14 | Service tiers requis (Formspree, Netlify Forms, ou équivalent) avec webhook ou email. |
| Conformité RGPD | NFR12-14, NFR20-22 | Choix analytics impacte le besoin de bannière cookies. Analytics cookieless = moins de friction. |
| Solo developer | Brief | L'architecture doit minimiser la complexité opérationnelle. Pas d'infra à maintenir. |

### Cross-Cutting Concerns Identified

| Concern | Pages touchées | Mécanisme architectural |
|---|---|---|
| **SEO (schema + meta)** | Toutes | Layout/composant partagé qui injecte les données structurées et meta par page via frontmatter |
| **Accessibilité WCAG 2.1 AA** | Tous les composants | Standards intégrés dans chaque composant. Validation automatisée au build (axe-core). |
| **Performance / images** | Toutes les pages avec images | Pipeline d'images au build. Budget de poids par page. |
| **Contact omniprésent** | Toutes | Composant StickyContact inclus dans le layout global avec props contextuels par page |
| **Réassurance persona-spécifique** | Pages service | Contenu émotionnel adapté dans le frontmatter Markdown ou les données de chaque page |
| **Contenu frais / dates** | Pages avec dates | Logique au build pour masquer le contenu périmé (> 3 mois) et afficher des messages de remplacement |

## Starter Template Evaluation

### Primary Technology Domain

Static website / SSG — based on project requirements analysis (pure MPA, zero runtime, Markdown content, CDN hosting).

### Technology Preferences

- **Language:** TypeScript (strict mode) — expert-level proficiency
- **Developer profile:** Senior engineer, expert in JS/TS, Go, Java, Python
- **Existing experience:** Hugo (SSG), but open to Astro for better component architecture
- **Deployment target:** Cloudflare Pages (free tier)

### Starter Options Considered

#### Option 1: Hugo

| Aspect | Évaluation |
|---|---|
| **Build speed** | Ultra-rapide (Go natif, millisecondes) — surqualifié pour ~15 pages |
| **TypeScript** | Pas de support natif — templates Go uniquement |
| **Pipeline d'images** | Intégré mais basique, pas de `<Picture>` natif avec multi-format |
| **Composants** | Partials Go avec paramètres non typés — ne correspond pas aux 7 composants custom typés de l'UX Spec |
| **Tailwind** | Possible mais configuration manuelle |
| **Évolutivité V2 (CMS)** | Écosystème CMS limité par rapport à Astro |
| **Cloudflare** | Deploy statique classique, pas d'intégration native |

**Verdict:** Solide pour du blogging pur, mais limité pour un site avec composants typés, pipeline d'images avancé et roadmap CMS V2.

#### Option 2: Astro (v5.17+) — RETENU

| Aspect | Évaluation |
|---|---|
| **Build speed** | Rapide (Vite, secondes) — largement suffisant pour ~15 pages |
| **TypeScript** | Support natif complet, composants `.astro` avec props typées |
| **Pipeline d'images** | `<Image>` et `<Picture>` natifs — WebP/AVIF, srcset, responsive layouts out of the box |
| **Composants** | Composants `.astro` avec props TS — correspond exactement aux 7 composants de l'UX Spec |
| **Tailwind** | Intégration native (`astro add tailwind`) |
| **Islands Architecture** | Hydratation sélective pour micro-interactions (menu mobile, lightbox) sans framework JS |
| **Cloudflare** | Astro a rejoint Cloudflare en 2026. Adapter officiel `@astrojs/cloudflare`, support first-class |
| **Évolutivité V2 (CMS)** | Intégrations officielles Tina, Decap, Keystatic — aligné avec roadmap PRD |
| **Content Collections** | Système natif pour Markdown typé avec validation Zod — idéal pour le contenu structuré |

**Verdict:** Alignement parfait avec le projet — composants typés, pipeline d'images natif, intégration Cloudflare first-class, chemin vers V2 CMS.

### Selected Starter: Astro Minimal + TypeScript Strict

**Rationale for Selection:**

1. **Composants typés TypeScript** — Les 7 composants custom de l'UX Spec (Hero, ServiceCard, PricingTable, PlanningBlock, Testimonial, StickyContact, ContactForm) se traduisent directement en fichiers `.astro` avec props TS
2. **Pipeline d'images natif** — `<Picture>` génère WebP/AVIF + srcset automatiquement, résolvant NFR5-7 out of the box
3. **Cloudflare first-class** — Astro acquis par Cloudflare, intégration optimale
4. **Content Collections** — Markdown typé avec validation Zod pour le contenu structuré (services, tarifs, témoignages)
5. **Chemin V2** — Intégrations CMS (Tina, Decap, Keystatic) sont des first-class citizens dans Astro
6. **Compétences développeur** — Expert TS/JS, Astro exploite directement les compétences du développeur

**Initialization Command:**

```bash
npm create astro@latest equi-22 -- --template minimal --typescript strict
```

**Post-initialization integrations:**

```bash
npx astro add tailwind
npx astro add sitemap
npx astro add cloudflare
npm install daisyui
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**

- Astro v5.17+ on Node.js
- TypeScript strict mode
- Vite as build tool (integrated)

**Styling Solution:**

- Tailwind CSS (via `@astrojs/tailwind` integration)
- daisyUI as component library — zero JS shipped to browser, pure CSS classes, theming via CSS variables
- Design tokens defined once in `tailwind.config.mjs` (palette "Terre & Mer de Bretagne")

**Build Tooling:**

- Vite (integrated in Astro) — HMR, fast builds
- `astro:assets` for image optimization pipeline (WebP/AVIF, srcset, responsive)
- `@astrojs/sitemap` for automatic sitemap generation

**Code Organization:**

- File-based routing (`src/pages/`)
- Content Collections (`src/content/`) for typed Markdown content
- Components (`src/components/`) for reusable `.astro` components
- Layouts (`src/layouts/`) for page templates

**Development Experience:**

- Hot Module Replacement via Vite dev server
- TypeScript strict with full type checking
- Astro dev toolbar for debugging

**Deployment:**

- Cloudflare Pages via `@astrojs/cloudflare` adapter
- Git push → Cloudflare build → CDN deploy

### Additional Technology Decisions

**Analytics: Umami Cloud**

- Cookieless, RGPD-compliant without consent banner (NFR14)
- Free tier: 100K events/month — sufficient for a local equestrian center
- Lightweight tracking script
- Fallback: migration to Plausible or self-hosted if needed

**Form Service: Web3Forms**

- Privacy-first: no form data stored (RGPD-simplified)
- Free tier: 250 submissions/month — sufficient for MVP volume
- Honeypot spam protection (NFR9)
- Email notification to center manager (FR14)
- Fallback: Cloudflare Worker custom if volume increases

**Note:** Project initialization using the starter command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

All critical decisions have been made in Steps 2-3 (framework, language, styling, deployment, content strategy). The decisions below shape implementation patterns.

**Important Decisions (Shape Architecture):**

1. Content Collections structure (unified per-service)
2. Schema markup injection strategy (centralized component)
3. WhatsApp contextual messaging (frontmatter-driven)
4. CI/CD pipeline (Cloudflare Pages auto-build)
5. Stale content handling (build-time date logic)
6. Build-time validation (links + accessibility)

**Deferred Decisions (Post-MVP):**

- CMS selection (Tina vs Decap vs Keystatic) — V2
- Localized city pages strategy — V2
- Online booking system — V3+

### Content Architecture

**Decision: Unified Content Collections — one file per service**

- Each service page = one Markdown file with rich YAML frontmatter
- Frontmatter contains: pricing tables, schedule slots, testimonials, WhatsApp message, schema data, meta tags
- Content body = the narrative/emotional text for the page
- Location: `src/content/services/`

**Rationale:** For ~10 service pages, simplicity over normalization. Each service is self-contained — pricing, schedules, and testimonials are coupled to their service, not shared. This maps directly to a CMS form in V2 (one form = one file).

**Collection schema (Zod validation):**

```typescript
// src/content/config.ts
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    ogImage: z.string().optional(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    whatsappMessage: z.string(),
    order: z.number(),
    // Pricing
    pricing: z.array(z.object({
      label: z.string(),
      price: z.string(),
      unit: z.string(),
      highlight: z.boolean().default(false),
    })),
    pricingNotes: z.array(z.string()).optional(),
    // Schedule
    schedule: z.array(z.object({
      day: z.string(),
      time: z.string(),
      level: z.string(),
    })).optional(),
    // Testimonial
    testimonial: z.object({
      quote: z.string(),
      author: z.string(),
      stars: z.number().min(1).max(5),
    }).optional(),
    // Schema markup
    serviceType: z.string(),
    serviceDescription: z.string(),
  }),
});
```

**Additional Collections:**

- `blog` — Blog articles (title, date, tags, SEO meta, content body)
- `news` — News/updates (title, date, content body) — filtered at build time by date freshness

**Affects:** All service pages, blog, news section, V2 CMS migration

### Schema Markup Strategy

**Decision: Centralized SchemaMarkup component with per-page service props**

- `SchemaMarkup.astro` component included in the base layout
- LocalBusiness schema is static (NAP, hours, coordinates, logo) — defined once in a site config file (`src/data/business.ts`)
- Service schema is dynamic per page — passed via frontmatter props (`serviceType`, `serviceDescription`)
- JSON-LD injected in `<head>` via the layout

**Structure:**

```
src/data/business.ts          → LocalBusiness static data (name, address, phone, hours, geo)
src/components/SchemaMarkup.astro → Generates JSON-LD from business data + page props
src/layouts/BaseLayout.astro   → Includes SchemaMarkup with page-specific props
```

**Rationale:** DRY — business data defined once, service data per page. No risk of inconsistent NAP across pages. Easy to validate with Google Rich Results Test.

**Affects:** All pages (FR26), SEO quality (NFR25)

### Contact & WhatsApp Strategy

**Decision: Frontmatter-driven contextual messaging**

- Each page defines `whatsappMessage` in its frontmatter
- `StickyContact.astro` component receives phone number (from `business.ts`) and `whatsappMessage` (from page props)
- WhatsApp URL format: `https://wa.me/33XXXXXXXXX?text={encodedMessage}`
- Phone URL format: `tel:+33XXXXXXXXX`

**Contact form variants:**

- Variant determined by page type (service page → service form, event page → event form)
- Form variant passed as prop to `ContactForm.astro`
- All forms POST to Web3Forms endpoint with honeypot field
- Success message displayed inline (no page redirect)

**Affects:** All pages (FR11-FR15), conversion flow

### CI/CD Pipeline

**Decision: Cloudflare Pages native auto-build — zero external CI**

| Aspect | Configuration |
|---|---|
| **Trigger** | Git push to `main` branch |
| **Build command** | `npm run build` |
| **Output directory** | `dist/` |
| **Preview deploys** | Automatic on pull request branches |
| **Environment variables** | Web3Forms API key, Umami tracking ID (set in Cloudflare dashboard) |
| **Build time** | < 30s expected for ~15 pages (NFR28) |
| **Deploy time** | < 2min from push to live (NFR29) |

**Rationale:** Cloudflare Pages provides everything needed out of the box. No GitHub Actions, no external CI, no maintenance. Preview deploys on branches are free and automatic.

**Affects:** Developer workflow (NFR28-30), deployment (FR38)

### Stale Content Strategy

**Decision: Build-time date filtering — no runtime JS**

- News items with `date` > 3 months old are excluded from homepage news section at build time
- If no recent news exists, the news section is not rendered at all
- Past events/stages display "Prochain stage à venir" instead of past dates
- Date format in content: relative seasonal labels ("Rentrée 2026", "Vacances Toussaint 2026") preferred over absolute dates

**Implementation:** Standard Astro component logic — `Date.now()` at build time compared to content dates. No client-side JS required.

**Affects:** Homepage news section, stage/event pages, content freshness as SEO signal

### Build-Time Validation

**Decision: Progressive validation — not blocking MVP deploy**

| Validation | Tool | Phase |
|---|---|---|
| **TypeScript** | `astro check` (built-in) | MVP — every build |
| **Broken links** | Post-build link checker script | MVP — CI check |
| **Accessibility** | `axe-core` via Playwright test | Post-MVP — added progressively |
| **Lighthouse CI** | `@lhci/cli` or manual checks | Post-MVP — periodic validation |
| **Structured data** | Google Rich Results Test (manual) | MVP — manual validation |

**Rationale:** TypeScript and link checking are non-negotiable from day one. Accessibility and Lighthouse automation can be added after the first deploy without blocking progress.

**Affects:** Code quality, NFR17 (axe-core), NFR26 (broken links)

### Decision Impact Analysis

**Implementation Sequence:**

1. Project initialization (Astro + Tailwind + daisyUI + Cloudflare adapter)
2. Base layout + SchemaMarkup + StickyContact components
3. Content Collections schema definition
4. Service page template (Hero → Planning → Pricing → Testimonial → CTA)
5. Individual service pages with content
6. Homepage with profile routing
7. Blog structure + launch articles
8. Contact page + forms (Web3Forms integration)
9. Legal pages (mentions légales, privacy policy)
10. SEO finalization (sitemap, robots.txt, OG tags, meta)
11. Analytics integration (Umami)
12. Build validation (link checker)

**Cross-Component Dependencies:**

- `BaseLayout.astro` depends on `SchemaMarkup.astro`, `StickyContact.astro`, `Navbar.astro`, `Footer.astro`
- All service pages depend on `BaseLayout.astro` + Content Collections schema
- `ContactForm.astro` depends on Web3Forms API key (environment variable)
- Sitemap generation depends on all pages being created first
- Homepage profile routing depends on service pages existing

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 8 areas where AI agents could make different choices — all addressed below with explicit conventions.

### Naming Patterns

**File & Component Naming:**

| Element | Convention | Example |
|---|---|---|
| **Astro Components** | PascalCase | `Hero.astro`, `ServiceCard.astro`, `PricingTable.astro` |
| **Astro Pages** | kebab-case | `cours-enfants.astro`, `pension-chevaux.astro` |
| **Layouts** | PascalCase | `BaseLayout.astro`, `ServiceLayout.astro` |
| **TypeScript files** | camelCase | `business.ts`, `schemaMarkup.ts` |
| **Content Collections (Markdown)** | kebab-case | `cours-enfants.md`, `equitation-adulte.md` |
| **Images/assets** | kebab-case | `hero-cours-enfants.webp`, `logo-equi22.svg` |
| **CSS classes** | Tailwind utility classes + daisyUI classes (no custom CSS unless exceptional) | `class="btn btn-primary"` |

**Code Naming:**

| Element | Convention | Example |
|---|---|---|
| **Variables / functions** | camelCase | `getServiceData()`, `whatsappMessage` |
| **Types / Interfaces** | PascalCase | `ServiceProps`, `PricingRow` |
| **Constants** | UPPER_SNAKE_CASE | `PHONE_NUMBER`, `WHATSAPP_BASE_URL` |
| **Component props** | camelCase | `heroImage`, `serviceType`, `pricingNotes` |
| **Frontmatter keys** | camelCase | `seoTitle`, `whatsappMessage`, `heroImageAlt` |

### Structure Patterns

**Project Organization:**

```
src/
  components/          ← Reusable components (.astro) — flat, no subfolders
    Hero.astro
    ServiceCard.astro
    PricingTable.astro
    PlanningBlock.astro
    Testimonial.astro
    StickyContact.astro
    ContactForm.astro
    SchemaMarkup.astro
    Navbar.astro
    Footer.astro
  layouts/             ← Page layouts
    BaseLayout.astro   ← Global layout (navbar, footer, sticky, schema, meta)
  pages/               ← Routes (file-based routing)
    index.astro
    cours-enfants.astro
    equitation-adulte.astro
    pension-chevaux.astro
    stages-vacances.astro
    competitions.astro
    tarifs.astro
    a-propos.astro
    contact.astro
    mentions-legales.astro
    politique-confidentialite.astro
    blog/
      index.astro
      [slug].astro
    404.astro
  content/             ← Content Collections (Markdown + frontmatter)
    services/
    blog/
    news/
    config.ts          ← Zod schemas
  data/                ← Static TypeScript data
    business.ts        ← NAP, hours, coordinates, social links
    navigation.ts      ← Menu links
  assets/              ← Images optimized by Astro (static import)
    images/
      hero/
      services/
      facilities/
      team/
  styles/              ← Global styles (minimal)
    global.css         ← Tailwind directives + daisyUI theme overrides
public/                ← Static assets (not optimized)
  favicon.svg
  robots.txt
  og-default.jpg
```

**Key rule:** No subfolders in `components/` — the project has ~10 components, a flat folder is sufficient. Re-evaluate if exceeding 15 components.

**Test Organization:**

| Type | Location | Tool |
|---|---|---|
| **Build check** | `astro check` (CLI) | Astro built-in |
| **Link validation** | Post-build script | `broken-link-checker` or custom |
| **Accessibility** | `tests/a11y/` | Playwright + axe-core (post-MVP) |

No unit tests for MVP. Static site with Zod-validated content + TypeScript strict + `astro check` covers type errors. Regression tests added when site has traffic.

### Format Patterns

**URLs & SEO:**

| Element | Convention | Example |
|---|---|---|
| **URLs** | kebab-case, no trailing slash, French | `/cours-enfants`, `/pension-chevaux` |
| **Blog URLs** | `/blog/{slug}` | `/blog/reprendre-equitation-40-ans` |
| **Canonical URLs** | Always HTTPS, no trailing slash | `https://equi22.fr/cours-enfants` |
| **Sitemap** | Auto-generated by `@astrojs/sitemap` | `sitemap-index.xml` |

**Dates & Content:**

| Element | Convention | Example |
|---|---|---|
| **Dates in frontmatter** | ISO 8601 (`YYYY-MM-DD`) | `2026-09-01` |
| **Displayed dates** | French relative/seasonal format | "Rentrée 2026", "Vacances Toussaint 2026" |
| **Content language** | French | All visible content |
| **Code language** | English | Variables, types, technical comments |

### Process Patterns

**Component Pattern — every Astro component follows this structure:**

```astro
---
// 1. Types & Interfaces
interface Props {
  title: string;
  price?: string;
}

// 2. Props destructuring
const { title, price } = Astro.props;

// 3. Logic (if needed)
const formattedPrice = price ? `${price}€` : undefined;
---

<!-- 4. HTML template with Tailwind/daisyUI classes -->
<section class="py-12 bg-base-200">
  <h2 class="text-2xl font-serif">{title}</h2>
  {formattedPrice && <p class="text-lg font-bold">{formattedPrice}</p>}
</section>
```

**Error Pages & Recovery:**

| Situation | Pattern |
|---|---|
| **404** | Custom `404.astro` — warm tone, links to popular services, sticky contact |
| **Invalid form** | Inline error below field, human message in French, no technical jargon |
| **Missing image** | Beige placeholder with correct dimensions (no CLS) |

### Enforcement Guidelines

**All AI Agents MUST:**

1. Use TypeScript strict — never `any`, never `@ts-ignore`
2. Follow the naming conventions above without exception
3. Include typed `interface Props` in every component
4. Use Tailwind/daisyUI classes — no inline CSS, no scoped `<style>`
5. Write visible content in French, code in English
6. Use Astro's `<Image>` or `<Picture>` for all images (never raw `<img>`)
7. Include descriptive `alt` on every content image
8. Respect 44px minimum tap targets on interactive elements
9. Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`

**All AI Agents MUST NOT:**

1. Create subfolders in `components/` without explicit justification
2. Add client-side JS dependencies without justification (islands only)
3. Use absolute dates in visible content (prefer seasonal labels)
4. Hardcode phone number or address — always reference `business.ts`
5. Create separate CSS files — everything through Tailwind utilities
6. Use `<style>` scoped blocks except for exceptional cases requiring CSS that Tailwind cannot express

### Pattern Examples

**Good:**

```astro
---
// ServiceCard.astro — follows all conventions
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

interface Props {
  service: CollectionEntry<'services'>;
}

const { service } = Astro.props;
const { title, pricing, heroImage, heroImageAlt } = service.data;
---

<article class="card bg-base-100 shadow-md">
  <figure>
    <Image src={heroImage} alt={heroImageAlt} width={400} height={267} />
  </figure>
  <div class="card-body">
    <h3 class="card-title">{title}</h3>
    <p class="text-lg font-bold text-primary">Dès {pricing[0].price}€/{pricing[0].unit}</p>
  </div>
</article>
```

**Anti-Patterns:**

```astro
<!-- BAD: raw <img>, inline style, hardcoded phone, any type -->
<img src="/images/hero.jpg" style="width: 100%">
<a href="tel:+33296000000">Appeler</a>
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
equi-22/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .env.example                    ← WEB3FORMS_KEY, UMAMI_ID, SITE_URL
├── .env
├── .gitignore
├── .nvmrc                          ← Node.js version
│
├── src/
│   ├── components/                 ← Flat — max ~12 components
│   │   ├── Hero.astro              ← FR1: Adaptive hero (homepage + service)
│   │   ├── ServiceCard.astro       ← FR1: Service card (image + title + price)
│   │   ├── PricingTable.astro      ← FR3: Responsive pricing table
│   │   ├── PlanningBlock.astro     ← FR4: Schedule by day/time/level
│   │   ├── Testimonial.astro       ← FR16: Inline testimonial block
│   │   ├── StickyContact.astro     ← FR11-12: Sticky phone + floating WhatsApp
│   │   ├── ContactForm.astro       ← FR13-14: Contextual form (Web3Forms)
│   │   ├── SchemaMarkup.astro      ← FR26: JSON-LD (LocalBusiness + Service)
│   │   ├── Navbar.astro            ← FR1: Responsive navigation (mobile hamburger)
│   │   ├── Footer.astro            ← Practical info + quick links
│   │   ├── ProfileRouting.astro    ← FR1: "parent / adult / owner" routing
│   │   └── Breadcrumb.astro        ← Breadcrumb navigation for deep pages
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro        ← Global layout: <head> meta + navbar + sticky + footer + schema
│   │
│   ├── pages/
│   │   ├── index.astro             ← Homepage: hero + profile routing + service cards + news
│   │   ├── cours-enfants.astro     ← Service: children's lessons (Sophie)
│   │   ├── equitation-adulte.astro ← Service: adult riding (Marc)
│   │   ├── pension-chevaux.astro   ← Service: horse boarding (Claire)
│   │   ├── stages-vacances.astro   ← Service: holiday camps
│   │   ├── competitions.astro      ← Service: competitions
│   │   ├── tarifs.astro            ← Global pricing page (all formulas)
│   │   ├── a-propos.astro          ← Center, instructors, facilities
│   │   ├── contact.astro           ← Contact page (generic form + map)
│   │   ├── mentions-legales.astro  ← NFR20: legal mentions
│   │   ├── politique-confidentialite.astro ← NFR21: RGPD privacy policy
│   │   ├── blog/
│   │   │   ├── index.astro         ← Blog article listing
│   │   │   └── [...slug].astro     ← Dynamic blog article
│   │   └── 404.astro               ← Warm 404 page
│   │
│   ├── content/
│   │   ├── config.ts               ← Zod schemas (services, blog, news)
│   │   ├── services/
│   │   │   ├── cours-enfants.md
│   │   │   ├── equitation-adulte.md
│   │   │   ├── pension-chevaux.md
│   │   │   ├── stages-vacances.md
│   │   │   └── competitions.md
│   │   ├── blog/
│   │   │   ├── reprendre-equitation-40-ans.md
│   │   │   └── premier-cours-equitation-enfant.md
│   │   └── news/
│   │       └── rentree-2026.md
│   │
│   ├── data/
│   │   ├── business.ts             ← NAP, hours, GPS coordinates, social links, phone
│   │   └── navigation.ts           ← Main menu + footer links
│   │
│   ├── assets/
│   │   └── images/
│   │       ├── hero/
│   │       ├── services/
│   │       ├── facilities/
│   │       ├── team/
│   │       └── logo.svg
│   │
│   └── styles/
│       └── global.css              ← @tailwind base/components/utilities + daisyUI theme
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt                  ← FR25
│   └── og-default.jpg              ← Default OG image
│
└── tests/                          ← Post-MVP
    └── a11y/                       ← Playwright + axe-core tests
```

### Architectural Boundaries

**Component Boundaries:**

| Boundary | Communication | Data Source |
|---|---|---|
| `BaseLayout` → `SchemaMarkup` | Props: `serviceName`, `serviceDescription`, `pageUrl` | `business.ts` + page props |
| `BaseLayout` → `StickyContact` | Props: `whatsappMessage` | `business.ts` (phone) + page frontmatter (message) |
| `BaseLayout` → `Navbar` | No props | `navigation.ts` |
| Service pages → Components | Typed props from Content Collections | Markdown collection files |
| `ContactForm` → Web3Forms | HTTP POST (fetch) | Form data + access key (env var) |
| `BaseLayout` → Umami | Script tag in `<head>` | Tracking ID (env var) |

**External Integration Points:**

| External Service | Integration Point | Data Exchanged |
|---|---|---|
| **Web3Forms** | `ContactForm.astro` → POST `https://api.web3forms.com/submit` | Name, phone, message, type, honeypot |
| **Umami Cloud** | Async script in `BaseLayout.astro` `<head>` | Page views (cookieless, anonymized) |
| **Cloudflare Pages** | Git push → auto-build → CDN | Full source code |
| **Google Business Profile** | Off-site (no technical link) | NAP consistent with `business.ts` |

### Requirements to Structure Mapping

**FR → Files:**

| FR Category | Primary Files |
|---|---|
| **FR1-FR10** (Content & IA) | `pages/*.astro`, `content/services/*.md`, `Hero.astro`, `ProfileRouting.astro`, `Navbar.astro` |
| **FR11-FR15** (Contact & Conversion) | `StickyContact.astro`, `ContactForm.astro`, `data/business.ts` |
| **FR16-FR20** (Trust & Reassurance) | `Testimonial.astro`, `content/services/*.md` (frontmatter testimonial) |
| **FR21-FR24** (Visual & Media) | `assets/images/**`, components using `<Image>` / `<Picture>` |
| **FR25-FR30** (SEO & Discoverability) | `SchemaMarkup.astro`, `BaseLayout.astro` (meta, OG), `public/robots.txt`, `@astrojs/sitemap` |
| **FR31-FR36** (Accessibility) | All components (built-in), `tests/a11y/` (post-MVP) |
| **FR37-FR43** (Content Management) | `content/**/*.md`, `astro.config.mjs`, Cloudflare Pages pipeline |

**NFR → Mechanisms:**

| NFR | Mechanism in Structure |
|---|---|
| **NFR1-7** (Performance) | `astro:assets` pipeline, Tailwind purge, daisyUI CSS-only, CDN |
| **NFR8-14** (Security/RGPD) | Cloudflare HTTPS, `ContactForm.astro` honeypot, Umami cookieless, `politique-confidentialite.astro` |
| **NFR15-19** (Accessibility) | Built into every component, `tests/a11y/` post-MVP |
| **NFR20-22** (Legal) | `mentions-legales.astro`, `politique-confidentialite.astro` |
| **NFR23-27** (SEO Quality) | `SchemaMarkup.astro`, `@astrojs/sitemap`, `BaseLayout.astro` meta |
| **NFR28-32** (Maintainability) | Cloudflare auto-build, Markdown content, `astro check` |

### Data Flow

```
[Content Collections .md]
    → Zod validation (build)
    → Astro pages (build)
    → [Component props]
    → HTML + optimized images
    → [Cloudflare CDN]
    → [User browser]

[User form submit]
    → ContactForm.astro (minimal client JS)
    → Web3Forms API (POST)
    → Email notification → Center manager

[Page view]
    → Umami script (async, non-blocking)
    → Umami Cloud (anonymized)
```

### Development Workflow

```
1. Edit: src/content/services/cours-enfants.md (or .astro component)
2. Dev:  npm run dev → Vite HMR → instant preview
3. Check: astro check → TypeScript + Zod validation
4. Commit: git add + git commit
5. Push: git push origin main
6. Build: Cloudflare Pages auto-build (< 30s)
7. Deploy: CDN propagation (< 2min)
8. Live: site updated
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**

All technology choices are compatible and work together without conflicts:

- Astro v5.17 + TypeScript strict: native support
- Astro + Tailwind CSS: official `@astrojs/tailwind` integration
- Tailwind + daisyUI: daisyUI is a Tailwind plugin — zero conflict
- Astro + Cloudflare Pages: official adapter, Astro acquired by Cloudflare
- Astro Content Collections + Zod: natively integrated
- Astro `<Image>`/`<Picture>` + WebP/AVIF: `astro:assets` native
- Web3Forms + static HTML form: simple POST, no framework dependency
- Umami Cloud + static site: async script, cookieless

No version conflicts or incompatibilities detected.

**Pattern Consistency:**

- Naming: PascalCase components / kebab-case pages & content / camelCase code — aligned with Astro conventions
- Flat `components/` structure — coherent with component count (~12)
- Unified Content Collections — coherent with project size (~10 services)
- Frontmatter-driven approach (SEO, WhatsApp, pricing) — coherent with build-time architecture

**Structure Alignment:**

- Every architectural decision has a corresponding file/component in the structure
- Boundaries are clear: components ↔ layouts ↔ pages ↔ content ↔ data
- Data flows are unidirectional (content → build → CDN)

### Requirements Coverage Validation ✅

**Functional Requirements — 43/43 covered:**

| FR Category | Architectural Coverage | Status |
|---|---|---|
| FR1-FR10 (Content & IA) | Service pages, Content Collections, Hero, ProfileRouting, Navbar, blog | ✅ |
| FR11-FR15 (Contact & Conversion) | StickyContact, ContactForm, Web3Forms, business.ts | ✅ |
| FR16-FR20 (Trust & Reassurance) | Testimonial component, frontmatter testimonial per service | ✅ |
| FR21-FR24 (Visual & Media) | `astro:assets`, `<Image>`/`<Picture>`, assets/images/ | ✅ |
| FR25-FR30 (SEO & Discoverability) | SchemaMarkup, BaseLayout meta/OG, sitemap, robots.txt | ✅ |
| FR31-FR36 (Accessibility) | Component enforcement rules, semantic HTML, post-MVP tests | ✅ |
| FR37-FR43 (Content Management) | Markdown/YAML, Git workflow, Cloudflare auto-build | ✅ |

**Non-Functional Requirements — 32/32 covered:**

| NFR Category | Mechanism | Status |
|---|---|---|
| NFR1-7 (Performance) | Static CDN + astro:assets + Tailwind purge + daisyUI CSS-only + zero blocking JS | ✅ |
| NFR8-14 (Security/RGPD) | Cloudflare HTTPS + honeypot + Umami cookieless + legal pages | ✅ |
| NFR15-19 (Accessibility) | Enforcement rules (44px, alt, focus, semantic) + axe-core post-MVP | ✅ |
| NFR20-22 (Legal) | mentions-legales.astro + politique-confidentialite.astro | ✅ |
| NFR23-27 (SEO Quality) | SchemaMarkup JSON-LD + sitemap + meta + SEO-friendly URLs | ✅ |
| NFR28-32 (Maintainability) | Cloudflare auto-build < 30s + update cycle < 5min + portable Markdown | ✅ |

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions documented with versions, rationale, and affected files. No ambiguity on technology choices.

**Structure Completeness:** Every file is named, placed, and mapped to requirements. An AI agent can scaffold the project without hesitation.

**Pattern Completeness:** Naming conventions, component structure, anti-patterns, and enforcement rules are explicit with concrete examples.

### Gap Analysis Results

**Critical Gaps:** None identified.

**Important Gaps (addressed during implementation, not blocking):**

| Gap | Impact | Resolution |
|---|---|---|
| Exact daisyUI theme (colors "Terre & Mer de Bretagne") | Visual | Defined in `tailwind.config.mjs` at implementation time — color directions in UX Spec |
| Exact typography (DM Serif Display + Inter) | Visual | Configured in `tailwind.config.mjs` + Google Fonts import |
| Web3Forms form structure (honeypot fields, access key) | Functional | Documented during Web3Forms setup |

**Post-MVP Gaps (planned):**

- Automated accessibility tests (Playwright + axe-core)
- Automated Lighthouse CI
- CMS V2 (Tina/Decap/Keystatic)
- Localized city pages

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Process patterns documented
- [x] AI agent enforcement rules specified

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**

- Simple, coherent architecture — static site without unnecessary complexity
- Modern, well-integrated stack (Astro + Cloudflare = first-class partnership)
- Portable content (Markdown) — zero vendor lock-in
- Zero operational cost (free CDN, free analytics, free forms)
- Clear enforcement rules for AI agent consistency
- Every FR and NFR has an explicit architectural mechanism

**Areas for Future Enhancement:**

- Visual theme fine-tuning during implementation (exact colors, typography)
- Automated accessibility testing post-MVP
- CMS for center manager autonomy in V2
- Localized city pages for expanded SEO coverage

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Reference this document for all architectural questions
- Follow enforcement rules (MUST / MUST NOT) without exception

**First Implementation Priority:**

```bash
npm create astro@latest equi-22 -- --template minimal --typescript strict
cd equi-22
npx astro add tailwind
npx astro add sitemap
npx astro add cloudflare
npm install daisyui
```

Then: BaseLayout → SchemaMarkup → StickyContact → Navbar → Footer → Content Collections schema → first service page.
