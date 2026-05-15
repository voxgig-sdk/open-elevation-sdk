<?php
declare(strict_types=1);

// OpenElevation SDK utility: prepare_body

class OpenElevationPrepareBody
{
    public static function call(OpenElevationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
