# OpenElevation SDK exists test

require "minitest/autorun"
require_relative "../OpenElevation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenElevationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
