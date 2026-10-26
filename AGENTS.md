# Directives Agents — Portfolio Hakim Fidjel

## Contexte et environnement d'exécution

- Le projet s'appuie sur une architecture conteneurisée Docker (Laravel 12, PHP 8.4, Inertia v2, React 19, TypeScript).
- Les dépendances système, les binaires PHP (`php`, `composer`, `pint`, `pest`) et les modules applicatifs ne sont généralement pas installés sur la machine hôte.

## Règle d'exécution : Conteneurs Docker par défaut

1. **Exécution dans les conteneurs** : Par défaut, lancer toutes les commandes d'outillage (tests Pest, vérification de version, linter Laravel Pint / ESLint, formatage Prettier, migrations, seeders, etc.) directement à l'intérieur des conteneurs Docker (via `docker compose exec ...` ou les cibles dédiées du `Makefile`).
2. **Vérification préalable de l'état des conteneurs** : Avant toute commande, contrôler que les conteneurs du portfolio (`app` / `portfolio_app_dev`) sont actifs via `docker compose ps` ou `docker ps`.
3. **Comportement en cas d'arrêt** : Si les conteneurs ne tournent pas, ne pas tenter d'exécuter les outils PHP directement sur la machine hôte. Signaler l'état arrêté à Hakim et s'arrêter jusqu'au lancement effectif des conteneurs.
