package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenElevation",
			"slug": "open-elevation",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.open-elevation.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"lookup": map[string]any{},
			},
		},
		"entity": map[string]any{
			"lookup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "elevation",
						"short": "Elevation in meters above sea level",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude of the location",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "locations",
						"req": true,
						"short": "Array of location objects with latitude and longitude",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude of the location",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of elevation results for the requested locations",
						"type": "`$ARRAY`",
					},
				},
				"name": "lookup",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/lookup",
								"parts": []any{
									"api",
									"v1",
									"lookup",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "10,10|20,20|41.161758,-8.583933",
											"kind": "query",
											"name": "location",
											"orig": "location",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/lookup",
								"parts": []any{
									"api",
									"v1",
									"lookup",
								},
								"select": map[string]any{
									"exist": []any{
										"location",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
