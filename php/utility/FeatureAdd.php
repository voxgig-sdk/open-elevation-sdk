<?php
declare(strict_types=1);

// OpenElevation SDK utility: feature_add

class OpenElevationFeatureAdd
{
    public static function call(OpenElevationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
