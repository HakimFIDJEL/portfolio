#!/bin/bash

# Nettoyage des caches Laravel
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Rebuild des caches Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Compilation des assets JS si nécessaire
npm run build

# Migrations et seeders
echo "Migrations & Seeders..."
php artisan migrate --force
php artisan db:seed --force


# Creating a sitemap
echo "Creating a sitemap..."
php artisan sitemap:generate

# Démarrer Apache au premier plan
echo "Starting Apache server..."
apache2-foreground
