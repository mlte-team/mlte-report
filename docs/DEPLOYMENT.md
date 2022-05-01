## Deployment

This document describes all aspects of deployment of the web service.

### Image Builds

Currently we rely on the ability to build the container image locally.

```bash
make build-prod
```

This command builds the container image with the tag `service`.

### Image Storage

We store images on AWS ECR.

**Initial Repository Creation**

This step only needs to be completed once per AWS account.

We'll define some variables once to simplify the procedure.

```bash
export AWS_ID="<YOUR_ACCOUNT_ID>"
export AWS_REGION="<YOUR_AWS_REGION>"
export REPO_NAME="<YOUR_REPO_NAME>"
```

First we need to to authenticate the Docker client on our local machine with AWS:

```bash
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
```

This command notifies us when authentication succeeds. Now we can create the ECR repository that will store our images:

```bash
aws ecr create-repository --repository-name ${REPO_NAME}
```

**Pushing a new Image to the Repository**

```bash
# Tag the image
docker tag service:latest ${AWS_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:service-latest
# Push to our private repository on ECR
docker push ${AWS_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:service-latest
```

TODO(Kyle): We should automate the process for image builds whenever changes are pushed to the repository. We can accomplish this with AWS CodeBuild.

### AppRunner Deployment

We deploy the web service on AWS AppRunner. The AppRunner service need only be deployed once:

```bash
cd infra
terraform apply
```

Currently, the AppRunner service is configured to re-deploy whenever a new image is pushed to ECR.
