# Photos nécessaires pour le site Equi 22

Ce document liste toutes les photos manquantes ou à remplacer sur le site, avec la destination dans le code et les dossiers sources potentiels dans `docs/nouvelles-photos/`.

---

## Statut global des photos

| Catégorie | Statut |
|-----------|--------|
| Logo | ✅ OK |
| Hero – toutes les pages services | ✅ Existant (PNG générés) — à améliorer avec vraies photos |
| Élevage – photos des animaux | ✅ OK |
| Hero – élevage | ✅ OK |
| **Hero – À propos** | ❌ Manquant |
| **Galerie – page À propos (10 photos)** | ❌ Manquant |
| **Équipe – 2 moniteurs** | ❌ Manquant |
| **Vente – Sultan (3 photos)** | ❌ Manquant |

---

## 1. Hero – Page "À propos"

**Destination :** `src/assets/images/hero/a-propos.{jpg,webp}`  
**Usage dans le code :** `src/pages/a-propos.astro` ligne ~119 (section Hero, actuellement sans image)  
**Description souhaitée :** Vue générale du centre ou ambiance chaleureuse (cavaliers, installations, équipe)

**Dossiers sources potentiels :**
- `Infrastructures/` — vues du centre
- `Equipe passionnée/` — ambiance avec l'équipe
- `Portes ouvertes/` — vie du centre

---

## 2. Galerie – Page "À propos" (10 photos)

Section galerie organisée par zones. Destination : `src/assets/images/gallery/`

### 2a. Carrières (2 photos)
**Fichiers cibles :** `gallerieCarrieres1.jpg`, `gallerieCarrieres2.jpg`  
**Description :** Carrières extérieure et/ou couverte, idéalement avec cavaliers en action

**Sources potentielles :**
- `Infrastructures/` — photos des installations

---

### 2b. Boxes (2 photos)
**Fichiers cibles :** `gallerieBoxes1.jpg`, `gallerieBoxes2.jpg`  
**Description :** Boxes des chevaux, propres, bien éclairés

**Sources potentielles :**
- `Infrastructures/`
- `Bien-être animal/`

---

### 2c. Paddocks & Prés (2 photos)
**Fichiers cibles :** `galleriePaddocks1.jpg`, `galleriePaddocks2.jpg`  
**Description :** Chevaux au pré ou dans les paddocks, ambiance naturelle

**Sources potentielles :**
- `Bien-être animal/`
- `Infrastructures/`
- `Elevage/`

---

### 2d. Chemins de randonnée (2 photos)
**Fichiers cibles :** `gallerieChemins1.jpg`, `gallerieChemins2.jpg`  
**Description :** Balade en extérieur sur les chemins autour du centre

**Sources potentielles :**
- `Balades/` — 25 photos disponibles

---

### 2e. Environnement (2 photos)
**Fichiers cibles :** `gallerieEnvironnement1.jpg`, `gallerieEnvironnement2.jpg`  
**Description :** Paysage breton, nature autour du centre

**Sources potentielles :**
- `Balades/`
- `Bien-être animal/`

---

## 3. Équipe – Page "À propos"

Destination : `src/assets/images/team/`  
**Usage dans le code :** `src/pages/a-propos.astro` lignes ~190-225

### 3a. Marie (Monitrice principale)
**Fichier cible :** `instructeur-1.jpg`  
**Description :** Portrait ou photo en action d'une monitrice

**Sources potentielles :**
- `Equipe passionnée/` — 5 photos
- `Tous niveaux/`
- `Ethologie/`

---

### 3b. Thomas (Moniteur compétition)
**Fichier cible :** `instructeur-2.jpg`  
**Description :** Portrait ou photo en action d'un moniteur

**Sources potentielles :**
- `Equipe passionnée/` — 5 photos
- `Dressage/`
- `CSO/`

---

## 4. Vente – Sultan

Destination : `src/assets/images/vente/sultan/`  
**Usage dans le code :** `src/content/vente/sultan.md` + `src/pages/vente/[slug].astro`

### 4a. Photo principale
**Fichier cible :** `sultan-01.jpg`  
**Description :** Belle photo de Sultan, cadrage portrait ou 3/4

### 4b. Photos galerie
**Fichiers cibles :** `sultan-02.jpg`, `sultan-03.jpg`  
**Description :** Photos complémentaires sous différents angles ou en mouvement

> ⚠️ Ces photos dépendent de si Sultan est toujours à la vente et si des photos existent.

---

## 5. Améliorations optionnelles – Heroes des pages services

Les heroes actuels sont des PNG générés (probablement IA ou placeholders). Ils peuvent être remplacés par de vraies photos du centre pour plus d'authenticité.

| Page | Fichier actuel | Description idéale | Sources potentielles |
|------|---------------|-------------------|---------------------|
| Homepage | `hero/homepage.png` | Cavalières/cavaliers en action, ambiance Bretagne | `Balades/`, `Tous niveaux/` |
| Cours enfants | `hero/cours-enfants.png` | Enfants sur poneys dans le manège | `Stages/`, `Tous niveaux/` |
| Équitation adulte | `hero/equitation-adulte.png` | Adulte en cours dans la carrière | `Dressage/`, `Tous niveaux/` |
| Pension chevaux | `hero/pension-chevaux.png` | Cheval dans son box ou au paddock | `Bien-être animal/`, `Infrastructures/` |
| Stages vacances | `hero/stages-vacances.png` | Groupe d'enfants pendant un stage | `Stages/` — 19 photos |
| Compétitions | `hero/competitions.png` | Cavalier en compétition (CSO, dressage…) | `CSO/`, `Dressage/`, `Cross/`, `Remise des prix- Concours/` |
| Élevage | `elevage_small.jpg` | Jument et poulain, ou étalon en liberté | `Elevage/` — 31 photos |

---

## Inventaire des dossiers sources disponibles

| Dossier | Nb photos | Contenu probable |
|---------|-----------|-----------------|
| `Association bénévoles/` | 14 | Événements associatifs, bénévoles |
| `Balades/` | 25 | Randonnées à cheval, extérieur breton |
| `Bien-être animal/` | 26 | Chevaux au pré, soins, boxes |
| `Convivialité/` | 12 | Moments de partage, vie du centre |
| `Cross/` | 19 | Compétition cross-country |
| `CSO/` | 18 | Saut d'obstacles |
| `Dressage/` | 30 | Dressage en carrière |
| `Elevage/` | 31 | Étalons, poulinières, poulains |
| `Equipe passionnée/` | 5 | Moniteurs, équipe |
| `Ethologie/` | 15 | Travail à pied, éthologie |
| `Hunter/` | 18 | Hunter, équitation en extérieur |
| `Infrastructures/` | 39 | Bâtiments, carrières, boxes, paddocks |
| `Lamotte/` | 12 | Concours/déplacement Lamotte |
| `Mountain trail/` | 14 | Mountain trail (discipline) |
| `Portes ouvertes/` | 26 | Journées portes ouvertes |
| `Remise des prix- Concours/` | 22 | Podiums, remises de prix |
| `Stages/` | 19 | Stages vacances enfants |
| `Tous niveaux/` | 6 | Cours tous niveaux |
