resource "cloudflare_workers_script" "curzy_api" {
  account_id          = data.cloudflare_account.lipelix_labs.account_id
  script_name         = "curzy-api"
  compatibility_date  = "2024-12-05"
  compatibility_flags = ["nodejs_compat", "nodejs_compat_populate_process_env"]
  content             = sensitive(file("${path.root}/workers-dist/curzy-api/index.js"))
  main_module         = "index.js"

  bindings = [{
    name = "MONGO_DB_URI"
    type = "secret_text"
    text = var.mongo_db_uri
    }, {
    name = "ALLOWED_ORIGINS"
    type = "secret_text"
    text = var.allowed_origins
  }]
}
