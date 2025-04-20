variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

variable "gcp_project_id" {
  type    = string
  default = "curzy-453212"
}

variable "GOOGLE_CREDENTIALS" { // setup on terraform cloud as a sensitive variable
  type      = string
  sensitive = true
}

variable "mongo_db_uri" {
  type      = string
  sensitive = true
}

variable "allowed_origins" {
  type      = string
  sensitive = true
}