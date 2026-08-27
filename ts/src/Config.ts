
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OpenElevation',
        slug: "open-elevation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.open-elevation.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      lookup: {
      },

    }
  }


  entity = {
    "lookup": {
      "fields": [
        {
          "name": "elevation",
          "short": "Elevation in meters above sea level",
          "type": "`$NUMBER`"
        },
        {
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
              "parts": [
                "api",
                "v1",
                "lookup"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "v1",
                "lookup"
              ],
              "select": {
                "exist": [
                  "location"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

