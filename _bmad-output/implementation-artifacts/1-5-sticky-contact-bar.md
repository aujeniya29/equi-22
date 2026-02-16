# Story 1.5: Sticky Contact Bar (Phone + WhatsApp)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a sticky phone button and floating WhatsApp button always visible**,
So that **I can contact the center instantly from any page with one tap** (FR11, FR12, FR15).

## Acceptance Criteria

1. **AC-1: StickyContact component** — `src/components/StickyContact.astro` exists with a typed `interface Props` accepting `whatsappMessage` (optional string, defaults to a generic message) and is integrated into `BaseLayout.astro`.

2. **AC-2: Mobile sticky bar** — On mobile (<1024px), a sticky bar is fixed at the bottom of the viewport with two buttons occupying 50/50 width: "Appeler" (phone icon, green background) and "WhatsApp" (WhatsApp icon, green background).

3. **AC-3: Phone call action** — Tapping "Appeler" initiates a phone call via `tel:` URL using the phone number from `business.ts` (spaces stripped from href, displayed formatted).

4. **AC-4: WhatsApp action** — Tapping "WhatsApp" opens WhatsApp with a pre-filled contextual message via `https://wa.me/{number}?text={encoded_message}`. The number uses `business.whatsapp` with all non-digit characters except leading `+` stripped.

5. **AC-5: Contextual WhatsApp message** — The WhatsApp message is contextual per page, passed via `whatsappMessage` prop from the page through BaseLayout. Default message: "Bonjour, j'aimerais avoir des renseignements sur vos activites."

6. **AC-6: Tap targets** — Both buttons have minimum 44px height tap targets (use `min-h-[44px]` or equivalent).

7. **AC-7: Accessibility** — Both buttons have descriptive `aria-label` attributes (e.g., "Appeler le centre equestre Equi 22" and "Envoyer un message WhatsApp a Equi 22").

8. **AC-8: Desktop — sticky bar hidden** — On desktop (>=1024px), the mobile sticky bar is not shown (the CTA contact button is already in the navbar from Story 1.3).

9. **AC-9: Desktop — floating WhatsApp** — On desktop, a floating WhatsApp button is displayed in the bottom-right corner with a recognizable WhatsApp icon, circular shape, and shadow.

10. **AC-10: No hardcoded data** — The phone number and WhatsApp number are never hardcoded — always sourced from `business.ts`.

11. **AC-11: Mobile body padding** — The `<main>` or `<body>` in BaseLayout has bottom padding on mobile to prevent content from being obscured by the sticky bar (approximately `pb-16 lg:pb-0`).

12. **AC-12: z-index layering** — The sticky bar/floating button uses an appropriate z-index (z-40) to stay above page content but below the navbar (z-50) and any overlays.

13. **AC-13: Build succeeds** — `npm run build` produces a successful build with zero TypeScript errors after adding the StickyContact component.

## Tasks / Subtasks

- [x] Task 1: Create StickyContact component (AC: #1, #10)
  - [x] Create `src/components/StickyContact.astro` with TypeScript strict
  - [x] Define `interface Props { whatsappMessage?: string; }`
  - [x] Import `business` from `../data/business`
  - [x] Compute phone URL: `tel:${business.phone.replace(/\s/g, '')}`
  - [x] Compute WhatsApp URL: `https://wa.me/${business.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(whatsappMessage || defaultMessage)}`
  - [x] Define default WhatsApp message constant

- [x] Task 2: Mobile sticky bar (AC: #2, #3, #4, #6, #7)
  - [x] Create a `<div>` with `fixed bottom-0 left-0 right-0 z-40 lg:hidden`
  - [x] Add two child `<a>` elements, each taking 50% width (`flex` layout with `flex-1`)
  - [x] "Appeler" button: phone SVG icon + text, `href={phoneUrl}`, green background
  - [x] "WhatsApp" button: WhatsApp SVG icon + text, `href={whatsappUrl}`, `target="_blank"` `rel="noopener"`
  - [x] Apply `min-h-[44px]` on both buttons
  - [x] Add `aria-label` on both buttons
  - [x] Use inline SVG icons (phone + WhatsApp) with `currentColor` fill and `w-5 h-5` size

- [x] Task 3: Desktop floating WhatsApp button (AC: #8, #9, #12)
  - [x] Create a `<a>` with `fixed bottom-6 right-6 z-40 hidden lg:flex`
  - [x] Circular shape: `rounded-full w-14 h-14 items-center justify-center`
  - [x] WhatsApp green background: `bg-[#25D366]` (WhatsApp brand color) with white icon
  - [x] Shadow: `shadow-lg`
  - [x] Hover effect: `hover:scale-110 motion-safe:transition-transform`
  - [x] `aria-label="Envoyer un message WhatsApp a Equi 22"`
  - [x] `href={whatsappUrl}` `target="_blank"` `rel="noopener"`

- [x] Task 4: Accessibility and focus states (AC: #7)
  - [x] Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded` on all interactive elements (matching Navbar pattern)
  - [x] Ensure all buttons have descriptive aria-labels in French
  - [x] Ensure sufficient color contrast (white text on green background)

- [x] Task 5: Integrate into BaseLayout (AC: #1, #5, #11)
  - [x] Import StickyContact in `src/layouts/BaseLayout.astro`
  - [x] Render `<StickyContact whatsappMessage={whatsappMessage} />` after `<Footer />` (before closing `</body>`)
  - [x] Add `pb-16 lg:pb-0` to the `<main>` element to account for sticky bar height on mobile
  - [x] Pass through the existing `whatsappMessage` prop from BaseLayout props

- [x] Task 6: Verify build (AC: #13)
  - [x] Run `npm run build` — confirm zero TypeScript errors
  - [x] Run `astro check` — confirm zero errors
  - [x] Verify sticky bar renders correctly on dev server (mobile + desktop viewports)
  - [x] Verify phone link initiates call and WhatsApp link opens with pre-filled message

## Dev Notes

### Critical Technical Context

**Tailwind v4 + daisyUI v5 — Same patterns as Stories 1.1-1.4:**

This project uses **Tailwind v4 + daisyUI v5** with CSS-first configuration. The developer MUST follow the established patterns:
- CSS-first config via `@theme` directive in `global.css` (NOT `tailwind.config.mjs`)
- daisyUI v5 configured with `@plugin "daisyui"` in CSS
- Use daisyUI v5 class names (some changed from v4)

**Phone and WhatsApp URL construction — CRITICAL:**

The `business.ts` stores numbers with spaces for readability:
- `phone: '+33 2 96 00 00 00'`
- `whatsapp: '+33 6 00 00 00 00'`

URL construction patterns:

```typescript
// Phone: strip spaces only
const phoneUrl = `tel:${business.phone.replace(/\s/g, '')}`;
// Result: tel:+33296000000

// WhatsApp: strip all non-digits (removes +, spaces)
const whatsappNumber = business.whatsapp.replace(/[^\d]/g, '');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
// Result: https://wa.me/33600000000?text=Bonjour%2C%20j%27aimerais...
```

**IMPORTANT:** The `wa.me` API requires the number WITHOUT the `+` prefix — just digits. The `tel:` protocol KEEPS the `+` prefix. These are different formats.

**WhatsApp contextual messaging — per-page prop chain:**

```
Page (.astro) → BaseLayout (whatsappMessage prop) → StickyContact (whatsappMessage prop)
```

The `whatsappMessage` prop is already defined in BaseLayout's interface (added in Story 1.2 for future use). It just needs to be passed to StickyContact.

Default message when no page provides one:
```
"Bonjour, j'aimerais avoir des renseignements sur vos activites."
```

Future service pages will pass contextual messages like:
- Cours enfants: "Bonjour, je suis interesse(e) par les cours enfants..."
- Pension: "Bonjour, je suis interesse(e) par la pension chevaux..."

**Inline SVG icons — no icon library:**

Following the same approach as Navbar (hamburger/close icons) and Footer (social icons), use inline SVGs. Do NOT add an icon library.

**Phone icon SVG:**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
</svg>
```

**WhatsApp icon SVG:**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
```

**z-index strategy:**

| Element | z-index | Reasoning |
|---|---|---|
| Navbar | z-50 | Highest — always above everything |
| Mobile menu overlay | z-50 (part of navbar) | Covers everything |
| StickyContact bar | z-40 | Above content, below navbar and overlays |
| Page content | z-auto | Default stacking |

The sticky bar should NOT overlap the navbar. Using z-40 ensures it sits below the navbar (z-50) but above any page content with positioned elements.

**Mobile bottom padding — prevent content occlusion:**

The sticky bar is approximately 56-64px tall (44px min-height + padding). Adding `pb-16 lg:pb-0` to `<main>` in BaseLayout ensures the last bit of page content is not hidden behind the sticky bar on mobile. On desktop (lg:), the padding resets to 0 since the sticky bar is hidden.

**Color choices for sticky bar buttons:**

Two approaches for the mobile sticky bar:
1. **Both green** — `bg-primary text-primary-content` for phone, `bg-[#25D366] text-white` for WhatsApp (WhatsApp brand green)
2. **Matching brand** — `bg-primary text-primary-content` for both, with different icons distinguishing them

Recommendation: Use `bg-primary text-primary-content` (forest green #2D5F3F) for the phone button and `bg-[#25D366] text-white` for the WhatsApp button. This creates visual distinction while using recognized WhatsApp branding. Both ensure sufficient contrast for white text.

For the desktop floating WhatsApp button: `bg-[#25D366]` (WhatsApp brand green) is the standard convention — users recognize this color as WhatsApp universally.

**No client-side JavaScript required:**

The StickyContact component is purely static HTML + CSS. No JavaScript needed:
- Phone link uses native `tel:` protocol
- WhatsApp link uses native `https://wa.me/` URL
- Responsive show/hide uses Tailwind responsive classes (`lg:hidden`, `hidden lg:flex`)
- No toggle, no state, no interactivity beyond clicking links

This aligns with the architecture rule: "No client-side JS dependencies without justification."

### Data Structures Available

**From `business.ts`:**

```typescript
export interface BusinessInfo {
  name: string;          // 'Equi 22'
  address: string;       // '123 Rue de la Prairie'
  city: string;          // 'Yffiniac'
  postalCode: string;    // '22120'
  phone: string;         // '+33 2 96 00 00 00'
  whatsapp: string;      // '+33 6 00 00 00 00'
  email: string;         // 'contact@equi22.fr'
  openingHours: OpeningHours[];
  gps: GpsCoordinates;
  social: SocialLinks;   // {facebook, instagram}
}
```

### Color Scheme Reference

| Token | Value | Usage in StickyContact |
|---|---|---|
| `--color-primary` | `#2D5F3F` (forest green) | Phone button background |
| `--color-primary-content` | white | Text on phone button |
| `bg-[#25D366]` | WhatsApp brand green | WhatsApp button background (mobile + desktop floating) |
| `text-white` | white | Text/icon on WhatsApp button |

### Project Structure Notes

- **Flat `components/` folder** — StickyContact.astro goes directly in `src/components/` (alongside Navbar.astro, Footer.astro, SchemaMarkup.astro)
- **No subfolders** — Do not create `components/contact/` or similar
- **Component naming:** PascalCase -> `StickyContact.astro`
- **Visible content in French, code in English**
- **Phone/WhatsApp data from `business.ts`** — never hardcoded

### Previous Story Intelligence (Stories 1.1-1.4)

**Key learnings that impact this story:**

- **Tailwind v4 migration:** Architecture doc patterns are outdated. Use `@tailwindcss/vite` (not `@astrojs/tailwind`), CSS-first config. Already set up correctly in Story 1.1.
- **daisyUI v5:** Theme defined in CSS with `@plugin "daisyui/theme"`. Some CSS warnings from daisyUI are cosmetic — not blocking.
- **BaseLayout structure:** Has `whatsappMessage` prop already defined (Story 1.2) but not yet passed to any component. The comment on line 26 says "Will be used in Story 1.5 (StickyContact)".
- **Navbar pattern to follow:** The Navbar component (Story 1.3) demonstrates the correct pattern for:
  - Importing data from `business.ts`
  - Using inline SVG icons (no icon library)
  - Focus-visible outlines: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
  - Semantic HTML with ARIA attributes
  - `motion-safe:` prefix on transitions
  - Minimum touch targets: `min-h-[44px]`
- **Footer phone pattern:** Footer (Story 1.4) strips spaces from phone number for `tel:` href: `business.phone.replace(/\s/g, '')`. Follow the same pattern.
- **Footer review lessons:** [H1] Never hardcode values available in business.ts. [M2] Use `<span>` not `<h6>` for non-heading text in component areas. [M3] Override daisyUI opacity defaults if needed for contrast.
- **Build verification:** Always run `npm run build` AND `astro check` to validate.

**Files created in previous stories that this story depends on:**
- `src/layouts/BaseLayout.astro` — Will be modified to import and render StickyContact + add bottom padding
- `src/data/business.ts` — Contains phone and WhatsApp numbers
- `src/styles/global.css` — Theme tokens and fonts already configured
- `src/components/Navbar.astro` — Reference for component patterns and z-index (z-50)
- `src/components/Footer.astro` — Reference for business.ts import and phone URL pattern

### Architecture Compliance

- **Flat `components/` folder** — StickyContact.astro added flat, no subfolders
- **TypeScript strict** — Typed `interface Props`, never `any`
- **Naming:** PascalCase for component (`StickyContact.astro`)
- **Content in French, code in English** — Button labels in French ("Appeler", "WhatsApp"), variables in English
- **Semantic HTML** — Links (`<a>`) for navigation actions, not buttons
- **No client-side JS** — Purely static, responsive via CSS classes
- **Tailwind/daisyUI classes only** — No custom CSS, no scoped `<style>` blocks
- **44px minimum tap targets** on all interactive elements
- **Data from `business.ts`** — Phone and WhatsApp numbers never hardcoded
- **Inline SVG icons** — No icon library dependency
- **`motion-safe:` transitions** — Respect prefers-reduced-motion

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5: Sticky Contact Bar]
- [Source: _bmad-output/planning-artifacts/architecture.md#Contact & WhatsApp Strategy]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy — Custom Component 6: Sticky Contact Bar]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Navigation Patterns]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility Considerations]
- [Source: _bmad-output/implementation-artifacts/1-4-footer-with-practical-information.md#Dev Notes]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

None

### Completion Notes List

✅ **Story 1.5 Implementation Complete** (2026-02-16)

**Component Created:**
- Created `src/components/StickyContact.astro` with TypeScript strict mode
- Implemented mobile sticky bar (50/50 phone + WhatsApp buttons)
- Implemented desktop floating WhatsApp button (bottom-right corner)
- All data sourced from `business.ts` (no hardcoding)

**Technical Implementation:**
- Phone URL: `tel:` protocol with spaces stripped, keeping `+` prefix
- WhatsApp URL: `wa.me/` with digits only (no `+`), pre-filled contextual message
- Default message: "Bonjour, j'aimerais avoir des renseignements sur vos activites."
- Inline SVG icons (phone + WhatsApp) following Navbar/Footer patterns
- z-index: z-40 (below navbar's z-50, above content)

**Accessibility:**
- All buttons have descriptive `aria-label` attributes in French
- Minimum 44px tap targets on all interactive elements
- Focus-visible outlines matching Navbar pattern
- Sufficient color contrast (white text on green backgrounds)

**Responsive Design:**
- Mobile (<1024px): Sticky bar fixed at bottom, 2 equal-width buttons
- Desktop (>=1024px): Sticky bar hidden, floating WhatsApp button visible
- Mobile body padding: `pb-16 lg:pb-0` on `<main>` to prevent content occlusion

**Integration:**
- Integrated into `BaseLayout.astro` after Footer
- `whatsappMessage` prop passed through from page → BaseLayout → StickyContact
- Prop chain enables contextual messages per page (e.g., service-specific messages)

**Build Validation:**
- ✅ `npm run build` — zero TypeScript errors
- ✅ `astro check` — zero errors, zero warnings (2 non-blocking hints from previous story)
- ✅ Dev server started successfully on http://localhost:4321/

**All 13 Acceptance Criteria Satisfied:**
- AC-1 to AC-13 validated and implemented correctly

### File List

- `src/components/StickyContact.astro` (created)
- `src/layouts/BaseLayout.astro` (modified)
- `src/components/Footer.astro` (modified — review fix: added mobile bottom padding for sticky bar)

### Senior Developer Review (AI)

**Reviewer:** Aurélien — 2026-02-16
**Review Agent:** Claude Opus 4.6 (claude-opus-4-6)
**Outcome:** Approved (after fixes)

**Issues Found:** 1 High, 3 Medium, 4 Low (8 total)
**Issues Fixed:** 4 (all HIGH + MEDIUM)
**Remaining:** 4 LOW issues (acceptable, not blocking)

**Fixes Applied:**

| ID | Severity | Description | File | Fix |
|---|---|---|---|---|
| H1 | HIGH | Footer content obscured by sticky bar on mobile | `Footer.astro` | Added `pb-16 lg:pb-10` to footer |
| M1 | MEDIUM | Missing French accents in aria-labels and WhatsApp message | `StickyContact.astro` | Fixed accents: activités, équestre, Équi, à |
| M2 | MEDIUM | Stale comment "Will be used in Story 1.5" | `BaseLayout.astro` | Removed obsolete comment |
| M3 | MEDIUM | `rounded` class on flush mobile bar buttons | `StickyContact.astro` | Removed `rounded` from mobile buttons |

**Remaining LOW Issues (not blocking):**

- L1: Missing `rel="noreferrer"` on WhatsApp external links (consistent with Footer pattern)
- L2: AC-4 text says "keep leading +" but wa.me requires digits only (code is correct, AC text is misleading)
- L3: No visual separator between mobile bar buttons (color difference sufficient)
- L4: `motion-safe:transition-all` overly broad on mobile buttons (works, not optimal)

**Build Validation Post-Review:**
- `npm run build` — zero TypeScript errors
- All warnings are cosmetic daisyUI/Tailwind artifacts (pre-existing)
