# Story 7.1: Legal Pages (Mentions Légales & Privacy Policy)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to access legal information and understand how my data is handled**,
so that **the site complies with French law and RGPD, and I can trust the center with my information** (NFR20, NFR21).

## Acceptance Criteria

1. **AC-1: Mentions légales page** — `src/pages/mentions-legales.astro` is created. When a visitor navigates to `/mentions-legales`, the page displays: site editor identity, hosting provider (Cloudflare), CNIL reference, and intellectual property notice (NFR20).

2. **AC-2: Privacy policy page** — `src/pages/politique-confidentialite.astro` is created. When a visitor navigates to `/politique-confidentialite`, the page details: data collected via forms (name, phone, message), analytics data (Umami — cookieless, anonymized page views), processing purpose, retention period, user rights (access, rectification, deletion), and contact for exercising rights (NFR21).

3. **AC-3: Umami cookieless disclosure** — The privacy policy explicitly states that Umami Cloud is cookieless and that no cookie consent banner is required (NFR14).

4. **AC-4: Footer links already present** — Both pages are already linked from `Footer.astro` at `/mentions-legales` and `/politique-confidentialite`. No footer change required — the links work once the pages exist.

5. **AC-5: Semantic HTML & BaseLayout** — Both pages use `BaseLayout.astro` with unique `title`, `description`, and proper `<main>`, `<section>`, `<h1>`, `<h2>` semantic structure.

6. **AC-6: Content in clear French** — Content is written in plain, accessible French — no legal jargon. All visible content in French, code identifiers in English.

7. **AC-7: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. All existing pages are unaffected. Sitemap includes both new URLs.

## Tasks / Subtasks

- [x] Task 1: Create `src/pages/mentions-legales.astro` (AC: #1, #5, #6)
  - [x] Use BaseLayout with title "Mentions légales — Équi 22" and a short description
  - [x] Add `<main>` with `<section>` blocks: éditeur, hébergeur, CNIL, propriété intellectuelle
  - [x] Reference `business.name`, `business.address`, `business.city`, `business.postalCode`, `business.email` from `business.ts`
  - [x] Copy complete page structure from Dev Notes below

- [x] Task 2: Create `src/pages/politique-confidentialite.astro` (AC: #2, #3, #5, #6)
  - [x] Use BaseLayout with title "Politique de confidentialité — Équi 22"
  - [x] Add sections: données collectées (forms), analytics (Umami), base légale, durée, droits utilisateurs
  - [x] Explicitly state Umami is cookieless → no consent banner required
  - [x] Reference `business.email` from `business.ts` for rights contact
  - [x] Copy complete page structure from Dev Notes below

- [x] Task 3: Build verification (AC: #7)
  - [x] Run `astro check` — confirm 0 errors (2 pre-existing hints in SchemaMarkup.astro acceptable)
  - [x] Run `npm run build` — confirm both pages built successfully
  - [x] Verify `/mentions-legales` and `/politique-confidentialite` appear in `dist/`
  - [x] Verify sitemap includes both new URLs
  - [x] Click footer links on any page to confirm both pages are reachable

## Dev Notes

### Scope — What This Story Is

Story 7.1 creates **2 static legal pages**: `mentions-legales.astro` and `politique-confidentialite.astro`.

The footer (`src/components/Footer.astro`) already contains links to both pages — no footer modification needed. The pages simply need to be created.

These are standalone Astro pages using `BaseLayout.astro`, with no Content Collections, no dynamic data, and no client-side JS. The only data referenced from TypeScript is `business.ts` (editor name, address, email).

The developer's jobs are:
1. **Create** `src/pages/mentions-legales.astro` with complete legal mentions content
2. **Create** `src/pages/politique-confidentialite.astro` with RGPD privacy policy content
3. **Verify** build passes and no regressions

All complete page code is provided below — copy it directly.

---

### Critical Context — Codebase State After Story 6.3

**Astro version:** v5 (Content Layer API active)

**BaseLayout.astro props:**
```typescript
interface Props {
  title: string;           // ← Used for <title> tag and og:title
  description: string;     // ← Used for <meta name="description"> and og:description
  ogImage?: string;        // ← Optional, defaults to /og-default.jpg
  ogType?: string;         // ← Optional, defaults to "website"
}
```

**`src/data/business.ts` relevant fields:**
```typescript
business.name      // "Équi 22"
business.address   // "123 Rue de la Prairie"
business.city      // "Yffiniac"
business.postalCode // "22120"
business.email     // "contact@equi22.fr"
```

**Footer already has:**
```html
<a href="/mentions-legales" ...>Mentions légales</a>
<a href="/politique-confidentialite" ...>Politique de confidentialité</a>
```
No footer changes needed.

**Sitemap:** `@astrojs/sitemap` auto-discovers all pages in `src/pages/`. Both new pages will be included automatically in the next build.

**Analytics used:** Umami Cloud — cookieless, RGPD-compliant without consent banner (NFR14). Script loaded asynchronously in `BaseLayout.astro`. No cookie is set.

**Forms used:** Web3Forms — data (name, phone, message) is transmitted to the center manager by email only. No server-side storage (NFR10).

---

### Task 1 — Complete `mentions-legales.astro` File

**File:** `src/pages/mentions-legales.astro`
**Action:** CREATE this new file.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { business } from '../data/business.ts';
---

<BaseLayout
  title="Mentions légales — Équi 22"
  description="Mentions légales du site equi22.fr : éditeur, hébergeur, droits de propriété intellectuelle et informations CNIL."
>
  <main class="py-16 bg-base-100">
    <div class="container mx-auto max-w-3xl px-4">

      <h1 class="text-4xl font-serif text-base-content mb-10">Mentions légales</h1>

      <section class="mb-10" aria-labelledby="editeur-heading">
        <h2 id="editeur-heading" class="text-2xl font-serif text-base-content mb-4">
          Éditeur du site
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Le site <strong>equi22.fr</strong> est édité par :
        </p>
        <ul class="mt-3 space-y-1 text-base-content/80">
          <li><strong>Raison sociale :</strong> {business.name}</li>
          <li><strong>Adresse :</strong> {business.address}, {business.postalCode} {business.city}</li>
          <li>
            <strong>Contact :</strong>{' '}
            <a
              href={`mailto:${business.email}`}
              class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            >
              {business.email}
            </a>
          </li>
        </ul>
      </section>

      <section class="mb-10" aria-labelledby="hebergeur-heading">
        <h2 id="hebergeur-heading" class="text-2xl font-serif text-base-content mb-4">
          Hébergeur
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Le site est hébergé par :
        </p>
        <ul class="mt-3 space-y-1 text-base-content/80">
          <li><strong>Raison sociale :</strong> Cloudflare, Inc.</li>
          <li><strong>Adresse :</strong> 101 Townsend St, San Francisco, CA 94107, États-Unis</li>
          <li>
            <strong>Site web :</strong>{' '}
            <a
              href="https://www.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              aria-label="Site de Cloudflare (nouvel onglet)"
            >
              cloudflare.com
            </a>
          </li>
        </ul>
        <p class="mt-3 text-base-content/70 text-sm">
          Le site est servi via le réseau CDN de Cloudflare Pages. Aucune donnée utilisateur n'est stockée sur les serveurs de Cloudflare au-delà des logs d'accès techniques habituels.
        </p>
      </section>

      <section class="mb-10" aria-labelledby="cnil-heading">
        <h2 id="cnil-heading" class="text-2xl font-serif text-base-content mb-4">
          Données personnelles & CNIL
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Ce site traite des données personnelles dans le cadre de son formulaire de contact. Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez de droits sur vos données.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          Pour en savoir plus sur la collecte et le traitement de vos données, consultez notre{' '}
          <a
            href="/politique-confidentialite"
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            Politique de confidentialité
          </a>.
        </p>
        <p class="mt-3 text-base-content/70 text-sm">
          La Commission Nationale de l'Informatique et des Libertés (CNIL) est l'autorité de contrôle compétente en France :{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label="Site de la CNIL (nouvel onglet)"
          >
            cnil.fr
          </a>.
        </p>
      </section>

      <section class="mb-10" aria-labelledby="propriete-heading">
        <h2 id="propriete-heading" class="text-2xl font-serif text-base-content mb-4">
          Propriété intellectuelle
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          L'ensemble du contenu de ce site — textes, photographies, illustrations, logos — est la propriété de {business.name}, sauf mention contraire explicite. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de l'éditeur.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          Les marques et logos présents sur ce site sont déposés par leurs propriétaires respectifs.
        </p>
      </section>

      <section aria-labelledby="responsabilite-heading">
        <h2 id="responsabilite-heading" class="text-2xl font-serif text-base-content mb-4">
          Responsabilité
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Les informations publiées sur ce site sont fournies à titre indicatif. {business.name} s'efforce de maintenir ces informations à jour mais ne saurait être tenu responsable d'éventuelles erreurs ou omissions, ni des conséquences de leur utilisation.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          Les liens vers des sites externes sont fournis à titre informatif. {business.name} n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>
      </section>

    </div>
  </main>
</BaseLayout>
```

---

### Task 2 — Complete `politique-confidentialite.astro` File

**File:** `src/pages/politique-confidentialite.astro`
**Action:** CREATE this new file.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { business } from '../data/business.ts';

const lastUpdated = '22 février 2026';
---

<BaseLayout
  title="Politique de confidentialité — Équi 22"
  description="Comment Équi 22 collecte, utilise et protège vos données personnelles. Analytics cookieless, formulaire de contact, droits RGPD."
>
  <main class="py-16 bg-base-100">
    <div class="container mx-auto max-w-3xl px-4">

      <h1 class="text-4xl font-serif text-base-content mb-4">
        Politique de confidentialité
      </h1>
      <p class="text-base-content/50 text-sm mb-10">Dernière mise à jour : {lastUpdated}</p>

      <section class="mb-10" aria-labelledby="intro-heading">
        <h2 id="intro-heading" class="text-2xl font-serif text-base-content mb-4">
          Notre engagement
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Chez {business.name}, nous faisons simple : nous collectons le minimum de données nécessaires, nous ne les revendons pas, et nous vous expliquons clairement ce que nous faisons avec.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          Cette page vous explique, en langage clair, quelles données nous collectons lorsque vous visitez ce site ou nous contactez via le formulaire.
        </p>
      </section>

      <section class="mb-10" aria-labelledby="analytics-heading">
        <h2 id="analytics-heading" class="text-2xl font-serif text-base-content mb-4">
          Mesure d'audience (analytics)
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Ce site utilise <strong>Umami Cloud</strong>, un outil d'analyse d'audience respectueux de la vie privée.
        </p>
        <ul class="mt-4 space-y-2 text-base-content/80">
          <li class="flex gap-2">
            <span class="text-success font-bold shrink-0">✓</span>
            <span><strong>Sans cookies :</strong> Umami ne dépose aucun cookie sur votre navigateur.</span>
          </li>
          <li class="flex gap-2">
            <span class="text-success font-bold shrink-0">✓</span>
            <span><strong>Sans identification :</strong> Aucune adresse IP ni identifiant personnel n'est stocké. Les données sont agrégées et anonymisées.</span>
          </li>
          <li class="flex gap-2">
            <span class="text-success font-bold shrink-0">✓</span>
            <span><strong>Sans bandeau de consentement :</strong> Parce qu'Umami est cookieless, nous n'avons pas besoin de vous demander votre accord pour l'analyse d'audience. La CNIL confirme qu'aucune bannière n'est requise pour ce type d'outil.</span>
          </li>
        </ul>
        <p class="mt-4 text-base-content/80 leading-relaxed">
          <strong>Ce que nous mesurons :</strong> les pages visitées, le pays de connexion (via IP, non stockée), le type d'appareil, et la source de trafic (référent). Ces données nous permettent de comprendre ce qui intéresse nos visiteurs et d'améliorer le site.
        </p>
        <p class="mt-3 text-base-content/70 text-sm">
          En savoir plus sur Umami :{' '}
          <a
            href="https://umami.is/docs/faq"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label="FAQ Umami — vie privée (nouvel onglet)"
          >
            umami.is/docs/faq
          </a>
        </p>
      </section>

      <section class="mb-10" aria-labelledby="formulaire-heading">
        <h2 id="formulaire-heading" class="text-2xl font-serif text-base-content mb-4">
          Formulaire de contact
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Lorsque vous remplissez notre formulaire de contact, nous collectons :
        </p>
        <ul class="mt-3 space-y-1 text-base-content/80 list-disc list-inside">
          <li>Votre prénom</li>
          <li>Votre numéro de téléphone</li>
          <li>Votre message</li>
          <li>Des champs contextuels selon la demande (type d'événement, nombre de participants, etc.)</li>
        </ul>
        <p class="mt-4 text-base-content/80 leading-relaxed">
          <strong>Pourquoi :</strong> Pour vous recontacter et répondre à votre demande.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          <strong>Comment :</strong> Vos données sont transmises par email directement à notre équipe via <strong>Web3Forms</strong>, un service de traitement de formulaires. <strong>Elles ne sont pas stockées sur un serveur :</strong> une fois l'email envoyé, vos données ne sont conservées que dans notre boîte mail.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          <strong>Durée de conservation :</strong> Le temps nécessaire au traitement de votre demande, et au maximum 12 mois.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          <strong>Base légale :</strong> Votre consentement, exprimé en remplissant et soumettant le formulaire.
        </p>
        <p class="mt-3 text-base-content/70 text-sm">
          En savoir plus sur Web3Forms :{' '}
          <a
            href="https://web3forms.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label="Politique de confidentialité Web3Forms (nouvel onglet)"
          >
            web3forms.com/privacy
          </a>
        </p>
      </section>

      <section class="mb-10" aria-labelledby="partage-heading">
        <h2 id="partage-heading" class="text-2xl font-serif text-base-content mb-4">
          Partage des données
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Nous ne vendons pas vos données. Nous ne les partageons pas avec des tiers à des fins commerciales. Les seuls prestataires qui accèdent à vos données sont ceux listés ci-dessus (Umami, Web3Forms), dans le strict cadre de leur service.
        </p>
      </section>

      <section class="mb-10" aria-labelledby="droits-heading">
        <h2 id="droits-heading" class="text-2xl font-serif text-base-content mb-4">
          Vos droits
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Conformément au RGPD, vous disposez des droits suivants sur vos données :
        </p>
        <ul class="mt-3 space-y-1 text-base-content/80 list-disc list-inside">
          <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
          <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
          <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
          <li><strong>Droit d'opposition :</strong> vous opposer à un traitement</li>
          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
        </ul>
        <p class="mt-4 text-base-content/80 leading-relaxed">
          Pour exercer ces droits, contactez-nous par email à{' '}
          <a
            href={`mailto:${business.email}`}
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            {business.email}
          </a>.
          Nous répondrons dans un délai de 30 jours.
        </p>
        <p class="mt-3 text-base-content/80 leading-relaxed">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez également déposer une réclamation auprès de la{' '}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
            aria-label="Déposer une plainte auprès de la CNIL (nouvel onglet)"
          >
            CNIL
          </a>.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" class="text-2xl font-serif text-base-content mb-4">
          Contact
        </h2>
        <p class="text-base-content/80 leading-relaxed">
          Pour toute question relative à cette politique de confidentialité :
        </p>
        <address class="mt-3 text-base-content/80 not-italic">
          <strong>{business.name}</strong><br />
          {business.address}<br />
          {business.postalCode} {business.city}<br />
          <a
            href={`mailto:${business.email}`}
            class="link link-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
          >
            {business.email}
          </a>
        </address>
      </section>

    </div>
  </main>
</BaseLayout>
```

---

### Architecture Compliance

| Rule | Status for Story 7.1 |
|---|---|
| **TypeScript strict** | No logic beyond `const lastUpdated = '...'` — no type issues possible. `business.ts` import is fully typed. |
| **No `any`, no `@ts-ignore`** | Not applicable — no complex logic in these static pages. |
| **Tailwind/daisyUI only** | All styling via Tailwind utilities (`text-base-content`, `font-serif`, `leading-relaxed`) and daisyUI classes (`link link-primary`). No `<style>` blocks, no inline CSS. |
| **Semantic HTML** | `<main>`, `<section>`, `<h1>`, `<h2>`, `<address>`, `<ul>`, `<li>`, `<strong>` — correct throughout. `aria-labelledby` on all sections. |
| **French visible content** | All content in French. Code identifiers (`lastUpdated`, `business`) in English. |
| **No raw `<img>`** | No images on these pages. |
| **No client-side JS** | Static pages, no islands, no `client:*` directives. |
| **business.ts for NAP** | `business.name`, `business.address`, `business.city`, `business.postalCode`, `business.email` referenced from `business.ts`. Never hardcoded. |
| **BaseLayout** | Both pages use `BaseLayout.astro` with `title` and `description` props — ensures SEO meta, OG, schema, navbar, footer, sticky contact. |
| **Focus indicators** | All links use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded` — consistent with existing codebase pattern (FR31). |
| **44px tap targets** | Legal pages have few interactive elements (only links). Links styled with standard text size — no tap target issues. |

---

### File Structure Requirements

**Files CREATED:**
```
src/pages/mentions-legales.astro          ← Mentions légales (NFR20)
src/pages/politique-confidentialite.astro ← Privacy policy (NFR21)
```

**Files NOT to touch:**
- `src/components/Footer.astro` — links already present, no changes needed
- `src/layouts/BaseLayout.astro` — no changes needed
- `src/data/business.ts` — referenced as-is, no changes needed
- All service pages, blog, components — no changes

**Pages generated after this story:**
```
/mentions-legales              ← new
/politique-confidentialite     ← new
/                              ← existing (footer links now functional)
/cours-enfants                 ← existing (footer links now functional)
... all pages                  ← existing (footer links now functional on all pages)
```

---

### Testing Requirements

1. **Schema validation:** `astro check` must pass with 0 errors. (2 pre-existing hints in SchemaMarkup.astro are acceptable — target 0 NEW errors.)
2. **Build success:** `npm run build` must complete. Both pages must appear in `dist/`.
3. **Sitemap inclusion:** `dist/sitemap-*.xml` must include `/mentions-legales` and `/politique-confidentialite`.
4. **Footer links:** On any existing page, click "Mentions légales" in the footer → navigates to `/mentions-legales`. Click "Politique de confidentialité" → navigates to `/politique-confidentialite`.
5. **Content check mentions légales:** Page shows: éditeur identity, Cloudflare as hébergeur, CNIL reference, propriété intellectuelle section.
6. **Content check politique:** Page shows: Umami cookieless confirmation (no banner needed), Web3Forms data handling (no server storage), retention (12 months), 5 RGPD rights, contact email.
7. **Regression:** All existing pages load correctly with navbar and footer intact.

---

### Previous Story Intelligence (Story 6.3 Learnings)

| Learning | Impact on Story 7.1 |
|---|---|
| **`astro check` AND `npm run build` both required** | Run both in Task 3. `astro check` catches TypeScript errors; `npm run build` catches build-time issues. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still acceptable. Target: 0 NEW errors in the two new pages. |
| **Clean atomic commit** | Commit message pattern: `"Story 7-1: Legal pages — mentions légales + politique de confidentialité"` |
| **`business.ts` import pattern** | `import { business } from '../data/business.ts';` — relative path from `src/pages/`. |
| **`@tailwindcss/typography` installed** | Not needed here (no Markdown content), but `prose` classes remain available if needed. |
| **No raw `<img>` rule** | Not applicable for these text-only pages — no images. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `0cd76c1` — Story 6-3: Event blog articles (3 blog articles + 1 template update — 6 files)
2. `aac980a` — Story 6-2: Launch blog articles
3. `35f9620` — Story 6-1: Blog infrastructure and article template
4. `bc92e7d` — Story 5-3: Code review fixes
5. `cce45c0` — Story 5-3: Google reviews display

**Pattern:** Clean atomic commits per story. Story 7.1 creates 2 `.astro` page files. Target commit: `"Story 7-1: Legal pages — mentions légales + politique de confidentialité"`.

**Note:** Both pages are pure static pages with no logic beyond `business.ts` references. Very low implementation risk. The footer links have been waiting since Story 1.4 — this story activates them.

---

### Project Structure Notes

**Alignment with unified project structure:**
- `src/pages/mentions-legales.astro` ← defined in architecture structure (line 460 of architecture.md)
- `src/pages/politique-confidentialite.astro` ← defined in architecture structure (line 461 of architecture.md)
- Flat `src/components/` — no changes
- No new dependencies — existing BaseLayout, business.ts, Tailwind/daisyUI

**No conflicts or variances detected.**

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 7.1: Legal Pages (Mentions Légales & Privacy Policy)]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 7: Legal, Analytics & Production Readiness — NFR20, NFR21, NFR14]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries — mentions-legales.astro, politique-confidentialite.astro]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — TypeScript strict, French content, Tailwind/daisyUI, semantic HTML, business.ts]
- [Source: _bmad-output/planning-artifacts/architecture.md#External Integration Points — Umami Cloud (cookieless), Web3Forms (no server storage)]
- [Source: src/components/Footer.astro — links to /mentions-legales and /politique-confidentialite already exist]
- [Source: src/data/business.ts — business.name, address, city, postalCode, email]
- [Source: _bmad-output/implementation-artifacts/6-3-event-blog-articles.md — story learnings]
- [Source: _bmad-output/planning-artifacts/architecture.md#Additional Technology Decisions — Umami Cloud: cookieless, RGPD-compliant without consent banner (NFR14)]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

_None — implementation completed without issues._

### Completion Notes List

- Created `src/pages/mentions-legales.astro`: static page with 5 sections (éditeur, hébergeur, CNIL, propriété intellectuelle, responsabilité). References `business.ts` for NAP data. Aria-labelledby on all sections. No regressions.
- Created `src/pages/politique-confidentialite.astro`: static page with 7 sections (engagement, analytics Umami, formulaire, partage, droits, contact). Explicitly states Umami is cookieless → no consent banner required (AC-3). `lastUpdated = '22 février 2026'`.
- `astro check`: 0 errors, 0 warnings, 2 pre-existing hints (SchemaMarkup.astro) — no new issues.
- `npm run build`: completed successfully. Both pages prerendered to `dist/mentions-legales/index.html` and `dist/politique-confidentialite/index.html`.
- Sitemap: `https://equi22.fr/mentions-legales` and `https://equi22.fr/politique-confidentialite` confirmed in `dist/sitemap-0.xml`.
- Footer links: already present in `Footer.astro` since Story 1.4 — now functional.

**Code review fixes applied:**
- Added `legalForm` and `siret` fields to `business.ts` `BusinessInfo` interface and object (with TODO placeholders for client-provided values) — LCEN legal compliance.
- Added `business.phone`, `business.legalForm`, `business.siret` to mentions-legales.astro éditeur section — LCEN Art. 6-III-1 compliance.
- Added inline comment on `lastUpdated` in politique-confidentialite.astro to prevent silent staleness.

### File List

- src/pages/mentions-legales.astro (created)
- src/pages/politique-confidentialite.astro (created)
- src/data/business.ts (modified — added legalForm and siret fields)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified — story status updated)
