-- OpenElevation SDK error

local OpenElevationError = {}
OpenElevationError.__index = OpenElevationError


function OpenElevationError.new(code, msg, ctx)
  local self = setmetatable({}, OpenElevationError)
  self.is_sdk_error = true
  self.sdk = "OpenElevation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenElevationError:error()
  return self.msg
end


function OpenElevationError:__tostring()
  return self.msg
end


return OpenElevationError
