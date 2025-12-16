#!/bin/bash
set -e

# --- 1. ATTENTE DE LA BASE DE DONNÉES MYSQL ---

DB_HOST=${DB_HOST:-portfolio-mysql} # Utilise 'portfolio-mysql' comme host par défaut si non défini
DB_DATABASE=${DB_DATABASE:-portfolio} 
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-root}

echo "Waiting for database '$DB_DATABASE' on host '$DB_HOST' to be ready..."


until echo "SELECT 1" | mysql -h "$DB_HOST" -u "root" -p"$DB_PASSWORD" "$DB_DATABASE" 2>/dev/null; do
  echo "MySQL is unavailable or database not yet created - sleeping"
  sleep 3
done

echo "MySQL database is up and reachable! Continuing startup."

# --- 2. LOGIQUE LARAVEL SÛRE (APRÈS L'ATTENTE DB) ---

# Copier .env si absent
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Générer la clé d'application si non présente (utilise APP_KEY du .env monté si présente)
if ! grep -q APP_KEY=.*[a-zA-Z0-9].* .env; then
    echo "Generating application key..."
    php artisan key:generate
fi

# Nettoyage des caches existants
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Migrations & seeders
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running migrations and seeders..."
    php artisan migrate --force
    php artisan db:seed --force
fi

# Rebuild caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Génération sitemap si existant
if php artisan list | grep -q sitemap:generate; then
    echo "Generating sitemap..."
    php artisan sitemap:generate
fi

# --- 3. LOGIQUE FRONTEND ET FINALISATION ---

echo "Building frontend assets..."
npm install
npm run build

# Création fichier sqlite si nécessaire
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
fi

# Permissions pour le dossier storage et database
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/database
chmod -R 775 /var/www/html/database


# Lancer Apache en premier plan
exec apache2-foreground