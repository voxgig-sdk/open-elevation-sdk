<?php
declare(strict_types=1);

// Typed models for the OpenElevation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Lookup entity data model. */
class Lookup
{
    public ?float $elevation = null;
    public ?float $latitude = null;
    public array $location;
    public ?float $longitude = null;
    public ?array $result = null;
}

/** Match filter for Lookup#list (any subset of Lookup fields). */
class LookupListMatch
{
    public ?float $elevation = null;
    public ?float $latitude = null;
    public ?array $location = null;
    public ?float $longitude = null;
    public ?array $result = null;
}

/** Match filter for Lookup#create (any subset of Lookup fields). */
class LookupCreateData
{
    public ?float $elevation = null;
    public ?float $latitude = null;
    public ?array $location = null;
    public ?float $longitude = null;
    public ?array $result = null;
}

