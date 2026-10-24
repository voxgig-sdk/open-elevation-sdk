"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "lookup",
        "accessor": "Lookup",
        "op": "create",
        "method": "POST",
        "path": "/api/v1/lookup",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "results": [
                {
                    "latitude": 10,
                    "longitude": 10,
                    "elevation": 515
                },
                {
                    "latitude": 20,
                    "longitude": 20,
                    "elevation": 590
                },
                {
                    "latitude": 41.161758,
                    "longitude": -8.583933,
                    "elevation": 117
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "lookup",
        "accessor": "Lookup",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/lookup",
        "args": [],
        "select": {
            "location": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locations"
        ],
        "queryArgs": [
            {
                "name": "location",
                "wire": "locations"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "results": [
                {
                    "latitude": 10,
                    "longitude": 10,
                    "elevation": 515
                },
                {
                    "latitude": 20,
                    "longitude": 20,
                    "elevation": 590
                },
                {
                    "latitude": 41.161758,
                    "longitude": -8.583933,
                    "elevation": 117
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map