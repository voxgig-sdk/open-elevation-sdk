// Typed models for the OpenElevation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Lookup {
  elevation?: number
  latitude?: number
  location: any[]
  longitude?: number
  result?: any[]
}

export interface LookupListMatch {
  elevation?: number
  latitude?: number
  location?: any[]
  longitude?: number
  result?: any[]
}

export interface LookupCreateData {
  elevation?: number
  latitude?: number
  location: any[]
  longitude?: number
  result?: any[]
}

