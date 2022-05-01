# infra/variables.tf

variable "task_port" {
  description = "The port to which the container is attached."
  default     = "8000"
}

variable "task_image" {
  description = "The URI of the container image."
  default     = "454982291710.dkr.ecr.us-east-1.amazonaws.com/mlte-report:service-latest"
}

variable "task_cpu" {
  description = "CPU units to allocate for the task."
  default     = 2048
}

variable "task_memory" {
  description = "Memory to allocate for the task."
  default     = 4096
}

variable "aws_access_key_id" {
}

variable "aws_secret_access_key" {
}