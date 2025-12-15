#!/bin/bash
set -e

# Copier .env si absent
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Générer la clé d'application si non présente
if ! grep -q APP_KEY=.env; then
    php artisan key:generate
fi

# Nettoyage des caches Laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Rebuild caches
php artisan config:cache
php artisan route:cache
php artisan view:cache


npm install
npm run build


# Création fichier sqlite si nécessaire
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
fi

# Migrations & seeders
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations and seeders..."
    php artisan migrate --force
    php artisan db:seed --force
fi

# Génération sitemap si existant
if php artisan list | grep -q sitemap:generate; then
    echo "Generating sitemap..."
    php artisan sitemap:generate
fi

# Lancer Apache en premier plan
exec apache2-foreground
