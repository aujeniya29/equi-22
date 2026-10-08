# Google Business Profile — stages de la Toussaint 2026

_Préparé le 2026-10-08. Textes prêts à copier-coller._

Tout vient des affichettes de la cliente et de la page `/stages-vacances` publiée le même
jour (commit 6c1da36) : aucun prix, horaire ou date n'est ajouté ici.

---

## 1. Le post « Événement »

Dans la console : **Promouvoir → Ajouter une actualité → Événement**.
Le type « Événement » reste affiché sur la fiche jusqu'à sa date de fin, soit pendant toute la
période d'inscription et les deux semaines de stage.

### Titre

```
Stages équitation de la Toussaint, dès 3 ans, tous niveaux
```

_58 caractères. La limite du champ est de 58._

Le titre dit ce que cherchent les parents (stage, équitation, Toussaint) et lève tout de suite
les deux objections les plus fréquentes : l'âge et le niveau. Les dates ne sont pas utiles
ici, Google les affiche déjà sous le titre d'un post « Événement ». Les noms Perfecto et Top
Fun ne parlent qu'aux cavaliers du club, ils sont donc dans la description.

### Dates

| Champ | Valeur |
|---|---|
| Date de début | 19/10/2026 |
| Heure de début | 09:30 |
| Date de fin | 30/10/2026 |
| Heure de fin | 17:00 |

### Description

Seuls les 100 premiers caractères s'affichent avant le « Plus » : les dates, le lieu et l'âge
sont en tête.

```
Stages poney pendant les vacances de la Toussaint, du 19 au 30 octobre, à Yffiniac. Dès 3 ans, tous niveaux, les lundis, mardis, jeudis et vendredis.

Le matin :
• Stage baby poney dès 3 ans, de 9h30 à 11h — 25 € la séance, accompagnateur obligatoire
• Stage découverte et/ou galop, de 9h30 à 12h : découverte, perfectionnement ou passage d'examens — 30 € la demi-journée, 110 € les 4 (cavaliers du club)

L'après-midi, de 14h à 17h, une semaine à thème :
• Du 19 au 23 octobre, semaine Perfecto : préparation à la compétition, passage de galop possible
• Du 26 au 30 octobre, semaine Top Fun : spectacle, pony games, rando et autres découvertes
150 € la semaine pour les cavaliers du club, 180 € pour les extérieurs.

Nouveau : la journée complète ! Le stage du matin et la semaine de l'après-midi, la semaine de votre choix — 250 € club, 280 € extérieur. Prévoir le déjeuner, 2 goûters et une tenue de rechange.

Les places partent vite : réservez dès maintenant. Tarifs extérieurs et programme complet : https://equi-22.fr/stages-vacances
```

_1 040 caractères environ. La limite du champ est de 1 500._

Pas de numéro de téléphone dans le texte : Google refuse souvent les posts qui en
contiennent. Le bouton « Appeler » de la fiche suffit.

### Bouton d'action

| Champ | Valeur |
|---|---|
| Bouton | **En savoir plus** |
| Lien | `https://equi-22.fr/stages-vacances` |

« Réserver » serait plus direct, mais il n'y a pas de réservation en ligne : le visiteur
arriverait sur une page sans formulaire de réservation.

### Photo

Utiliser **`public/og/stages-vacances-gbp.jpg`** (1200 × 900, format 4:3 attendu par Google).
C'est la photo de la page stages, recadrée : trois cavalières en manège, deux qui passent
dans un cerceau. Elle illustre bien la semaine Top Fun et rien n'est rogné.

**Ne pas utiliser les affichettes comme photo du post** : elles sont en portrait, donc
Google en rognerait le haut et le bas, et la plupart du texte disparaîtrait. Elles ont
aussi des coquilles (« vaccances », « venez vous éclatez »). Si la cliente veut les mettre
sur la fiche, c'est plutôt dans l'onglet **Photos**, où le format portrait n'est pas recadré.

---

## 2. Post de rappel — à publier le vendredi 23 octobre

Type **Actualité**. Il relance la deuxième semaine, celle qui a le plus de chances d'avoir
encore des places, au moment où les parents organisent la suite des vacances.

```
Encore une semaine de stages ! Du 26 au 30 octobre, c'est la semaine Top Fun l'après-midi, de 14h à 17h : spectacle, pony games, rando et autres découvertes avec votre poney préféré.

Le matin, stage baby poney dès 3 ans et stage découverte et/ou galop. Et pour profiter de la journée entière : la journée complète, matin et après-midi.

Stages les lundi, mardi, jeudi et vendredi. Prévoir un goûter.
```

| Champ | Valeur |
|---|---|
| Bouton | **En savoir plus** |
| Lien | `https://equi-22.fr/stages-vacances` |
| Photo | Une photo de la semaine Perfecto si la cliente en a une, sinon la même que le § 1 |

**À ne publier que s'il reste des places** : un rappel pour une semaine déjà complète fait
appeler des parents pour rien.

---

## 3. Questions/réponses

Ces réponses reprennent uniquement ce qui est publié sur le site et sur les affichettes.

> **À partir de quel âge peut-on faire un stage ?**
> Dès 3 ans avec le stage baby poney, de 9h30 à 11h. Un accompagnateur est obligatoire. Le
> stage découverte et/ou galop accueille les enfants dès 6 ans.

> **Faut-il déjà savoir monter pour faire un stage ?**
> Non. Les stages sont ouverts à tous les niveaux, du grand débutant au cavalier qui prépare
> son galop. Les groupes sont formés par niveau, 10 participants maximum.

> **Y a-t-il des stages le mercredi ?**
> Non. Pendant les vacances, les stages ont lieu le lundi, le mardi, le jeudi et le vendredi.

---

## Après les vacances

Le post « Événement » disparaît tout seul de la fiche après le 30 octobre. Côté site, il faut
retirer le bloc Toussaint 2026 de `/stages-vacances` (le bandeau de l'accueil, lui, disparaît
tout seul).
