COMPOSE_FILES=-f docker-compose.yml -f docker-compose.apps.yml -f docker-compose.appwrite.yml -f docker-compose.traefik.yml -f docker-compose.watchtower.yml
DEV_COMPOSE_FILES=-f dev.docker-compose.yml -f dev.docker-compose.apps.yml -f dev.docker-compose.appwrite.yml -f dev.docker-compose.traefik.yml


up:
	docker compose $(COMPOSE_FILES) up -d
down:
	docker compose $(COMPOSE_FILES) down

up-dev:
	docker compose $(DEV_COMPOSE_FILES) up -d
down-dev:
	docker compose $(DEV_COMPOSE_FILES) down