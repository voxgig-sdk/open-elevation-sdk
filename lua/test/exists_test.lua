-- OpenElevation SDK exists test

local sdk = require("open-elevation_sdk")

describe("OpenElevationSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
