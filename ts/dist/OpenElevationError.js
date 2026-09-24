"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenElevationError = void 0;
class OpenElevationError extends Error {
    isOpenElevationError = true;
    sdk = 'OpenElevation';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OpenElevationError = OpenElevationError;
//# sourceMappingURL=OpenElevationError.js.map