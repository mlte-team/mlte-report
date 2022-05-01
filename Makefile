# Makefile
# Simple automation.

.PHONY: default
default:
	@echo No default target.

# -----------------------------------------------------------------------------
# Development Targets

# Build the deploymment package
.PHONY: build
build:
	./scripts/build.sh

# Run the server
.PHONY: run
run:
	yarn ssr

# Hit the server with a request
.PHONY: hit
hit:
	curl -X POST -H "Content-Type: application/json" -d @report.json localhost:8000/html > out.html

.PHONY: test
test: hit
	google-chrome out.html

# -----------------------------------------------------------------------------
# Production Targets (Container)

# Build the container image
.PHONY: build-prod
build-prod:
	docker build -t service -f Dockerfile .

# Run the production container locally
.PHONY: run-prod
run-prod:
	docker run -d --rm -p 8000:8000 service

# Hit the container with a request
.PHONY: hit-prod
hit-prod:
	curl -X POST -H "Content-Type: application/json" -d @data/report.json localhost:8000/html > out.html

# -----------------------------------------------------------------------------
# Image Construction

# Build the image and push to ECR
.PHONY: push
push:
	./scripts/push.sh

# -----------------------------------------------------------------------------
# Development

# Format source
.PHONY: format
format:
	yarn prettier --write .
