# OpenElevation SDK utility: make_context
require_relative '../core/context'
module OpenElevationUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenElevationContext.new(ctxmap, basectx)
  }
end
