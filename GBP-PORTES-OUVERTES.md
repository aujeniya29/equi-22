# Google Business Profile — porte ouverte du 12 septembre 2026

_Préparé le 2026-09-03. Textes prêts à copier-coller._

La fiche GBP pèse 70-80 % du trafic local du club. Pour l'affluence du 12 septembre, elle
compte davantage que la page du site : elle s'affiche dans le Local Pack et sur Maps, là où
les gens cherchent « centre équestre » près de chez eux.

Ordre d'exécution recommandé : **§ 1 d'abord** (5 minutes, c'est de la mise en conformité),
puis § 2.

---

## 1. Deux réglages de fond, à faire avant de publier quoi que ce soit

### 1.1 Le nom de la fiche — conformité

D'après l'audit du 30/07/2026, corroboré par deux sources indépendantes, la fiche s'appelle :

> Équi 22- Centre Equestre Saint Brieuc- Yffiniac

Google impose que le champ « nom » contienne **le nom réel de l'établissement, et rien
d'autre**. Y ajouter une activité et deux communes est un motif documenté de suspension de
fiche — et une fiche suspendue disparaît du Local Pack et de Maps, ce qui coûterait bien plus
que ce que ces mots-clés rapportent.

**À remettre à :** `Équi 22`

⚠️ **Attendez-vous à une baisse temporaire** sur « centre equestre saint brieuc » (position
moyenne 4,8 aujourd'hui). C'est le prix de la mise en conformité, et la raison pour laquelle
il vaut mieux le faire **maintenant**, avant l'événement et avant les prochains déploiements :
sinon les variations de métriques deviennent inattribuables.

Vérifiez d'abord si le nom a déjà été corrigé — c'était l'action décidée en fin de session du
30/07 et je n'ai pas accès à la console pour le confirmer.

### 1.2 La catégorie principale

C'est le **facteur de classement local n° 1**, et une mauvaise catégorie est le premier
facteur négatif. Si la catégorie principale est « Club de sport », c'est trop générique.

**Viser :** « École d'équitation » en catégorie principale.

Le libellé exact dépend du sélecteur Google — tapez « équitation » et « équestre » dans le
champ et prenez ce qui colle le mieux. En **catégories secondaires**, ajoutez ce qui
correspond à des activités réelles du club, chacune adossée à une page du site :
pension pour chevaux (`/pension-chevaux`), élevage (`/elevage`), balades / tourisme équestre
(`/balades`).

---

## 2. Le post « Événement »

Dans la console : **Promouvoir → Ajouter une actualité → Événement**.
Le type « Événement » est le bon : contrairement à une actualité simple, il porte des dates et
**reste affiché jusqu'à la date de fin**.

### Titre

```
Porte ouverte & inscriptions 2026/2027
```

_38 caractères. La limite du champ est de 58._

### Dates

| Champ | Valeur |
|---|---|
| Date de début | 12/09/2026 |
| Heure de début | 14:00 |
| Date de fin | 12/09/2026 |
| Heure de fin | 18:00 |

### Description

Les 100 premiers caractères seuls s'affichent avant le « Plus » : l'essentiel est en tête.

```
Samedi 12 septembre, de 14h à 18h, le centre équestre Équi 22 ouvre ses portes à Yffiniac. Une après-midi 100 % cheval, pour les petits comme pour les grands, cavaliers ou non.

Au programme :
• Inscriptions aux cours et aux activités pour la saison 2026/2027
• Balades à poney pour les enfants
• Visite des écuries et des installations
• Spectacles et démonstrations de nos cavaliers
• Restauration et buvette sur place

Venez à l'heure qui vous arrange entre 14h et 18h, sans rendez-vous. C'est l'occasion de visiter le club, de rencontrer les monitrices et de poser toutes vos questions avant de vous inscrire.

Le club se trouve Route de la Barre, à Yffiniac, à quelques minutes de Saint-Brieuc, Langueux et Trégueux. Attention : cette route de campagne n'a pas de numéro, l'adresse seule ne suffit pas à un GPS — utilisez le bouton « Itinéraire » de cette fiche.

Programme complet : https://equi-22.fr/portes-ouvertes
```

_923 caractères. La limite du champ est de 1 500._

### Bouton d'action

| Champ | Valeur |
|---|---|
| Bouton | **En savoir plus** |
| Lien | `https://equi-22.fr/portes-ouvertes` |

### Photo

Utiliser **`public/og/portes-ouvertes-gbp.jpg`** (1200 × 900, format 4:3 attendu par Google).
C'est l'affiche recadrée sur « PORTE OUVERTE », la date et les horaires — le reste de
l'affiche serait rogné par Google et deviendrait illisible.

Profitez-en pour ajouter aussi **l'affiche entière** dans l'onglet Photos de la fiche
(`src/assets/images/portes-ouvertes/affiche-portes-ouvertes-2026.jpg`) : dans la galerie, le
format portrait n'est pas recadré.

⚠️ **Utilisez bien ce fichier-là, pas l'original de la cliente.** L'URL de son pied de page
est corrigée (`www.equi-22.fr` au lieu de `www.equi22.fr`, qui n'est pas un domaine déposé).
L'original est archivé en local dans `docs/affiche-portes-ouvertes-2026-original-cliente.jpg`
(dossier non versionné).
Le même fichier corrigé est à transmettre à la cliente pour ses publications Facebook et
Instagram.

---

## 3. Post de rappel — à publier le jeudi 10 ou vendredi 11

Type **Actualité** (pas Événement : le champ titre n'existe pas sur ce type, c'est normal).

```
La porte ouverte, c'est ce samedi 12 septembre, de 14h à 18h !

Balades à poney pour les enfants, visite des écuries, spectacles de nos cavaliers, restauration sur place — et les inscriptions 2026/2027 se font sur place.

Vous pouvez gagner du temps en téléchargeant la fiche d'inscription à l'avance et en l'apportant remplie.

On vous attend Route de la Barre, à Yffiniac. Venez quand vous voulez entre 14h et 18h.
```

| Champ | Valeur |
|---|---|
| Bouton | **En savoir plus** |
| Lien | `https://equi-22.fr/portes-ouvertes` |

---

## 4. Questions/réponses

Le propriétaire d'une fiche peut poser une question **et y répondre lui-même** : c'est une
fonctionnalité prévue par Google, pas un contournement. Les réponses s'affichent directement
dans la fiche et sont reprises par les moteurs de réponse.

Les trois questions ci-dessous n'utilisent que des informations déjà publiques (affiche +
site) :

> **Faut-il déjà savoir monter à cheval pour venir à la porte ouverte ?**
> Non, pas du tout. La porte ouverte est ouverte à tous, cavaliers ou non. C'est justement
> l'occasion de découvrir le club, de visiter les écuries et de laisser les enfants approcher
> les poneys pour la première fois.

> **Peut-on inscrire son enfant aux cours ce jour-là ?**
> Oui. Les inscriptions pour la saison 2026/2027 se font sur place le samedi 12 septembre, de
> 14h à 18h. La fiche d'inscription est aussi téléchargeable à l'avance sur
> https://equi-22.fr/portes-ouvertes

> **À quelle heure faut-il arriver ?**
> Quand vous voulez entre 14h et 18h. Il n'y a pas d'horaire imposé, les activités se
> déroulent tout au long de l'après-midi.

### À ajouter une fois confirmé avec la cliente

Je n'ai pas publié de réponse sur ces points, faute d'information fiable — l'affiche ne les
mentionne pas et je ne voulais rien inventer :

- **L'entrée est-elle libre ?** Si oui, c'est un argument d'affluence fort : à ajouter dans le
  post, dans les Q&A, et sur la page du site (plus `isAccessibleForFree` dans le balisage).
- **Les balades à poney sont-elles gratuites ou payantes ?**
- **Y a-t-il un parking sur place, et où se gare-t-on ?** — question systématique pour un
  événement en campagne.
- **L'heure des spectacles.** Un créneau annoncé fait venir les gens à une heure précise
  plutôt qu'« un jour dans l'après-midi ». C'est le détail qui remplit une cour.

---

## 5. Après l'événement

Post de type **Actualité**, avec 3 ou 4 photos de la journée. Deux bénéfices : c'est du
contenu frais sur la fiche (signal d'activité), et ça alimente la page `/portes-ouvertes`
pour l'édition suivante.

Pensez aussi à **répondre aux avis** qui suivront l'événement — la vélocité des avis et le
taux de réponse sont deux facteurs de classement local, et l'audit relève que le taux de
réponse n'est pas à 100 %.

---

## Ce que ce pack ne couvre pas

Les autres chantiers GBP et hors site (Pages Jaunes, Bing Places, Apple Business Connect,
fiche FFE, fiche Côtes d'Armor Tourisme actuellement en 404, remplissage des services)
restent listés dans `SEO-A-FAIRE.md`, § « À faire → Priorité absolue — HORS SITE ».

Pour la porte ouverte elle-même, les autres soumissions à faire cette semaine sont :
Ouest-France Infolocale, Le Télégramme, l'agenda de la mairie d'Yffiniac et Côtes d'Armor
Tourisme. Ce sont les seules actions qui servent **à la fois** l'affluence du 12 et le
référencement, puisqu'elles produisent des backlinks locaux — ce qui manque le plus au site.
