<?php
declare(strict_types=1);

// OpenElevation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenElevationMakeContext
{
    public static function call(array $ctxmap, ?OpenElevationContext $basectx): OpenElevationContext
    {
        return new OpenElevationContext($ctxmap, $basectx);
    }
}
