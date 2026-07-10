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
                "prefix": "",
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
            "active": True,
            "name": "elevation",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "latitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "location",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "longitude",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "result",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
        ],
        "name": "lookup",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/v1/lookup",
                "parts": [
                  "api",
                  "v1",
                  "lookup",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "10,10|20,20|41.161758,-8.583933",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": True,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
