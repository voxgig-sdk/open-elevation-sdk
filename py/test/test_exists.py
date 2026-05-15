# ProjectName SDK exists test

import pytest
from openelevation_sdk import OpenElevationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenElevationSDK.test(None, None)
        assert testsdk is not None
