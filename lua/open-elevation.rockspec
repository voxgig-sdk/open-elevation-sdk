package = "voxgig-sdk-open-elevation"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/open-elevation-sdk.git"
}
description = {
  summary = "OpenElevation SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["open-elevation_sdk"] = "open-elevation_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
