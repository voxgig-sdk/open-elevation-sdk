

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"elevation":{"a":true,"fo":"double","h":"Elevation","n":"elevation","r":false,"sh":"Elevation in meters above sea level","t":"`$NUMBER`","key$":"elevation","index$":0},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude of the location","t":"`$NUMBER`","key$":"latitude","index$":1},"locations":{"a":true,"h":"Locations","n":"locations","r":true,"sh":"Array of location objects with latitude and longitude","t":"`$ARRAY`","key$":"locations","index$":2},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude of the location","t":"`$NUMBER`","key$":"longitude","index$":3},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Array of elevation results for the requested locations","t":"`$ARRAY`","key$":"results","index$":4}},"name":"lookup","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/lookup","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/lookup","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"lookup"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/lookup","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"10,10|20,20|41.161758,-8.583933","k":"query","n":"location","or":"location","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/lookup","q":{"exist":["location"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"lookup"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"lookup","name__orig":"lookup","Name":"Lookup","name_":"lookup","name-":"lookup","NAME":"LOOKUP","index$":0}, {"active":true,"entity":"lookup","key$":"BasicLookupFlow","kind":"basic","name":"BasicLookupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lookup_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"lookup_ref01"}}],"index$":1}]}, 'Lookup', {"POST /api/v1/lookup":{"protocol":"http","operationId":"postElevation","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["locations"],"properties":{"locations":{"type":"array","description":"Array of location objects with latitude and longitude","items":{"type":"object","required":["latitude","longitude"],"properties":{"latitude":{"type":"number","format":"double","description":"Latitude in decimal degrees","minimum":-90,"maximum":90},"longitude":{"type":"number","format":"double","description":"Longitude in decimal degrees","minimum":-180,"maximum":180}},"x-ref":"#/components/schemas/Location"},"minItems":1,"key$":"locations"}},"x-ref":"#/components/schemas/ElevationRequest","index$":1},"example":{"locations":[{"latitude":10,"longitude":10},{"latitude":20,"longitude":20},{"latitude":41.161758,"longitude":-8.583933}]}}}},"responses":{"200":{"description":"Successful response with elevation data","content":{"application/json":{"schema":{"type":"object","properties":{"results":{"description":"Array of elevation results for the requested locations","items":{"properties":{"elevation":{"description":"Elevation in meters above sea level","format":"double","type":"number","key$":"elevation"},"latitude":{"description":"Latitude of the location","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude of the location","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/ElevationResult","index$":0},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/ElevationResponse","index$":0},"example":{"results":[{"latitude":10,"longitude":10,"elevation":515},{"latitude":20,"longitude":20,"elevation":590},{"latitude":41.161758,"longitude":-8.583933,"elevation":117}]}}}},"400":{"description":"Bad request - invalid JSON or parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month."}}},"GET /api/v1/lookup":{"protocol":"http","operationId":"getElevation","responses":{"200":{"description":"Successful response with elevation data","content":{"application/json":{"schema":{"type":"object","properties":{"results":{"description":"Array of elevation results for the requested locations","items":{"properties":{"elevation":{"description":"Elevation in meters above sea level","format":"double","type":"number","key$":"elevation"},"latitude":{"description":"Latitude of the location","format":"double","type":"number","key$":"latitude"},"longitude":{"description":"Longitude of the location","format":"double","type":"number","key$":"longitude"}},"type":"object","x-ref":"#/components/schemas/ElevationResult","index$":0},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/ElevationResponse"},"example":{"results":[{"latitude":10,"longitude":10,"elevation":515},{"latitude":20,"longitude":20,"elevation":590},{"latitude":41.161758,"longitude":-8.583933,"elevation":117}]}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message describing what went wrong"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"locations","in":"query","description":"Pipe-separated list of latitude,longitude pairs (e.g., 10,10|20,20|41.161758,-8.583933)","required":true,"schema":{"type":"string"},"example":"10,10|20,20|41.161758,-8.583933","index$":0}],"securitySource":"unspecified","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key required for paid plans (Basic, Professional, Enterprise). Free tier does not require authentication but is limited to 1,000 requests/month."}}}})
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
  
