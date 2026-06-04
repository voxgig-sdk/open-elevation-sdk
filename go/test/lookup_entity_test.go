package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/open-elevation-sdk/go"
	"github.com/voxgig-sdk/open-elevation-sdk/go/core"

	vs "github.com/voxgig-sdk/open-elevation-sdk/go/utility/struct"
)

func TestLookupEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Lookup(nil)
		if ent == nil {
			t.Fatal("expected non-nil LookupEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := lookupBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "lookup." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENELEVATION_TEST_LOOKUP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		lookupRef01Ent := client.Lookup(nil)
		lookupRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "lookup"}, setup.data), "lookup_ref01"))

		lookupRef01DataResult, err := lookupRef01Ent.Create(lookupRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		lookupRef01Data = core.ToMapAny(lookupRef01DataResult)
		if lookupRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		lookupRef01Match := map[string]any{}

		lookupRef01ListResult, err := lookupRef01Ent.List(lookupRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		lookupRef01List, lookupRef01ListOk := lookupRef01ListResult.([]any)
		if !lookupRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", lookupRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(lookupRef01List), map[string]any{"id": lookupRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func lookupBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "lookup", "LookupTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read lookup test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse lookup test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"lookup01", "lookup02", "lookup03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENELEVATION_TEST_LOOKUP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENELEVATION_TEST_LOOKUP_ENTID": idmap,
		"OPENELEVATION_TEST_LIVE":      "FALSE",
		"OPENELEVATION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENELEVATION_TEST_LOOKUP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENELEVATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewOpenElevationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENELEVATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENELEVATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
