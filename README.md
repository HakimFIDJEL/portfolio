# Portfolio

## Description

Portfolio personnel développé comme un support de présentation technique. Il a pour objectif de montrer mon approche du développement web moderne, mes choix d’architecture et mon attention portée à la qualité globale d’un produit, sans chercher à aller au-delà de ce cadre.

Le projet sert avant tout de base concrète pour illustrer mes compétences en front-end, back-end et déploiement.

## Stack technique

- React / TypeScript
- Laravel (PHP 8.3)
- Inertia.js
- Tailwind CSS
- Node.js >= 20
- Composer >= 2.6
- Docker
- GitHub Actions (CI/CD)

## Performance et accessibilité

- Bon niveau de performance mesuré via Google Lighthouse
- Attention particulière portée à l’accessibilité et à la conformité WCAG
- Utilisation de bonnes pratiques HTML, CSS et JavaScript pour garantir une expérience cohérente sur différents supports

Les audits Lighthouse sont utilisés comme indicateurs de qualité, sans être une finalité en soi.

## Architecture et déploiement

- Application SPA
- Organisation claire entre front-end et back-end
- Pipeline CI/CD simple pour automatiser les vérifications courantes
- Conteneurisation via Docker pour faciliter le déploiement et la reproductibilité

## Prérequis

- PHP >= 8.3
- Node.js >= 20
- Composer >= 2.6

## Installation

### Clonage du dépôt

```bash
git clone https://github.com/HakimFIDJEL/portfolio.git
cd portfolio
```

### Dépendances

```bash
composer install
npm install
```

### Configuration

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate
```

## Développement

```bash
php artisan serve
```

```bash
npm run dev
```

```bash
php artisan queue:work
```

## Production

```bash
php artisan inertia:start-ssr
```

```bash
npm run build:ssr
```

```bash
php artisan serve
```

```bash
php artisan queue:work
```

## Docker

```bash
docker build -t hakimfidjel/portfolio:latest .
docker run -d -p 3000:3000 hakimfidjel/portfolio:latest
```

## CI/CD

Le déploiement est automatisé via GitHub Actions à chaque mise à jour de la branche de production.

## Propriété intellectuelle

Le contenu de ce portfolio est la propriété de Hakim Fidjel, sauf mention contraire.

Le code source est mis à disposition à titre d’exemple et de support technique. Toute réutilisation commerciale ou redistribution nécessite une autorisation préalable.

## Liens

- Site en ligne : https://hakimfidjel.fr
- Dépôt GitHub : https://github.com/HakimFIDJEL/portfolio
