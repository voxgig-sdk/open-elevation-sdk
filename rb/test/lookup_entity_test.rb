# Lookup entity test

require "minitest/autorun"
require "json"
require_relative "../OpenElevation_sdk"
require_relative "runner"

class LookupEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenElevationSDK.test(nil, nil)
    ent = testsdk.Lookup(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "lookup" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = OpenElevationSDK.test(seed, nil)
    seen = base.Lookup(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = OpenElevationConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = OpenElevationSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Lookup(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = lookup_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "lookup." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENELEVATION_TEST_LOOKUP_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    lookup_ref01_ent = client.Lookup(nil)
    lookup_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.lookup"), "lookup_ref01"))

    lookup_ref01_data_result = lookup_ref01_ent.create(lookup_ref01_data, nil)
    lookup_ref01_data = Helpers.to_map(lookup_ref01_data_result)
    assert !lookup_ref01_data.nil?

    # LIST
    lookup_ref01_match = {}

    lookup_ref01_list_result = lookup_ref01_ent.list(lookup_ref01_match, nil)
    assert lookup_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(lookup_ref01_list_result),
      { "id" => lookup_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def lookup_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "lookup", "LookupTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenElevationSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["lookup01", "lookup02", "lookup03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OPENELEVATION_TEST_LOOKUP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENELEVATION_TEST_LOOKUP_ENTID" => idmap,
    "OPENELEVATION_TEST_LIVE" => "FALSE",
    "OPENELEVATION_TEST_EXPLAIN" => "FALSE",
    "OPENELEVATION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENELEVATION_TEST_LOOKUP_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENELEVATION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["OPENELEVATION_APIKEY"],
      },
      extra || {},
    ])
    client = OpenElevationSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENELEVATION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENELEVATION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
