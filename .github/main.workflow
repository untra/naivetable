workflow "New workflow" {
  on = "push"
  resolves = ["Filters for GitHub Actions"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Filters for GitHub Actionssss" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}
