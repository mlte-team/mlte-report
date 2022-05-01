#!/bin/bash
#
# push.sh
# Build the container image and push to ECR.

# Build the image
docker build -t service -f Dockerfile .
# Tag the image
docker tag service:latest ${AWS_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:service-latest
# Push to our private repository on ECR
docker push ${AWS_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:service-latest
