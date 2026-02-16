# Story 1.4: Footer with Practical Information

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a footer with practical information, quick links, and contact details**,
So that **I can find essential information and navigate the site from the bottom of any page**.

## Acceptance Criteria

1. **AC-1: Footer component** — `src/components/Footer.astro` exists with a typed `interface Props` (if props are needed) and is integrated into `BaseLayout.astro` replacing the empty `<footer></footer>` placeholder.

2. **AC-2: Center identity** — The footer displays the center name ("Équi 22"), address, and phone number sourced from `business.ts` — never hardcoded.

3. **AC-3: Opening hours** — The opening hours from `business.openingHours` are displayed in a readable format (day range + hours).

4. **AC-4: Quick links** — Quick links to main service pages are available, sourced from `navigation.ts` or a curated subset of it.

5. **AC-5: Social media links** — Facebook and Instagram links from `business.social` are displayed with appropriate icons, open in new tabs with `rel="noopener"`, and have descriptive `aria-label` attributes.

6. **AC-6: Semantic HTML** — The footer uses a semantic `<footer>` element. Navigation sections within the footer use `<nav>` with appropriate `aria-label`.

7. **AC-7: Responsive layout** — The footer is stacked (single column) on mobile and multi-column on desktop (2-3 columns using daisyUI `footer` + `sm:footer-horizontal` or Tailwind grid/flex).

8. **AC-8: Legal page links** — Links to `/mentions-legales` and `/politique-confidentialite` are present in the footer (pages don't exist yet but links should be ready).

9. **AC-9: Phone link clickable** — The phone number is a clickable `tel:` link using the number from `business.ts`.

10. **AC-10: Accessibility** — All interactive elements (links, social icons) have visible focus indicators and meet 44px minimum tap targets on mobile.

11. **AC-11: Visual styling** — The footer uses the project's theme tokens: `bg-primary` or `bg-base-200`/`bg-base-300` background with appropriate text contrast. The styling is consistent with the overall "Terre & Mer de Bretagne" palette.

12. **AC-12: Build succeeds** — `npm run build` produces a successful build with zero TypeScript errors after adding the Footer component.

## Tasks / Subtasks

- [x] Task 1: Create Footer component (AC: #1, #6)
  - [x] Create `src/components/Footer.astro` with TypeScript strict
  - [x] Import `business` from `../data/business.ts`
  - [x] Import `mainMenu` (or curated subset) from `../data/navigation.ts`
  - [x] Use semantic `<footer>` element as root
  - [x] Wrap navigation link groups in `<nav aria-label="...">` elements

- [x] Task 2: Center identity section (AC: #2, #9)
  - [x] Display center name ("Équi 22") from `business.name`
  - [x] Display address: `business.address`, `business.postalCode` `business.city`
  - [x] Display phone as clickable `<a href="tel:${business.phone}">` link
  - [x] Display email as clickable `<a href="mailto:${business.email}">` link
  - [x] All data sourced from `business.ts` — never hardcoded

- [x] Task 3: Opening hours section (AC: #3)
  - [x] Iterate over `business.openingHours` array
  - [x] Display each entry as `days: hours` in a readable list format
  - [x] Use a section heading ("Horaires" or equivalent) styled with `footer-title` class

- [x] Task 4: Quick links section (AC: #4, #8)
  - [x] Render service links from `navigation.ts` (curated subset or full `mainMenu`)
  - [x] Add legal page links: `/mentions-legales` and `/politique-confidentialite`
  - [x] Style links with `link link-hover` daisyUI classes
  - [x] Use a section heading ("Liens rapides" or "Navigation") with `footer-title` class

- [x] Task 5: Social media links (AC: #5)
  - [x] Render Facebook link from `business.social.facebook`
  - [x] Render Instagram link from `business.social.instagram`
  - [x] Use inline SVG icons for Facebook and Instagram (no icon library dependency)
  - [x] Add `target="_blank"` and `rel="noopener"` on all social links
  - [x] Add descriptive `aria-label` on each link (e.g., "Suivez-nous sur Facebook")

- [x] Task 6: Responsive layout (AC: #7, #11)
  - [x] Use daisyUI `footer` class with `sm:footer-horizontal` for responsive columns
  - [x] Mobile: stacked single-column layout (default `footer` vertical behavior)
  - [x] Desktop: multi-column layout (identity + hours | quick links | social/legal)
  - [x] Apply background color: `bg-base-300` or `bg-primary text-primary-content` for visual distinction from page content
  - [x] Add appropriate padding (`p-10` or equivalent)

- [x] Task 7: Accessibility (AC: #10)
  - [x] Add `focus-visible:outline-2 focus-visible:outline-offset-2` on all interactive elements (matching Navbar pattern)
  - [x] Ensure all tap targets meet 44px minimum on mobile
  - [x] Ensure sufficient color contrast (WCAG AA) between text and footer background

- [x] Task 8: Integrate into BaseLayout (AC: #1)
  - [x] Import Footer in `src/layouts/BaseLayout.astro`
  - [x] Replace `<!-- Footer will be added in Story 1.4 -->` and empty `<footer></footer>` with `<Footer />` component
  - [x] Ensure footer renders after `</main>` and before the closing `</body>`

- [x] Task 9: Verify build (AC: #12)
  - [x] Run `npm run build` — confirm zero TypeScript errors
  - [x] Run `astro check` — confirm zero errors
  - [x] Verify footer renders correctly on dev server (mobile + desktop)

## Dev Notes

### Critical Technical Context

**⚠️ TAILWIND v4 + daisyUI v5 — Same warning as Stories 1.1, 1.2, and 1.3:**

This project uses **Tailwind v4 + daisyUI v5** with CSS-first configuration. The developer MUST follow the established patterns:
- CSS-first config via `@theme` directive in `global.css` (NOT `tailwind.config.mjs`)
- daisyUI v5 configured with `@plugin "daisyui"` in CSS
- Use daisyUI v5 class names (some changed from v4)

**⚠️ daisyUI v5 Footer component — CRITICAL LAYOUT CHANGE:**

daisyUI v5 changed the default footer layout orientation:
- **v4:** Footer was horizontal by default
- **v5:** Footer is now **vertical by default**

You MUST explicitly add `sm:footer-horizontal` (or `md:footer-horizontal`) to get multi-column layout on larger screens. Without this modifier, footer sections will stack vertically even on desktop.

**Recommended footer pattern for daisyUI v5:**

```astro
<footer class="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
  <nav>
    <h6 class="footer-title">Section Title</h6>
    <a class="link link-hover">Link 1</a>
    <a class="link link-hover">Link 2</a>
  </nav>
  <nav>
    <h6 class="footer-title">Another Section</h6>
    <a class="link link-hover">Link 3</a>
  </nav>
</footer>
```

**⚠️ Phone number — always from `business.ts`:**

Never hardcode phone numbers or addresses. The `business` object provides all NAP data:

```astro
---
import { business } from '../data/business';
---

<a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a>
```

Note: The `tel:` href should strip spaces from the phone number. `business.phone` is stored as `'+33 2 96 00 00 00'` — the display shows spaces, the `tel:` link strips them.

**⚠️ Social media icons — inline SVG, no icon library:**

Following the same approach as Navbar (hamburger/close icons), use inline SVGs for social icons. Do NOT add an icon library dependency (no Font Awesome, no Heroicons package).

**Facebook SVG:**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
</svg>
```

**Instagram SVG:**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
</svg>
```

**⚠️ Footer background color choice:**

Two valid approaches for visual distinction:
1. **Dark footer** — `bg-primary text-primary-content` (forest green `#2D5F3F` with white text) — strong visual anchor, common pattern
2. **Light footer** — `bg-base-300 text-base-content` (medium beige `#E2DDD6` with dark text) — softer, warmer feel aligned with "Terre & Mer de Bretagne"

Either works. The light approach (`bg-base-300`) is safer for WCAG contrast with text links. If using dark (`bg-primary`), ensure all text and links have sufficient contrast against the green background (use `text-primary-content` which maps to white).

**⚠️ Legal page links — pages don't exist yet:**

Links to `/mentions-legales` and `/politique-confidentialite` should be included now. These pages will be created in Epic 7 (Story 7.1). The links won't 404 in dev — they simply won't have content yet. This is expected and correct.

**⚠️ `footer-title` class behavior in daisyUI v5:**

The `footer-title` class in daisyUI v5 renders as an uppercase, slightly smaller, semi-transparent heading. It uses `opacity: 0.6` and `font-weight: 700`. This is the standard footer section heading style — do not override it unless it conflicts with accessibility (contrast).

### Data Structures Available

**From `business.ts`:**

```typescript
interface BusinessInfo {
  name: string;          // 'Équi 22'
  address: string;       // '123 Rue de la Prairie'
  city: string;          // 'Yffiniac'
  postalCode: string;    // '22120'
  phone: string;         // '+33 2 96 00 00 00'
  whatsapp: string;      // '+33 6 00 00 00 00'
  email: string;         // 'contact@equi22.fr'
  openingHours: OpeningHours[];  // [{days, hours}, ...]
  gps: GpsCoordinates;
  social: SocialLinks;   // {facebook, instagram}
}
```

**From `navigation.ts`:**

```typescript
interface NavLink {
  label: string;
  href: string;
}

// 8 links: Cours enfants, Équitation adulte, Pension, Stages vacances,
// Compétitions, Tarifs, À propos, Contact
```

### Color Scheme Reference

From the daisyUI equi22 theme in `global.css`:

| Token | Value | Usage in Footer |
|---|---|---|
| `--color-primary` | `#2D5F3F` (forest green) | Option: dark footer background |
| `--color-primary-content` | white | Text on dark footer |
| `--color-base-200` | `#F0EDE8` (beige) | Option: light footer background |
| `--color-base-300` | `#E2DDD6` (medium beige) | Option: light footer background (stronger) |
| `--color-base-content` | `#2C2C2C` (dark gray) | Text on light footer |
| `--color-secondary` | `#1B6B93` (ocean blue) | Link hover color option |

### Project Structure Notes

- **Flat `components/` folder** — Footer.astro goes directly in `src/components/` (alongside Navbar.astro, SchemaMarkup.astro)
- **No subfolders** — Do not create `components/footer/` or similar
- **Component naming:** PascalCase → `Footer.astro`
- **Visible content in French, code in English**
- **Phone/address data from `business.ts`** — never hardcoded

### Previous Story Intelligence (Stories 1.1, 1.2 & 1.3)

**Key learnings that impact this story:**

- **Tailwind v4 migration:** Architecture doc patterns are outdated. Use `@tailwindcss/vite` (not `@astrojs/tailwind`), CSS-first config. Already set up correctly in Story 1.1.
- **daisyUI v5:** Theme defined in CSS with `@plugin "daisyui/theme"`. Some CSS warnings from daisyUI are cosmetic — not blocking.
- **BaseLayout structure:** Has `<!-- Footer will be added in Story 1.4 -->` and empty `<footer></footer>` placeholder at line 65-66. Replace both the comment and the empty element.
- **Navbar pattern to follow:** The Navbar component (Story 1.3) demonstrates the correct pattern for:
  - Importing data from `business.ts` and `navigation.ts`
  - Using inline SVG icons (no icon library)
  - Focus-visible outlines: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
  - Active link detection via `Astro.url.pathname`
  - Semantic HTML with ARIA attributes
  - `motion-safe:` prefix on transitions
- **Fixed navbar offset:** BaseLayout already has `pt-16 lg:pt-20` on `<main>` for the fixed navbar. The footer does NOT need fixed positioning — it flows naturally after `</main>`.
- **Build verification:** Always run `npm run build` AND `astro check` to validate.

**Files created in previous stories that this story depends on:**
- `src/layouts/BaseLayout.astro` — Will be modified to include Footer component
- `src/data/navigation.ts` — Contains the menu links for quick links
- `src/data/business.ts` — Contains NAP, hours, social links
- `src/styles/global.css` — Theme tokens and fonts already configured
- `src/components/Navbar.astro` — Reference implementation for component patterns

### Architecture Compliance

- **Flat `components/` folder** — Footer.astro added flat, no subfolders
- **TypeScript strict** — Typed interface Props if needed, never `any`
- **Naming:** PascalCase for component (`Footer.astro`)
- **Content in French, code in English** — Section headings in French ("Horaires", "Navigation"), variables in English
- **Semantic HTML** — `<footer>` element with `<nav>` for link groups
- **No client-side JS** — Footer is purely static, no interactive behavior requiring JS
- **Tailwind/daisyUI classes only** — No custom CSS, no scoped `<style>` blocks
- **44px minimum tap targets** on mobile interactive elements
- **Data from `business.ts`** — Phone, address, social links never hardcoded

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4: Footer with Practical Information]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Navigation Patterns]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility Considerations]
- [Source: _bmad-output/implementation-artifacts/1-1-initialize-astro-project-with-core-integrations.md#Dev Notes]
- [Source: _bmad-output/implementation-artifacts/1-2-base-layout-with-seo-infrastructure.md#Dev Notes]
- [Source: _bmad-output/implementation-artifacts/1-3-responsive-navbar.md#Dev Notes]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

No blocking issues encountered during implementation.

### Completion Notes List

✅ **Story 1.4 Implementation Complete** (2026-02-15)

**Implementation Summary:**
- Created `Footer.astro` component with semantic HTML structure using `<footer>` and `<nav>` elements
- Implemented 4 footer sections: Center Identity, Opening Hours, Quick Links, Legal & Social Media
- All data sourced from `business.ts` and `navigation.ts` (no hardcoded values)
- Used daisyUI v5 footer pattern: `footer sm:footer-horizontal` for responsive layout (vertical on mobile, horizontal on desktop)
- Applied `bg-base-300` background for visual distinction with good contrast
- Used inline SVG icons for Facebook and Instagram (no external icon library)
- All interactive elements have 44px minimum tap targets and `focus-visible` outlines for accessibility
- Phone link strips spaces in `tel:` href while displaying formatted number
- Social links open in new tabs with `rel="noopener"` and descriptive `aria-label` attributes
- Legal page links added (`/mentions-legales`, `/politique-confidentialite`) - pages will be created in Epic 7
- Integrated Footer into `BaseLayout.astro` replacing placeholder comment and empty footer element

**Build Validation:**
- `npm run build` — ✅ Success (0 TypeScript errors, cosmetic daisyUI warnings expected)
- `astro check` — ✅ Success (0 errors, 0 warnings, 3 non-blocking hints)

**Acceptance Criteria Met:**
All 12 acceptance criteria satisfied:
- AC-1 to AC-12: Footer component created, data sourced from business.ts, semantic HTML, responsive layout, accessibility requirements, build success

### Senior Developer Review (AI)

**Reviewer:** Aurélien — 2026-02-15
**Agent:** claude-opus-4-6

**Issues Found:** 1 High, 3 Medium, 2 Low
**Issues Fixed:** 4 (all HIGH + MEDIUM)

**Fixes Applied:**
1. **[H1 FIXED]** Replaced hardcoded "Équi 22" with `{business.name}` — AC-2 compliance
2. **[M1 FIXED]** Replaced `<nav>` with `<div>` for non-navigation sections (Center Identity, Opening Hours) — correct semantic HTML
3. **[M2 FIXED]** Replaced `<h6>` with `<span>` for all `footer-title` elements — fixes heading hierarchy jumps
4. **[M3 FIXED]** Added `opacity-100` to all `footer-title` spans — overrides daisyUI's `opacity: 0.6` default to ensure WCAG AA contrast

**Remaining LOW issues (not fixed):**
- L1: Could use `<address>` element for contact information (semantic improvement)
- L2: Social links could add `noreferrer` to `rel="noopener"` (security best practice)

**Build Validation Post-Review:**
- `npm run build` — ✅ Success (0 TypeScript errors)

### File List

- `src/components/Footer.astro` (created, modified in review)
- `src/layouts/BaseLayout.astro` (modified)
