---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
workflow_completed: true
completedAt: 2026-02-13
inputDocuments:
  - product-brief-equi-22-2026-02-13.md
  - brainstorming-session-2026-02-12.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 1
  projectDocs: 0
workflowType: 'prd'
classification:
  projectType: static-website
  domain: local-business-equestrian
  complexity: low-to-moderate
  projectContext: greenfield
---

# Product Requirements Document - equi-22

**Author:** Aurélien
**Date:** 2026-02-13

## Executive Summary

A performant, mobile-first static website for an equestrian center in Yffiniac (Côtes-d'Armor, Brittany), designed to capture local search traffic and convert it into new riders via phone and WhatsApp.

**Problem:** The center's current website is outdated, not mobile-friendly, and invisible on search engines. Client acquisition relies on word-of-mouth and social media — channels that cannot offset the natural turnover of teenage riders leaving the sport. Competitors in the Saint-Brieuc/Lamballe area are digitally weak, creating a clear window of opportunity.

**Solution:** A pure static SSG website on free CDN hosting, paired with a Google Business Profile-first local SEO strategy. The site features service-specific pages with transparent pricing and schedules, a hybrid profile/service navigation, and zero-friction contact (sticky phone + floating WhatsApp on every page).

**Key Differentiators:**
- Multi-discipline offering (including Hunter and ethology) — rare in the region, powerful SEO net
- Caring pedagogy — welcoming, no-judgment approach that appeals to parents and adult beginners
- Strategic location — covering the Saint-Brieuc and Lamballe catchment area
- First-mover advantage — competitors are digitally weak; local SEO leadership now creates a durable moat

**Target Users:**
- **Sophie (parent):** Searching for riding lessons for her children — needs pricing, schedule, reassurance
- **Marc (adult):** Discovering or rediscovering riding — needs "no judgment" messaging and age-appropriate content
- **Claire (horse owner):** Seeking boarding — needs facility details, inclusion checklist, welfare proof
- **Unexpected visitors:** Parents seeking pony birthdays, teachers seeking school trips, HR managers seeking team-building
- **Center manager (V2):** Updates pricing, schedules, and news via constrained CMS

## Success Criteria

### User Success

- **Instant clarity:** Visitors find pricing, schedules, and contact details within seconds of landing on any page
- **Holistic reassurance:** Each persona encounters transparent pricing, positive reviews, welcoming photos, and tailored messaging that collectively trigger action
- **Zero-friction contact:** Sticky phone button and floating WhatsApp accessible from every page — one tap from decision to contact
- **Persona-specific conversion triggers:**
  - Sophie: Structured programs, clear pricing, happy children photos, strong reviews → calls
  - Marc: "No judgment" messaging, adults having fun, relaxed atmosphere → calls
  - Claire: Facility photos, boarding inclusions checklist, welfare proof → schedules visit
- **Return value:** Existing clients use the site for schedules, news, competition calendars, and program updates

### Business Success

| Timeframe | Objective | Target |
|-----------|-----------|--------|
| Pre-launch (Month 0) | Google Business Profile optimized, reviews collected, directory registrations | GBP live, 10-15 reviews solicited |
| Months 1-3 | Site indexed, appearing in local pack, first organic contacts | First inbound calls/WhatsApp from website |
| Rentrée (September) | Replace natural client turnover with web-acquired new riders | **Minimum 10 new clients** attributed to web |
| School holidays (each period) | Fill camp/stage capacity through organic search | **Minimum 30 camp registrations** per holiday period |
| Months 6-12 | SEO leadership on key local queries | Top 3 on primary keywords |

### Technical Success

- **Performance:** Lighthouse 90+ on all 4 metrics (mobile), < 2s page load
- **Reliability:** Static architecture — no server downtime, no database crashes, no plugin conflicts
- **Maintainability:** Content update and redeployment in under 5 minutes, single-command deploy, Git-based workflow
- **Cost efficiency:** Hosting at or near zero (free CDN tier), no recurring plugin/license fees
- **Developer experience:** Clean SSG codebase, no dependency bloat, predictable builds

### Measurable Outcomes

| KPI | Measurement | Target |
|-----|-------------|--------|
| Inbound contacts | Phone + WhatsApp attributed to website | Growing month-over-month, 10+ new clients at rentrée |
| Google search rankings | Position on target keywords | Top 3 on primary keywords within 6-12 months |
| Google Maps local pack | Presence in 3-pack for equestrian queries | Consistent presence within 3 months |
| Camp/stage registrations | Holiday period bookings via web | 30+ per school holiday period |
| Google reviews | Number and average rating | 20+ reviews, 4.5+ stars within 6 months |
| Lighthouse scores | Performance, accessibility, SEO, best practices (mobile) | 90+ on all 4 metrics |
| Hosting cost | Monthly hosting bill | < 5 EUR/month |

## User Journeys

### Journey 1: Sophie — "Is this the right place for my daughter?" (Primary - Success Path)

**Opening Scene:** Sunday evening, late August. Sophie, 38, scrolls her phone in Saint-Brieuc. Her 8-year-old daughter Léa wants riding lessons. School starts in two weeks. She types "cours équitation Saint-Brieuc" into Google.

**Rising Action:** The center appears in the Google Maps local pack — 4.7 stars, 23 reviews. She taps through. On mobile: a warm photo of children on ponies, a clear "Cours enfants" link, a sticky phone button. She taps "Cours enfants" and finds the weekly schedule by age group, progression pathway, and pricing — all visible without endless scrolling. Two parent testimonials. WhatsApp button.

**Climax:** Sophie screenshots the schedule to check against school hours. Everything fits. Clear pricing, no hidden fees. She taps WhatsApp: "Bonjour, ma fille de 8 ans aimerait commencer l'équitation, est-ce qu'il reste des places pour la rentrée ?"

**Resolution:** The manager responds within the hour. Trial lesson booked. Two weeks later, Léa rides. Sophie plans the Toussaint holiday camp.

**Requirements revealed:** Mobile-first layout, sticky phone/WhatsApp, schedule per age group, visible pricing, testimonials, fast mobile load.

### Journey 2: Sophie — "I can't figure this out" (Primary - Failure Path)

**Opening Scene:** Same Sophie, same evening. The page loads slowly on 4G. Menu is confusing — no clear path to children's lessons.

**Rising Action:** Generic "Activities" page, no schedule or pricing. Phone number buried three taps deep. She doubts: "If the website is this disorganized, what's the center like?"

**Climax:** Back button. Next Google result — a competitor in Lamballe.

**What we prevent:** Every design decision must make Journey 1 happen and Journey 2 impossible. Failure triggers: slow load, unclear navigation, hidden contact, missing schedule/pricing.

**Requirements revealed:** Performance < 2s, service-specific navigation, contact on every page, pricing and schedule never hidden.

### Journey 3: Marc — "Am I too old for this?" (Primary - Success Path)

**Opening Scene:** Marc, 47, just moved to Yffiniac. Rode as a teenager, hasn't touched a horse in 25 years. A colleague rides on weekends. That evening: "équitation adulte débutant Côtes-d'Armor."

**Rising Action:** Blog article: "Reprendre l'équitation à 40 ans." Warm, no-judgment tone. Adult riding page shows men and women his age laughing in a relaxed setting. "Pas de jugement, pas de pression. Votre rythme, vos objectifs."

**Climax:** Testimonial from a 52-year-old beginner. "If he can do it, so can I." Clear pricing, weekend sessions, phone number right there.

**Resolution:** Marc calls Monday. Books Saturday. Three months later, he's a regular in the adult group rides.

**Requirements revealed:** Blog/SEO for adult beginners, adult-specific page with age-appropriate imagery, reassurance-first tone, weekend schedule, adult testimonials.

### Journey 4: Claire — "Will my horse be well cared for?" (Primary - Success Path)

**Opening Scene:** Claire, 35, experienced rider, two horses boarded in Lamballe. Unhappy — poor maintenance, erratic paddock rotation, suspected cost-cutting. Googles "pension chevaux Saint-Brieuc."

**Rising Action:** Boarding page: structured gallery (boxes, paddocks, arenas, trails). "What's included" checklist: cleaning frequency, feed details, paddock access, vet protocol, farrier coordination. Transparent pricing, no asterisks.

**Climax:** Well-maintained facilities, animal welfare standards, beautiful Breton trails. Better value than current facility. She calls to schedule a visit.

**Resolution:** Both horses transferred. She joins the competition team as a bonus.

**Requirements revealed:** Boarding page with facility gallery, inclusion checklist, pricing transparency, welfare evidence, trail/environment showcase.

### Journey 5: Unexpected visitors — "Birthday, school trip, team-building" (Edge Case - Opportunity)

**Opening Scene:** A parent Googles "anniversaire poney Côtes-d'Armor." A teacher searches "sortie scolaire ferme équestre Bretagne." An HR manager looks for "team building original Saint-Brieuc."

**Rising Action:** Each finds a blog article answering three questions: What is it? How much? How do I book? Group photos, clear pricing, contact form pre-filled with event type.

**Climax:** This is a real, structured offering — not an afterthought.

**Resolution:** One-off events become a secondary revenue stream and gateway to regular enrollment.

**Requirements revealed:** Event-type blog posts (SEO long-tail), event-specific contact forms, group photos, per-event pricing.

### Journey 6: Center manager — "I need to update the site" (Secondary - Admin)

**V1:** Manager messages Aurélien. He updates Markdown, commits, deploys. Site updated in under 5 minutes.

**V2 (CMS):** Manager opens CMS. Constrained template: camp name, dates, age range, price, description. Can't break layout. Updates, previews, publishes in 3 minutes. Shares page link on Facebook.

**Requirements revealed:** V1: fast developer-managed updates. V2: constrained CMS with guardrails. Both: content freshness as SEO signal.

### Journey Requirements Summary

| Capability | Revealed By | Priority |
|------------|-------------|----------|
| Mobile-first responsive design | Sophie success + failure | MVP |
| Sticky phone + floating WhatsApp on all pages | Sophie, Marc, Claire | MVP |
| Service-specific pages with pricing + schedule | Sophie, Marc, Claire | MVP |
| Reassurance content per persona | Sophie, Marc, Claire | MVP |
| Testimonials/social proof | Sophie, Marc | MVP |
| Facility gallery (structured by zone) | Claire | MVP |
| Blog/SEO content for long-tail queries | Marc, unexpected visitors | MVP |
| Event-specific blog articles | Unexpected visitors | Conditional MVP |
| Performance < 2s load | Sophie failure path | MVP |
| Contextual contact forms | Unexpected visitors, Claire | MVP |
| Schema markup for services and events | All journeys (SEO) | MVP |
| Constrained CMS for manager | Manager journey | V2 |

## Static Website Specific Requirements

### Architecture

**Pipeline:** SSG framework → Build step → HTML/CSS/JS → CDN deployment

- Pure MPA: each URL = one pre-built HTML file
- No server-side runtime, no database at runtime
- Build-time data: pricing, schedules, and content baked into HTML at build
- Progressive enhancement: vanilla JS for micro-interactions (form validation, mobile menu, image lightbox)
- No SPA framework unless SSG-native islands architecture (e.g., Astro islands) for isolated components

**Browser Support:**
- Last 2 versions of Chrome, Safari, Firefox, Edge
- No IE11, no legacy polyfills
- Modern CSS: Grid, Flexbox, custom properties, container queries
- Native HTML preferred: `<details>`, `<dialog>`, `loading="lazy"`

### SEO Strategy

- **Local SEO first:** Google Business Profile optimization as priority zero (pre-launch)
- **Page architecture:** Service-specific pages with keyword-optimized URLs (e.g., "cours-equitation-yffiniac", "pension-chevaux-saint-brieuc")
- **Schema markup:** LocalBusiness + Service structured data on every page
- **Technical SEO:** Sitemap.xml, robots.txt, canonical URLs, Open Graph + Twitter Card meta tags
- **Content SEO:** Blog structure for long-tail articles, one article per month minimum
- **Backlink strategy:** Directory registrations (Pages Jaunes, FFE, tourism offices), local partnerships

### Responsive Design

- **Mobile-first:** All layouts designed for mobile viewport first, desktop as progressive enhancement
- **Breakpoints:** Mobile (< 768px) → Tablet (768-1024px) → Desktop (> 1024px)
- **Touch-friendly:** Minimum 44px tap targets, sticky phone and WhatsApp sized for thumb reach
- **Images:** Responsive srcset with WebP/AVIF, art direction via `<picture>` where needed

### Implementation Considerations

- **Framework selection:** Astro, Hugo, or 11ty — final choice during architecture phase
- **Content format:** Markdown files with YAML frontmatter, Git-versioned
- **Build pipeline:** Git push → CI build → CDN deploy (single-command)
- **Image pipeline:** Automated optimization at build time (resize, format conversion, srcset generation)
- **Hosting:** Free CDN tier (Cloudflare Pages, Netlify, Vercel) — zero or near-zero monthly cost
- **No runtime dependencies:** No server, no database, no external API calls at page load

## Project Scoping & Phased Development

### MVP Strategy

**Approach:** Problem-solving MVP — eliminate digital invisibility and create a direct acquisition channel through organic search.

**Resource reality:** Solo developer (Aurélien), content authored from existing old website. No external copywriter, no designer.

**Guiding principle:** Ship the smallest site that ranks locally and converts visitors into phone calls. Every page must rank for a query or support conversion.

### MVP Feature Set (Phase 1)

**Journeys supported:** Sophie (fully), Marc (fully), Claire (fully), unexpected visitors (conditional via blog), manager (V1 mode: Aurélien manages updates).

| Page/Feature | Justification | Content Source |
|-------------|---------------|----------------|
| Homepage with hybrid navigation | Entry point + profile routing | New content |
| Cours enfants (children's lessons) | Primary acquisition — Sophie | Old site + rewrite |
| Équitation adulte (adult riding) | Underserved niche — Marc | New content |
| Pension chevaux (horse boarding) | High-value service — Claire | Old site + rewrite |
| Stages vacances (holiday camps) | Seasonal driver — 30 registrations target | Old site + rewrite |
| Compétitions | Existing riders + recruitment | Old site + rewrite |
| Tarifs (global pricing) | Transparency = trust = conversion | Old site data |
| À propos (about + instructors + facilities) | Reassurance + personality profiles | New content + photos |
| Contact | Phone, WhatsApp, contextual form | New content |
| Mentions légales + politique de confidentialité | Legal compliance (RGPD) | New content |
| Blog (structure + 1-2 launch articles) | SEO long-tail foundation | New content |
| Sticky phone + floating WhatsApp | Zero-friction contact | Component |
| Schema markup (LocalBusiness + Service) | Local SEO infrastructure | Technical |
| Sitemap, robots.txt, Open Graph, meta tags | Technical SEO baseline | Technical |
| Analytics integration | Traffic measurement | Technical |
| Google Business Profile optimization | Priority zero — pre-launch | Off-site |
| Directory registrations | Backlinks (Pages Jaunes, FFE, tourism) | Off-site |

**Conditional MVP (if time permits):**

| Page/Feature | Justification |
|-------------|---------------|
| Event blog articles (birthdays, school trips, team-building, ethology) | SEO long-tail — first to cut if time-constrained |

### Post-MVP Phases

**Phase 1.1 (Quick Follow-up):**
- Event blog articles if not completed in MVP
- Additional SEO blog content (1 article/month)
- Performance tuning based on real Lighthouse data

**Phase 2 (Growth — Client Autonomy):**
- Lightweight CMS (Tina/Decap/Keystatic) for center manager
- Localized service x city pages (Saint-Brieuc, Lamballe, Plérin, Langueux) — informed by Search Console data
- Constrained CMS templates to protect content quality
- Professional photo/video shooting, drone footage
- Social media feed integration (Instagram/Facebook)

**Phase 3 (Expansion):**
- Online booking/reservation system
- Tourism angle: "vacances à cheval en Bretagne"
- Member portal / client area
- Expanded SEO content for niche disciplines

### Risk Mitigation

**Technical Risks:**

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| SSG framework choice regret | Low | All candidates produce static HTML. Decision reversible with content in Markdown. |
| Hosting provider changes free tier | Low | Static files portable — move to any CDN in minutes. No lock-in. |
| Performance targets not met | Low | Static architecture inherently fast. Image pipeline optimizes at build time. |

**Market Risks:**

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| SEO takes longer than expected | Medium | GBP provides immediate local visibility. Directory registrations provide interim traffic. |
| Content quality insufficient to convert | Medium | Rewrite from proven existing content. Iterate based on contact rates. |
| Competitors improve digital presence | Low | First-mover + technical superiority creates durable moat. |

**Resource Risks:**

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Solo developer bandwidth | Medium | Lean MVP scope. Event pages conditional. No CMS in V1. |
| Center manager can't provide content/photos | Medium | Use old site + existing photos. Pro shooting deferred to V2. |
| Project stalls mid-development | Low | Partial site still deployable. 5 pages live > 0 pages. |

## Functional Requirements

### Content & Information Architecture

- FR1: Visitors can navigate via hybrid system: service-based menu + homepage visitor-profile routing ("I'm a parent / owner / rider")
- FR2: Visitors can access a dedicated page for each service (children's lessons, adult riding, horse boarding, holiday camps, competitions)
- FR3: Visitors can view pricing on a global pricing page and contextually on each service page
- FR4: Visitors can view the weekly schedule organized by age group and level on each service page
- FR5: Visitors can view the progression pathway (discovery to Galop levels) on lesson pages
- FR6: Visitors can read about the center's history, values, and pedagogical approach
- FR7: Visitors can view instructor profiles presented by personality and teaching philosophy
- FR8: Visitors can browse blog articles targeting long-tail SEO keywords
- FR9: (Conditional MVP) Visitors can access event information (birthdays, school trips, team-building, ethology) via blog articles
- FR10: Visitors can view up-to-date news, competition calendars, and seasonal program updates

### Contact & Conversion

- FR11: Visitors can initiate a phone call via a sticky button visible on every page
- FR12: Visitors can initiate a WhatsApp conversation via a floating button visible on every page
- FR13: Visitors can submit a contact inquiry via a contextual form adapted to the service or event type
- FR14: The center manager receives immediate notification on form submission
- FR15: Visitors can access contact options (phone, WhatsApp, form) within one tap from any page on mobile

### Trust & Reassurance

- FR16: Visitors can read testimonials and social proof relevant to their persona on each service page
- FR17: Parents can see reassurance content about safety, pedagogy, and welcoming atmosphere on children's pages
- FR18: Adult visitors can see "no judgment" messaging and age-appropriate imagery on adult riding pages
- FR19: Horse owners can view a detailed "what's included" checklist with boarding inclusions, welfare standards, and vet protocol
- FR20: Visitors can view Google review ratings displayed at strategic locations on the site

### Visual & Media

- FR21: Visitors can browse a structured photo gallery organized by facility zone (arenas, boxes, paddocks, trails)
- FR22: Visitors can view photos representing all seasons and authentic center life
- FR23: All images served in optimized formats (WebP/AVIF) with responsive sizing per device
- FR24: Images load progressively without blocking page rendering

### SEO & Discoverability

- FR25: Search engines can crawl and index every page via sitemap.xml and robots.txt
- FR26: Each page exposes LocalBusiness and Service structured data (schema markup)
- FR27: Each page includes Open Graph and Twitter Card meta tags for social sharing
- FR28: Google Business Profile is optimized with accurate business information, categories, photos, and services (pre-launch)
- FR29: The center is registered on relevant directories (Pages Jaunes, FFE, tourism offices) with consistent NAP data
- FR30: Each page has a unique, keyword-optimized title tag and meta description

### Accessibility & Usability

- FR31: All site content navigable via keyboard with visible focus indicators
- FR32: All content images have descriptive alt-text; decorative images marked appropriately
- FR33: All form inputs labelled with descriptive error messages and required field indicators
- FR34: Color contrast meets WCAG 2.1 AA minimum ratios (4.5:1 normal text, 3:1 large text)
- FR35: The site respects `prefers-reduced-motion` for any animations
- FR36: The site is fully usable on mobile with touch-friendly tap targets (minimum 44px)

### Content Management & Deployment

- FR37: The developer can update content, commit, and deploy within 5 minutes
- FR38: The site deploys via a single-command build-and-deploy pipeline
- FR39: Content authored in Markdown with YAML frontmatter, versioned in Git
- FR40: Image pipeline automatically optimizes at build time (resize, format conversion, srcset)
- FR41: The site can be hosted on a free CDN tier with zero or near-zero monthly cost
- FR42: (V2) The center manager can update pricing, schedules, news, and camp dates via a constrained CMS
- FR43: (V2) The CMS prevents layout or content quality degradation through template guardrails

## Non-Functional Requirements

### Performance

- NFR1: Lighthouse Performance score 90+ on mobile (3G throttled)
- NFR2: Largest Contentful Paint (LCP) < 1.5s on mobile
- NFR3: First Input Delay (FID) < 50ms
- NFR4: Cumulative Layout Shift (CLS) < 0.1
- NFR5: Total initial page weight < 500KB (HTML + CSS + critical JS + above-the-fold images)
- NFR6: No render-blocking JavaScript in the critical rendering path
- NFR7: All images served in next-gen formats (WebP/AVIF) with appropriate srcset

### Security & Privacy

- NFR8: All pages served over HTTPS with valid SSL certificate
- NFR9: Contact forms protected against spam via invisible mechanisms (honeypot, rate limiting) with zero visible friction
- NFR10: No user data stored server-side beyond form submission forwarding
- NFR11: Form submissions transmitted securely to the notification endpoint
- NFR12: RGPD-compliant privacy policy detailing data collection, processing purpose, retention, and user rights
- NFR13: If cookie-based analytics is used, RGPD-compliant consent banner displayed before any tracking cookie is set
- NFR14: If privacy-first analytics (cookieless) is chosen, no consent banner required but privacy policy mention mandatory

### Accessibility

- NFR15: Lighthouse Accessibility score 90+ on all pages
- NFR16: WCAG 2.1 Level AA compliance across all pages
- NFR17: Zero critical or serious violations in automated accessibility audit (axe-core)
- NFR18: All interactive elements reachable and operable via keyboard
- NFR19: All text readable at 200% browser zoom without horizontal scrolling

### Legal Compliance

- NFR20: Mentions légales page: site editor identity, hosting provider, CNIL reference, intellectual property notice
- NFR21: Privacy policy page: data collected via forms, analytics data, processing purpose, retention period, user rights (access, rectification, deletion)
- NFR22: Cookie consent mechanism compliant with CNIL guidelines (if cookie-based analytics selected)

### SEO Quality

- NFR23: Lighthouse SEO score 90+ on all pages
- NFR24: All pages pass Google's Mobile-Friendly Test
- NFR25: Structured data validates without errors via Google Rich Results Test
- NFR26: No broken internal links (validated at build time)
- NFR27: URLs follow SEO-friendly patterns: lowercase, hyphenated, descriptive, no special characters

### Maintainability

- NFR28: Full site build completes in under 30 seconds
- NFR29: Deployment from git push to live site in under 2 minutes
- NFR30: Content update cycle (edit → commit → deploy → live) in under 5 minutes
- NFR31: Zero runtime dependencies — deployed content remains live if build toolchain is unavailable
- NFR32: All content portable across SSG frameworks (Markdown + YAML frontmatter = framework-agnostic)
