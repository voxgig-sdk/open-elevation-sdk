import { Context } from './Context';
declare class OpenElevationError extends Error {
    isOpenElevationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OpenElevationError };
