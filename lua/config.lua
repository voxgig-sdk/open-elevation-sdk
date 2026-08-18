-- OpenElevation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OpenElevation",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.open-elevation.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["lookup"] = {},
      },
    },
    entity = {
      ["lookup"] = {
        ["fields"] = {
          {
            ["name"] = "elevation",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "locations",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "results",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "lookup",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/v1/lookup",
                ["parts"] = {
                  "api",
                  "v1",
                  "lookup",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "10,10|20,20|41.161758,-8.583933",
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/v1/lookup",
                ["parts"] = {
                  "api",
                  "v1",
                  "lookup",
                },
                ["select"] = {
                  ["exist"] = {
                    "location",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
