# frozen_string_literal: true

# Typed models for the OpenElevation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Lookup entity data model.
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [Array]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Lookup = Struct.new(
  :elevation,
  :latitude,
  :location,
  :longitude,
  :result,
  keyword_init: true
)

# Match filter for Lookup#list (any subset of Lookup fields).
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [Array, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
LookupListMatch = Struct.new(
  :elevation,
  :latitude,
  :location,
  :longitude,
  :result,
  keyword_init: true
)

# Match filter for Lookup#create (any subset of Lookup fields).
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [Array, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
LookupCreateData = Struct.new(
  :elevation,
  :latitude,
  :location,
  :longitude,
  :result,
  keyword_init: true
)

