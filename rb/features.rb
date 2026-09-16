# OpenElevation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenElevationFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenElevationBaseFeature.new
    when "ratelimit"
      OpenElevationRatelimitFeature.new
    when "retry"
      OpenElevationRetryFeature.new
    when "test"
      OpenElevationTestFeature.new
    when "timeout"
      OpenElevationTimeoutFeature.new
    else
      OpenElevationBaseFeature.new
    end
  end
end
