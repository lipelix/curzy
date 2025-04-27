import {
  to = cloudflare_pages_project.curzy
  id = "6f76767ec8a36e314efe33576a15d9af/curzy"
}

resource "cloudflare_pages_project" "curzy" {
  lifecycle {
    ignore_changes = all # !!TODO: remove this line when the issue is fixed https://github.com/cloudflare/terraform-provider-cloudflare/issues/5412
  }

  account_id        = data.cloudflare_account.lipelix_labs.account_id
  name              = "curzy"
  production_branch = "main"

  # !!TODO: remove this line when the issue is fixed: https://github.com/cloudflare/terraform-provider-cloudflare/issues/5093 done manually until fixed
  # source = {
  #   type = "github"
  #   config = {
  #     owner                         = "lipelix"
  #     repo_name                     = "curzy"
  #     production_branch             = "main"
  #     pr_comments_enabled           = true
  #     deployments_enabled           = true
  #     production_deployment_enabled = true
  #     preview_deployment_setting    = "none"
  #   }
  # }

  build_config = {
    build_command   = "npm run build"
    destination_dir = "build"
    root_dir        = "website"
  }

  deployment_configs = {
    production = {
      environment_variables = {
        REACT_APP_API_HOST = "https://curzy-api.lipelix.workers.dev"
      }

      compatibility_date  = "2024-12-05"
      compatibility_flags = ["nodejs_compat", "nodejs_compat_populate_process_env"]
    }
  }
}
