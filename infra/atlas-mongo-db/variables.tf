variable "mongodb_atlas_public_key" {
  type = string
}
variable "mongodb_atlas_private_key" {
  type      = string
  sensitive = true
}
variable "mongodb_atlas_cluster" {
  type = object({
    instance_size_name           = string
    region_name                  = string
    cloud_backup                 = bool
    auto_scaling_disk_gb_enabled = bool
  })
}
variable "mongodb_atlas_cluster_ip_whitelist" {
  type = list(object({
    ip      = string,
    comment = string
  }))
}
variable "mongodb_atlas_cluster_users" {
  type = map(object({
    name     = string
    password = string
    roles = list(object({
      role_name     = string,
      database_name = string
    }))
  }))
}
variable "mongodb_atlas_org_name" {
  type = string
}
variable "mongodb_atlas_cluster_name" {
  type = string
}
variable "mongodb_atlas_cluster_project_name" {
  type = string
}
