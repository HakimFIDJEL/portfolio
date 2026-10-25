# ==============================================================================
# Makefile - Portfolio Hakim Fidjel
# Interface de gestion unifiee pour dev, test, docker et maintenance
# ==============================================================================

.DEFAULT_GOAL := help
.PHONY: help dev-hmr dev-ssr dev-down dev-rebuild dev-logs prod-up prod-down prod-logs build \
        test lint format types check migrate seed fresh ssr clean shell

# Couleurs ANSI
BLUE   := \033[1;34m
GREEN  := \033[1;32m
YELLOW := \033[1;33m
CYAN   := \033[1;36m
RED    := \033[1;31m
RESET  := \033[0m

##@ Aide et Documentation
help: ## Afficher ce menu d'aide interactif
	@echo ""
	@echo "$(CYAN)=================================================================$(RESET)"
	@echo "$(GREEN)  Portfolio Hakim Fidjel - Commandes Disponibles$(RESET)"
	@echo "$(CYAN)=================================================================$(RESET)"
	@awk 'BEGIN {FS = ":.*##"; printf ""} \
		/^[a-zA-Z_-]+:.*?##/ { printf "  $(BLUE)%-18s$(RESET) %s\n", $$1, $$2 } \
		/^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Environnements Docker
dev-hmr: ## Demarrer l'environnement local avec Vite Hot Module Replacement (HMR instantane)
	@echo "$(BLUE)Demarrage de l'environnement local avec Vite HMR...$(RESET)"
	@docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
	@docker compose -f docker-compose.yml -f docker-compose.override.yml exec app php artisan cache:clear >/dev/null 2>&1 || true
	@docker compose -f docker-compose.yml -f docker-compose.override.yml exec app php artisan inertia:stop-ssr >/dev/null 2>&1 || true
	@echo "$(GREEN)Vite HMR pret sur http://localhost:5173 (Application sur http://localhost:8000)$(RESET)"
	@trap 'rm -f public/hot' INT TERM EXIT; npm run dev

dev-ssr: ## Demarrer l'environnement local avec le moteur de rendu SSR Inertia direct
	@echo "$(BLUE)Demarrage de l'environnement local en mode SSR...$(RESET)"
	@rm -f public/hot
	@docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
	@docker compose -f docker-compose.yml -f docker-compose.override.yml exec app php artisan cache:clear >/dev/null 2>&1 || true
	@docker compose -f docker-compose.yml -f docker-compose.override.yml exec app php artisan inertia:stop-ssr >/dev/null 2>&1 || true
	@docker compose -f docker-compose.yml -f docker-compose.override.yml exec -d app php artisan inertia:start-ssr
	@echo "$(GREEN)Mode SSR actif sur http://localhost:8000 (Serveur SSR sur port interne 13714)$(RESET)"

dev-down: ## Arreter l'environnement local
	@echo "$(YELLOW)Arret de l'environnement local...$(RESET)"
	docker compose -f docker-compose.yml -f docker-compose.override.yml down

dev-rebuild: ## Reconstruire et relancer l'environnement local
	@echo "$(BLUE)Reconstruction de l'environnement local...$(RESET)"
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d --build -V

dev-logs: ## Suivre les logs de l'environnement local en temps reel
	docker compose -f docker-compose.yml -f docker-compose.override.yml logs -f app

prod-up: ## Demarrer l'environnement de production (MySQL, multi-stage autonome)
	@echo "$(BLUE)Demarrage de l'environnement de production (docker-compose.prod.yml)...$(RESET)"
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

prod-down: ## Arreter l'environnement de production
	@echo "$(YELLOW)Arret de l'environnement de production...$(RESET)"
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

prod-logs: ## Suivre les logs de l'environnement de production
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f app

build: ## Construire l'image Docker multi-stage de production
	@echo "$(BLUE)Construction de l'image Docker de production...$(RESET)"
	docker build -t hakimfidjel/portfolio:latest .

##@ Qualite et Tests
test: ## Executer la suite complete de tests fonctionnels et unitaires Pest
	@echo "$(GREEN)Execution des tests Pest PHP...$(RESET)"
	@if [ -f vendor/bin/pest ]; then \
		vendor/bin/pest; \
	else \
		docker compose exec -e APP_ENV=testing app vendor/bin/pest; \
	fi

lint: ## Verifier le style du code PHP (Pint) et le linting Frontend (ESLint)
	@echo "$(GREEN)Verification du style PHP (Laravel Pint)...$(RESET)"
	@if [ -f vendor/bin/pint ]; then vendor/bin/pint --test; else docker compose exec app vendor/bin/pint --test; fi
	@echo "$(GREEN)Verification du linting Frontend (ESLint)...$(RESET)"
	@npm run lint

pint: ## Corriger automatiquement le style du code PHP (Laravel Pint)
	@echo "$(GREEN)Correction automatique du style PHP (Laravel Pint)...$(RESET)"
	@if [ -f vendor/bin/pint ]; then vendor/bin/pint; else docker compose exec app vendor/bin/pint; fi

format: ## Formater automatiquement le code Frontend avec Prettier
	@echo "$(GREEN)Formatage Prettier des fichiers resources/...$(RESET)"
	@npm run format

types: ## Verifier la conformite du typage TypeScript (tsc --noEmit)
	@echo "$(GREEN)Verification stricte du typage TypeScript...$(RESET)"
	@npm run types

check: lint types test ## Executer la verification complete (Lint + Types + Tests)
	@echo "$(GREEN)Toutes les verifications de qualite ont ete executees avec succes !$(RESET)"

##@ Base de donnees et Laravel
migrate: ## Executer les migrations de base de donnees
	@echo "$(BLUE)Application des migrations...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan migrate --force; \
	else \
		docker compose exec app php artisan migrate --force; \
	fi

seed: ## Executer le seeding de la base de donnees avec les donnees reelles
	@echo "$(BLUE)Execution des seeders...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan db:seed --force; \
	else \
		docker compose exec app php artisan db:seed --force; \
	fi

fresh: ## Reinitialiser la base de donnees et rejouer les migrations et seeds
	@echo "$(YELLOW)Reinitialisation complete de la base de donnees...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan migrate:fresh --seed --force; \
	else \
		docker compose exec app php artisan migrate:fresh --seed --force; \
	fi

ssr: ## Redemarrer le serveur SSR Inertia
	@echo "$(BLUE)Redemarrage du serveur SSR Inertia...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan inertia:stop-ssr || true; \
		php artisan inertia:start-ssr & \
	else \
		docker compose exec app php artisan inertia:stop-ssr || true; \
		docker compose exec app php artisan inertia:start-ssr & \
	fi

key: ## Generer une nouvelle cle d'application Laravel (APP_KEY)
	@echo "$(BLUE)Generation de la cle d'application...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan key:generate; \
	else \
		docker compose exec app php artisan key:generate; \
	fi

##@ Maintenance et Shell
clean: ## Nettoyer tous les caches applicatifs (config, routes, vues, optimize)
	@echo "$(YELLOW)Nettoyage des caches Laravel...$(RESET)"
	@if [ -f artisan ]; then \
		php artisan optimize:clear; \
	else \
		docker compose exec app php artisan optimize:clear; \
	fi

shell: ## Ouvrir un terminal interactif bash dans le conteneur applicatif
	docker compose exec -it app bash
