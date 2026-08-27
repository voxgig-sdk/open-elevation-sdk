# OpenElevation SDK configuration

module OpenElevationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "OpenElevation",
        "slug" => "open-elevation",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.open-elevation.com",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "lookup" => {},
        },
      },
      "entity" => {
        "lookup" => {
          "fields" => [
            {
              "name" => "elevation",
              "short" => "Elevation in meters above sea level",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "latitude",
              "short" => "Latitude of the location",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "locations",
              "req" => true,
              "short" => "Array of location objects with latitude and longitude",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "longitude",
              "short" => "Longitude of the location",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "results",
              "short" => "Array of elevation results for the requested locations",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "lookup",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/v1/lookup",
                  "parts" => [
                    "api",
                    "v1",
                    "lookup",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "10,10|20,20|41.161758,-8.583933",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/v1/lookup",
                  "parts" => [
                    "api",
                    "v1",
                    "lookup",
                  ],
                  "select" => {
                    "exist" => [
                      "location",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenElevationFeatures.make_feature(name)
  end
end
