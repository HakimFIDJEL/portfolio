#!/bin/bash
set -e

# --- 1. ATTENTE DE LA BASE DE DONNÉES MYSQL ---
DB_HOST=${DB_HOST:-portfolio-mysql}
DB_DATABASE=${DB_DATABASE:-portfolio}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-root}
DB_CONNECTION=${DB_CONNECTION:-mysql}

# If connection is not mysql, skip the wait
if [ "$DB_CONNECTION" != "mysql" ]; then
    echo "Database connection is not MySQL. Skipping wait."
else
    echo "Waiting for database '$DB_DATABASE' on host '$DB_HOST' to be ready..."

    until echo "SELECT 1" | mysql -h "$DB_HOST" -u "root" -p"$DB_PASSWORD" "$DB_DATABASE"; do
    echo "MySQL is unavailable - sleeping"
    sleep 3
    done

    echo "MySQL database is up and reachable! Continuing startup."
fi

if [ ! -f .env ]; then
    echo ".env not found, creating from .env.example"
    cp .env.example .env
    chown www-data:www-data .env
    chmod 664 .env
else
    echo ".env already exists, skipping creation"
fi


if ! grep -q "APP_KEY=base64" .env; then
    echo "Generating Application Key..."
    php artisan key:generate
else
    echo "Application Key already exists. Skipping generation."
fi

php artisan config:clear

# Migrations
echo "Running migrations..."
php artisan migrate --force
php artisan db:seed --force

# Storage link
if [ ! -L public/storage ] || [ ! -e public/storage ]; then
    echo "Creating storage symlink..."
    php artisan storage:link
else
    echo "Storage symlink already exists and is valid."
fi

# Cache
echo "Clearing and caching configuration..."
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Sitemap
if php artisan list | grep -q sitemap:generate; then
    php artisan sitemap:generate
fi

# --- 3. FRONTEND ET FIN ---

echo "Building frontend assets..."
npm install
npm run build


# Permissions (Crucial pour Laravel)
echo "Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

if [ -f .env ]; then
    echo "Fixing .env permissions..."
    chown www-data:www-data .env
    chmod 664 .env
fi

echo "Starting Apache..."
exec apache2-foreground