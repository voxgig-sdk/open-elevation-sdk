# OpenElevation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenElevationFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenElevationBaseFeature.new
    when "test"
      OpenElevationTestFeature.new
    else
      OpenElevationBaseFeature.new
    end
  end
end
