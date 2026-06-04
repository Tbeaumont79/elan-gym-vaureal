# Élan Gymnique de Vauréal — site vitrine

Site vitrine de l'association **Élan Gymnique de Vauréal**, construit avec **Nuxt 4 + Nuxt Content + Nuxt Studio** et déployé en **statique sur GitHub Pages**.

Projet pilote n°1 de l'agence. Périmètre : **vitrine uniquement** — la gestion associative (adhésions, paiements, compta) reste sur **HelloAsso** (lien sortant « Adhérer »), hors périmètre.

## Stack

- **Nuxt 4** (Vue 3 + Nitro) en **SSG** (pré-rendu statique).
- **@nuxt/content** v3 : contenu en fichiers Markdown/YAML versionnés dans Git.
- **Nuxt Studio** : édition visuelle du contenu par l'association (voir `GUIDE-EDITION.md`).
- **@nuxtjs/seo** : SEO de base (sitemap, meta, OpenGraph).
- Hébergement : **GitHub Pages** (gratuit), sous-chemin `/<repo>/`.

## Démarrer en local

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Autres commandes :

```bash
pnpm generate   # build statique → .output/public (ce qui est déployé)
pnpm preview    # prévisualise le build
pnpm typecheck  # vérification TypeScript
```

## Structure

```
app/
  components/    TheHeader, TheFooter, AdhererButton, PageHeader, ContentPage
  composables/   useNavigation (menu + liens HelloAsso/Facebook)
  layouts/       default.vue
  pages/         index, notre-salle, activites/, horaires, competitions, galerie, acces-contact, equipement
  assets/css/    main.css (design tokens : couleurs du club)
content/         contenu éditable (voir ci-dessous)
content.config.ts  schéma des collections (= formulaires Studio)
```

## Contenu éditable (`content/`)

| Collection      | Fichiers                       | Édite…                                   |
| --------------- | ------------------------------ | ---------------------------------------- |
| `pages`         | `content/pages/*.md`           | Accueil, Notre salle, Accès & contact, Équipement |
| `activites`     | `content/activites/*.md`       | Fiches activité par âge (titre, âge, horaire, texte) |
| `horaires`      | `content/horaires/*.yml`       | Tableau des créneaux                     |
| `competitions`  | `content/competitions/*.yml`   | Calendrier des compétitions              |
| `galerie`       | `content/galerie/*.yml`        | Photos et vidéos (embed)                 |

Le schéma de chaque collection est défini dans `content.config.ts` ; il génère automatiquement les formulaires d'édition dans Nuxt Studio.

## Édition via Nuxt Studio

Voir le **[guide d'édition](./GUIDE-EDITION.md)** (FR, pour l'association).

Côté technique : le site se connecte à Studio via `content.preview.api` (variable `NUXT_STUDIO_API`). Tant que l'instance Studio auto-hébergée n'est pas déployée, l'édition se fait par modification des fichiers `content/` (pull request). L'URL de l'instance Studio est à renseigner dans `.env` (voir `.env.example`).

## Déploiement

Automatique via **GitHub Actions** (`.github/workflows/deploy.yml`) à chaque push sur `main` :
build `pnpm generate` → publication sur GitHub Pages.

Prérequis (une seule fois) : dans **Settings → Pages** du dépôt, choisir **Source : GitHub Actions**.

URL de mise en ligne : `https://<owner>.github.io/<repo>/`.

> **Domaine custom plus tard** : surcharger `NUXT_APP_BASE_URL=/` et `NUXT_PUBLIC_SITE_URL` + configurer le domaine dans Pages. Tâche ultérieure (avenant).

## Conventions

- TypeScript partout, composables/components/utils auto-importés (Nuxt 4).
- Aucun secret committé (`.env` ignoré, `.env.example` documenté).
- 1 dépôt par client.
- Contenu = fichiers Git → toute modification est tracée et réversible.
