# Portfolio — Hakim Fidjel

Vitrine technique et professionnelle d'Hakim Fidjel, Ingénieur Logiciel & Ingénieur Fullstack Indépendant (EI).

Ce projet illustre une architecture web moderne orientée performance, typage strict et Server-Side Rendering (SSR).

## Stack Technique

- **Backend** : Laravel 12 (PHP 8.4), architecture en services métier, typage strict et transactions atomiques.
- **Frontend** : React 19, TypeScript, Tailwind CSS v4, transitions d'interface déclaratives.
- **Rendu & Navigation** : Inertia.js v2 avec SSR direct Node.js.
- **Conteneurisation** : Docker multi-stage (Apache/PHP 8.4), SQLite en dev local et MySQL en production.
- **Qualité & Sécurité** : Pest PHP, Laravel Pint, ESLint (`jsx-a11y`), Prettier, politique HTTP durcie (CSP, HSTS, masquage d'empreinte).

## Environnement & Commandes

L'ensemble des opérations de développement, de test et de conteneurisation est orchestré via le `Makefile` :

```bash
# Afficher l'ensemble des commandes disponibles
make help

# Démarrer en développement local avec Vite HMR
make dev-hmr

# Démarrer en développement local avec le moteur SSR direct
make dev-ssr

# Exécuter la suite complète de vérifications (Pint, ESLint, TypeScript, Tests Pest)
make check
```

## Propriété Intellectuelle & Licence

- **Code source** : Distribué sous licence [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](LICENSE.md) à des fins de consultation technique et d'apprentissage. Toute réutilisation commerciale ou redistribution nécessite une autorisation préalable.
- **Contenus personnels & Identité** : Textes, photographies, réalisations et marque personnelle restent la propriété exclusive d'Hakim Fidjel (Tous droits réservés).
- **Mentions légales & Conditions d'utilisation** : Consultables sur [hakimfidjel.fr/terms](https://hakimfidjel.fr/terms).

## Liens

- **Site en ligne** : [hakimfidjel.fr](https://hakimfidjel.fr)
- **LinkedIn** : [linkedin.com/in/hakim-fidjel](https://www.linkedin.com/in/hakim-fidjel/)
- **Contact** : hakimfidjel.pro@gmail.com
