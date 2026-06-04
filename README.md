# Élan Gymnique de Vauréal — site vitrine

Site vitrine de l'association **Élan Gymnique de Vauréal**, construit avec **Nuxt 4 + Nuxt Content + Nuxt Studio** et déployé en **statique sur GitHub Pages**.

Projet pilote n°1 de l'agence. Périmètre : **vitrine uniquement** — la gestion associative (adhésions, paiements, compta) reste sur **HelloAsso** (lien sortant « Adhérer »), hors périmètre.

## Stack

- **Nuxt 4** (Vue 3 + Nitro) en **SSG** (pré-rendu statique).
- **@nuxt/content** v3 : contenu en fichiers Markdown/YAML versionnés dans Git.
- **Nuxt Studio** : édition visuelle du contenu par l'association (voir `GUIDE-EDITION.md`).
- **@nuxtjs/seo** : SEO de base (sitemap, meta, OpenGraph).
- Hébergement cible : **Cloudflare Pages** (gratuit, CI auto sur push) ; GitHub Pages comme hôte de transition. Voir [Déploiement](#déploiement).

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

Le site est un build **statique** (`pnpm generate` → `.output/public/`), donc **agnostique de l'hébergeur**.
Deux variables d'environnement pilotent les URLs ; aucune autre adaptation n'est nécessaire :

| Variable               | Rôle                                              | GitHub Pages (projet)              | Cloudflare Pages / domaine racine |
| ---------------------- | ------------------------------------------------- | ---------------------------------- | --------------------------------- |
| `NUXT_APP_BASE_URL`    | sous-chemin de service                            | `/<repo>/`                         | `/`                               |
| `NUXT_PUBLIC_SITE_URL` | origine du site (sitemap/SEO) — **origine seule** | `https://<owner>.github.io`        | `https://<projet>.pages.dev`      |

> ⚠️ `NUXT_PUBLIC_SITE_URL` ne contient **que l'origine** (pas le sous-chemin). Le sous-chemin vient de
> `NUXT_APP_BASE_URL` ; le mettre aux deux endroits doublerait les URLs du sitemap.

### Hébergement cible — Cloudflare Pages (CI auto, recommandé)

Standard agence pour les vitrines statiques. **Cloudflare build le site à chaque push sur `main`**, sur son
infrastructure, **sans GitHub Actions** — donc insensible au verrou de facturation du compte GitHub perso
(GitHub ne sert que la source). `wrangler.toml` fixe déjà le dossier de sortie.

Mise en place (une fois, tableau de bord Cloudflare — nécessite un compte Cloudflare) :

1. **Workers & Pages → Create → Pages → Connect to Git** → choisir le dépôt `Tbeaumont79/elan-gym-vaureal`.
2. **Build settings** :
   - Framework preset : **Nuxt.js** (ou « None »)
   - Build command : `pnpm generate`
   - Build output directory : `.output/public`
   - Root directory : `/`
3. **Variables d'environnement** (Production) :
   - `NUXT_APP_BASE_URL` = `/`
   - `NUXT_PUBLIC_SITE_URL` = `https://elan-gym-vaureal.pages.dev`
   - `NODE_VERSION` = `22`
4. **Save and Deploy** → URL : `https://elan-gym-vaureal.pages.dev` (auto-redéployée à chaque push).

Build vérifié en local avec ces variables : **38 routes pré-rendues, 0 erreur**, liens servis à la racine.

### Repli / CI alternative — envoi direct (Wrangler)

Sans connexion Git, pour un déploiement ponctuel (nécessite `CLOUDFLARE_API_TOKEN` + account id) :

```bash
NUXT_APP_BASE_URL=/ NUXT_PUBLIC_SITE_URL=https://elan-gym-vaureal.pages.dev pnpm generate
npx wrangler pages deploy .output/public --project-name elan-gym-vaureal
```

(ou glisser-déposer `.output/public` dans le tableau de bord Cloudflare Pages). Offre gratuite suffisante.

### GitHub Pages (hôte actuel, conservé le temps de la bascule)

Le site est **en ligne** sur GitHub Pages (branche `gh-pages`, publication gérée par GitHub, non affectée par le
verrou). La CI Actions (`.github/workflows/deploy.yml`, base `/<repo>/`) reste désactivée tant que le compte est
verrouillé (THI-16). On conserve cette URL jusqu'à validation de la bascule Cloudflare.

> **Domaine custom plus tard** : `NUXT_APP_BASE_URL=/` + `NUXT_PUBLIC_SITE_URL=https://<domaine>` et rattacher le domaine chez l'hébergeur. Tâche ultérieure (avenant).

## Conventions

- TypeScript partout, composables/components/utils auto-importés (Nuxt 4).
- Aucun secret committé (`.env` ignoré, `.env.example` documenté).
- 1 dépôt par client.
- Contenu = fichiers Git → toute modification est tracée et réversible.
