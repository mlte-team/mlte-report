#!/bin/bash
#
# build.sh
# Local build steps.
#
# Assumptions:
#   - Expects to be run from the project root.

# Initialize a new build folder
rm -rf ./build/
mkdir ./build

# Copy the base HTML document
cp ./src/index.html ./build/
cp ./src/index.css ./build/

# Download external styles
wget https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css -O ./build/bootstrap.min.css 

exit 0
