

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenElevationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('LookupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_ELEVATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_ELEVATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenElevationSDK.test()
    const ent = testsdk.Lookup()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_ELEVATION_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lookup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"double","name":"elevation","req":false,"short":"Elevation in meters above sea level","type":"`$NUMBER`","index$":0},{"active":true,"format":"double","name":"latitude","req":false,"short":"Latitude of the location","type":"`$NUMBER`","index$":1},{"active":true,"name":"locations","req":true,"short":"Array of location objects with latitude and longitude","type":"`$ARRAY`","index$":2},{"active":true,"format":"double","name":"longitude","req":false,"short":"Longitude of the location","type":"`$NUMBER`","index$":3},{"active":true,"name":"results","req":false,"short":"Array of elevation results for the requested locations","type":"`$ARRAY`","index$":4}],"name":"lookup","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/v1/lookup","json":"{\"operationId\":\"postElevation\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"locations\":[{\"latitude\":10,\"longitude\":10},{\"latitude\":20,\"longitude\":20},{\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"locations\":{\"description\":\"Array of location objects with latitude and longitude\",\"items\":{\"properties\":{\"latitude\":{\"description\":\"Latitude in decimal degrees\",\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude in decimal degrees\",\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},\"required\":[\"latitude\",\"longitude\"],\"type\":\"object\"},\"minItems\":1,\"type\":\"array\"}},\"required\":[\"locations\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"results\":[{\"elevation\":515,\"latitude\":10,\"longitude\":10},{\"elevation\":590,\"latitude\":20,\"longitude\":20},{\"elevation\":117,\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for the requested locations\",\"items\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters above sea level\",\"format\":\"double\",\"type\":\"number\"},\"latitude\":{\"description\":\"Latitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the location\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid JSON or parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/v1/lookup","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"lookup"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"10,10|20,20|41.161758,-8.583933","kind":"query","name":"location","orig":"location","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/v1/lookup","json":"{\"operationId\":\"getElevation\",\"parameters\":[{\"description\":\"Pipe-separated list of latitude,longitude pairs (e.g., 10,10|20,20|41.161758,-8.583933)\",\"example\":\"10,10|20,20|41.161758,-8.583933\",\"in\":\"query\",\"name\":\"locations\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"results\":[{\"elevation\":515,\"latitude\":10,\"longitude\":10},{\"elevation\":590,\"latitude\":20,\"longitude\":20},{\"elevation\":117,\"latitude\":41.161758,\"longitude\":-8.583933}]},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for the requested locations\",\"items\":{\"properties\":{\"elevation\":{\"description\":\"Elevation in meters above sea level\",\"format\":\"double\",\"type\":\"number\"},\"latitude\":{\"description\":\"Latitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude of the location\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/v1/lookup","segments":[{"lit":"api"},{"lit":"v1"},{"lit":"lookup"}],"select":{"exist":["location"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"lookup","name__orig":"lookup","Name":"Lookup","name_":"lookup","name-":"lookup","NAME":"LOOKUP","index$":0}, {"active":true,"entity":"lookup","key$":"BasicLookupFlow","kind":"basic","name":"BasicLookupFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"lookup_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"lookup_ref01"}}],"index$":1}]}, 'Lookup')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const lookup_ref01_ent = client.Lookup()
    let lookup_ref01_data = setup.data.new.lookup['lookup_ref01']

    lookup_ref01_data = (await lookup_ref01_ent.create(lookup_ref01_data)).data()
    assert(null != lookup_ref01_data)


    // LIST
    const lookup_ref01_match: any = {}

    const lookup_ref01_list = (await lookup_ref01_ent.list(lookup_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/lookup/LookupTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenElevationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['lookup01','lookup02','lookup03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_ELEVATION_TEST_LOOKUP_ENTID': idmap,
    'OPEN_ELEVATION_TEST_LIVE': 'FALSE',
    'OPEN_ELEVATION_TEST_EXPLAIN': 'FALSE',
    'OPEN_ELEVATION_APIKEY': '',
  })

  idmap = env['OPEN_ELEVATION_TEST_LOOKUP_ENTID']

  const live = 'TRUE' === env.OPEN_ELEVATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_ELEVATION_TEST_LOOKUP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenElevationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
