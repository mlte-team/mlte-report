#!/bin/bash

# Initialize a new build folder
rm -rf build/
mkdir build

# Copy the base HTML document
cp src/index.html build/
cp src/index.css build/

# Download external styles
wget https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css -O build/bootstrap.min.css > /dev/null 2>&1

exit 0
