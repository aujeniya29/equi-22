# SEO Équi 22 — Suivi & prochaines étapes

_Dernière mise à jour : 2026-09-03_

> Ce fichier est le point de reprise. Il est écrit pour être lu sans contexte préalable : ce qui est fait, ce qui reste, qui doit agir, et les pièges rencontrés.

## ✅ Fait et déployé

### Sessions précédentes
- **Migration propre** : pages servies en 200 direct (`build.format: 'file'`), canonical/sitemap/liens alignés sans slash.
- **Redirections 301** des anciennes URLs `.html`, `index.php`, PDF `/article/*`.
- **Données structurées** : LocalBusiness, BlogPosting, BreadcrumbList sur le fil d'Ariane.
- **3 images Open Graph réparées** (elles étaient en 404 → partage social cassé).
- **Titres** : doublon « Équi 22 » supprimé sur 5 pages.

### Session du 2026-07-30 (7 commits, `f97cfaf` → `a0aa69f`)

**Visibilité IA rétablie** — c'était le seul point critique.
`robots.txt` bloquait `OAI-SearchBot`, `PerplexityBot` et `ClaudeBot`, qui ne sont pas des crawlers d'entraînement mais ceux qui alimentent les citations en temps réel. Le fichier distingue désormais les deux familles. `Google-Extended` débloqué → éligibilité aux AI Overviews (indissociable de l'entraînement Gemini chez Google, arbitrage assumé).
⚠️ Un **réglage Cloudflare** (Security → Bots) renvoyait en plus un 403 à ClaudeBot/PerplexityBot **indépendamment du fichier** — corrigé côté dashboard. Preuve que le blocage n'était pas dans le repo : `cohere-ai`, absent de `robots.txt`, recevait aussi un 403.

**Données structurées**
- `opens: "8:00"` → `"08:00"` (le type Time de Schema.org exige 2 chiffres ; c'était invalide sur toutes les pages).
- `@id` sur l'établissement ; Service et BlogPosting le référencent au lieu de redéclarer un nœud anonyme.
- `Service.name` ne sort plus de noms de types machine (`AnimalService`, `EducationalService` apparaissaient dans un champ lisible).
- `Product` + `Offer` sur `/vente/*` (prix HT, disponibilité dérivée de `vendu`).
- `BreadcrumbList` sur **20 pages sur 25** (contre 3) — accueil et pages légales exclues volontairement.
- `BlogPosting.author` en **Person** (Aurélia) au lieu d'Organization + signature affichée.
- `areaServed` élargi à Saint-Brieuc et aux Côtes-d'Armor, `hasMap` ajouté.

**Coordonnées GPS exactes** — `48.463969 / -2.70077`, vérifiées par géocodage inverse (Route de la Barre, hameau du Ruset, 22120). Les précédentes (`48.4833 / -2.8167`) pointaient le centre-bourg, à ~8,8 km.

**Contenu / on-page**
- Titres d'articles : le template utilisait `post.data.title` au lieu du `seoTitle` déjà rédigé (89 caractères sur un article).
- Titre `/vente/qely` : 134 → 59 caractères, faute « Irsh cob » corrigée (titre + corps).
- 4 CTA en français fautif (« nos élevage équin », « nos pension propriétaires »…) → champ `ctaLabel`.
- Titre de l'article balade recentré sur Saint-Brieuc/Yffiniac (voir « Où ne pas investir »).
- **28 liens contextuels** ajoutés sur 10 pages qui n'en avaient aucun ou presque.
- Galerie de 5 photos sur `/pension-chevaux` + section « Venez visiter » (le corps se terminait sur un titre orphelin).
- Bouton « Obtenir l'itinéraire » sur `/contact` et `/pension-chevaux`.

**Technique**
- 3 URLs legacy tombaient dans l'attrape-tout `/*.html` et atterrissaient sur le blog → repointées.
- Fallback de domaine `equi22.fr` (DNS inexistant) remplacé par un échec de build explicite ; même domaine corrigé dans les mentions légales, où il était affiché.
- Cache `immutable` sur `/_astro/*` (noms hashés, le TTL de 4 h imposait des revalidations inutiles).
- `boxes-1.jpg` : orientation EXIF 6 → rotation sans perte (`jpegtran`), les dimensions déclarées étaient fausses.
- Avertissement de build sur photos d'annonce manquantes (échec silencieux avant).
- Collection `news` orpheline supprimée (voir dette technique).

**Images de partage social (Open Graph) — `a0aa69f`**
`public/og-default.jpg` était un **JPEG tronqué de 381 octets** : en-tête et tables présentes, aucun marqueur SOS ni EOI, donc zéro pixel. `file` l'acceptait (il ne lit que l'en-tête), Cloudflare le servait en 200 avec le bon `content-type`, aucun build ne signalait rien. Les **19 pages** qui reposaient sur ce repli déclaraient donc une image indécodable : tout partage de l'accueil, des tarifs ou d'une page de service produisait un aperçu **sans visuel** sur Facebook, WhatsApp, LinkedIn, iMessage.
Les 3 images dédiées existantes étaient valides mais en ratio 1,50, donc recadrées arbitrairement.
→ **18 images générées en 1200×630** depuis les `heroImage` du dépôt (aucune photo demandée au client), recadrage biaisé vers le haut pour ne pas rogner les têtes, `exif_transpose` appliqué. `/vente/oraia` a l'image de la pouliche ; `ogImage` optionnel ajouté au schéma `vente` avec repli sur `/og/vente.jpg`.
**25 pages sur 25 servent désormais une image valide** (vérifié en décodant chaque fichier depuis la production, pas seulement son en-tête).

⚠️ **Action client, une fois** : les plateformes cachent les aperçus. Pour les liens **déjà partagés**, forcer un rafraîchissement via le [debugger Facebook](https://developers.facebook.com/tools/debug/) → « Scrape Again ». Test rapide : s'envoyer `https://equi-22.fr/pension-chevaux` sur WhatsApp, l'aperçu doit montrer deux cavalières sur des chevaux gris.

### Session du 2026-09-02 — mesure GSC puis action sur `/vente`

**Cinq semaines de recul sur le déploiement du 30/07. Il a produit son effet :**
août 611 clics / 10 074 impressions, contre 497 / 6 180 en juin. Les impressions montent
deux fois plus vite que les clics : le site est montré sur beaucoup plus de requêtes, mais
en position 8-14. Toutes les pages ont perdu en position moyenne tout en gagnant des
impressions — c'est la dilution normale d'une expansion de couverture, pas une régression.

**Deux fausses pistes écartées, à ne pas rouvrir :**
- Le doublon `www.equi-22.fr` en Search Console (2 918 impressions en août, position 3,7,
  face à `/` en position 9,3) **n'est pas un problème**. L'inspection d'URL renvoie
  `googleCanonical = https://equi-22.fr/`, `coverageState = Page avec redirection`, recrawl
  le 01/09. La 301 fonctionne, c'est de la consolidation en cours. Le passage de
  `http://www` (juin-juillet) à `https://www` (août) est d'ailleurs un signe de progression.
- **`/mountain-trail-ethologie` n'a pas « 0 mot de corps »** — `REPRISE.md` l'affirme
  « vérifié deux fois », c'est faux pour la page : elle sert **446 mots**, H1/H2 propres,
  titre correct. Le constat ne valait que pour le fichier `.md`, vide parce que le contenu
  vit dans le `.astro` (voir dette technique).

**Mountain Trail : la demande n'existe pas.** Sur 4 semaines et 4 479 impressions de
requêtes nommées, tout le sujet tient en 3 lignes (« kabe mountain trail », « parcours cso
club 2 », « vente obstacle mountain trail », 1 impression chacune). Les 71 impressions de la
page viennent de requêtes de marque. La page est indexée, recrawlée le 31/08 et pertinente :
si le volume existait, il apparaîtrait. Le seul levier utile est **hors site** — se faire
lister sur les pages mountain trail du CREB Bretagne et du CDE 22.

**Action menée : `/vente`** (1 020 impressions / 4 sem., position 14,2 — la plus mauvaise
d'une page majeure, et en dégradation depuis 10,0).
- **Bannière « Cette page est en cours de conception » retirée** — elle était servie en
  production alors que deux annonces sont publiées.
- **Ancrage régional** : titre, description, H1 et corps portent désormais Bretagne,
  Côtes-d'Armor et Saint-Brieuc. C'est là que le site gagne déjà (« marchand de chevaux
  bretagne » position 6,0 ; « chevaux a vendre bretagne » 10,6).
- **Intention vendeur traitée** : elle pèse ~175 impressions (« vendre un cheval » 68,
  « marchand de chevaux » 53, « commerce de chevaux » 27) contre ~100 pour l'intention
  acheteur, alors que la page était construite comme un catalogue. H2 « Vendre votre cheval :
  le dépôt-vente » et procédure en 6 étapes, rédigée uniquement à partir des conditions déjà
  présentes sur la page et dans le contrat PDF (aucune donnée inventée).
- **Annonces remontées avant le dépôt-vente** : un acheteur ne traverse plus la prose vendeur
  pour voir les chevaux.
- **Les annonces sans photo passent en fin de liste** — Qely ouvrait la page sur un
  placeholder gris.
- **Lien interne** ajouté depuis `/pension-chevaux` vers `/vente` (la page n'était liée que
  par le menu et le pied de page).
- Résultat : `/vente` passe de 258 à **564 mots**, avec 3 liens internes contextuels.

**Indexation : 22 URLs du sitemap sur 23 sont indexées.** La seule exception est traitée
dans « À surveiller ».


### Session du 2026-09-03 — portes ouvertes du 12 septembre

**Constat le plus urgent, hors code : l'affiche de la cliente imprime `www.equi22.fr`,
qui n'existe pas.** `dig` ne renvoie rien, `whois` renvoie `NOT FOUND` chez l'AFNIC : le
domaine n'est pas déposé. Toute personne qui saisit l'adresse de l'affiche tombe sur une
erreur de navigateur. Deux réponses, cumulables : **déposer `equi22.fr`** (~10 €/an) et le
rediriger en 301 vers `equi-22.fr` — ce qui rattrape les affiches déjà diffusées et ferme la
porte à un dépôt par un tiers — et **corriger le visuel** avant toute nouvelle impression.
C'est le deuxième passage de ce domaine fantôme sur le projet : il était déjà affiché à tort
dans les mentions légales, corrigé le 30/07.

**Arbitrage : page permanente plutôt qu'article daté.** Un article
`actualites/porte-ouverte-septembre-2026` ne vaut plus rien le 13 septembre. `/portes-ouvertes`
est reconduite d'une édition à l'autre : elle accumule les liens des agendas locaux et absorbe
l'ancienne URL du CMS `Portes-ouvertes-…_fiche_276.html`, que Google sert toujours et qui
tombait jusqu'ici dans l'attrape-tout `/*.html` — donc en soft 404 sur le blog.

**Positionnement : la saison, pas l'événement.** « porte ouverte centre équestre yffiniac » n'a
aucun volume, et une page publiée à 9 jours n'a pas le temps de se positionner. En revanche
septembre est le pic de « inscription équitation » / « cours poney enfant ». La page est donc
construite sur **inscriptions 2026/2027**, la porte ouverte étant le moment de conversion.
Elle continue de travailler après le 12.

**Livré**
- `src/pages/portes-ouvertes.astro` — 429 mots, schema `Event`, fil d'Ariane, 6 liens internes
  contextuels (`/cours-enfants`, `/equitation-adulte`, `/stages-vacances`, `/competitions`,
  `/tarifs`, `/pension-chevaux`). Titre 57 car., description 157 car.
- `src/data/portes-ouvertes.ts` — données de l'édition isolées : **reconduire une année = éditer
  ce seul fichier**. Dates absolues partout (« samedi 12 septembre 2026 », jamais « ce samedi »),
  pour que la page reste exacte même sans redéploiement après l'événement.
- `src/components/PortesOuvertesBanner.astro` — bandeau d'accueil sous le hero. Deux garde-fous :
  `editionAVenir` évalué au build, **plus** un script inline qui le retire côté navigateur si la
  date de fin est dépassée. Sans le second, faute de déploiement après le 12, l'accueil
  continuerait d'annoncer un rendez-vous révolu.
- `public/_redirects` — `/Portes-ouvertes-* /portes-ouvertes 301`, placée **avant** l'attrape-tout.
  Splat plutôt que slug exact : le libellé complet de l'ancienne URL n'est pas connu.
  ⚠️ Non testable en local (`astro preview` n'applique pas `_redirects`) — **à vérifier en
  production après déploiement**.
- `public/og/portes-ouvertes.jpg` — 1200×630, recadré sur la bande haute de l'affiche
  (« PORTE OUVERTE » + « SAMEDI 12/09/26 » lisibles en aperçu). Décodé après génération, pas
  seulement vérifié par son en-tête.
- L'affiche passe par `astro:assets` (`src/assets/images/portes-ouvertes/`), donc avec
  `width`/`height` — l'erreur de `fete-du-club-juin-2026.md` n'est pas reproduite.
- **L'affiche publiée est retouchée sur un seul point** : l'URL du pied de page, imprimée
  « www.equi22.fr » (domaine non déposé), est remise à « www.equi-22.fr ». Publier le visuel
  d'origine sur le site reviendrait à renvoyer les lecteurs vers une erreur de navigateur.
  Retouche faite au pixel : fond marine plat mesuré à `RGB(0,41,81)`, texte recomposé en
  Helvetica Neue Medium 20 px, calé sur la bbox d'encre d'origine (136×18 px, centre x 514,5)
  — largeur finale 143 px, même graisse, même ligne de base.
  L'original de la cliente est conservé intact dans
  `docs/affiche-portes-ouvertes-2026-original-cliente.jpg` — dossier **non versionné**, comme
  les autres visuels bruts de la cliente. La description de la retouche ci-dessus est donc la
  seule trace pérenne : ne pas la supprimer.
  ⚠️ Les images OG (`/og/portes-ouvertes.jpg`, `/og/portes-ouvertes-gbp.jpg`) sont des
  recadrages de la **bande haute** de l'affiche : elles ne contiennent pas le pied de page,
  donc pas l'URL. Rien à régénérer de ce côté.
  → **Transmettre le fichier corrigé à la cliente** pour ses partages Facebook/Instagram : le
  site est réparé, pas ce qu'elle diffuse.
- `mainMenu` (pied de page + menu mobile) reçoit « Portes ouvertes ». Pas la barre desktop : la
  page ne doit pas rester orpheline une fois le bandeau retiré, sans occuper une place hors saison.

**Décisions de balisage**
- `Event` est légitime : les résultats enrichis Événement sont toujours servis, contrairement à
  `FAQPage` (retiré le 07/05/2026) et `HowTo` (déprécié). Gain SERP attendu modeste pour un
  événement local ; l'intérêt réel est la lisibilité par Maps et par les moteurs de réponse.
- **`offers` volontairement absent.** L'affiche n'annonce aucun tarif, ni pour l'entrée ni pour
  les balades à poney. Écrire « gratuit » serait une invention.

**En attente de la cliente**
- **L'entrée est-elle libre ?** Si oui → ajouter `isAccessibleForFree: true` et un `offers` à 0 €
  dans le schema, et l'écrire sur la page (c'est un argument d'affluence).
- **Les balades à poney sont-elles payantes ?**
- **Faut-il s'inscrire à l'avance** pour les balades ou les spectacles, ou tout est-il libre ?
- **Horaire des spectacles** — un créneau annoncé ferait venir les gens à une heure précise.

**Hors site — c'est là que se joue l'affluence, pas dans le SEO**
Aucune de ces actions n'est du code, et toutes valent plus que la page elle-même pour le 12 :
1. **Post « Événement » sur la fiche Google Business Profile** — la fiche pèse 70-80 % du trafic
   local. Le plus rentable, ~10 min.
2. **Ouest-France Infolocale** (soumission gratuite, publication + lien) et **Le Télégramme**.
3. **Agenda de la mairie d'Yffiniac** et bulletin municipal.
4. **Côtes d'Armor Tourisme** — l'audit a trouvé la fiche du club indexée mais en **404** :
   occasion de la faire réparer *et* d'y faire annoncer l'événement.
5. **Fiche club FFE** (`cde22.ffe.com`), où l'affiliation est déjà confirmée.

Ces soumissions sont le seul levier qui serve **à la fois** l'affluence du 12 et le SEO : ce sont
des backlinks locaux, et c'est précisément ce qui manque le plus au site (backlinks en Tier 0).

**Après l'événement**
- Republier la page en mode « édition passée » (automatique au prochain build) et y ajouter une
  rétrospective en photos — matière pour `/a-propos` et pour les réseaux.
- Vérifier en Search Console que `/portes-ouvertes` est indexée et que l'ancienne URL
  `Portes-ouvertes-…` bascule bien vers elle.

---

## ⏳ À faire

### 1. Priorité absolue — HORS SITE (le client, aucun code)

**Google Business Profile = 70-80 % du trafic local.** Fiche à 4,3/5, 213 avis. Rien de ce qui a été fait sur le site ne remplace ça.

Par impact/heure :
1. **Vérifier la catégorie principale** — « École d'équitation » plutôt que « Club de sport ». ~10 min. C'est le facteur de classement local n°1, et la mauvaise catégorie est le facteur négatif n°1.
2. Vélocité des avis (date du dernier avis ?) et réponse à 100 % des avis.
3. Créer/revendiquer **Pages Jaunes, Bing Places, Apple Business Connect** (~1 h 30 au total).
4. Vérifier la fiche club **FFE** (le club a des licenciés, une fiche existe probablement).
5. Compléter services, photos, posts et Q&A — le contenu existe déjà sur le site, à copier.

⚠️ Les avis Google **ne génèrent pas d'étoiles** via le schema du site (Google l'interdit pour LocalBusiness). Ils travaillent via la fiche GBP ; les afficher sur le site sert la **conversion** uniquement. Le site est conforme sur ce point, ne pas « corriger ».

### 2. En attente d'informations client

- **Prix Mountain Trail** → le tableau de `/tarifs` affiche des en-têtes et **zéro ligne** (les 9 autres services en ont 5 à 12). Manque `pricing` dans `mountain-trail-ethologie.md`.
- **Photos de `/vente/qely`** → l'annonce à 2 500 € n'a **aucune image**. Le frontmatter réclame `sultan-01/02/03.jpg`, reliquats d'un autre cheval ; le dossier `src/assets/images/vente/qely/` n'existe pas. Le build l'avertit désormais à chaque exécution.
- **N° d'affiliation FFE** et **année de création du club** → à ajouter dans `business.ts` et sur `/a-propos`. Meilleur levier E-E-A-T restant.
- **SIRET / forme juridique** → `business.ts:40` porte encore un `TODO` alors qu'une valeur est affichée sur les mentions légales (page à valeur légale). À confirmer sur un Kbis.
- **Horaires réels** → Lun-Sam 8h-20h identiques chaque jour est inhabituel pour un centre équestre. Vérifier la cohérence avec la fiche GBP.

### 3. Contenu à étoffer (mesuré le 2026-07-30, mots dans `<main>`)

| Page | Mots | Note |
|---|---|---|
| `/vente/qely` | 149 | + photos manquantes |
| `/vente/oraia` | 191 | |
| ~~`/vente`~~ | ~~258~~ → **564** | traité le 2026-09-02 |
| `/sorties-scolaires` | 313 | |
| `/pension-equides-club` | 407 | |
| `/a-propos` | 418 | **page pivot E-E-A-T**, à traiter en premier |
| `/mountain-trail-ethologie` | 440 | contenu dans le `.astro`, pas dans le `.md` |
| `/balades` | 532 | |
| `/equitation-adulte` | 703 | plus mince que l'article qui l'alimente → cannibalisation |

Pages courtes mais **normales** (ne pas étoffer) : `/contact` 134, `/actualites` 158 (liste de cartes), `/mentions-legales` 293, `/politique-confidentialite` 478.

> Les deux articles de blog (829 et 890 mots) sont **à la bonne longueur**. Le seuil de 1 500 mots vaut pour du contenu concurrentiel ; ici on est sur du long-tail local où la densité de faits compte plus que le volume. Ne pas les délayer.

### 4. Décisions techniques en attente

- **HSTS** — absent. `max-age` long + `preload` est difficilement réversible : prévoir une montée progressive (ex. 300 s, puis 1 an) avant tout `preload`.
- **CSP** — absente. Le site a du JSON-LD inline, un script de menu inline et Umami en tiers : une CSP mal calibrée casse la page. Commencer en `Content-Security-Policy-Report-Only`.
- **`npm run check-links` est inutilisable** — il rapporte systématiquement 20 liens morts, **tous faux** : avec `build.format: 'file'` le fichier est `mentions-legales.html`, pas `mentions-legales/index.html`, et linkinator vérifie le disque. Soit le lancer contre un serveur (`linkinator http://localhost:4322 --recurse`), soit le retirer. En l'état il apprend à ignorer son résultat.
- **Prix recopiés dans les articles** — les deux articles citent des tarifs qui vivent aussi dans le frontmatter des services. Deux sources de vérité, dérive garantie. Choix assumé pour l'instant (ces chiffres sont ce qu'une IA extrait), à surveiller.
- **IndexNow** — non implémenté. Nice-to-have : le site publie peu et Google domine le trafic local.
- **`viewport`** — `width=device-width` sans `initial-scale=1`. Sans effet visible sur les navigateurs modernes.
- **Attrape-tout `/*.html → /actualites`** — cause racine non traitée : toute URL legacy non mappée atterrit sur le blog, ce que Google traite en soft 404. 3 cas corrigés, il peut en rester (visibles seulement dans la Search Console).

### 5. Articles à écrire (5 sujets, zone locale)

1. **Baby-poney : à quel âge inscrire son enfant ?** → `/cours-enfants`, `/stages-vacances`
2. **Combien coûte une pension pour cheval en Côtes-d'Armor ?** → `/pension-chevaux`, `/tarifs`
3. **Stages d'équitation des vacances : guide des parents** (saisonnier) → `/stages-vacances`
4. **Anniversaire & baptême poney à Yffiniac** (conversion/cadeaux) → `/contact`, `/cours-enfants`
5. **Demi-pension : monter sans acheter de cheval** → `/pension-equides-club`, `/tarifs`

> Chaque article doit lier 2-3 pages de service dans le corps.

---

## 🎯 Où ne pas investir

Analyse SERP : sur 7 requêtes cibles, une seule est gagnable organiquement.

| Requête | Verdict |
|---|---|
| « centre équestre yffiniac » | **Gagnable, déjà largement gagnée** |
| « cours équitation adulte débutant côtes d'armor » | **Partiellement gagnable** — le site y figure déjà |
| « centre équestre saint brieuc » | Local Pack, concurrents *dans* la ville → GBP, pas contenu |
| « poney club enfant 22 » | Local Pack → catégorie GBP |
| « pension chevaux côtes d'armor » | Places de marché (« 28 pensions comparées ») → **s'y faire lister** |
| « stage équitation vacances bretagne » | Plateformes de réservation régionales → idem |
| « balade à cheval côtes d'armor » | Office de tourisme départemental → imbattable en direct |

Pour les quatre dernières : **référencement dans ces annuaires** + long-tail qualifié par ville (« balade à cheval Yffiniac », « pension chevaux Saint-Brieuc »), où le terrain est vide. Ne pas écrire de contenu pour battre `cotesdarmor.com` sur sa propre requête.

Ajout du 2026-09-02 : **Mountain Trail**. Aucune demande mesurable dans Google (3 impressions
en 4 semaines, toutes marginales). La page est bonne, le sujet ne se cherche pas en ligne — il
se joue en club et en compétition. Levier hors site uniquement : listing CREB Bretagne / CDE 22.

## ❌ Ce qu'il ne faut PAS faire

- **Pas de FAQPage pour le SEO Google.** Google a retiré les rich results FAQ pour tous les sites le **2026-05-07**. Aucun bénéfice SERP confirmé. (L'ancienne version de ce fichier le recommandait — obsolète.)
- **Pas de schema HowTo** — déprécié depuis 2023.
- **Pas d'`aggregateRating`/`Review` auto-déclaré** sur LocalBusiness — interdit par Google. Le site est conforme.
- **Pas de pages-villes en série** (`/equitation-lamballe`, etc.) — un seul site physique, ce seraient des doorway pages. Renforcer les pages de service existantes avec des mentions naturelles des communes voisines (Lamballe, Hillion, Plérin sont absentes du contenu).
- **Pas d'iframe Google Maps** sans arbitrage : elle dépose des cookies et invaliderait `/politique-confidentialite` qui affiche « sans cookies, sans bandeau de consentement ». D'où le lien d'itinéraire plutôt qu'une carte intégrée. Alternatives si une carte est voulue : fond OpenStreetMap, ou chargement au clic.
- **Pas de `inlineStylesheets: 'always'`** — testé et annulé. Le bundle Tailwind fait **141 Ko** : l'inliner fait passer chaque page HTML de 60 à 200 Ko et supprime la mutualisation du CSS entre pages. Le vrai sujet est la taille du bundle.

## 🔧 Dette technique

- `services/mountain-trail-ethologie.md` a un **corps vide** — seul son frontmatter sert (tarifs). Le contenu de la page est dans `src/pages/mountain-trail-ethologie.astro`. Éditer le `.md` n'aura aucun effet visible.
- `public/logo.png` fait **704 Ko** (référencé uniquement en JSON-LD, jamais rendu → aucun impact CWV, mais à compresser).
- `actualites/fete-du-club-juin-2026.md` référence une image de **633 Ko** dans son corps, via Markdown brut vers `public/actualites/`, hors pipeline `astro:assets` → pas de `width`/`height`, risque CLS sur cette page. **Seul le partage social est réglé** (une version OG de 146 Ko a été générée) ; l'image du corps reste à migrer vers `src/assets/images/`.
- Fichiers morts : `public/team/aurelia.jpg` (253 Ko), `public/favicon.webp` (non référencé, `BaseLayout` n'utilise que `.png` et `.ico`).
- « Qely de Bihan **braz** » (minuscule) vs « Oraia de Bihan **Braz** » — incohérence sur le suffixe d'élevage, à trancher.
- `ctaLabel` n'est renseigné que sur les 4 pages où la dérivation du titre échouait ; un futur service au titre singulier reproduira le problème.
- **LCP mobile accueil à 2,89 s** (seule métrique hors « Good »), causée par 141 Ko de CSS bloquant. Donnée **labo** — pas de clé CrUX configurée, donc non confirmée en conditions réelles.

## 📋 À surveiller

**Google Search Console**
- ⚠️ **`/actualites/balade-a-cheval-bretagne` : la seule URL du sitemap non indexée.** Google a
  retenu comme canonique l'ancienne variante **avec slash final**, `…-bretagne/`, dernier crawl
  le **2026-07-01** — soit *avant* la session du 30/07. La bonne URL est en « Détectée,
  actuellement non indexée », jamais crawlée. Conséquence : l'article est figé sur un instantané
  d'il y a deux mois (pas de signature, ancien titre, pas de fil d'Ariane) et ses impressions ont
  reculé de 104 à 48 pendant que toutes les autres pages progressaient. Le 308 vers la bonne URL
  est en place, il n'y a rien à corriger dans le code : c'est une demande de réexploration à
  pousser. **Tenté le 2026-09-02 via l'Indexing API — sans effet** (voir « Pièges de
  vérification »). Le sitemap a été resoumis via l'API Search Console (soumission enregistrée,
  passée du 2026-06-12 au 2026-09-02), mais ça ne cible pas l'URL. **Le seul levier fiable est
  manuel** : Search Console → Inspection d'URL → « Demander une indexation », quota ~1 URL/jour.
  L'article n'est pas orphelin : il est lié depuis l'accueil et depuis `/actualites`.
  À revérifier sous deux semaines.
- Les motifs corrigés (canonique / 404 / robots.txt) doivent retomber → cliquer « Valider le correctif ».
- « Page avec redirection » et « non indexées » = anciennes URLs, décroissent seules.
- Apparition de `/pension-chevaux` sur « pension chevaux **Yffiniac** » (long-tail, pas département).
- Titres réécrits : 5 pages ont un nouveau `<title>`, les extraits SERP mettront quelques jours à quelques semaines à suivre.

**Citations IA** (~2 semaines après le déblocage)
- Tester une question factuelle du type « combien coûte une pension pour cheval près de Saint-Brieuc » dans ChatGPT/Perplexity. L'éligibilité est rétablie, la présence demande un recrawl.
- Contrôle d'accès : `curl -A "ClaudeBot" -o /dev/null -w "%{http_code}" https://equi-22.fr/pension-chevaux` → doit renvoyer **200**.

---

## Repères techniques

- **Stack** : Astro (static) + Cloudflare Pages, déploiement automatique depuis `main`. Build : `npm run build`.
- **Redirections** : `public/_redirects` — règles spécifiques **avant** les attrape-tout (premier match gagne).
- **En-têtes** : `public/_headers` — porte le `X-Robots-Tag` de `/documents/*` **et** le cache `/_astro/*`. Non testable en local (`astro preview` ne les applique pas).
- **Données structurées** : `src/components/SchemaMarkup.astro` (LocalBusiness + Service), `src/components/Breadcrumb.astro`, `src/pages/actualites/[...slug].astro` (BlogPosting), `src/pages/vente/[slug].astro` (Product).
- **Layout SEO** (title/canonical/OG/robots) : `src/layouts/BaseLayout.astro`. Le canonical et le titre sont calculés séparément — la normalisation `.html` y est dupliquée dans `SchemaMarkup.astro`, garder les deux alignées.
- **Infos établissement** : `src/data/business.ts` — exporte aussi `mapsDirectionsUrl` (construit sur les coordonnées).
- **Collections** : `src/content.config.ts` → `services`, `actualites`, `vente`. Champs SEO notables : `seoTitle`, `seoDescription`, `ogImage`, `ctaLabel` (libellé du CTA), `author` (défaut Aurélia, surchargeable par article).
- ⚠️ **`serviceType`** est un **texte descriptif** (propriété Schema.org de Service), pas un `@type`. Seule exception traitée comme un vrai `@type` : `EducationalOccupationalProgram`.

## 🧪 Pièges de vérification (retours d'expérience)

Faux négatifs rencontrés dans la session — tous dus à la méthode de contrôle, aucun au site :

1. **Cache Cloudflare** — après un déploiement, certaines pages sont encore servies en ancienne version. Toujours ajouter une query string aléatoire : `curl "https://equi-22.fr/page?cb=$RANDOM"`.
2. **Chaîne de détection non unique** — chercher `href="/vente"` sur `/elevage` matche le **menu global**, pas le lien ajouté. Utiliser une chaîne propre à la modification.
3. **`grep -o` avec `.\{40\}`** — `.` ne matche pas `\n`, et le HTML rendu du Markdown contient des retours à la ligne entre paragraphes. Le lien est présent, le motif ne le voit pas.
4. **Retrait de `<nav>`/`<footer>` par regex** — avale le corps de certaines pages. Pour isoler la prose d'un article, parser `<div class="prose">`.
5. **Commit sans effet sur la sortie** (suppression de code mort, renommage de variable) — il n'y a alors *rien* à détecter en production. Vérifier la santé du site, pas le déploiement.
6. **En-tête valide ≠ fichier valide** — c'est ce qui a masqué `og-default.jpg` pendant des mois : `file` et le `content-type` HTTP ne lisent que l'en-tête. Pour valider une image, la **décoder** (`PIL.Image.open().load()`), pas se fier à son type déclaré.
7. **Boucle séquentielle sur 23 pages avec `?cb=`** → dépasse les 2 min. Télécharger les fichiers en parallèle (`&` + `wait`) et valider ensuite, ou cibler la vraie question plutôt que de tout scruter.

8. **L'Indexing API renvoie `200` sans rien enregistrer** — testé le 2026-09-02 sur
   `/actualites/balade-a-cheval-bretagne`. `urlNotifications:publish` répond `200`, mais avec un
   `urlNotificationMetadata` **amputé de son bloc `latestUpdate`**, et `urlNotifications/metadata`
   renvoie `404 NOT_FOUND` sur la même URL, à +5 s comme à +90 s. C'est la restriction officielle
   (`JobPosting` / `BroadcastEvent` uniquement) qui s'applique silencieusement, avec un code de
   succès. Ce n'est pas un problème de droits : un compte de service non propriétaire renverrait
   un `403` sur la vérification d'ownership. **Ne pas conclure d'un `200` que la demande est
   passée** — contrôler `latestUpdate`, puis l'endpoint `metadata`.

Bon signal de détection de déploiement : une valeur **numérique qui change** (taille de fichier, `content-length`), pas une chaîne qui pourrait déjà exister ailleurs dans la page.

Règle générale : quand une vérification contredit ce que le code dit faire, **soupçonner d'abord la vérification**.
