"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.open-elevation.com",
        auth: {
            prefix: '',
            name: 'X-API-Key',
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
                    "name": "elevation",
                    "title": "Elevation",
                    "type": "`$NUMBER`",
                    "short": "Elevation in meters above sea level",
                    "format": "double"
                },
                {
                    "name": "latitude",
                    "title": "Latitude",
                    "type": "`$NUMBER`",
                    "short": "Latitude of the location",
                    "format": "double"
                },
                {
                    "name": "locations",
                    "title": "Locations",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Array of location objects with latitude and longitude"
                },
                {
                    "name": "longitude",
                    "title": "Longitude",
                    "type": "`$NUMBER`",
                    "short": "Longitude of the location",
                    "format": "double"
                },
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$ARRAY`",
                    "short": "Array of elevation results for the requested locations"
                }
            ],
            "name": "lookup",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
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
                            "parts": [
                                "api",
                                "v1",
                                "lookup"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "api",
                                "v1",
                                "lookup"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "location",
                                        "orig": "location",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "10,10|20,20|41.161758,-8.583933"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "location"
                                ]
                            }
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