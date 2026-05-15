<?php
declare(strict_types=1);

// OpenElevation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenElevationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenElevationBaseFeature();
            case "test":
                return new OpenElevationTestFeature();
            default:
                return new OpenElevationBaseFeature();
        }
    }
}
