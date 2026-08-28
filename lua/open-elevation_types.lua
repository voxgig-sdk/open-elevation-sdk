-- Typed models for the OpenElevation SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Lookup
---@field elevation? number
---@field latitude? number
---@field locations table
---@field longitude? number
---@field results? table

---@class LookupListMatch
---@field location string

---@class LookupCreateData
---@field elevation? number
---@field latitude? number
---@field locations table
---@field longitude? number
---@field results? table

local M = {}

return M
