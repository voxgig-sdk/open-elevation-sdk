"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LookupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_ELEVATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_ELEVATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenElevationSDK.test();
        const ent = testsdk.Lookup();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_ELEVATION_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lookup.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "double", "name": "elevation", "req": false, "short": "Elevation in meters above sea level", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "format": "double", "name": "latitude", "req": false, "short": "Latitude of the location", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "locations", "req": true, "short": "Array of location objects with latitude and longitude", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "format": "double", "name": "longitude", "req": false, "short": "Longitude of the location", "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "results", "req": false, "short": "Array of elevation results for the requested locations", "type": "`$ARRAY`", "index$": 4 }], "name": "lookup", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/v1/lookup", "json": "{\"operationId\":\"postElevation\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"locations\":[{\"latitude\":10,\"longitude\":10},{\"latitude\":20,\"longitude\":20},{\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"locations\":{\"description\":\"Array of location objects with latitude and longitude\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"Latitude in decimal degrees\",\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude in decimal degrees\",\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},\"required\":[\"latitude\",\"longitude\"],\"type\":\"object\"},\"minItems\":1,\"type\":\"array\"}},\"required\":[\"locations\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"results\":[{\"elevation\":515,\"latitude\":10,\"longitude\":10},{\"elevation\":590,\"latitude\":20,\"longitude\":20},{\"elevation\":117,\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for the requested locations\",\"items\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters above sea level\",\"format\":\"double\",\"type\":\"number\"},\"latitude\":{\"description\":\"Latitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the location\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid JSON or parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/v1/lookup", "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "lookup" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "10,10|20,20|41.161758,-8.583933", "kind": "query", "name": "location", "orig": "location", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/v1/lookup", "json": "{\"operationId\":\"getElevation\",\"parameters\":[{\"description\":\"Pipe-separated list of latitude,longitude pairs (e.g., 10,10|20,20|41.161758,-8.583933)\",\"example\":\"10,10|20,20|41.161758,-8.583933\",\"in\":\"query\",\"name\":\"locations\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"results\":[{\"elevation\":515,\"latitude\":10,\"longitude\":10},{\"elevation\":590,\"latitude\":20,\"longitude\":20},{\"elevation\":117,\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for the requested locations\",\"items\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters above sea level\",\"format\":\"double\",\"type\":\"number\"},\"latitude\":{\"description\":\"Latitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the location\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/v1/lookup", "segments": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "lookup" }], "select": { "exist": ["location"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "lookup", "name__orig": "lookup", "Name": "Lookup", "name_": "lookup", "name-": "lookup", "NAME": "LOOKUP", "index$": 0 }, { "active": true, "entity": "lookup", "key$": "BasicLookupFlow", "kind": "basic", "name": "BasicLookupFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "lookup_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "lookup_ref01" } }], "index$": 1 }] }, 'Lookup');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const lookup_ref01_ent = client.Lookup();
        let lookup_ref01_data = setup.data.new.lookup['lookup_ref01'];
        lookup_ref01_data = (await lookup_ref01_ent.create(lookup_ref01_data)).data();
        (0, node_assert_1.default)(null != lookup_ref01_data);
        // LIST
        const lookup_ref01_match = {};
        const lookup_ref01_list = (await lookup_ref01_ent.list(lookup_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lookup/LookupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenElevationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lookup01', 'lookup02', 'lookup03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_ELEVATION_TEST_LOOKUP_ENTID': idmap,
        'OPEN_ELEVATION_TEST_LIVE': 'FALSE',
        'OPEN_ELEVATION_TEST_EXPLAIN': 'FALSE',
        'OPEN_ELEVATION_APIKEY': '',
    });
    idmap = env['OPEN_ELEVATION_TEST_LOOKUP_ENTID'];
    const live = 'TRUE' === env.OPEN_ELEVATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_ELEVATION_TEST_LOOKUP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenElevationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPEN_ELEVATION_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPEN_ELEVATION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LookupEntity.test.js.map