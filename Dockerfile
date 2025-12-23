FROM php:8.3.4-apache

WORKDIR /var/www/html

# Apache mod
RUN a2enmod rewrite

# Dépendances système
RUN apt-get update -y && apt-get install -y \
    git \
    libicu-dev libmariadb-dev unzip zip zlib1g-dev \
    libpng-dev libjpeg-dev libfreetype6-dev curl libzip-dev \
    default-mysql-client \
 && rm -rf /var/lib/apt/lists/*

# PHP Extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) intl gettext pdo_mysql gd zip pcntl

# Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs \
 && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Apache root
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
 && sed -ri 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copier code projet
COPY . .

# Rendre entrypoint.sh exécutable
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Permissions storage/bootstrap
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Installer dépendances PHP & JS (sans artisan commands)
RUN composer install \
  --no-interaction \
  --prefer-dist \
  --optimize-autoloader \
  --no-scripts \
 && npm install \
 && npm run build


# Expose Apache
# EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]