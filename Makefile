# Makefile
# Simple automation.

.PHONY: hit
hit:
	curl -d '{"key": "value"}' -H 'Content-Type: application/json' localhost:8000/
