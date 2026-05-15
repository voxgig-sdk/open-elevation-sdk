# OpenElevation SDK utility: feature_add
module OpenElevationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
