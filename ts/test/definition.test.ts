import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "lookup",
    "accessor": "Lookup",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/lookup",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
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
    "query": [
      "locations"
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
