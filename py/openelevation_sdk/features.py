# OpenElevation SDK feature factory

from openelevation_sdk.feature.base_feature import OpenElevationBaseFeature
from openelevation_sdk.feature.ratelimit_feature import OpenElevationRatelimitFeature
from openelevation_sdk.feature.retry_feature import OpenElevationRetryFeature
from openelevation_sdk.feature.test_feature import OpenElevationTestFeature
from openelevation_sdk.feature.timeout_feature import OpenElevationTimeoutFeature


_FEATURES = {
    "base": lambda: OpenElevationBaseFeature(),
    "ratelimit": lambda: OpenElevationRatelimitFeature(),
    "retry": lambda: OpenElevationRetryFeature(),
    "test": lambda: OpenElevationTestFeature(),
    "timeout": lambda: OpenElevationTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
