# Dockerfile
# Package server for deployment on AWS Lambda.

FROM node:16.15-alpine

# Set environment variables
ENV NODE_ENV="development"

# Create the working directory
RUN mkdir -p /home/task
WORKDIR /home/task

# Add dependencies
ADD package.json .

# Install dependencies
RUN npm install
RUN apk add --no-cache bash

# Add source
ADD src/ ./src
ADD server/ ./server

# Prepare environment
RUN mkdir /home/task/scripts
ADD ./scripts/build.sh ./scripts/entrypoint.sh scripts/

# Working directory looks like:
# .
# ├── scripts/
# ├── server/
# └── src/

# Server listens on port 8000
EXPOSE 8000

ENTRYPOINT [ "scripts/entrypoint.sh" ]
