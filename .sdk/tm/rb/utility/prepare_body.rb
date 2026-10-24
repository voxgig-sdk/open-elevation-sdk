# OpenElevation SDK utility: prepare_body
require_relative 'media'
module OpenElevationUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OpenElevationUtilities.raw_body(ctx.reqdata) if OpenElevationUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
