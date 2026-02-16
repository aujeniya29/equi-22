---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
workflowCompleted: true
completedAt: '2026-02-14'
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# equi-22 - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for equi-22, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Visitors can navigate via hybrid system: service-based menu + homepage visitor-profile routing ("I'm a parent / owner / rider")
FR2: Visitors can access a dedicated page for each service (children's lessons, adult riding, horse boarding, holiday camps, competitions)
FR3: Visitors can view pricing on a global pricing page and contextually on each service page
FR4: Visitors can view the weekly schedule organized by age group and level on each service page
FR5: Visitors can view the progression pathway (discovery to Galop levels) on lesson pages
FR6: Visitors can read about the center's history, values, and pedagogical approach
FR7: Visitors can view instructor profiles presented by personality and teaching philosophy
FR8: Visitors can browse blog articles targeting long-tail SEO keywords
FR9: (Conditional MVP) Visitors can access event information (birthdays, school trips, team-building, ethology) via blog articles
FR10: Visitors can view up-to-date news, competition calendars, and seasonal program updates
FR11: Visitors can initiate a phone call via a sticky button visible on every page
FR12: Visitors can initiate a WhatsApp conversation via a floating button visible on every page
FR13: Visitors can submit a contact inquiry via a contextual form adapted to the service or event type
FR14: The center manager receives immediate notification on form submission
FR15: Visitors can access contact options (phone, WhatsApp, form) within one tap from any page on mobile
FR16: Visitors can read testimonials and social proof relevant to their persona on each service page
FR17: Parents can see reassurance content about safety, pedagogy, and welcoming atmosphere on children's pages
FR18: Adult visitors can see "no judgment" messaging and age-appropriate imagery on adult riding pages
FR19: Horse owners can view a detailed "what's included" checklist with boarding inclusions, welfare standards, and vet protocol
FR20: Visitors can view Google review ratings displayed at strategic locations on the site
FR21: Visitors can browse a structured photo gallery organized by facility zone (arenas, boxes, paddocks, trails)
FR22: Visitors can view photos representing all seasons and authentic center life
FR23: All images served in optimized formats (WebP/AVIF) with responsive sizing per device
FR24: Images load progressively without blocking page rendering
FR25: Search engines can crawl and index every page via sitemap.xml and robots.txt
FR26: Each page exposes LocalBusiness and Service structured data (schema markup)
FR27: Each page includes Open Graph and Twitter Card meta tags for social sharing
FR28: Google Business Profile is optimized with accurate business information, categories, photos, and services (pre-launch)
FR29: The center is registered on relevant directories (Pages Jaunes, FFE, tourism offices) with consistent NAP data
FR30: Each page has a unique, keyword-optimized title tag and meta description
FR31: All site content navigable via keyboard with visible focus indicators
FR32: All content images have descriptive alt-text; decorative images marked appropriately
FR33: All form inputs labelled with descriptive error messages and required field indicators
FR34: Color contrast meets WCAG 2.1 AA minimum ratios (4.5:1 normal text, 3:1 large text)
FR35: The site respects `prefers-reduced-motion` for any animations
FR36: The site is fully usable on mobile with touch-friendly tap targets (minimum 44px)
FR37: The developer can update content, commit, and deploy within 5 minutes
FR38: The site deploys via a single-command build-and-deploy pipeline
FR39: Content authored in Markdown with YAML frontmatter, versioned in Git
FR40: Image pipeline automatically optimizes at build time (resize, format conversion, srcset)
FR41: The site can be hosted on a free CDN tier with zero or near-zero monthly cost
FR42: (V2) The center manager can update pricing, schedules, news, and camp dates via a constrained CMS
FR43: (V2) The CMS prevents layout or content quality degradation through template guardrails

### NonFunctional Requirements

NFR1: Lighthouse Performance score 90+ on mobile (3G throttled)
NFR2: Largest Contentful Paint (LCP) < 1.5s on mobile
NFR3: First Input Delay (FID) < 50ms
NFR4: Cumulative Layout Shift (CLS) < 0.1
NFR5: Total initial page weight < 500KB (HTML + CSS + critical JS + above-the-fold images)
NFR6: No render-blocking JavaScript in the critical rendering path
NFR7: All images served in next-gen formats (WebP/AVIF) with appropriate srcset
NFR8: All pages served over HTTPS with valid SSL certificate
NFR9: Contact forms protected against spam via invisible mechanisms (honeypot, rate limiting) with zero visible friction
NFR10: No user data stored server-side beyond form submission forwarding
NFR11: Form submissions transmitted securely to the notification endpoint
NFR12: RGPD-compliant privacy policy detailing data collection, processing purpose, retention, and user rights
NFR13: If cookie-based analytics is used, RGPD-compliant consent banner displayed before any tracking cookie is set
NFR14: If privacy-first analytics (cookieless) is chosen, no consent banner required but privacy policy mention mandatory
NFR15: Lighthouse Accessibility score 90+ on all pages
NFR16: WCAG 2.1 Level AA compliance across all pages
NFR17: Zero critical or serious violations in automated accessibility audit (axe-core)
NFR18: All interactive elements reachable and operable via keyboard
NFR19: All text readable at 200% browser zoom without horizontal scrolling
NFR20: Mentions legales page: site editor identity, hosting provider, CNIL reference, intellectual property notice
NFR21: Privacy policy page: data collected via forms, analytics data, processing purpose, retention period, user rights (access, rectification, deletion)
NFR22: Cookie consent mechanism compliant with CNIL guidelines (if cookie-based analytics selected)
NFR23: Lighthouse SEO score 90+ on all pages
NFR24: All pages pass Google's Mobile-Friendly Test
NFR25: Structured data validates without errors via Google Rich Results Test
NFR26: No broken internal links (validated at build time)
NFR27: URLs follow SEO-friendly patterns: lowercase, hyphenated, descriptive, no special characters
NFR28: Full site build completes in under 30 seconds
NFR29: Deployment from git push to live site in under 2 minutes
NFR30: Content update cycle (edit, commit, deploy, live) in under 5 minutes
NFR31: Zero runtime dependencies — deployed content remains live if build toolchain is unavailable
NFR32: All content portable across SSG frameworks (Markdown + YAML frontmatter = framework-agnostic)

### Additional Requirements

**From Architecture:**

- Starter Template: Astro Minimal + TypeScript Strict — project must be initialized with `npm create astro@latest equi-22 -- --template minimal --typescript strict`
- Post-init integrations: `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/cloudflare`, `daisyui`
- Content Collections with Zod schema validation for services, blog, and news collections
- Unified content architecture: one Markdown file per service with rich YAML frontmatter (pricing, schedule, testimonials, WhatsApp message, schema data, meta tags)
- SchemaMarkup component: centralized JSON-LD generation (LocalBusiness static from `business.ts` + Service dynamic per page)
- Contact/WhatsApp strategy: frontmatter-driven contextual messaging per page, WhatsApp URL with pre-filled text
- Form service: Web3Forms (free tier, 250 submissions/month, honeypot spam protection, email notification)
- Analytics: Umami Cloud (cookieless, RGPD-compliant without consent banner, free tier 100K events/month)
- CI/CD: Cloudflare Pages native auto-build on git push to main, preview deploys on PR branches
- Stale content handling: build-time date filtering (news > 3 months excluded, past events show "Prochain stage a venir")
- Build-time validation: `astro check` (TypeScript) every build + post-build broken link checker
- Flat `components/` folder — no subfolders unless exceeding 15 components
- All components must use TypeScript strict, typed `interface Props`, Tailwind/daisyUI classes only
- Visible content in French, code in English
- Use Astro `<Image>` or `<Picture>` for all images (never raw `<img>`)
- Semantic HTML required: `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`
- No client-side JS dependencies without justification (islands only)
- Phone number and address always referenced from `business.ts` — never hardcoded

**From UX Design:**

- Design direction: "Hybride Storytelling" (Direction C) — hero emotional + profile routing + alternating emotion/information rhythm
- Color palette "Terre & Mer de Bretagne": primary green (#2D5F3F), accent blue (#1B6B93), cream background (#FAF8F5), beige secondary (#F0EDE8)
- Typography: DM Serif Display (headings) + Inter (body) — Google Fonts
- Spacing system: base 4px (xs=4, sm=8, md=16, lg=24, xl=32, 2xl=48, 3xl=64)
- Responsive breakpoints: Mobile (<768px) / Tablet (768-1024px) / Desktop (>1024px)
- 7 custom components: Hero (adaptive), ServiceCard, PlanningBlock, PricingTable, Testimonial, StickyContact, ContactForm
- Service page skeleton: Hero -> Promise -> Planning -> Pricing -> Testimonial -> CTA (constant across all services)
- Sticky contact bar on mobile: 2 buttons 50/50 (Phone green + WhatsApp green), full width bottom
- Desktop: CTA in navbar + floating WhatsApp button bottom-right
- Profile routing on homepage: 3 buttons ("Mon enfant", "Je suis adulte", "Proprietaire")
- Button hierarchy: Primary (blue, main action), Secondary (green, WhatsApp), Tertiary (transparent border)
- Form patterns: contextual variants per service type, inline validation on blur, honeypot anti-spam
- Error messages in human-friendly French, never technical jargon
- 404 page: warm tone, suggestions to popular pages + contact
- Empty states: warm messages with alternative actions (call, follow on social)
- Image placeholders: solid beige color matching final image ratio (CLS = 0)

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 2 + 3 | Navigation hybride: service menu (E2) + profile routing homepage (E3) |
| FR2 | Epic 2 | Dedicated page per service |
| FR3 | Epic 2 | Pricing on service pages + global pricing page |
| FR4 | Epic 2 | Schedule by age group and level |
| FR5 | Epic 2 | Progression pathway (discovery to Galop) |
| FR6 | Epic 5 | Center history, values, pedagogical approach |
| FR7 | Epic 5 | Instructor profiles |
| FR8 | Epic 6 | Blog articles for long-tail SEO |
| FR9 | Epic 6 | Event information (conditional MVP) |
| FR10 | Epic 3 | News/updates on homepage |
| FR11 | Epic 1 | Sticky phone button |
| FR12 | Epic 1 | Floating WhatsApp button |
| FR13 | Epic 4 | Contextual contact form |
| FR14 | Epic 4 | Immediate notification on form submission |
| FR15 | Epic 1 | Contact within one tap on mobile |
| FR16 | Epic 2 | Testimonials per service page |
| FR17 | Epic 2 | Parent reassurance on children's pages |
| FR18 | Epic 2 | "No judgment" messaging on adult pages |
| FR19 | Epic 2 | Boarding inclusions checklist |
| FR20 | Epic 5 | Google review ratings |
| FR21 | Epic 5 | Structured photo gallery by zone |
| FR22 | Epic 5 | Photos all seasons |
| FR23 | Epic 5 | Optimized images (WebP/AVIF, srcset) |
| FR24 | Epic 5 | Progressive image loading |
| FR25 | Epic 1 | Sitemap.xml + robots.txt |
| FR26 | Epic 1 | Schema markup (LocalBusiness + Service) |
| FR27 | Epic 1 | Open Graph + Twitter Card meta tags |
| FR28 | Epic 7 | Google Business Profile optimization (off-site) |
| FR29 | Epic 7 | Directory registrations (off-site) |
| FR30 | Epic 1 | Unique title tags + meta descriptions |
| FR31 | Epic 7 | Keyboard navigation + focus indicators |
| FR32 | Epic 7 | Descriptive alt-text on images |
| FR33 | Epic 7 | Form labels + error messages |
| FR34 | Epic 7 | WCAG AA color contrast |
| FR35 | Epic 7 | prefers-reduced-motion |
| FR36 | Epic 7 | Touch-friendly tap targets (44px) |
| FR37 | Epic 7 | Content update cycle < 5 minutes |
| FR38 | Epic 7 | Single-command deploy pipeline |
| FR39 | Epic 7 | Markdown + YAML + Git content |
| FR40 | Epic 7 | Build-time image optimization pipeline |
| FR41 | Epic 7 | Free CDN hosting |
| FR42 | — | V2 (out of MVP scope) |
| FR43 | — | V2 (out of MVP scope) |

## Epic List

### Epic 1: Project Foundation & Site Shell
The developer has a functional Astro project with the global layout, navbar, footer, sticky contact, and schema markup — the skeleton on which all pages will be built. Visitors already benefit from omnipresent contact (sticky phone + floating WhatsApp) and proper SEO infrastructure on every page.
**FRs covered:** FR11, FR12, FR15, FR25, FR26, FR27, FR30

### Epic 2: Service Pages — Core Conversion Pages
Visitors (Sophie, Marc, Claire) can access a dedicated page for each service, view pricing, schedule, progression pathway, and a testimonial — everything needed to decide and act. Includes the global pricing page.
**FRs covered:** FR1 (service navigation), FR2, FR3, FR4, FR5, FR16, FR17, FR18, FR19

### Epic 3: Homepage & Profile Routing
Visitors land on a homepage that immediately orients them to their need via profile routing ("Mon enfant / Je suis adulte / Proprietaire") and service cards, plus a fresh news section.
**FRs covered:** FR1 (profile routing), FR10

### Epic 4: Contact, Forms & Conversion
Visitors can submit a contextual contact form adapted to their service or event type, and the center manager receives immediate notification. Includes the dedicated contact page.
**FRs covered:** FR13, FR14

### Epic 5: About, Trust & Visual Content
Visitors can discover the center, its values, its instructors, browse the structured photo gallery, and be reassured by transparency and animal welfare proof. Includes the About page and optimized image pipeline.
**FRs covered:** FR6, FR7, FR20, FR21, FR22, FR23, FR24

### Epic 6: Blog & SEO Content
Visitors discover the center via long-tail SEO blog articles (e.g., "Reprendre l'equitation a 40 ans") and event pages, capturing organic traffic on untapped niches.
**FRs covered:** FR8, FR9

### Epic 7: Legal, Analytics & Production Readiness
The site is RGPD-compliant, measures traffic, meets accessibility standards, and is production-ready with all validations, legal pages, and off-site SEO actions completed.
**FRs covered:** FR28, FR29, FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR38, FR39, FR40, FR41

## Epic 1: Project Foundation & Site Shell

The developer has a functional Astro project with the global layout, navbar, footer, sticky contact, and schema markup — the skeleton on which all pages will be built. Visitors already benefit from omnipresent contact (sticky phone + floating WhatsApp) and proper SEO infrastructure on every page.

### Story 1.1: Initialize Astro Project with Core Integrations

As a **developer**,
I want **a fully configured Astro project with TypeScript strict, Tailwind CSS, daisyUI, sitemap, and Cloudflare adapter**,
So that **I have a solid foundation to build all site pages with consistent tooling and deployment pipeline**.

**Acceptance Criteria:**

**Given** the project does not exist yet
**When** the developer runs the initialization commands
**Then** an Astro v5.17+ project exists with TypeScript strict mode enabled
**And** Tailwind CSS is integrated via `@astrojs/tailwind`
**And** daisyUI is installed and configured as a Tailwind plugin
**And** `@astrojs/sitemap` is integrated
**And** `@astrojs/cloudflare` adapter is configured
**And** the daisyUI theme "Terre & Mer de Bretagne" is defined in `tailwind.config.mjs` (primary green #2D5F3F, accent blue #1B6B93, cream #FAF8F5, beige #F0EDE8, text #2C2C2C)
**And** Google Fonts DM Serif Display + Inter are configured
**And** `global.css` contains Tailwind directives and theme overrides
**And** `src/data/business.ts` exists with placeholder NAP data (name, address, phone, hours, GPS coordinates, social links)
**And** `src/data/navigation.ts` exists with main menu links structure
**And** `npm run dev` starts a working dev server
**And** `npm run build` produces a successful build

### Story 1.2: Base Layout with SEO Infrastructure

As a **visitor**,
I want **every page to have proper SEO meta tags, structured data, and social sharing tags**,
So that **search engines index the site correctly and shared links display rich previews**.

**Acceptance Criteria:**

**Given** the project has the foundation from Story 1.1
**When** any page is rendered using `BaseLayout.astro`
**Then** the `<head>` contains a unique `<title>` tag from page props
**And** the `<head>` contains a unique `<meta name="description">` from page props
**And** Open Graph meta tags (og:title, og:description, og:image, og:url, og:type) are generated from page props (FR27)
**And** Twitter Card meta tags are generated (FR27)
**And** canonical URL is set (HTTPS, no trailing slash)
**And** `SchemaMarkup.astro` component injects JSON-LD with LocalBusiness data from `business.ts` (FR26)
**And** `SchemaMarkup.astro` injects Service schema when `serviceType` and `serviceDescription` props are provided (FR26)
**And** a `sitemap-index.xml` is generated at build time (FR25)
**And** `public/robots.txt` exists and allows crawling (FR25)
**And** URLs follow SEO-friendly patterns: lowercase, hyphenated, no trailing slash (NFR27)
**And** the `<html>` tag has `lang="fr"`

### Story 1.3: Responsive Navbar

As a **visitor**,
I want **a fixed navigation bar with the center's logo and service links**,
So that **I can navigate to any service page from anywhere on the site**.

**Acceptance Criteria:**

**Given** the BaseLayout is in place from Story 1.2
**When** a visitor views any page on mobile
**Then** the navbar is fixed at the top with the logo (left) and hamburger menu icon (right)
**And** tapping the hamburger opens a full-screen overlay menu with service links from `navigation.ts`
**And** tapping outside the menu or the close icon closes it
**And** the active page link is visually distinguished
**When** a visitor views any page on desktop (>1024px)
**Then** the navbar shows the logo (left), service links (center), and a CTA contact button (right)
**And** hover on links shows an underline in primary green
**And** the navbar uses semantic `<nav>` element
**And** all interactive elements are keyboard-accessible with visible focus indicators
**And** tap targets meet 44px minimum on mobile (FR36)

### Story 1.4: Footer with Practical Information

As a **visitor**,
I want **a footer with practical information, quick links, and contact details**,
So that **I can find essential information and navigate the site from the bottom of any page**.

**Acceptance Criteria:**

**Given** the BaseLayout is in place
**When** a visitor scrolls to the bottom of any page
**Then** a footer is displayed with the center name, address, and phone number from `business.ts`
**And** opening hours are displayed
**And** quick links to main service pages are available
**And** social media links (Facebook/Instagram) open in new tabs with `rel="noopener"`
**And** the footer uses semantic `<footer>` element
**And** the footer is responsive (stacked on mobile, multi-column on desktop)

### Story 1.5: Sticky Contact Bar (Phone + WhatsApp)

As a **visitor**,
I want **a sticky phone button and floating WhatsApp button always visible**,
So that **I can contact the center instantly from any page with one tap** (FR11, FR12, FR15).

**Acceptance Criteria:**

**Given** the BaseLayout is in place
**When** a visitor views any page on mobile
**Then** a sticky bar is fixed at the bottom with two buttons 50/50 width: "Appeler" (phone icon, green) and "WhatsApp" (WhatsApp icon, green)
**And** tapping "Appeler" initiates a phone call via `tel:` URL using the number from `business.ts`
**And** tapping "WhatsApp" opens WhatsApp with a pre-filled contextual message via `https://wa.me/{number}?text={encoded_message}`
**And** the WhatsApp message is contextual per page (passed via `whatsappMessage` prop from page frontmatter)
**And** both buttons have minimum 44px tap targets
**And** both buttons have `aria-label` descriptive text
**When** a visitor views any page on desktop
**Then** the sticky bar is not shown (CTA is in the navbar)
**And** a floating WhatsApp button is displayed in the bottom-right corner
**And** the phone number and address are never hardcoded — always from `business.ts`

## Epic 2: Service Pages — Core Conversion Pages

Visitors (Sophie, Marc, Claire) can access a dedicated page for each service, view pricing, schedule, progression pathway, and a testimonial — everything needed to decide and act. Includes the global pricing page.

### Story 2.1: Content Collections Schema & Service Data Structure

As a **developer**,
I want **a typed Content Collections schema for services with Zod validation**,
So that **all service content (pricing, schedule, testimonials, SEO) is structured, validated, and consistently formatted across pages**.

**Acceptance Criteria:**

**Given** the Astro project from Epic 1
**When** the developer creates `src/content/config.ts`
**Then** a `services` collection is defined with Zod schema validating: title, description, seoTitle, seoDescription, ogImage (optional), heroImage, heroImageAlt, whatsappMessage, order, pricing (array of label/price/unit/highlight), pricingNotes (optional array), schedule (optional array of day/time/level), testimonial (optional object with quote/author/stars), serviceType, serviceDescription
**And** `astro check` passes with no type errors
**And** at least one sample service Markdown file (`src/content/services/cours-enfants.md`) validates against the schema with placeholder content
**And** the frontmatter keys follow camelCase convention
**And** the content body contains the narrative/emotional text in French

### Story 2.2: Service Page Layout & Core Components

As a **visitor**,
I want **each service page to follow a consistent layout with hero, planning, pricing, testimonial, and CTA sections**,
So that **I learn the page pattern once and find information in the same place on every service**.

**Acceptance Criteria:**

**Given** the Content Collections schema from Story 2.1 and BaseLayout from Epic 1
**When** a visitor views any service page
**Then** the page follows the constant skeleton: Hero → Promise/narrative → Planning → Pricing → Testimonial → CTA
**And** `Hero.astro` (service variant) displays the hero image via `<Picture>` (WebP/AVIF, srcset) with title and subtitle overlaid with readable contrast
**And** `PlanningBlock.astro` renders the schedule as a semantic `<table>` with day (bold, green), time, and level/category (badge)
**And** `PricingTable.astro` renders pricing rows in a responsive table (columns on desktop, stacked cards on mobile) with optional highlight on best value
**And** pricing notes (license, reductions) are displayed below the table
**And** `Testimonial.astro` renders a `<blockquote>` with left accent border (blue), star rating, quote (max 150 chars), and author with `<cite>`
**And** a CTA section at the bottom invites the visitor to call or WhatsApp with persona-specific action text
**And** all images use Astro `<Image>` or `<Picture>` — never raw `<img>`
**And** sections alternate cream (#F0EDE8) and white (#FAF8F5) backgrounds for visual rhythm

### Story 2.3: Children's Lessons Page (Sophie)

As a **parent (Sophie)**,
I want **a dedicated children's lessons page with schedule by age group, pricing, progression pathway, and safety reassurance**,
So that **I can verify the schedule fits, the price is in budget, and the environment is safe for my child**.

**Acceptance Criteria:**

**Given** the service page layout from Story 2.2
**When** a visitor navigates to `/cours-enfants`
**Then** the hero displays a warm photo of children on ponies with title "Cours d'equitation enfants"
**And** the promise section contains welcoming, reassurance-first content about safety, pedagogy, and caring atmosphere (FR17)
**And** the planning block shows the weekly schedule organized by age group (baby poney, children, teens) (FR4)
**And** the progression section explains the discovery-to-Galop pathway (FR5)
**And** the pricing table shows formulas from most accessible to most engaged with clear price/unit (FR3)
**And** a parent testimonial provides social proof (FR16)
**And** the WhatsApp pre-filled message is contextual: "Bonjour, je suis interesse(e) par les cours enfants..."
**And** the page has unique seoTitle and seoDescription targeting "cours equitation enfants Yffiniac/Saint-Brieuc" (FR30)
**And** Service schema markup is injected for this specific service (FR26)

### Story 2.4: Adult Riding Page (Marc)

As an **adult beginner (Marc)**,
I want **a dedicated adult riding page with "no judgment" messaging, evening/weekend schedule, and adult testimonials**,
So that **I feel welcome as a beginner and can find a session that fits my schedule**.

**Acceptance Criteria:**

**Given** the service page layout from Story 2.2
**When** a visitor navigates to `/equitation-adulte`
**Then** the hero displays age-appropriate imagery of adults riding in a relaxed setting
**And** the promise section emphasizes "Pas de jugement, pas de pression. Votre rythme, vos objectifs." (FR18)
**And** the planning block shows evening and weekend sessions for adults (FR4)
**And** the pricing table shows adult formulas (FR3)
**And** a testimonial from an adult beginner provides "permission" social proof (FR16)
**And** the WhatsApp pre-filled message is: "Bonjour, je suis interesse(e) par les cours adultes..."
**And** the page targets "equitation adulte debutant Cotes-d'Armor" for SEO (FR30)

### Story 2.5: Horse Boarding Page (Claire)

As a **horse owner (Claire)**,
I want **a dedicated boarding page with facility details, inclusions checklist, welfare proof, and transparent pricing**,
So that **I can evaluate if my horse will be well cared for and compare value with my current facility**.

**Acceptance Criteria:**

**Given** the service page layout from Story 2.2
**When** a visitor navigates to `/pension-chevaux`
**Then** the hero displays well-maintained facility photos
**And** the content includes a detailed "what's included" checklist: cleaning frequency, feed details, paddock access, vet protocol, farrier coordination (FR19)
**And** animal welfare standards are evidenced with concrete details (matelas de box, foin a volonte, osteopathe)
**And** the pricing table shows boarding formulas (box, paddock, pre) with all inclusions transparent — no asterisks (FR3)
**And** a testimonial from a horse owner provides trust proof (FR16)
**And** the WhatsApp pre-filled message is: "Bonjour, je suis interesse(e) par la pension chevaux..."
**And** the page targets "pension chevaux Saint-Brieuc" for SEO (FR30)

### Story 2.6: Holiday Camps Page

As a **parent**,
I want **a dedicated holiday camps page with dates, age groups, activities, and pricing**,
So that **I can plan my child's school holiday activities and register for camps**.

**Acceptance Criteria:**

**Given** the service page layout from Story 2.2
**When** a visitor navigates to `/stages-vacances`
**Then** the hero displays a group photo of children during a camp
**And** the content describes camp activities, daily schedule, and what to bring
**And** dates use seasonal labels ("Vacances Toussaint 2026") — never absolute dates that age poorly
**And** build-time logic shows "Prochain stage a venir" for past dates
**And** the pricing table shows camp formulas by duration (FR3)
**And** the WhatsApp pre-filled message is contextual for camps
**And** the page targets "stage equitation vacances Cotes-d'Armor" for SEO (FR30)

### Story 2.7: Competitions Page

As a **rider**,
I want **a dedicated competitions page with the center's competition program and results**,
So that **I can see the competition culture and plan my participation**.

**Acceptance Criteria:**

**Given** the service page layout from Story 2.2
**When** a visitor navigates to `/competitions`
**Then** the hero displays competition action photos
**And** the content describes the disciplines (CSO, hunter, etc.) and competition philosophy
**And** upcoming competition dates are listed (with build-time freshness handling)
**And** the pricing table shows competition-related costs if applicable (FR3)
**And** the WhatsApp pre-filled message is contextual for competitions
**And** the page targets "competition equitation Cotes-d'Armor" for SEO (FR30)

### Story 2.8: Global Pricing Page

As a **visitor**,
I want **a single page consolidating all pricing across all services**,
So that **I can compare formulas and understand the full cost without navigating between pages** (FR3).

**Acceptance Criteria:**

**Given** the service pages exist from Stories 2.3-2.7
**When** a visitor navigates to `/tarifs`
**Then** the page displays all pricing tables organized by service category (lessons, boarding, camps, competitions)
**And** each section links to the detailed service page for more information
**And** license and federation fees are clearly mentioned
**And** family/multi-enrollment reductions are highlighted
**And** the page is accessible from the main navigation menu
**And** the page targets "tarifs equitation Yffiniac" for SEO (FR30)

## Epic 3: Homepage & Profile Routing

Visitors land on a homepage that immediately orients them to their need via profile routing ("Mon enfant / Je suis adulte / Proprietaire") and service cards, plus a fresh news section.

### Story 3.1: Homepage Hero & Profile Routing

As a **visitor**,
I want **to land on a homepage that immediately shows me how to find what I need via profile-based routing**,
So that **I reach the right service page in one tap without guessing the menu structure** (FR1).

**Acceptance Criteria:**

**Given** the BaseLayout and service pages from Epics 1-2 exist
**When** a visitor navigates to `/` (homepage)
**Then** the hero displays a warm, authentic photo of the center with an emotional tagline
**And** `Hero.astro` (homepage variant) includes `ProfileRouting.astro` with 3 buttons: "Mon enfant veut monter a cheval", "Je suis adulte", "Je cherche une pension"
**And** tapping "Mon enfant" navigates to `/cours-enfants`
**And** tapping "Je suis adulte" navigates to `/equitation-adulte`
**And** tapping "Je cherche une pension" navigates to `/pension-chevaux`
**And** each button has a descriptive `aria-label`
**And** buttons are touch-friendly (44px minimum) and visually prominent
**And** the hero uses `<Picture>` with optimized formats

### Story 3.2: Service Cards Grid on Homepage

As a **visitor**,
I want **to see all available services as visual cards on the homepage**,
So that **I can discover the full range of offerings and navigate to any service**.

**Acceptance Criteria:**

**Given** the homepage hero from Story 3.1
**When** a visitor scrolls past the hero section
**Then** a grid of `ServiceCard.astro` components is displayed for each service (children's lessons, adult riding, boarding, camps, competitions)
**And** each card shows: image (ratio 3:2 via `<Image>`), title (max 25 chars), starting price ("Des XX€/unite"), and short description (max 60 chars)
**And** tapping a card navigates to the corresponding service page
**And** the entire card is a clickable link with focus visible on keyboard navigation
**And** on mobile: cards are stacked (1 column) with lateral image layout
**And** on desktop: cards are in a responsive grid (2-3 columns)
**And** hover on desktop adds a subtle shadow + translateY effect

### Story 3.3: Homepage News Section with Freshness Logic

As a **visitor**,
I want **to see recent news and upcoming events on the homepage**,
So that **I know the center is active and can discover seasonal opportunities** (FR10).

**Acceptance Criteria:**

**Given** the homepage with hero and service cards
**When** the site is built and recent news items exist (date < 3 months old) in `src/content/news/`
**Then** a "Actualites" section displays the 2-3 most recent news items with title, date (seasonal format), and excerpt
**And** each news item links to its full content or relevant page
**When** no news items are recent (all dates > 3 months old)
**Then** the news section is not rendered at all (no empty state, no stale content)
**And** a `news` Content Collection is defined in `config.ts` with Zod schema (title, date, content body)
**And** the date filtering logic runs at build time — no client-side JavaScript

## Epic 4: Contact, Forms & Conversion

Visitors can submit a contextual contact form adapted to their service or event type, and the center manager receives immediate notification. Includes the dedicated contact page.

### Story 4.1: Contact Form Component with Web3Forms Integration

As a **visitor**,
I want **to submit a contact inquiry via a form that adapts to the context of the page I'm on**,
So that **the center receives my question with the right context and can respond quickly** (FR13, FR14).

**Acceptance Criteria:**

**Given** any page with a contact form section
**When** a visitor fills out the `ContactForm.astro` component
**Then** the form variant is determined by a `variant` prop: "generic" (default), "cours", "pension", "evenement"
**And** the "generic" variant has fields: Prenom*, Telephone*, Message
**And** the "cours" variant adds: Age de l'enfant (optional)
**And** the "pension" variant adds: Type d'equide (select: poney/cheval) (optional)
**And** the "evenement" variant adds: Type (select)*, Date souhaitee*, Nb participants*
**And** all required fields are marked with asterisk (*) with "* Obligatoire" mention at the top
**And** labels are always above the field (never placeholder-only)
**And** validation runs on blur: field border turns green (valid) or red (invalid) when the visitor leaves the field
**And** error messages appear below the field in human-friendly French (e.g., "Merci d'indiquer votre numero de telephone pour qu'on puisse vous rappeler.")
**And** a hidden honeypot field (`display:none`) is included for spam protection (NFR9)
**And** form POSTs to Web3Forms endpoint with the access key from environment variable
**And** on successful submission, an inline success message displays: "Merci ! On vous rappelle dans les 24h."
**And** the center manager receives an email notification immediately (FR14)
**And** no user data is stored server-side beyond forwarding (NFR10)
**And** all form inputs have associated `<label>` elements and `aria-describedby` for errors (FR33)
**And** the form is fully navigable via keyboard

### Story 4.2: Dedicated Contact Page

As a **visitor**,
I want **a dedicated contact page with the generic form, phone, WhatsApp, address, and opening hours**,
So that **I have a single place to find all ways to reach the center**.

**Acceptance Criteria:**

**Given** the ContactForm component from Story 4.1
**When** a visitor navigates to `/contact`
**Then** the page displays the center's phone number, WhatsApp link, email, and physical address from `business.ts`
**And** opening hours are displayed
**And** a generic contact form (variant "generic") is available
**And** the phone number and WhatsApp link are clickable (`tel:` and `wa.me` URLs)
**And** the page is accessible from the main navigation menu and the navbar CTA
**And** the page has unique seoTitle and seoDescription (FR30)
**And** the page uses the BaseLayout with all SEO infrastructure

## Epic 5: About, Trust & Visual Content

Visitors can discover the center, its values, its instructors, browse the structured photo gallery, and be reassured by transparency and animal welfare proof. Includes the About page and optimized image pipeline.

### Story 5.1: About Page — Center, Values & Instructors

As a **visitor**,
I want **to read about the center's history, pedagogical approach, and meet the instructors**,
So that **I feel the warmth and professionalism of the team before visiting** (FR6, FR7).

**Acceptance Criteria:**

**Given** the BaseLayout from Epic 1
**When** a visitor navigates to `/a-propos`
**Then** the page contains a section about the center's history, location, and values (FR6)
**And** the pedagogical approach is described: caring, no-judgment, progressive, respect for the horse
**And** instructor profiles are displayed with: photo (via `<Image>`), first name, personality description, teaching philosophy, and qualifications (FR7)
**And** the tone is warm and personal — "montrer, pas declarer" (show, don't tell)
**And** facility highlights are mentioned with photos (arenas, paddocks, trails, Breton landscape)
**And** the page uses semantic HTML (`<article>`, `<section>`)
**And** the page has unique seoTitle and seoDescription targeting "centre equestre Yffiniac" (FR30)
**And** the page is accessible from the main navigation

### Story 5.2: Structured Photo Gallery

As a **visitor (especially Claire)**,
I want **to browse a structured photo gallery organized by facility zone**,
So that **I can see the quality of installations, the environment, and the horse welfare conditions** (FR21, FR22).

**Acceptance Criteria:**

**Given** the About page from Story 5.1
**When** a visitor views the gallery section (on `/a-propos` or a dedicated section)
**Then** photos are organized by zone: arenas, boxes, paddocks, trails, environment
**And** all images are served via Astro `<Picture>` in WebP/AVIF with responsive srcset (FR23)
**And** images load progressively with `loading="lazy"` native attribute (FR24)
**And** each image has a solid beige placeholder matching the final image ratio to prevent CLS (NFR4)
**And** all content images have descriptive `alt` text in French (FR32)
**And** decorative images are marked with `aria-hidden="true"`
**And** photos represent multiple seasons and authentic center life — not stock photos (FR22)
**And** on mobile: single-column layout with full-width images
**And** on desktop: grid layout (2-3 columns)

### Story 5.3: Google Reviews Display

As a **visitor**,
I want **to see Google review ratings displayed on the site**,
So that **I have third-party social proof that reinforces trust** (FR20).

**Acceptance Criteria:**

**Given** the site has service pages and the About page
**When** a visitor views strategic locations on the site (homepage, about page, service pages)
**Then** the center's Google review rating is displayed (star rating + number of reviews)
**And** the display links to the Google Business Profile for full reviews
**And** the rating data is defined in `business.ts` (manually updated) — no runtime API call
**And** the display is a simple, non-intrusive badge (e.g., "4.7 stars — 25 avis Google")
**And** the rating is not the sole vector of trust — always accompanied by context

## Epic 6: Blog & SEO Content

Visitors discover the center via long-tail SEO blog articles (e.g., "Reprendre l'equitation a 40 ans") and event pages, capturing organic traffic on untapped niches.

### Story 6.1: Blog Infrastructure & Article Template

As a **developer**,
I want **a blog Content Collection with listing page and dynamic article pages**,
So that **long-tail SEO articles can be published and indexed to capture organic traffic** (FR8).

**Acceptance Criteria:**

**Given** the Astro project with Content Collections from Epic 2
**When** the developer creates the blog infrastructure
**Then** a `blog` collection is defined in `config.ts` with Zod schema: title, date (ISO 8601), tags (array), seoTitle, seoDescription, ogImage (optional), excerpt
**And** `src/pages/blog/index.astro` lists all blog articles sorted by date (newest first) with title, date (seasonal French format), excerpt, and read-more link
**And** `src/pages/blog/[...slug].astro` renders individual blog articles from the collection
**And** each article page uses `BaseLayout.astro` with unique SEO meta tags, Open Graph, and schema markup
**And** each article includes a `Breadcrumb.astro` component (Accueil > Blog > Article title)
**And** each article ends with a CTA section inviting the visitor to contact the center or explore relevant service pages
**And** the blog index is accessible from the main navigation or footer
**And** URLs follow the pattern `/blog/{slug}` in kebab-case (NFR27)

### Story 6.2: Launch Blog Articles

As a **visitor searching Google**,
I want **to find helpful articles about horseback riding that lead me to discover the center**,
So that **I get useful information and can decide to try riding at Equi 22**.

**Acceptance Criteria:**

**Given** the blog infrastructure from Story 6.1
**When** the site launches
**Then** at least 2 launch articles exist in `src/content/blog/`:
**And** Article 1: "Reprendre l'equitation a 40 ans" — targets Marc's query, warm and encouraging tone, links to `/equitation-adulte`
**And** Article 2: "Premier cours d'equitation pour enfant : ce qu'il faut savoir" — targets Sophie's research query, reassurance-first, links to `/cours-enfants`
**And** each article has proper frontmatter (title, date, tags, SEO meta, excerpt)
**And** each article body is written in French with a warm, accessible tone — no jargon
**And** articles are indexed in the sitemap

### Story 6.3: Event Blog Articles (Conditional MVP)

As a **visitor searching for events**,
I want **to find dedicated pages for pony birthdays, school trips, and team-building**,
So that **I understand the offering, the price, and how to book** (FR9).

**Acceptance Criteria:**

**Given** the blog infrastructure from Story 6.1
**When** event articles are published
**Then** each event type (anniversaire poney, sortie scolaire, team-building) has its own blog article
**And** each article answers three questions: "C'est quoi ?", "Combien ?", "Comment reserver ?"
**And** each article includes group photos, per-event pricing, and practical info (age, duration, access)
**And** each article includes a contextual CTA with `ContactForm.astro` (variant "evenement") or WhatsApp link with pre-filled event context
**And** articles target long-tail SEO queries ("anniversaire poney Cotes-d'Armor", "sortie scolaire equestre Bretagne")
**And** this story is **conditional MVP** — implemented only if time permits, first to cut if time-constrained

## Epic 7: Legal, Analytics & Production Readiness

The site is RGPD-compliant, measures traffic, meets accessibility standards, and is production-ready with all validations, legal pages, and off-site SEO actions completed.

### Story 7.1: Legal Pages (Mentions Légales & Privacy Policy)

As a **visitor**,
I want **to access legal information and understand how my data is handled**,
So that **the site complies with French law and RGPD, and I can trust the center with my information** (NFR20, NFR21).

**Acceptance Criteria:**

**Given** the BaseLayout from Epic 1
**When** a visitor navigates to `/mentions-legales`
**Then** the page displays: site editor identity, hosting provider (Cloudflare), CNIL reference, intellectual property notice (NFR20)
**When** a visitor navigates to `/politique-confidentialite`
**Then** the page details: data collected via forms (name, phone, message), analytics data (Umami cookieless — anonymized page views), processing purpose, retention period, user rights (access, rectification, deletion), contact for exercising rights (NFR21)
**And** the privacy policy mentions that Umami Cloud is cookieless and no consent banner is required (NFR14)
**And** both pages are linked from the footer on every page
**And** both pages use semantic HTML and the BaseLayout with proper SEO meta tags
**And** content is written in French in clear, non-legal jargon

### Story 7.2: Analytics Integration (Umami Cloud)

As a **center manager**,
I want **to measure site traffic and page views without requiring cookie consent**,
So that **I can track which pages convert visitors and make data-driven decisions**.

**Acceptance Criteria:**

**Given** the BaseLayout from Epic 1
**When** any page is loaded by a visitor
**Then** the Umami Cloud tracking script is loaded asynchronously in the `<head>` via `BaseLayout.astro`
**And** the tracking ID is read from an environment variable (`UMAMI_ID`)
**And** the script is non-blocking (async attribute) — no impact on LCP or FID (NFR2, NFR3, NFR6)
**And** tracking is cookieless and RGPD-compliant without consent banner (NFR14)
**And** page views are recorded anonymously
**And** the `.env.example` file documents the `UMAMI_ID` variable

### Story 7.3: Custom 404 Page

As a **visitor who lands on a broken or non-existent URL**,
I want **a warm, helpful 404 page that guides me back to useful content**,
So that **I never feel lost and always have a clear path forward**.

**Acceptance Criteria:**

**Given** the BaseLayout and service pages exist
**When** a visitor navigates to a non-existent URL
**Then** a custom `404.astro` page is displayed with a warm, non-technical message in French (e.g., "Oups, ce chemin ne mene nulle part ! Mais on peut vous aider :")
**And** the page suggests links to popular service pages (cours enfants, equitation adulte, pension, tarifs)
**And** the sticky contact bar remains visible (phone + WhatsApp)
**And** the page uses the BaseLayout with navbar and footer
**And** the tone is reassuring and helpful — never technical ("Error 404" is forbidden)

### Story 7.4: Accessibility Compliance & Cross-Cutting Standards

As a **visitor with accessibility needs**,
I want **the entire site to meet WCAG 2.1 AA standards**,
So that **I can navigate and use the site regardless of ability** (FR31-FR36).

**Acceptance Criteria:**

**Given** all site pages and components are built
**When** an accessibility audit is performed across the site
**Then** all content is navigable via keyboard with visible focus indicators (outline) on every interactive element (FR31)
**And** all content images have descriptive `alt` text; decorative images are marked `aria-hidden="true"` (FR32)
**And** all form inputs have associated `<label>` elements with descriptive error messages linked via `aria-describedby` (FR33)
**And** all text/background color combinations meet WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text) (FR34)
**And** all animations respect `prefers-reduced-motion` media query (FR35)
**And** all interactive elements have minimum 44px tap targets on mobile (FR36)
**And** all text is readable at 200% browser zoom without horizontal scrolling (NFR19)
**And** semantic HTML is used throughout: `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`

### Story 7.5: Build Validation & CI/CD Pipeline

As a **developer**,
I want **automated build validation and a single-command deployment pipeline**,
So that **I can deploy with confidence and catch errors before they reach production** (FR37, FR38).

**Acceptance Criteria:**

**Given** the complete Astro project
**When** the developer pushes to `main` branch
**Then** Cloudflare Pages triggers an automatic build using `npm run build`
**And** `astro check` runs as part of the build — TypeScript and Zod validation errors fail the build
**And** a post-build broken link checker script validates all internal links (NFR26)
**And** the build completes in under 30 seconds (NFR28)
**And** the deployment from push to live is under 2 minutes (NFR29)
**And** preview deploys are automatically created on pull request branches
**And** environment variables (WEB3FORMS_KEY, UMAMI_ID, SITE_URL) are configured in the Cloudflare dashboard
**And** the full content update cycle (edit Markdown → commit → push → live) takes under 5 minutes (FR37, NFR30)
**And** `.env.example` documents all required environment variables

### Story 7.6: Off-Site SEO Actions (GBP & Directories)

As a **center manager**,
I want **the Google Business Profile optimized and the center registered on relevant directories**,
So that **the center appears in the Google local pack and has consistent NAP across the web** (FR28, FR29).

**Acceptance Criteria:**

**Given** the site is deployed and live
**When** pre-launch and launch SEO actions are executed
**Then** the Google Business Profile is created/optimized with: accurate business name, address, phone (consistent with `business.ts`), business hours, categories (equestrian center), services list, photos of the center, and service descriptions (FR28)
**And** reviews are solicited from existing clients (target: 10-15 initial reviews)
**And** the center is registered on relevant directories: Pages Jaunes, FFE (Federation Francaise d'Equitation), local tourism offices, with consistent NAP data (FR29)
**And** all NAP data across GBP, directories, and the website is identical
**And** this story documents the checklist of off-site actions — actual execution is done manually by the center manager and developer
