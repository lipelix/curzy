terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.27.0"
    }
  }
  required_version = ">= 1.7.4"
}

provider "mongodbatlas" {
  public_key  = var.mongodb_atlas_public_key
  private_key = var.mongodb_atlas_private_key
}

locals {
  ip_whitelist = tomap({
    for record in [for record in var.mongodb_atlas_cluster_ip_whitelist : record if !strcontains(record.ip, "/")] :
    "${record.ip}_key" => record
  })
  cidr_whitelist = tomap({
    for record in [for record in var.mongodb_atlas_cluster_ip_whitelist : record if strcontains(record.ip, "/")] :
    "${record.ip}_key" => record
  })
}

data "mongodbatlas_organization" "atlas-org" {
  org_id = var.mongodb_atlas_org_name
}

resource "mongodbatlas_project" "atlas-project" {
  name   = var.mongodb_atlas_cluster_project_name
  org_id = data.mongodbatlas_organization.atlas-org.id

  is_collect_database_specifics_statistics_enabled = true
  is_data_explorer_enabled                         = true
  is_extended_storage_sizes_enabled                = true
  is_performance_advisor_enabled                   = true
  is_realtime_performance_panel_enabled            = true
  is_schema_advisor_enabled                        = true
}

output "atlas_project_id" {
  value       = mongodbatlas_project.atlas-project.id
  description = "Output the project id for the MongoDB Atlas project"
}

resource "mongodbatlas_cluster" "mongodb-cluster" {
  project_id   = mongodbatlas_project.atlas-project.id
  name         = var.mongodb_atlas_cluster_name
  cluster_type = "REPLICASET"
  replication_specs {
    num_shards = 1
    regions_config {
      region_name     = var.mongodb_atlas_cluster.region_name
      electable_nodes = 3
      priority        = 7
    }
  }
  cloud_backup                 = var.mongodb_atlas_cluster.cloud_backup
  auto_scaling_disk_gb_enabled = var.mongodb_atlas_cluster.auto_scaling_disk_gb_enabled

  provider_name               = "TENANT"
  backing_provider_name       = "GCP"
  provider_region_name        = var.mongodb_atlas_cluster.region_name
  provider_instance_size_name = var.mongodb_atlas_cluster.instance_size_name
}

resource "mongodbatlas_database_user" "mongodb-rw-users" {
  for_each = var.mongodb_atlas_cluster_users

  username           = each.value.name
  password           = each.value.password
  project_id         = mongodbatlas_project.atlas-project.id
  auth_database_name = "admin"

  dynamic "roles" {
    for_each = toset(each.value.roles)
    content {
      role_name     = roles.value.role_name
      database_name = roles.value.database_name
    }
  }
}

resource "mongodbatlas_project_ip_access_list" "ip-whitelist" {
  for_each = local.ip_whitelist

  project_id = mongodbatlas_project.atlas-project.id
  ip_address = each.value.ip
  comment    = each.value.comment
}

resource "mongodbatlas_project_ip_access_list" "cidr-whitelist" {
  for_each = local.cidr_whitelist

  project_id = mongodbatlas_project.atlas-project.id
  cidr_block = each.value.ip
  comment    = each.value.comment
}
