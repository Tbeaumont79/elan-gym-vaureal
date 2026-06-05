#!/bin/bash
# Démo locale Élan Gym — aperçu éditable SANS aucun compte externe.
# Pour un non-dev : double-cliquer ce fichier dans le Finder (ou le lancer au terminal).
# Lance le site en local sur http://localhost:3000 ; toute modif d'un fichier de
# contenu (dossier "content/") s'affiche instantanément dans le navigateur.
# Voir le runbook THI-35 pour la marche à suivre pendant la démo.
set -e

# Se placer à la racine du projet (le dossier parent de /scripts).
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
echo "📁 Projet : $ROOT"

# Contournement macOS : le chemin TMPDIR par défaut est trop long pour la socket
# interne de Vite (erreur EINVAL). On force un dossier temporaire court et stable.
export TMPDIR=/tmp/egv-dev
mkdir -p "$TMPDIR"

# Aperçu hors sous-chemin GitHub Pages (racine "/").
export NUXT_APP_BASE_URL=/

# Installer les dépendances au premier lancement uniquement.
if [ ! -d node_modules ]; then
  echo "📦 Première installation des dépendances (1 à 2 min)…"
  if command -v pnpm >/dev/null 2>&1; then pnpm install; else npx -y pnpm@10 install; fi
fi

# Ouvrir le navigateur dès que le serveur répond (en tâche de fond).
( for _ in $(seq 1 60); do
    if curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
      open http://localhost:3000/ 2>/dev/null || true
      break
    fi
    sleep 1
  done ) &

echo "🚀 Démarrage de l'aperçu local… (laisser cette fenêtre ouverte)"
echo "   ➜ Le navigateur s'ouvrira sur http://localhost:3000"
echo "   ➜ Pour arrêter la démo : fermer cette fenêtre ou Ctrl+C."
if command -v pnpm >/dev/null 2>&1; then exec pnpm dev; else exec npx -y pnpm@10 dev; fi
