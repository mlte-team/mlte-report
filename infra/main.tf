# infra/main.tf
# Configuration for AppRunner service that hosts our web service.

resource "aws_iam_role" "mlte-report-role" {
  name = "mlte-report-role"

  assume_role_policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
     {
       "Action": "sts:AssumeRole",
       "Principal": {
         "Service": [
           "build.apprunner.amazonaws.com",
           "tasks.apprunner.amazonaws.com"
         ]
       },
       "Effect": "Allow",
       "Sid": ""
     }
   ]
 }
 EOF 
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = aws_iam_role.mlte-report-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# ---------------------------------------------------------
# AppRunner Service
# ---------------------------------------------------------

resource "aws_apprunner_auto_scaling_configuration_version" "mlte-report-autoscaling" {
  auto_scaling_configuration_name = "mlte-report-autoscaling"
  # Limit the maximum number of containers;
  # we may need to revisit this policy later...
  max_concurrency = 100
  max_size        = 1
  min_size        = 1
}

resource "aws_apprunner_service" "mlte-report" {
  service_name = "mlte-report"

  instance_configuration {
    cpu    = var.task_cpu
    memory = var.task_memory
  }

  source_configuration {
    # Deploy the AppRunner service whenever a new image is pushed
    auto_deployments_enabled = true

    authentication_configuration {
      access_role_arn = aws_iam_role.mlte-report-role.arn
    }

    image_repository {
      image_configuration {
        port = var.task_port
      }
      image_identifier      = var.task_image
      image_repository_type = "ECR"
    }
  }
}
