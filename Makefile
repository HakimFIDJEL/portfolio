# Variables
IMAGE_NAME=hakimfidjel/portfolio
TAG=latest

# Build l'image Docker
build:
	sudo docker build -t $(IMAGE_NAME):$(TAG) .

run:
	sudo docker run -d -p 8000:80 --name portfolio_container $(IMAGE_NAME):$(TAG)

# Se connecter à Docker Hub
login:
	sudo docker login

# Pousser l'image sur Docker Hub
push:
	sudo docker push $(IMAGE_NAME):$(TAG)
# Combinaison build + push
release: build push
