-- ProjectName SDK configuration

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
        prefix = "Bearer",
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
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "latitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "location",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "longitude",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "result",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["active"] = true,
            ["index$"] = 4,
          },
        },
        ["name"] = "lookup",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["method"] = "POST",
                ["orig"] = "/api/v1/lookup",
                ["parts"] = {
                  "api",
                  "v1",
                  "lookup",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["args"] = {},
                ["select"] = {},
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
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
                      ["active"] = true,
                    },
                  },
                },
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
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
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
