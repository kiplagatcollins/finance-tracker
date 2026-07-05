.DEFAULT_GOAL := help

BACKEND_DIR := backend
FRONTEND_DIR := frontend
BINARY_NAME := finance-tracker

.PHONY: help run-backend run-frontend run build-backend build-frontend build install-backend install-frontend install clean-backend clean-frontend clean lint lint-frontend test-backend test fmt-backend fmt tidy-backend

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

## ─── Development ────────────────────────────────────────────────────────────

run-backend: ## Run the Go backend in development mode
	$(MAKE) -C $(BACKEND_DIR) run

run-frontend: ## Run the Next.js frontend in development mode
	cd $(FRONTEND_DIR) && bun run dev

run: ## Run both backend and frontend concurrently
	@echo "Starting backend and frontend..."
	@trap 'kill 0' EXIT; \
		$(MAKE) -C $(BACKEND_DIR) run & \
		cd $(FRONTEND_DIR) && bun run dev

## ─── Build ─────────────────────────────────────────────────────────────────

build-backend: ## Build the Go backend binary
	$(MAKE) -C $(BACKEND_DIR) build-linux

build-frontend: ## Build the Next.js frontend for production
	cd $(FRONTEND_DIR) && bun run build

build: build-backend build-frontend ## Build both backend and frontend

## ─── Install ───────────────────────────────────────────────────────────────

install-backend: ## Install Go backend dependencies
	cd $(BACKEND_DIR) && go mod tidy

install-frontend: ## Install frontend dependencies
	cd $(FRONTEND_DIR) && bun install

install: install-backend install-frontend ## Install all dependencies

## ─── Lint & Format ─────────────────────────────────────────────────────────

lint-frontend: ## Lint the Next.js frontend
	cd $(FRONTEND_DIR) && bun run lint

lint: lint-frontend ## Run all linters

fmt-backend: ## Format Go backend code
	$(MAKE) -C $(BACKEND_DIR) fmt

fmt: fmt-backend ## Format all code

## ─── Test ──────────────────────────────────────────────────────────────────

test-backend: ## Run Go backend tests
	$(MAKE) -C $(BACKEND_DIR) test

test: test-backend ## Run all tests

## ─── Clean ─────────────────────────────────────────────────────────────────

clean-backend: ## Clean backend build artifacts
	$(MAKE) -C $(BACKEND_DIR) clean

clean-frontend: ## Clean frontend build artifacts
	cd $(FRONTEND_DIR) && rm -rf .next

clean: clean-backend clean-frontend ## Clean all build artifacts

## ─── Maintenance ───────────────────────────────────────────────────────────

tidy-backend: ## Tidy Go backend dependencies
	$(MAKE) -C $(BACKEND_DIR) tidy
