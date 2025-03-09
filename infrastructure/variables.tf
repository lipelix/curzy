variable "gcp_project_id" {
  type    = string
  default = "curzy-453212"
}

variable "GOOGLE_CREDENTIALS" { // setup on terraform cloud as a sensitive variable
  type      = string
  sensitive = true
}