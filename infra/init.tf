terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "lipelix"

    workspaces {
      name = "curzy"
    }
  }
}

variable "mongodb_atlas_private_key" {
  type      = string
  sensitive = true
}

variable "curzy_user_password" {
  type      = string
  sensitive = true
}

module "curzy-atlas-mongo-db" {
  source                             = "./atlas-mongo-db"
  mongodb_atlas_org_name             = "67bb0c45f6c308544d4c2f48"
  mongodb_atlas_cluster_name         = "curzy-production-cluster"
  mongodb_atlas_cluster_project_name = "curzy"
  mongodb_atlas_public_key           = "pjqxgabo"
  mongodb_atlas_cluster_ip_whitelist = yamldecode(file("${path.module}/atlas-mongo-db/ip-whitelist.yaml"))
  mongodb_atlas_cluster_users = {
    "curzy-user" = {
      name     = "curzy-user",
      password = var.curzy_user_password,
      roles = [
        {
          role_name     = "readWriteAnyDatabase",
          database_name = "admin"
        }
      ]
    }
  }
  mongodb_atlas_private_key = var.mongodb_atlas_private_key // This is api key from atlas MongoDb project administration
  mongodb_atlas_cluster = {
    instance_size_name           = "M0"
    region_name                  = "CENTRAL_US"
    cloud_backup                 = false
    auto_scaling_disk_gb_enabled = false
  }
}
