<?php
declare(strict_types=1);

// OpenElevation SDK base feature

class OpenElevationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenElevationContext $ctx, array $options): void {}
    public function PostConstruct(OpenElevationContext $ctx): void {}
    public function PostConstructEntity(OpenElevationContext $ctx): void {}
    public function SetData(OpenElevationContext $ctx): void {}
    public function GetData(OpenElevationContext $ctx): void {}
    public function GetMatch(OpenElevationContext $ctx): void {}
    public function SetMatch(OpenElevationContext $ctx): void {}
    public function PrePoint(OpenElevationContext $ctx): void {}
    public function PreSpec(OpenElevationContext $ctx): void {}
    public function PreRequest(OpenElevationContext $ctx): void {}
    public function PreResponse(OpenElevationContext $ctx): void {}
    public function PreResult(OpenElevationContext $ctx): void {}
    public function PreDone(OpenElevationContext $ctx): void {}
    public function PreUnexpected(OpenElevationContext $ctx): void {}
}
