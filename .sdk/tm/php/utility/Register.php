<?php
declare(strict_types=1);

// OpenElevation SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OpenElevationUtility::setRegistrar(function (OpenElevationUtility $u): void {
    $u->clean = [OpenElevationClean::class, 'call'];
    $u->done = [OpenElevationDone::class, 'call'];
    $u->make_error = [OpenElevationMakeError::class, 'call'];
    $u->feature_add = [OpenElevationFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenElevationFeatureHook::class, 'call'];
    $u->feature_init = [OpenElevationFeatureInit::class, 'call'];
    $u->fetcher = [OpenElevationFetcher::class, 'call'];
    $u->make_fetch_def = [OpenElevationMakeFetchDef::class, 'call'];
    $u->make_context = [OpenElevationMakeContext::class, 'call'];
    $u->make_options = [OpenElevationMakeOptions::class, 'call'];
    $u->make_request = [OpenElevationMakeRequest::class, 'call'];
    $u->make_response = [OpenElevationMakeResponse::class, 'call'];
    $u->make_result = [OpenElevationMakeResult::class, 'call'];
    $u->make_point = [OpenElevationMakePoint::class, 'call'];
    $u->make_spec = [OpenElevationMakeSpec::class, 'call'];
    $u->make_url = [OpenElevationMakeUrl::class, 'call'];
    $u->param = [OpenElevationParam::class, 'call'];
    $u->prepare_auth = [OpenElevationPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenElevationPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenElevationPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenElevationPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenElevationPrepareParams::class, 'call'];
    $u->prepare_path = [OpenElevationPreparePath::class, 'call'];
    $u->prepare_query = [OpenElevationPrepareQuery::class, 'call'];
    $u->result_basic = [OpenElevationResultBasic::class, 'call'];
    $u->result_body = [OpenElevationResultBody::class, 'call'];
    $u->result_headers = [OpenElevationResultHeaders::class, 'call'];
    $u->transform_request = [OpenElevationTransformRequest::class, 'call'];
    $u->transform_response = [OpenElevationTransformResponse::class, 'call'];
});
