IMAGE_NAME=hakimfidjel/portfolio
TAG=latest
SUDO=sudo

build:
	$(SUDO) docker build -t $(IMAGE_NAME):$(TAG) .

run:
	$(SUDO) docker run -d -p 8000:80 --name portfolio_container $(IMAGE_NAME):$(TAG)

login:
	$(SUDO) docker login

push:
	$(SUDO) docker push $(IMAGE_NAME):$(TAG)

release: build push

# Lancer sans sudo : make release SUDO=