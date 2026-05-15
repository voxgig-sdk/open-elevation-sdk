# OpenElevation SDK configuration


def make_config():
    return {
        "main": {
            "name": "OpenElevation",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.open-elevation.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "lookup": {},
            },
        },
        "entity": {
      "lookup": {
        "fields": [
          {
            "name": "elevation",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "location",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "result",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "lookup",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/v1/lookup",
                "parts": [
                  "api",
                  "v1",
                  "lookup",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "list": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/v1/lookup",
                "parts": [
                  "api",
                  "v1",
                  "lookup",
                ],
                "select": {
                  "exist": [
                    "location",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
