# Lookup entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from openelevation_sdk import OpenElevationSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestLookupEntity:

    def test_should_create_instance(self):
        testsdk = OpenElevationSDK.test(None, None)
        ent = testsdk.Lookup(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "lookup": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = OpenElevationSDK.test(seed, None)
        seen = list(base.Lookup(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from config import make_config
        cfg = make_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = OpenElevationSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Lookup(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _lookup_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "lookup." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set OPENELEVATION_TEST_LOOKUP_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        lookup_ref01_ent = client.Lookup(None)
        lookup_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.lookup"), "lookup_ref01"))

        lookup_ref01_data = helpers.to_map(lookup_ref01_ent.create(lookup_ref01_data, None))
        assert lookup_ref01_data is not None

        # LIST
        lookup_ref01_match = {}

        lookup_ref01_list_result = lookup_ref01_ent.list(lookup_ref01_match, None)
        assert isinstance(lookup_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(lookup_ref01_list_result),
            {"id": lookup_ref01_data["id"]})
        assert not vs.isempty(found_item)



def _lookup_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/lookup/LookupTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = OpenElevationSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["lookup01", "lookup02", "lookup03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "OPENELEVATION_TEST_LOOKUP_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "OPENELEVATION_TEST_LOOKUP_ENTID": idmap,
        "OPENELEVATION_TEST_LIVE": "FALSE",
        "OPENELEVATION_TEST_EXPLAIN": "FALSE",
        "OPENELEVATION_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("OPENELEVATION_TEST_LOOKUP_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("OPENELEVATION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("OPENELEVATION_APIKEY"),
            },
            extra or {},
        ])
        client = OpenElevationSDK(helpers.to_map(merged_opts))

    _live = env.get("OPENELEVATION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("OPENELEVATION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
