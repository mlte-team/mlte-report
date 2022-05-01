#!/bin/bash
#
# entrypoint.sh
# Service entrypoint.
#
# Assumptions:
#   - Expects to be run from the project root.

# Prepare environment
./scripts/build.sh

# Start the server
node ./server/index.js
