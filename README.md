# OpenElevation SDK

Look up terrain elevation for any latitude/longitude using a free, open-source alternative to commercial elevation APIs

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Open-Elevation API

[Open-Elevation](https://www.open-elevation.com/) is a free, open-source elevation lookup service created by João Ricardo Lourenço as an alternative to commercial offerings such as Google's Elevation API. It returns terrain altitude (in metres) for any geographic coordinate.

What you get from the API:

- Single-point and bulk elevation lookups for arbitrary latitude/longitude pairs
- Worldwide coverage drawn from public elevation datasets
- A simple JSON response listing each requested location with its `elevation` value

The public endpoint is `https://api.open-elevation.com/api/v1/lookup`. Coordinates can be supplied as a `locations` query parameter (e.g. `?locations=41.161758,-8.583933`) for GET requests. No API key or authentication is required, and CORS is enabled for browser use.

For heavier or production workloads, the project provides Docker images and dataset scripts so you can run your own instance against the SRTM-derived elevation data.

## Try it

**TypeScript**
```bash
npm install open-elevation
```

**Python**
```bash
pip install open-elevation-sdk
```

**PHP**
```bash
composer require voxgig/open-elevation-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/open-elevation-sdk/go
```

**Ruby**
```bash
gem install open-elevation-sdk
```

**Lua**
```bash
luarocks install open-elevation-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenElevationSDK } from 'open-elevation'

const client = new OpenElevationSDK({})

// List all lookups
const lookups = await client.Lookup().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o open-elevation-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "open-elevation": {
      "command": "/abs/path/to/open-elevation-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Lookup** | Elevation lookup operations against the `/api/v1/lookup` endpoint, accepting one or more `latitude,longitude` pairs and returning the elevation in metres for each point. | `/api/v1/lookup` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openelevation_sdk import OpenElevationSDK

client = OpenElevationSDK({})

# List all lookups
lookups, err = client.Lookup(None).list(None, None)
```

### PHP

```php
<?php
require_once 'openelevation_sdk.php';

$client = new OpenElevationSDK([]);

// List all lookups
[$lookups, $err] = $client->Lookup(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/open-elevation-sdk/go"

client := sdk.NewOpenElevationSDK(map[string]any{})

// List all lookups
lookups, err := client.Lookup(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OpenElevation_sdk"

client = OpenElevationSDK.new({})

# List all lookups
lookups, err = client.Lookup(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("open-elevation_sdk")

local client = sdk.new({})

-- List all lookups
local lookups, err = client:Lookup(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenElevationSDK.test()
const result = await client.Lookup().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenElevationSDK.test(None, None)
result, err = client.Lookup(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenElevationSDK::test(null, null);
[$result, $err] = $client->Lookup(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Lookup(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenElevationSDK.test(nil, nil)
result, err = client.Lookup(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Lookup(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Open-Elevation API

- Upstream: [https://www.open-elevation.com/](https://www.open-elevation.com/)

- The Open-Elevation server software is released under the GNU GPL v2.
- The hosted service at `api.open-elevation.com` is offered free of charge with no authentication required.
- The project is community-maintained; self-hosting via Docker or native installation is documented for production use.

---

Generated from the Open-Elevation API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
