<?php
declare(strict_types=1);

// OpenElevation SDK exists test

require_once __DIR__ . '/../openelevation_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenElevationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
