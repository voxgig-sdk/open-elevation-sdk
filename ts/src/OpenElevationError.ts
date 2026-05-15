
import { Context } from './Context'


class OpenElevationError extends Error {

  isOpenElevationError = true

  sdk = 'OpenElevation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenElevationError
}

