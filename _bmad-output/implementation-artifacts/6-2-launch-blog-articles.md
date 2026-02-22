# Story 6.2: Launch Blog Articles

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor searching Google**,
I want **to find helpful articles about horseback riding that lead me to discover the center**,
so that **I get useful information and can decide to try riding at Equi 22**.

## Acceptance Criteria

1. **AC-1: Article 1 — "Reprendre l'équitation à 40 ans"** — `src/content/blog/reprendre-equitation-40-ans.md` is replaced with a full, high-quality article. Frontmatter: `title`, `date` (ISO 8601), `tags` (array), `seoTitle`, `seoDescription`, `excerpt` all valid against the blog Zod schema. Body is written in French with a warm, accessible tone targeting Marc persona. Article links to `/equitation-adulte`. Article is indexed in the sitemap after `npm run build`.

2. **AC-2: Article 2 — "Premier cours d'équitation pour enfant"** — A new file `src/content/blog/premier-cours-equitation-enfant.md` is created. Frontmatter valid against blog Zod schema. Body written in French with a reassurance-first tone targeting Sophie persona. Article links to `/cours-enfants`. After `npm run build`, page `/blog/premier-cours-equitation-enfant` is generated and in the sitemap.

3. **AC-3: Proper frontmatter on both articles** — Both articles have: `title` (string), `date` (ISO 8601 format, e.g., `2026-02-22`), `tags` (array of strings), `seoTitle` (string, keyword-optimised), `seoDescription` (string, ~155 chars, keyword-rich), `excerpt` (string, ~150–200 chars, enticing). No `ogImage` required (optional field).

4. **AC-4: French content, warm tone, no jargon** — Both articles are written in everyday French accessible to a non-equestrian reader. No technical jargon. Tone is warm, encouraging, human. Articles feel like advice from a knowledgeable friend, not a brochure.

5. **AC-5: Internal linking to service pages** — Article 1 includes a prominent link to `/equitation-adulte`. Article 2 includes a prominent link to `/cours-enfants`. Links are natural in-context, not just in the CTA section at the end (which is already handled by `[...slug].astro`).

6. **AC-6: No regression** — `astro check` passes with 0 errors. `npm run build` completes successfully. Both new/updated article pages render correctly. All existing pages unaffected. Sitemap includes `/blog/reprendre-equitation-40-ans` and `/blog/premier-cours-equitation-enfant`.

## Tasks / Subtasks

- [x] Task 1: Replace `src/content/blog/reprendre-equitation-40-ans.md` with full article (AC: #1, #3, #4, #5)
  - [x] Copy the complete frontmatter and body from Dev Notes → Article 1 below
  - [x] Verify frontmatter validates (title, date ISO 8601, tags array, seoTitle, seoDescription, excerpt)
  - [x] Check body links to `/equitation-adulte` naturally in-context

- [x] Task 2: Create `src/content/blog/premier-cours-equitation-enfant.md` (AC: #2, #3, #4, #5)
  - [x] Create file at `src/content/blog/premier-cours-equitation-enfant.md`
  - [x] Copy the complete frontmatter and body from Dev Notes → Article 2 below
  - [x] Verify frontmatter validates (title, date ISO 8601, tags array, seoTitle, seoDescription, excerpt)
  - [x] Check body links to `/cours-enfants` naturally in-context

- [x] Task 3: Build verification (AC: #6)
  - [x] Run `astro check` — confirm 0 errors (2 pre-existing hints in SchemaMarkup.astro are acceptable)
  - [x] Run `npm run build` — confirm both article pages built successfully
  - [x] Verify `/blog/reprendre-equitation-40-ans` and `/blog/premier-cours-equitation-enfant` appear in built output
  - [x] Verify sitemap includes both blog article URLs

## Dev Notes

### Scope — What This Story Is

Story 6.2 is **content-only**. No new Astro components, no page routes, no configuration changes. The blog infrastructure (collection, listing page, dynamic route, breadcrumb, navigation link) is fully operational from Story 6.1.

The developer's job is:
1. **Replace** the placeholder `reprendre-equitation-40-ans.md` with the full article below
2. **Create** the new article `premier-cours-equitation-enfant.md` with the full content below
3. **Verify** build passes

Both complete articles are provided below — copy them exactly.

---

### Critical Context — Codebase State After Story 6.1

**Astro v5 Content Layer API** — content file IDs are filename without extension.

- `src/content/blog/reprendre-equitation-40-ans.md` → route `/blog/reprendre-equitation-40-ans`
- `src/content/blog/premier-cours-equitation-enfant.md` → route `/blog/premier-cours-equitation-enfant`

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

**`src/pages/blog/[...slug].astro` already handles:**
- Breadcrumb (Accueil → Blog → Article title)
- Article `<h1>` + `<time>` header
- Rendered `<Content />` in prose styling (`prose prose-lg`)
- CTA section at the end (service links + phone/WhatsApp from `business.ts`)

**Therefore:** the article body **does NOT need** to include a CTA section — the page template already adds it. The article body ends after the content. In-context links within the article body are still encouraged (AC-5).

**`@tailwindcss/typography` is installed** — `prose prose-lg` classes work, rendering Markdown headings, paragraphs, lists, bold, links with good typography automatically.

---

### Article 1 — Complete File Content

**File:** `src/content/blog/reprendre-equitation-40-ans.md`
**Action:** REPLACE the existing placeholder file entirely.

```markdown
---
title: "Reprendre l'équitation à 40 ans : c'est possible (et formidable)"
date: 2026-02-22
tags: ["équitation adulte", "débutant", "reprendre équitation"]
seoTitle: "Reprendre l'équitation à 40 ans | Equi 22 — Yffiniac"
seoDescription: "Envie de reprendre l'équitation après des années de pause ? Ou de vous lancer pour la première fois ? Voici pourquoi 40 ans est le bon moment — et comment ça se passe chez nous."
excerpt: "L'équitation n'a pas d'âge. Que vous ayez pratiqué enfant ou jamais touché à un cheval, il n'est jamais trop tard pour commencer. Voici ce que vous devez vraiment savoir."
---

Vous avez peut-être monté à cheval enfant, puis la vie a repris le dessus — les études, le travail, la famille. Ou alors vous n'avez jamais eu l'occasion, mais l'envie est là depuis longtemps. Dans les deux cas, une question revient souvent : **est-ce que c'est encore possible à mon âge ?**

La réponse courte : oui, absolument. Et souvent, c'est même plus simple que vous ne le pensez.

## Ce que les adultes font mieux que les enfants

Contrairement à ce que l'on croit, les adultes ont plusieurs avantages réels sur les enfants quand ils apprennent à monter :

- **Ils comprennent les consignes.** Pas besoin de répéter dix fois. Vous saisissez les nuances, les explications techniques, la mécanique du mouvement.
- **Ils ont la motivation.** Vous êtes là parce que vous le voulez vraiment, pas parce que vos parents vous ont inscrit. Ça change tout.
- **Ils ont la patience.** L'apprentissage équestre prend du temps. Les adultes l'acceptent mieux que les enfants qui s'ennuient si ça ne va pas assez vite.

Bien sûr, la souplesse physique évolue avec l'âge — mais la plupart de nos élèves adultes progressent régulièrement et prennent un vrai plaisir dès les premières séances.

## Ce qui vous attend lors de votre premier cours

Voici ce qui se passe concrètement le jour J :

1. **On fait connaissance.** Votre moniteur vous pose quelques questions : est-ce que vous avez déjà monté ? Avez-vous des appréhensions ? Qu'est-ce qui vous a donné envie ?
2. **On vous présente votre cheval.** Pas d'entrée directement en selle. Vous apprenez d'abord à le brosser, à l'équiper. C'est déjà l'équitation.
3. **Premier contact en main.** Vous marchés à côté du cheval, vous sentez comment il réagit, vous créez un premier lien.
4. **En selle.** Pour la plupart des adultes débutants, la première séance se fait au pas, en longe si besoin. Pas de galop sauvage — on construit les bases.
5. **Le debriefing.** À la fin, on parle de ce que vous avez ressenti, de vos questions, de la suite.

Rien d'intimidant. Vraiment.

## "Et si j'ai peur des chevaux ?"

C'est plus courant qu'on ne le dit. Beaucoup d'adultes qui veulent se lancer ont une petite appréhension — ou une grande. Chez Equi 22, on ne juge pas et on ne force pas. Si vous avez peur, on en tient compte dès le départ, on prend le temps qu'il faut, et on adapte l'approche.

Nos chevaux sont choisis pour leur calme et leur douceur avec les débutants. Ils ont l'habitude de personnes qui découvrent l'équitation.

## Nos créneaux adultes à Yffiniac

On sait que vous avez une vie chargée. C'est pourquoi nos cours adultes sont proposés en soirée et le week-end :

- **Mercredi soir** — 19h00 et 20h00
- **Vendredi soir** — 19h00 et 20h00
- **Samedi matin** — 9h00, 10h00 et 11h00

Les groupes sont petits (4 à 6 personnes maximum) pour que chaque cours soit vraiment personnalisé.

## Ce que nos élèves adultes disent

> « J'avais monté à 12 ans et je pensais avoir tout oublié. Au bout de 3 séances, tout est revenu — et c'est encore mieux qu'avant parce que je comprends maintenant ce que je fais. »
>
> — *Isabelle, 43 ans, reprise après 30 ans de pause*

---

Envie d'en savoir plus sur nos [cours d'équitation adulte](/equitation-adulte) ? On vous répond avec plaisir — par téléphone ou WhatsApp, sans engagement.
```

---

### Article 2 — Complete File Content

**File:** `src/content/blog/premier-cours-equitation-enfant.md`
**Action:** CREATE this new file.

```markdown
---
title: "Premier cours d'équitation pour enfant : ce qu'il faut vraiment savoir"
date: 2026-02-22
tags: ["cours enfants", "poney", "premier cours", "débutant"]
seoTitle: "Premier cours d'équitation enfant : tout savoir | Equi 22 — Yffiniac"
seoDescription: "Votre enfant va faire son premier cours d'équitation ? Âge minimum, tenue, déroulé de la séance, sécurité : voici tout ce que les parents doivent savoir avant d'arriver."
excerpt: "Votre enfant veut faire de l'équitation ? Voici ce qui se passe vraiment lors d'un premier cours — et comment vous pouvez l'aider à s'y préparer sereinement."
---

Votre enfant vous en parle depuis des semaines. Ou c'est peut-être vous qui avez eu l'idée. Dans tous les cas, le premier cours d'équitation, c'est un grand moment — autant pour l'enfant que pour les parents. Et souvent, ce sont les parents qui sont les plus nerveux des deux.

Cet article répond aux questions que tout le monde se pose avant d'arriver au centre.

## À quel âge peut-on commencer ?

En règle générale, on peut commencer la poney-thérapie et les premières activités poneys dès **3–4 ans**, et les cours structurés à partir de **5–6 ans**.

Chez Equi 22, on accueille :

- **À partir de 3 ans** — activités d'éveil avec les poneys (pas de cours à proprement parler, mais un premier contact encadré)
- **À partir de 5 ans** — premier vrai cours, à pied et en selle, adapté à l'âge
- **À partir de 7–8 ans** — progression vers les galops officiels de la FFE

Pas besoin d'attendre d'être grand pour commencer. L'important, c'est la curiosité et l'envie.

## Ce qui se passe lors du premier cours

**Avant de monter en selle**, votre enfant apprend à s'occuper du poney. On ne monte pas directement — on s'en occupe d'abord. Ça peut paraître long, mais c'est essentiel : l'équitation, c'est d'abord une relation.

Voici le déroulé typique d'un premier cours enfant :

1. **Accueil et présentation du poney** — Le moniteur présente le poney par son nom, explique comment s'approcher, comment le caresser.
2. **Brossage** — Les enfants adorent ça. C'est un moment de calme et de connexion, sans enjeu.
3. **Équipement** — Avec l'aide du moniteur, l'enfant apprend à mettre la selle et le filet.
4. **En selle** — Premier contact à cheval, au pas, en main ou en longe selon le niveau de confiance de l'enfant.
5. **Exercices simples** — Position, équilibre, premiers arrêts.

La séance dure en général **45 minutes à 1 heure** selon les groupes d'âge.

## Est-ce que c'est dangereux ?

C'est la question que tous les parents posent — et c'est une très bonne question.

**L'équitation fait partie des sports qui comportent des risques**, comme le vélo, le ski ou la gymnastique. Mais les risques se gèrent avec une bonne encadrement et un équipement adapté.

Chez Equi 22 :
- **La bombe est obligatoire** pour tous les élèves, à chaque séance — fournie ou personnelle homologuée CE/EN1384
- **Les poneys utilisés avec les enfants** sont sélectionnés pour leur calme et leur habitude des débutants
- **Les groupes sont petits** (6 enfants maximum) pour que le moniteur puisse suivre chaque enfant
- **Les exercices progressent doucement** — on ne passe au trot avant que l'enfant soit à l'aise au pas

La sécurité n'est pas un discours chez nous : c'est organisée dans chaque séance.

## Que doit porter mon enfant ?

Pas besoin d'acheter un équipement complet avant le premier cours. Voici l'essentiel :

- **Casque (bombe) homologué** — Si vous n'en avez pas, on peut en prêter un le temps du premier essai
- **Pantalon long** — Pas de short, les étriers frottent
- **Chaussures fermées avec un léger talon** — Pour éviter que le pied ne passe à travers les étriers. Les baskets classiques conviennent pour commencer

C'est tout. Pas besoin de culotte d'équitation ni de bottes pour la première séance.

## Comment préparer mon enfant ?

Les enfants qui arrivent détendus progressent mieux. Quelques idées :

- **Parlez-lui du poney avant d'arriver** — pas du danger, pas des règles, juste de l'animal et de ce qu'ils vont faire ensemble
- **Évitez la surexcitation excessive la veille** — un enfant trop agité peut être plus difficile à canaliser
- **Expliquez-lui qu'il va peut-être avoir un peu peur, et que c'est normal** — ça l'aidera à mettre des mots sur ses émotions si ça arrive

Et surtout : faites confiance à l'équipe. On a l'habitude des enfants qui n'osent pas au début.

## Et après le premier cours ?

La plupart des enfants ressortent avec le sourire et demandent quand est la prochaine séance. Mais parfois, un enfant peut avoir eu peur ou ne pas avoir accroché tout de suite. C'est normal aussi — et ça arrive même aux enfants qui adorent les animaux.

Le deuxième cours est presque toujours plus facile. On connaît le poney, on sait à quoi s'attendre.

---

Vous voulez inscrire votre enfant ou simplement poser des questions ? Découvrez nos [cours d'équitation enfants à Yffiniac](/cours-enfants) et n'hésitez pas à nous appeler ou à nous écrire sur WhatsApp — on vous répond rapidement.
```

---

### Architecture Compliance

| Rule | Status for Story 6.2 |
|---|---|
| **TypeScript strict** | No TS files modified in this story — content-only. |
| **Content Layer API (Astro v5)** | Both files in `src/content/blog/` — automatically picked up by the `glob` loader defined in `src/content.config.ts`. |
| **Zod schema compliance** | Both frontmatter blocks validated against blog schema: `title` (string), `date` (ISO 8601 → `z.coerce.date()`), `tags` (array of strings), `seoTitle` (string), `seoDescription` (string), `excerpt` (string). `ogImage` is omitted (optional). |
| **Visible content in French** | Both articles written entirely in French. Code variables in English. |
| **No raw `<img>`** | No images in article bodies — `[...slug].astro` handles any future `ogImage` for OG meta only, not displayed. If images are added to article bodies in future, they must use `<Image>` or `<Picture>`. |
| **No client-side JS** | Content Markdown files — no JS involved. |
| **Internal links follow routing patterns** | `/equitation-adulte` and `/cours-enfants` match existing page routes (kebab-case, no trailing slash). |
| **`business.ts` for contact data** | Contact data (phone, WhatsApp) is in the CTA section rendered by `[...slug].astro` — already correctly sourced from `business.ts`. Article bodies reference the service pages by URL only. |

---

### File Structure Requirements

**Files MODIFIED:**
```
src/content/blog/reprendre-equitation-40-ans.md    ← REPLACE placeholder with full article
```

**Files CREATED:**
```
src/content/blog/premier-cours-equitation-enfant.md ← new article
```

**Files NOT to touch:**
- `src/content.config.ts` — blog schema already correct, no changes needed
- `src/pages/blog/index.astro` — already sorts and lists all blog entries automatically
- `src/pages/blog/[...slug].astro` — dynamic route already handles new articles automatically
- `src/components/Breadcrumb.astro` — no changes needed
- `src/data/navigation.ts` — Blog link already added in Story 6.1
- All existing service pages, layouts, components — no changes needed

**Pages generated after this story:**
```
/blog                                          ← existing (now lists 2 articles)
/blog/reprendre-equitation-40-ans              ← updated (full content)
/blog/premier-cours-equitation-enfant          ← new
```

---

### Testing Requirements

This is a content story — no unit or integration tests needed. Verification steps:

1. **Schema validation:** `astro check` must pass with 0 errors. Zod will fail the build if frontmatter doesn't match the schema (wrong date format, missing required fields, etc.)
2. **Build success:** `npm run build` must complete. Both article pages must appear in `dist/blog/`.
3. **Sitemap inclusion:** After build, `dist/sitemap-*.xml` must include both blog article URLs.
4. **Manual spot-check:** Load `/blog` and confirm both articles appear. Load each article page, confirm content renders, breadcrumb works, CTA at bottom is present.

---

### Previous Story Intelligence (Story 6.1 Learnings)

| Learning | Impact on Story 6.2 |
|---|---|
| **`post.id` not `post.slug`** | Routes are `/blog/{filename-without-extension}`. File `premier-cours-equitation-enfant.md` → route `/blog/premier-cours-equitation-enfant`. ✓ Correct naming. |
| **`astro check` AND `npm run build` both required** | Run both in Task 3. `astro check` catches Zod schema errors; `npm run build` catches build errors. |
| **2 pre-existing hints in SchemaMarkup.astro** | Still acceptable. Target: 0 errors in all newly modified/created files. |
| **`@tailwindcss/typography` is installed** | `prose prose-lg` classes work. Markdown headings, lists, bold, links in article body will render with good typography. |
| **Article body does NOT include CTA** | The CTA section ("Envie de passer à l'action ?") is added by `[...slug].astro` automatically. Articles end after content. However, in-context links to service pages within the article body ARE encouraged (AC-5). |
| **BaseLayout props: `title` and `description`** | `[...slug].astro` passes `post.data.seoTitle` and `post.data.seoDescription` — this was already fixed in 6.1 code review. No change needed. |
| **One commit per story** | Target: `"Story 6-2: Launch blog articles"` |

---

### Git Intelligence (Recent Work)

Most recent commits:
1. `35f9620` — Story 6-1: Blog infrastructure and article template → 6 files created/modified
2. `bc92e7d` — Story 5-3: Code review fixes (contrast, bg alternation, a11y)
3. `cce45c0` — Story 5-3: Google reviews display
4. `690eff9` — Story 5-2: Structured photo gallery
5. `a0d815d` — Story 5-1: About page — center, values & instructors

**Pattern:** Clean atomic commits per story. Story 6.2 is the lightest commit in the project — 2 Markdown files only.

---

### SEO Notes — Why These Keywords

**Article 1 targets:** "reprendre l'équitation" / "équitation adulte" / "cours équitation adulte débutant"
- Marc persona: adult who stopped riding or never started, searching Google
- Long-tail opportunity: low competition, high intent
- Internal link to `/equitation-adulte` converts organic traffic to leads

**Article 2 targets:** "premier cours équitation enfant" / "cours poney enfant" / "équitation enfant débutant"
- Sophie persona: parent researching before signing up their child
- Very high search volume for "premier cours poney enfant"
- Reassurance-first tone matches what anxious parents need
- Internal link to `/cours-enfants` converts

Both articles are intentionally **long-form** (~600–800 words) because:
1. Google favors comprehensive content for informational queries
2. More opportunities to answer the real questions behind the search
3. More natural opportunities for internal links

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 6.2: Launch Blog Articles]
- [Source: _bmad-output/planning-artifacts/epics.md#Epic 6: Blog & SEO Content — FR8]
- [Source: _bmad-output/implementation-artifacts/6-1-blog-infrastructure-and-article-template.md — architecture patterns, debug log, Astro v5 API]
- [Source: src/content.config.ts — blog Zod schema (title, date, tags, seoTitle, seoDescription, ogImage optional, excerpt)]
- [Source: src/content/blog/reprendre-equitation-40-ans.md — placeholder file to replace]
- [Source: _bmad-output/planning-artifacts/epics.md#Additional Requirements — French content, code in English]

## Dev Agent Record

### Agent Model Used

claude-sonnet-4-6

### Debug Log References

None — straightforward content implementation with no issues.

### Completion Notes List

- Replaced placeholder `reprendre-equitation-40-ans.md` with full article (~700 words, warm tone, targets Marc persona, links to `/equitation-adulte` in-context)
- Created new `premier-cours-equitation-enfant.md` (~800 words, reassurance-first tone, targets Sophie persona, links to `/cours-enfants` in-context)
- Both articles use ISO 8601 dates, valid tags arrays, seoTitle/seoDescription/excerpt all populated
- `astro check` passed with 0 errors (2 pre-existing hints in SchemaMarkup.astro)
- `npm run build` succeeded; both article pages rendered; sitemap includes both URLs

**Code review fixes (2026-02-22):**
- Fixed grammar: "Vous marchés" → "Vous marchez" (`reprendre-equitation-40-ans.md:30`)
- Fixed grammar: "une bonne encadrement" → "un bon encadrement" (`premier-cours-equitation-enfant.md:44`)
- Fixed grammar: "on ne passe au trot" → "on ne passe pas au trot" (`premier-cours-equitation-enfant.md:50`)
- Fixed grammar: "c'est organisée" → "c'est organisé" (`premier-cours-equitation-enfant.md:52`)
- Fixed AC-5: added in-context link to `/equitation-adulte` in "Nos créneaux adultes" section of Article 1; removed duplicate end-of-article CTA paragraph (template already adds CTA via `[...slug].astro`)
- Fixed AC-5: added in-context link to `/cours-enfants` at end of "Et après le premier cours?" in Article 2; removed duplicate end-of-article CTA paragraph
- Shortened seoDescription Article 1 from ~178 to ~141 chars (Google truncation threshold)
- Shortened seoDescription Article 2 from ~171 to ~150 chars

### File List

- `src/content/blog/reprendre-equitation-40-ans.md` (modified — placeholder replaced with full article)
- `src/content/blog/premier-cours-equitation-enfant.md` (created — new article)

## Change Log

- 2026-02-22: Story 6-2 implemented — replaced article 1 placeholder and created article 2; build verified
