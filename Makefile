# Makefile
# Simple automation.

.PHONY: default
default:
	@echo No default target.

# Hit the server with a request
# curl -d '{"key": "value"}' -H 'Content-Type: application/json' localhost:8000/html > out.html
.PHONY: hit
hit:
	curl -X POST -H "Content-Type: application/json" -d @report.json localhost:8000/html > out.html

.PHONY: test
test: hit
	google-chrome out.html

# Build the deploymment package
.PHONY: build
build:
	./build.sh

# Run the server
.PHONY: run
run:
	yarn ssr

# Format source
.PHONY: format
format:
	yarn prettier --write .
