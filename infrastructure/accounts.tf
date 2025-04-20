output "Cloudflare_account" {
  value = data.cloudflare_account.lipelix_labs
}

data "cloudflare_account" "lipelix_labs" {
  filter = {
    name = "lipelix-labs"
  }
}