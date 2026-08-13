# OpenElevation SDK utility: make_context

from openelevation_sdk.core.context import OpenElevationContext


def make_context_util(ctxmap, basectx):
    return OpenElevationContext(ctxmap, basectx)
