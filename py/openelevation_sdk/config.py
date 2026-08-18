# OpenElevation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "elevation",
            "type": "`$NUMBER`",
          },
          {
            "name": "latitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "locations",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "longitude",
            "type": "`$NUMBER`",
          },
          {
            "name": "results",
            "type": "`$ARRAY`",
          },
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
                  "lookup",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
