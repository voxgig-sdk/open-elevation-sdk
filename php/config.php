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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.open-elevation.com",
                "auth" => [
                    "prefix" => "",
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
              'short' => 'Elevation in meters above sea level',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'latitude',
              'short' => 'Latitude of the location',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'locations',
              'req' => true,
              'short' => 'Array of location objects with latitude and longitude',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'longitude',
              'short' => 'Longitude of the location',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'results',
              'short' => 'Array of elevation results for the requested locations',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'lookup',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/v1/lookup',
                  'parts' => [
                    'api',
                    'v1',
                    'lookup',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '10,10|20,20|41.161758,-8.583933',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/v1/lookup',
                  'parts' => [
                    'api',
                    'v1',
                    'lookup',
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
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
