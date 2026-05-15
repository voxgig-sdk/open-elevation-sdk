<?php
declare(strict_types=1);

// OpenElevation SDK utility: result_body

class OpenElevationResultBody
{
    public static function call(OpenElevationContext $ctx): ?OpenElevationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
