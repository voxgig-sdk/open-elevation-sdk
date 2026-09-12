"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'OpenElevation',
        slug: "open-elevation",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.open-elevation.com",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            lookup: {},
        }
    };
    entity = {
        "lookup": {
            "fields": [
                {
                    "format": "double",
                    "name": "elevation",
                    "short": "Elevation in meters above sea level",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "double",
                    "name": "latitude",
                    "short": "Latitude of the location",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "locations",
                    "req": true,
                    "short": "Array of location objects with latitude and longitude",
                    "type": "`$ARRAY`"
                },
                {
                    "format": "double",
                    "name": "longitude",
                    "short": "Longitude of the location",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "results",
                    "short": "Array of elevation results for the requested locations",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "lookup",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/v1/lookup",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "lookup"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "v1",
                                "lookup"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "10,10|20,20|41.161758,-8.583933",
                                        "kind": "query",
                                        "name": "location",
                                        "orig": "location",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/v1/lookup",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "lookup"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "location"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "api",
                                "v1",
                                "lookup"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map