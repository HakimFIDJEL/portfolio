#!/bin/bash
set -e

# Nettoyer les caches résiduels au boot pour éviter toute incohérence d'autoloading/packages
rm -f bootstrap/cache/*.php

# ==============================================================================
# 1. GESTION DU FICHIER D'ENVIRONNEMENT ET DE LA CLE D'APPLICATION
# ==============================================================================

if [ ! -f .env ]; then
    echo "Fichier .env introuvable, creation a partir de .env.example..."
    cp .env.example .env
    chown www-data:www-data .env
    chmod 664 .env
fi

# Si APP_KEY est transmis vide par l'environnement conteneur, le retirer pour laisser le .env operer
if [ -z "$APP_KEY" ]; then
    unset APP_KEY
fi

# S'assurer que le .env possede une cle d'application valide
if ! grep -q "^APP_KEY=base64:" .env; then
    echo "Generation de la cle d'application Laravel (APP_KEY)..."
    php artisan key:generate --force
fi

# Charger la cle depuis le .env si elle n'est pas encore definie dans l'environnement
if [ -z "$APP_KEY" ]; then
    export APP_KEY=$(grep '^APP_KEY=' .env | cut -d '=' -f 2-)
fi

# ==============================================================================
# 2. CONFIGURATION DE LA BASE DE DONNEES
# ==============================================================================

DB_CONN=${DB_CONNECTION:-sqlite}

if [ "$DB_CONN" = "mysql" ]; then
    DB_HOST=${DB_HOST:-portfolio-mysql}
    DB_DATABASE=${DB_DATABASE:-portfolio}
    DB_USERNAME=${DB_USERNAME:-root}
    DB_PASSWORD=${DB_PASSWORD:-root}

    mkdir -p /etc/mysql/conf.d
    echo -e "[client]\nssl = 0" > /etc/mysql/conf.d/client-ssl.cnf 2>/dev/null || true

    echo "Attente de la base de donnees MySQL sur l'hote '$DB_HOST'..."
    until echo "SELECT 1" | mysql --ssl=0 -h "$DB_HOST" -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE" > /dev/null 2>&1; do
        echo "MySQL indisponible, nouvelle tentative dans 2 secondes..."
        sleep 2
    done
    echo "Base de donnees MySQL joignable."

elif [ "$DB_CONN" = "sqlite" ]; then
    mkdir -p database
    SQLITE_PATH="database/database.sqlite"
    if [ ! -f "$SQLITE_PATH" ]; then
        echo "Creation du fichier SQLite ($SQLITE_PATH)..."
        touch "$SQLITE_PATH"
    fi
    chown www-data:www-data "$SQLITE_PATH" database
    chmod 664 "$SQLITE_PATH"
fi

# ==============================================================================
# 3. DÉCOUVERTE DES PACKAGES, DÉPENDANCES DEV, MIGRATIONS ET SEEDING
# ==============================================================================

if [ "${APP_ENV:-production}" = "local" ] && [ ! -f "vendor/bin/pest" ]; then
    echo "Environnement local : installation des dépendances de dev via Composer..."
    composer install --prefer-dist --no-interaction
fi

if [ "${APP_ENV:-production}" = "local" ] && [ ! -d "node_modules/vite" ]; then
    echo "Environnement local : installation des dépendances frontend via npm..."
    npm ci
fi

echo "Découverte des packages Laravel..."
php artisan package:discover --ansi

echo "Application des migrations..."
php artisan migrate --force

if [ "${RUN_SEEDERS:-false}" = "true" ]; then
    echo "Execution des seeders applicatifs (RUN_SEEDERS=true)..."
    php artisan db:seed --force
else
    echo "Seeders ignores (RUN_SEEDERS != true)."
fi

# ==============================================================================
# 4. LIEN DE STOCKAGE ET OPTIMISATIONS DES CACHES
# ==============================================================================

if [ ! -L public/storage ] || [ ! -e public/storage ]; then
    echo "Creation du lien symbolique public/storage..."
    php artisan storage:link || true
fi

if [ "${APP_ENV:-production}" = "production" ]; then
    echo "Mise en cache de la configuration, des routes et des vues (production)..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
else
    echo "Environnement de développement (${APP_ENV:-local}) : optimisation des caches désactivée."
    php artisan optimize:clear
fi

if php artisan list | grep -q "sitemap:generate"; then
    echo "Generation du sitemap..."
    php artisan sitemap:generate || true
fi

# ==============================================================================
# 5. AJUSTEMENT DES PERMISSIONS
# ==============================================================================

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# ==============================================================================
# 6. DEMARRAGE DU SERVEUR SSR ET D'APACHE
# ==============================================================================

echo "Demarrage du serveur SSR Inertia..."
php artisan inertia:start-ssr &

echo "Demarrage du serveur web Apache..."
exec apache2-foreground
