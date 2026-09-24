<?php
declare(strict_types=1);

// OpenElevation SDK configuration

class OpenElevationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OpenElevation",
                "slug" => "open-elevation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.open-elevation.com",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "lookup" => [],
                ],
            ],
            "entity" => [
        'lookup' => [
          'fields' => [
            [
              'name' => 'elevation',
              'title' => 'Elevation',
              'type' => '`$NUMBER`',
              'short' => 'Elevation in meters above sea level',
              'format' => 'double',
            ],
            [
              'name' => 'latitude',
              'title' => 'Latitude',
              'type' => '`$NUMBER`',
              'short' => 'Latitude of the location',
              'format' => 'double',
            ],
            [
              'name' => 'locations',
              'title' => 'Locations',
              'type' => '`$ARRAY`',
              'req' => true,
              'short' => 'Array of location objects with latitude and longitude',
            ],
            [
              'name' => 'longitude',
              'title' => 'Longitude',
              'type' => '`$NUMBER`',
              'short' => 'Longitude of the location',
              'format' => 'double',
            ],
            [
              'name' => 'results',
              'title' => 'Results',
              'type' => '`$ARRAY`',
              'short' => 'Array of elevation results for the requested locations',
            ],
          ],
          'name' => 'lookup',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/v1/lookup',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'lookup',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'v1',
                    'lookup',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/lookup',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'lookup',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'v1',
                    'lookup',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '10,10|20,20|41.161758,-8.583933',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OpenElevationFeatures::make_feature($name);
    }
}
