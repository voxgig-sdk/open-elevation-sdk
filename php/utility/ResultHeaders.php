<?php
declare(strict_types=1);

// OpenElevation SDK utility: result_headers

class OpenElevationResultHeaders
{
    public static function call(OpenElevationContext $ctx): ?OpenElevationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
