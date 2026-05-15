# OpenElevation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenElevationUtility.registrar = ->(u) {
  u.clean = OpenElevationUtilities::Clean
  u.done = OpenElevationUtilities::Done
  u.make_error = OpenElevationUtilities::MakeError
  u.feature_add = OpenElevationUtilities::FeatureAdd
  u.feature_hook = OpenElevationUtilities::FeatureHook
  u.feature_init = OpenElevationUtilities::FeatureInit
  u.fetcher = OpenElevationUtilities::Fetcher
  u.make_fetch_def = OpenElevationUtilities::MakeFetchDef
  u.make_context = OpenElevationUtilities::MakeContext
  u.make_options = OpenElevationUtilities::MakeOptions
  u.make_request = OpenElevationUtilities::MakeRequest
  u.make_response = OpenElevationUtilities::MakeResponse
  u.make_result = OpenElevationUtilities::MakeResult
  u.make_point = OpenElevationUtilities::MakePoint
  u.make_spec = OpenElevationUtilities::MakeSpec
  u.make_url = OpenElevationUtilities::MakeUrl
  u.param = OpenElevationUtilities::Param
  u.prepare_auth = OpenElevationUtilities::PrepareAuth
  u.prepare_body = OpenElevationUtilities::PrepareBody
  u.prepare_headers = OpenElevationUtilities::PrepareHeaders
  u.prepare_method = OpenElevationUtilities::PrepareMethod
  u.prepare_params = OpenElevationUtilities::PrepareParams
  u.prepare_path = OpenElevationUtilities::PreparePath
  u.prepare_query = OpenElevationUtilities::PrepareQuery
  u.result_basic = OpenElevationUtilities::ResultBasic
  u.result_body = OpenElevationUtilities::ResultBody
  u.result_headers = OpenElevationUtilities::ResultHeaders
  u.transform_request = OpenElevationUtilities::TransformRequest
  u.transform_response = OpenElevationUtilities::TransformResponse
}
