# OpenElevation SDK feature factory

from openelevation_sdk.feature.base_feature import OpenElevationBaseFeature
from openelevation_sdk.feature.test_feature import OpenElevationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenElevationBaseFeature(),
        "test": lambda: OpenElevationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
