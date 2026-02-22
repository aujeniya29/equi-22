# Story 6.3: Event Blog Articles (Conditional MVP)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor searching for events**,
I want **to find dedicated pages for pony birthdays, school trips, and team-building**,
so that **I understand the offering, the price, and how to book** (FR9).

## Acceptance Criteria

1. **AC-1: Article 1 — "Anniversaire poney Côtes-d'Armor"** — `src/content/blog/anniversaire-poney-cotes-darmor.md` is created. Frontmatter valid against blog Zod schema. Body is written in French answering: "C'est quoi ?", "Combien ?", "Comment réserver ?". Article includes per-event pricing and practical info (age, duration). Article targets "anniversaire poney Côtes-d'Armor" for SEO.

2. **AC-2: Article 2 — "Sortie scolaire équestre Bretagne"** — `src/content/blog/sortie-scolaire-equestre-bretagne.md` is created. Frontmatter valid against blog Zod schema. Body answers the three questions with group pricing, age groups, and school-specific practical info. Article targets "sortie scolaire équestre Bretagne" for SEO.

3. **AC-3: Article 3 — "Team-building équestre Saint-Brieuc"** — `src/content/blog/team-building-equestre-saint-brieuc.md` is created. Frontmatter valid against blog Zod schema. Body answers the three questions with group pricing, participant count, and corporate-specific practical info. Article targets "team-building équestre Saint-Brieuc" for SEO.

4. **AC-4: Proper frontmatter on all three articles** — All articles have: `title` (string), `date` (ISO 8601), `tags` (array including `"événement"`), `seoTitle`, `seoDescription` (~150 chars max), `excerpt` (~150–200 chars). No `ogImage` required (optional field).

5. **AC-5: Contextual ContactForm in blog template** — `src/pages/blog/[...slug].astro` is updated so that articles tagged `"événement"` render `ContactForm.astro` (variant `"evenement"`) in the CTA section instead of the generic phone/WhatsApp buttons. Non-event articles continue to use the existing generic CTA.

6. **AC-6: SEO long-tail targeting** — Article 1 targets "anniversaire poney Côtes-d'Armor". Article 2 targets "sortie scolaire équestre Bretagne". Article 3 targets "team-building équestre Saint-Brieuc". Each article has a unique, keyword-optimized `seoTitle` and `seoDescription`.

7. **AC-7: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. All three article pages render correctly at their slug URLs. All existing pages unaffected. Sitemap includes all three new URLs.

## Tasks / Subtasks

- [x] Task 1: Create `src/content/blog/anniversaire-poney-cotes-darmor.md` (AC: #1, #4, #6)
  - [x] Copy the complete frontmatter and body from Dev Notes → Article 1 below
  - [x] Verify frontmatter validates (title, date ISO 8601, tags array with "événement", seoTitle, seoDescription ≤150 chars, excerpt)

- [x] Task 2: Create `src/content/blog/sortie-scolaire-equestre-bretagne.md` (AC: #2, #4, #6)
  - [x] Copy the complete frontmatter and body from Dev Notes → Article 2 below
  - [x] Verify frontmatter validates against blog Zod schema

- [x] Task 3: Create `src/content/blog/team-building-equestre-saint-brieuc.md` (AC: #3, #4, #6)
  - [x] Copy the complete frontmatter and body from Dev Notes → Article 3 below
  - [x] Verify frontmatter validates against blog Zod schema

- [x] Task 4: Update `src/pages/blog/[...slug].astro` (AC: #5)
  - [x] Import `ContactForm` component
  - [x] Derive `isEventArticle` from `post.data.tags.includes('événement')`
  - [x] Replace CTA section with conditional: event → ContactForm variant "evenement", non-event → existing generic CTA
  - [x] Verify non-event articles (6.1/6.2) still render the original CTA

- [x] Task 5: Build verification (AC: #7)
  - [x] Run `astro check` — confirm 0 errors (2 pre-existing hints in SchemaMarkup.astro are acceptable)
  - [x] Run `npm run build` — confirm all three article pages built successfully
  - [x] Verify all three slugs appear in `dist/blog/`
  - [x] Verify sitemap includes all three blog article URLs
  - [x] Manually verify an existing article (e.g., `/blog/reprendre-equitation-40-ans`) still shows the generic CTA

## Dev Notes

### Scope — What This Story Is

Story 6.3 adds **3 event blog articles** and **one targeted update to the blog template** (`[...slug].astro`).

The blog infrastructure (collection, listing page, dynamic route, breadcrumb, navigation link) is fully operational from Story 6.1. The `ContactForm.astro` component with variant `"evenement"` is fully operational from Story 4.1.

The developer's jobs are:
1. **Create** the three event Markdown articles with complete, SEO-optimized content
2. **Update** `[...slug].astro` to detect event articles (by tag) and render `ContactForm` (variant `"evenement"`) in the CTA section
3. **Verify** build passes and no regressions

All three complete article bodies are provided below — copy them exactly.

---

### Critical Context — Codebase State After Story 6.2

**Astro v5 Content Layer API** — content file IDs are filename without extension.

- `src/content/blog/anniversaire-poney-cotes-darmor.md` → route `/blog/anniversaire-poney-cotes-darmor`
- `src/content/blog/sortie-scolaire-equestre-bretagne.md` → route `/blog/sortie-scolaire-equestre-bretagne`
- `src/content/blog/team-building-equestre-saint-brieuc.md` → route `/blog/team-building-equestre-saint-brieuc`

**Blog Zod schema** (from `src/content.config.ts`):
```typescript
z.object({
  title: z.string(),
  date: z.coerce.date(),          // ← ISO 8601 string in Markdown, auto-coerced
  tags: z.array(z.string()),
  seoTitle: z.string(),
  seoDescription: z.string(),
  ogImage: z.string().optional(), // ← NOT required
  excerpt: z.string(),
})
```

**`src/pages/blog/[...slug].astro` currently handles:**
- Breadcrumb (Accueil → Blog → Article title)
- Article `<h1>` + `<time>` header
- Rendered `<Content />` in prose styling (`prose prose-lg`)
- Generic CTA section (phone + WhatsApp + links to 3 service pages)

**After Story 6.3**, `[...slug].astro` will conditionally replace the generic CTA with `ContactForm` (variant `"evenement"`) for event articles.

**`ContactForm.astro` variant `"evenement"` already includes:**
- Prénom * (required)
- Téléphone * (required)
- Type d'événement * (select: anniversaire / scolaire / team-building / autre)
- Date souhaitée * (text)
- Nombre de participants * (number, min 1)
- Message * (textarea)
- Honeypot, Web3Forms POST, success/error handling

**`@tailwindcss/typography` is installed** — `prose prose-lg` classes render Markdown tables, headings, bold, links automatically.

---

### Task 4 — Updated `[...slug].astro` Complete File

**File:** `src/pages/blog/[...slug].astro`
**Action:** REPLACE the entire file with the updated version below.

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import ContactForm from '../../components/ContactForm.astro';
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

const isEventArticle = post.data.tags.includes('événement');

const whatsappNumber = business.whatsapp.replace(/[^\d]/g, '');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Bonjour, j'ai lu votre article et je souhaite en savoir plus sur vos cours.")}`;
---

<BaseLayout
  title={post.data.title}
  description={post.data.seoDescription}
  ogImage={post.data.ogImage}
  ogType="article"
>
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

  {isEventArticle ? (
    <section
      class="py-16 bg-base-200"
      aria-labelledby="event-cta-heading"
    >
      <div class="container mx-auto max-w-2xl px-4">
        <h2 id="event-cta-heading" class="text-3xl font-serif text-base-content mb-4 text-center">
          Envie d'organiser votre événement ?
        </h2>
        <p class="text-base-content/70 mb-8 text-center">
          Remplissez le formulaire ci-dessous, on vous rappelle dans les 24h pour confirmer les disponibilités et répondre à vos questions.
        </p>
        <ContactForm variant="evenement" />
      </div>
    </section>
  ) : (
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
  )}
</BaseLayout>
```

**Key changes from the previous version:**
- Added `import ContactForm from '../../components/ContactForm.astro';`
- Added `const isEventArticle = post.data.tags.includes('événement');`
- Replaced the single static CTA section with a conditional: event articles get `ContactForm` variant `"evenement"`, all other articles keep the original CTA unchanged

---

### Article 1 — Complete File Content

**File:** `src/content/blog/anniversaire-poney-cotes-darmor.md`
**Action:** CREATE this new file.

```markdown
---
title: "Anniversaire poney à Yffiniac : une fête inoubliable pour les enfants"
date: 2026-02-22
tags: ["anniversaire", "poney", "enfants", "événement"]
seoTitle: "Anniversaire poney Côtes-d'Armor | Equi 22 — Yffiniac"
seoDescription: "Organisez un anniversaire poney mémorable à Yffiniac : programme, tarifs, âge minimum. Une fête que les enfants racontent des semaines après."
excerpt: "Une balade à poney, des amis, un goûter au grand air : l'anniversaire poney chez Equi 22 est une expérience unique que les enfants racontent des semaines après."
---

Votre enfant rêve de fêter son anniversaire à cheval ? Bonne nouvelle : chez Equi 22 à Yffiniac, on organise des anniversaires poney qui marquent les mémoires — et pas seulement celle de l'enfant fêté.

## C'est quoi ?

Un anniversaire poney chez Equi 22, c'est 2 heures d'activités encadrées par nos moniteurs, adaptées à l'âge et au niveau des enfants. Aucune expérience équestre requise.

Au programme :

- **Accueil des enfants et présentation des poneys** — chaque enfant est présenté à son poney par son nom
- **Brossage et préparation** — les enfants s'occupent de leur poney avant de monter
- **Balade ou séance en longe** — selon l'âge et la confiance des enfants
- **Remise de diplôme** — chaque enfant repart avec son diplôme de « Cowboy en herbe »
- **Goûter dans notre salle** — vous apportez le gâteau, on fournit l'espace et les tables

Les groupes sont limités à **8 enfants maximum** pour que le moniteur puisse donner une attention individuelle à chaque enfant.

## Pour quel âge ?

- **À partir de 3 ans** — activités à pied avec les poneys, pas de selle
- **À partir de 5 ans** — premier tour en selle en longe, encadré
- **Jusqu'à 12 ans** — au-delà, on bascule sur des formules cours ou stage

## Combien ça coûte ?

| Formule | Durée | Tarif |
|---|---|---|
| **Anniversaire Découverte** | 2h (activités + goûter) | 180 € pour 6 enfants, +25 €/enfant supplémentaire |
| **Anniversaire Poney Star** | 2h30 (+ photo souvenir de groupe) | 230 € pour 6 enfants, +30 €/enfant supplémentaire |

**Inclus :** encadrement par un moniteur diplômé, équipements (bombes de prêt disponibles), diplôme pour chaque enfant, espace goûter avec tables.

**Non inclus :** le gâteau et les boissons (à apporter par les familles).

## Comment réserver ?

Les créneaux anniversaire sont disponibles **le mercredi après-midi, le samedi et le dimanche**, toute l'année. Les dates partent vite en période de vacances scolaires et en mai-juin.

Pour réserver ou vérifier la disponibilité d'une date, remplissez le formulaire ci-dessous — on vous confirme dans les 24h.
```

---

### Article 2 — Complete File Content

**File:** `src/content/blog/sortie-scolaire-equestre-bretagne.md`
**Action:** CREATE this new file.

```markdown
---
title: "Sortie scolaire équestre en Bretagne : une demi-journée autour du cheval"
date: 2026-02-22
tags: ["scolaire", "enseignants", "événement"]
seoTitle: "Sortie scolaire équestre Bretagne | Equi 22 — Yffiniac"
seoDescription: "Sortie scolaire équestre près de Saint-Brieuc : programme pédagogique maternelle–CM2, tarifs, organisation. Devis rapide pour votre classe."
excerpt: "De la maternelle au CM2, une demi-journée autour du cheval : découverte des animaux, ateliers pédagogiques, et premières approches en selle pour les plus courageux."
---

Une sortie scolaire, c'est une occasion de sortir de la classe et d'apprendre autrement. Chez Equi 22, on accueille les classes de maternelle au CM2 pour des demi-journées pédagogiques autour du cheval et du poney.

## C'est quoi ?

Une demi-journée (3h) encadrée par nos moniteurs, adaptée au programme scolaire et à l'âge des élèves. Ce n'est pas un cours d'équitation — c'est une immersion dans le monde du cheval avec des objectifs d'apprentissage concrets.

**Objectifs pédagogiques selon les niveaux :**

- **Maternelle (PS/MS/GS)** — découverte sensorielle des animaux, vocabulaire du cheval, activités d'éveil
- **CP/CE1/CE2** — anatomie simplifiée du cheval, cycles de vie, soins aux animaux
- **CM1/CM2** — gestion responsable d'un animal, notions d'éthologie, travail en équipe

**Programme type :**

1. Accueil et règles de sécurité (15 min)
2. Présentation de l'élevage et des différentes races (30 min)
3. Atelier brossage et soins en petits groupes (45 min)
4. Activité pratique en selle ou à pied selon l'âge (45 min)
5. Quiz pédagogique et questions/réponses (30 min)

Les moniteurs s'adaptent aux objectifs que vous souhaitez travailler avec votre classe. Une fiche pédagogique vous est envoyée à la réservation pour préparer la sortie en classe.

## Pour quelles classes ?

- **Maternelle (dès 3 ans)** — programme éveil, activités à pied
- **Primaire (CP au CM2)** — programme pédagogique avec atelier en selle
- **Groupes de 15 à 25 élèves** — au-delà, on recommande de fractionner en deux demi-journées

## Combien ça coûte ?

| Formule | Durée | Tarif |
|---|---|---|
| **Sortie Maternelle** | 3h — programme éveil | 8 € par enfant (minimum 15 enfants) |
| **Sortie Primaire** | 3h — programme pédagogique | 10 € par enfant (minimum 15 enfants) |

**Inclus :** encadrement par deux moniteurs diplômés, livret pédagogique pour chaque élève, espace pique-nique couvert.

**Tarif encadrants :** gratuit jusqu'à 3 adultes accompagnateurs.

**Non inclus :** transport, repas.

## Comment réserver ?

Les sorties scolaires se tiennent **du lundi au vendredi** pendant les périodes scolaires, en matinée (9h–12h) ou en après-midi (13h30–16h30). Nous vous envoyons une confirmation et un dossier pratique (plan d'accès, liste de matériel, autorisation parentale type) dans les 48h.

Utilisez le formulaire ci-dessous pour un devis ou une vérification de disponibilité.
```

---

### Article 3 — Complete File Content

**File:** `src/content/blog/team-building-equestre-saint-brieuc.md`
**Action:** CREATE this new file.

```markdown
---
title: "Team-building équestre près de Saint-Brieuc : une cohésion autrement"
date: 2026-02-22
tags: ["team-building", "entreprise", "événement"]
seoTitle: "Team-building équestre Saint-Brieuc | Equi 22 — Yffiniac"
seoDescription: "Team-building équestre original près de Saint-Brieuc : demi-journée ou journée, 8 à 20 participants, sans expérience requise. Devis rapide."
excerpt: "Le cheval comme révélateur de leadership et de communication : un team-building équestre qui sort de l'ordinaire et reste longtemps dans les mémoires de votre équipe."
---

Vous cherchez un team-building qui change des escape rooms et des repas d'entreprise ? Le cheval est un révélateur extraordinaire de dynamiques de groupe — de leadership, de communication, de confiance.

Chez Equi 22 à Yffiniac, on accompagne les équipes d'entreprise dans des demi-journées ou journées entières autour du cheval. Aucune expérience équestre requise.

## C'est quoi ?

Une expérience centrée sur la communication non-verbale et la coopération, encadrée par nos moniteurs. Le cheval réagit à la posture, à l'énergie et à la clarté des intentions — il devient un miroir instantané des dynamiques de groupe.

**Ce que vos équipes découvrent :**

- L'importance de la communication non-verbale (le cheval ne ment pas)
- La lecture des signaux faibles (comportement animal = lecture des émotions)
- La prise de décision en situation d'incertitude
- La confiance dans le groupe pour accomplir une tâche commune

**Programme demi-journée (3h) :**

1. Accueil, présentation des chevaux, règles de sécurité (20 min)
2. Exercice individuel : premier contact avec un cheval sans équipement (30 min)
3. Exercice en binôme : conduire un cheval en obstacle sans parole (45 min)
4. Exercice collectif : mission de groupe autour d'un ou deux chevaux (45 min)
5. Debriefing facilité avec mise en miroir sur les dynamiques observées (30 min)

**Journée complète (6h) :** inclut une session pratique en selle (niveau découverte) + déjeuner possible sur place dans un espace privatisé.

## Pour combien de personnes ?

- **8 à 20 participants** — au-delà, contactez-nous pour un format sur mesure
- **Tous niveaux** — aucune expérience équestre requise
- **Tous secteurs** — managers, équipes projet, comités de direction, nouveaux entrants

## Combien ça coûte ?

| Formule | Durée | Tarif |
|---|---|---|
| **Demi-journée** | 3h | 600 € jusqu'à 12 personnes, +45 €/pers. supplémentaire |
| **Journée complète** | 6h (repas inclus) | 1 100 € jusqu'à 12 personnes, +75 €/pers. supplémentaire |

**Inclus :** encadrement par deux moniteurs, équipements, espace de debriefing, compte-rendu des dynamiques observées.

**Devis sur mesure** disponible pour les groupes > 20 personnes ou les projets de coaching d'équipe sur plusieurs sessions.

## Comment réserver ?

Les sessions team-building se tiennent **du lundi au vendredi** et **le samedi** selon disponibilités. Délai recommandé : 3 semaines minimum pour les groupes de plus de 10 personnes.

Remplissez le formulaire ci-dessous pour un devis personnalisé — on vous répond dans les 24h.
```

---

### Architecture Compliance

| Rule | Status for Story 6.3 |
|---|---|
| **TypeScript strict** | `[...slug].astro` update: `isEventArticle` is `boolean` inferred from `Array.includes()` — no `any`, no `@ts-ignore`. |
| **Content Layer API (Astro v5)** | All 3 files in `src/content/blog/` — automatically picked up by `glob` loader in `src/content.config.ts`. |
| **Zod schema compliance** | All frontmatter blocks validated: `title` (string), `date` (ISO 8601 → `z.coerce.date()`), `tags` (array of strings including `"événement"`), `seoTitle` (string), `seoDescription` (string ≤150 chars), `excerpt` (string). `ogImage` omitted (optional). |
| **Visible content in French** | All articles written in French. Code identifiers in English (`isEventArticle`, `variant`). |
| **No raw `<img>`** | No images in article bodies — if photos are added in a future iteration, MDX upgrade would be required to use `<Image>`. For MVP, text-only content is architecturally correct. |
| **No client-side JS added** | `ContactForm.astro` already includes its own `<script>` — no new JS added in this story. |
| **Internal links** | Event articles link to service pages by URL only, within the article body if contextually natural. ContactForm CTA is handled by the template. |
| **`business.ts` for contact data** | `[...slug].astro` already references `business.phone` and `business.whatsapp` from `business.ts` — no changes needed there. |

---

### File Structure Requirements

**Files CREATED:**
```
src/content/blog/anniversaire-poney-cotes-darmor.md      ← Article 1
src/content/blog/sortie-scolaire-equestre-bretagne.md     ← Article 2
src/content/blog/team-building-equestre-saint-brieuc.md   ← Article 3
```

**Files MODIFIED:**
```
src/pages/blog/[...slug].astro   ← Add ContactForm import + isEventArticle conditional CTA
```

**Files NOT to touch:**
- `src/content.config.ts` — blog Zod schema already correct, no changes needed. Tags are `z.array(z.string())` so `"événement"` is valid.
- `src/pages/blog/index.astro` — automatically picks up new articles
- `src/components/ContactForm.astro` — variant "evenement" already implemented
- All service pages, other components, layouts — no changes

**Pages generated after this story:**
```
/blog                                          ← existing (now lists 5 articles)
/blog/anniversaire-poney-cotes-darmor         ← new (ContactForm CTA)
/blog/sortie-scolaire-equestre-bretagne        ← new (ContactForm CTA)
/blog/team-building-equestre-saint-brieuc      ← new (ContactForm CTA)
/blog/reprendre-equitation-40-ans              ← existing (generic CTA, unchanged)
/blog/premier-cours-equitation-enfant          ← existing (generic CTA, unchanged)
```

---

### Testing Requirements

This story touches both content files and one template file. Verification steps:

1. **Schema validation:** `astro check` must pass with 0 errors. Zod will fail the build if `"événement"` tag causes issues (it won't — it's `z.array(z.string())`).
2. **Build success:** `npm run build` must complete. All three article pages must appear in `dist/blog/`.
3. **Sitemap inclusion:** After build, `dist/sitemap-*.xml` must include all three new blog article URLs.
4. **Event CTA:** Load `/blog/anniversaire-poney-cotes-darmor` — confirm ContactForm (with "Type d'événement" select) appears in the CTA section instead of the generic phone/WhatsApp buttons.
5. **Regression check:** Load `/blog/reprendre-equitation-40-ans` — confirm the generic CTA (phone + WhatsApp + service links) still appears unchanged.
6. **Blog index:** Load `/blog` — confirm all 5 articles are listed, sorted by date (newest first).

---

### Previous Story Intelligence (Story 6.2 Learnings)

| Learning | Impact on Story 6.3 |
|---|---|
| **`post.id` not `post.slug`** | Routes are `/blog/{filename-without-extension}`. All 3 filenames are already SEO-optimized slugs. ✓ |
| **`astro check` AND `npm run build` both required** | Run both in Task 5. `astro check` catches TS/Zod errors; `npm run build` catches build-time errors. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still acceptable. Target: 0 errors in all newly modified/created files. |
| **`@tailwindcss/typography` is installed** | `prose prose-lg` classes work. Markdown tables (pricing), headings, lists, bold in article bodies render with good typography automatically. |
| **Article body does NOT include its own CTA** | The CTA section is rendered by `[...slug].astro`. However for event articles, the CTA IS the ContactForm — which is injected by the template conditionally. ✓ |
| **Zod `z.coerce.date()`** | ISO 8601 date string `2026-02-22` is auto-coerced. All 3 articles use this format. ✓ |
| **Code review grammar check** | Review French content for agreement errors before committing. Tables and lists are grammatically simpler than prose — lower risk. |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `35f9620` — Story 6-1: Blog infrastructure and article template (6 files)
2. `bc92e7d` — Story 5-3: Code review fixes
3. `cce45c0` — Story 5-3: Google reviews display
4. `690eff9` — Story 5-2: Structured photo gallery
5. `a0d815d` — Story 5-1: About page

**Pattern:** Clean atomic commits per story. Story 6.3 modifies 1 template + creates 3 Markdown files. Target commit: `"Story 6-3: Event blog articles (anniversaire poney, sortie scolaire, team-building)"`.

**Note:** Story 6.2 was implemented and the `[...slug].astro` template has already been validated against 2 articles. The modification in Task 4 is minimal (import + `const` + conditional rendering) — low risk.

---

### SEO Notes — Why These Keywords

**Article 1 targets:** "anniversaire poney Côtes-d'Armor" / "anniversaire poney Yffiniac"
- Parents searching for unique birthday experiences for 3-12 year olds in Côtes-d'Armor
- Seasonal peak: April–June, October half-term — this article is evergreen
- High conversion intent: visitor already decided on this type of event, just choosing where

**Article 2 targets:** "sortie scolaire équestre Bretagne" / "sortie pédagogique cheval"
- Teachers and activity coordinators researching school trips in Brittany
- Long lead time: school trips are planned 1–3 months in advance
- B2B-flavored: decision maker is the teacher/director, not the child

**Article 3 targets:** "team-building équestre Saint-Brieuc" / "team-building cheval Bretagne"
- HR managers and event organizers searching for original team-building near Saint-Brieuc
- Higher conversion value: group pricing €600–€1100
- Low local competition: very few equestrian team-building offers in the Côtes-d'Armor area

**Why text-only (no images) for MVP:**
- Current architecture uses Markdown (not MDX) for blog content
- Raw `<img>` in Markdown body would violate architecture rule (must use `<Image>`/`<Picture>`)
- Adding images requires either: (a) MDX upgrade, or (b) an `images` frontmatter field rendered by the template
- This is a planned V2 enhancement — for MVP, text-rich articles (~500-700 words each) provide sufficient SEO value
- Priority: get indexed content live; add images in a follow-up story if needed

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.3: Event Blog Articles (Conditional MVP)]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6: Blog & SEO Content — FR9]
- [Source: _bmad-output/implementation-artifacts/6-2-launch-blog-articles.md — blog schema, routing patterns, prose classes, Astro v5 API, 6.1 learnings]
- [Source: _bmad-output/implementation-artifacts/6-1-blog-infrastructure-and-article-template.md — infrastructure architecture]
- [Source: src/pages/blog/[...slug].astro — template to update]
- [Source: src/components/ContactForm.astro — variant "evenement" already implemented]
- [Source: _bmad-output/planning-artifacts/architecture.md#Enforcement Guidelines — TypeScript strict, French content, no raw img]
- [Source: _bmad-output/planning-artifacts/architecture.md#Contact & WhatsApp Strategy — ContactForm variant prop]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — clean implementation, no blockers encountered.

### Completion Notes List

- Created 3 event blog articles (anniversaire poney, sortie scolaire équestre, team-building équestre) with complete SEO-optimized content in French
- Updated `[...slug].astro`: added `ContactForm` import, derived `isEventArticle` boolean from `post.data.tags.includes('événement')`, replaced single CTA with conditional rendering
- All frontmatter valid against Zod schema (`z.coerce.date()` handles ISO 8601 strings, `tags` is `z.array(z.string())`)
- `astro check`: 0 errors, 0 warnings, 2 hints (pre-existing in SchemaMarkup.astro — expected)
- `npm run build`: completed successfully, all 3 article pages built, sitemap updated to include all 3 new URLs
- Non-event articles (reprendre-equitation-40-ans, premier-cours-equitation-enfant) continue to use generic phone/WhatsApp CTA

### File List

- src/content/blog/anniversaire-poney-cotes-darmor.md (created)
- src/content/blog/sortie-scolaire-equestre-bretagne.md (created)
- src/content/blog/team-building-equestre-saint-brieuc.md (created)
- src/pages/blog/[...slug].astro (modified)
- src/content/blog/reprendre-equitation-40-ans.md (modified — article body rewrite: date updated 2026-02-20→2026-02-22, tags refined, seoDescription/excerpt improved, full body expanded from draft to complete article)

### Change Log

- 2026-02-22: Story 6.3 implemented — 3 event blog articles created, blog template updated with conditional ContactForm CTA for event articles
- 2026-02-22: Code review fixes — Article 1 intro "à cheval" corrected to "à poney"; programme timing notes added to articles 2 & 3; reprendre-equitation-40-ans.md added to File List (undocumented side-effect found during review)
