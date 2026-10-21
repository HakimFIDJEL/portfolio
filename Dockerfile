# ==============================================================================
# Stage 1: Frontend Builder (Compilation Vite & SSR)
# ==============================================================================
FROM node:22-bookworm-slim AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.ts components.json ./
COPY resources ./resources
COPY public ./public

RUN npm run build:ssr

# ==============================================================================
# Stage 2: Composer Builder (Dépendances PHP de production)
# ==============================================================================
FROM composer:2 AS composer-builder

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts \
    --ignore-platform-req=php \
    --optimize-autoloader

COPY . .
RUN composer dump-autoload --optimize --no-dev

# ==============================================================================
# Stage 3: Runtime Final (Apache + PHP 8.4 Minimal + Node.js pour Inertia SSR)
# ==============================================================================
FROM php:8.4-apache AS runtime

WORKDIR /var/www/html

# Activer le module Apache mod_rewrite
RUN a2enmod rewrite

# Installer les dépendances système requises et le runtime Node.js 22 pour SSR
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    libicu-dev \
    libmariadb-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libsqlite3-dev \
    default-mysql-client \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configurer et compiler les extensions PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        intl \
        pdo_mysql \
        pdo_sqlite \
        gd \
        zip \
        pcntl \
        opcache

# Configuration du VirtualHost Apache pointant vers public/
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copie du code applicatif
COPY . .

# Copie des dépendances PHP compilées
COPY --from=composer-builder /app/vendor ./vendor

# Copie des artefacts frontend compilés (assets publics et bundle SSR)
COPY --from=frontend-builder /app/public/build ./public/build
COPY --from=frontend-builder /app/bootstrap/ssr ./bootstrap/ssr

# Script de démarrage
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Permissions de sécurité
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
