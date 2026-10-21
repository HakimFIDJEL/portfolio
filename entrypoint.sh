#!/bin/bash
set -e

# ==============================================================================
# 1. GESTION DU FICHIER D'ENVIRONNEMENT ET DE LA CLE D'APPLICATION
# ==============================================================================

if [ ! -f .env ]; then
    echo "Fichier .env introuvable, creation a partir de .env.example..."
    cp .env.example .env
    chown www-data:www-data .env
    chmod 664 .env
fi

if ! grep -q "APP_KEY=base64" .env; then
    echo "Generation de la cle d'application Laravel (APP_KEY)..."
    php artisan key:generate --force
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

    echo "Attente de la base de donnees MySQL sur l'hote '$DB_HOST'..."
    until echo "SELECT 1" | mysql -h "$DB_HOST" -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE" > /dev/null 2>&1; do
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
# 3. MIGRATIONS ET SEEDING
# ==============================================================================

php artisan config:clear

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

echo "Mise en cache de la configuration, des routes et des vues..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

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
