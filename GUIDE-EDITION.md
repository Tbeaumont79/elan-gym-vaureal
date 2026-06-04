# Guide d'édition du site — Élan Gymnique de Vauréal

Ce guide explique comment **modifier le contenu** du site (textes, horaires, activités, compétitions, photos) **sans compétence technique**. Le site est conçu pour être édité par le bureau de l'association.

> ⚠️ Vous modifiez le **contenu** (textes, dates, photos). La **structure** des pages (création d'un nouveau type de page) reste gérée par l'agence.

---

## 1. Deux façons de modifier le contenu

1. **Nuxt Studio** (recommandé) — interface visuelle, comme un traitement de texte. *Disponible une fois l'instance Studio connectée (voir §5).*
2. **Directement dans les fichiers** sur GitHub — pour les utilisateurs à l'aise. Chaque modification est enregistrée et le site se met à jour automatiquement.

Dans les deux cas, **chaque modification est sauvegardée et réversible** : aucun risque de « tout casser ».

---

## 2. Ce que vous pouvez modifier

| Je veux changer…                       | Où                                              |
| -------------------------------------- | ----------------------------------------------- |
| Le texte d'accueil                     | Page **Accueil**                                |
| La présentation de la salle            | Page **Notre salle**                            |
| Une activité (texte, âge, horaire)     | Section **Activités** → la fiche concernée      |
| Le tableau des horaires                | **Horaires**                                    |
| Les dates de compétitions              | **Compétitions**                                |
| Les coordonnées / l'accès              | Page **Accès & contact**                        |
| Ajouter des photos ou vidéos           | **Galerie**                                     |

---

## 3. Modifier une activité (exemple)

Chaque activité a des **champs simples** :

- **Titre** : ex. « École de gym »
- **Âge** : ex. « 5-6 ans »
- **Horaire** : ex. « Mercredi 10h-11h »
- **Description** : la phrase courte affichée dans la liste
- **Texte** : le contenu détaillé de la page

Modifiez le champ voulu, enregistrez : la page se met à jour. Pour ajouter un horaire, il suffit de remplir le champ « Horaire ».

---

## 4. Modifier les horaires et les compétitions

Ce sont des **tableaux** :

- **Horaires** : chaque ligne = une activité (activité, jour, heure, public). Ajoutez/supprimez des lignes selon la saison.
- **Compétitions** : chaque ligne = une date (date, intitulé, lieu, niveau). Mettez à jour à chaque nouvelle saison.

---

## 5. Ajouter des photos et vidéos (Galerie)

- **Photos** : importez l'image, puis ajoutez-la à la galerie avec une légende.
- **Vidéos** : collez simplement le **lien YouTube** ; la vidéo s'affiche automatiquement.

> Conseil : privilégiez des photos nettes et horizontales pour un rendu homogène.

---

## 6. Se connecter à Nuxt Studio

1. Ouvrez l'adresse de l'éditeur (fournie par l'agence à la mise en service).
2. Connectez-vous avec le compte (GitHub/Google) communiqué par l'agence.
3. Choisissez la page à modifier dans le menu de gauche, éditez, puis cliquez sur **Enregistrer / Publier**.
4. Le site se met à jour automatiquement en quelques minutes.

> La connexion de l'instance Studio et la création des accès sont réalisées par l'agence lors de la mise en ligne. La **formation des utilisateurs** (bureau + secrétaire) est assurée en interne par le bureau.

---

## 7. En cas de doute

- Une modification ne s'affiche pas ? Attendez 2-3 minutes (le temps de la mise à jour) puis rafraîchissez.
- Vous avez fait une erreur ? Toute version précédente peut être restaurée (historique Git). Contactez l'agence si besoin.

*Des captures d'écran illustrées seront ajoutées à ce guide à la mise en service de Studio.*
