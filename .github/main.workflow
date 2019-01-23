workflow "New workflow" {
  on = "push"
  resolves = ["FilterNext"]
}

action "FilterMaster" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "FilterNext" {
  needs = "FilterMaster"
  uses = "actions/bin/filter@master"
  args = "branch master"
}
