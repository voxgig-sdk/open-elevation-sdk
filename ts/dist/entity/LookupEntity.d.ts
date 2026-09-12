import { OpenElevationEntityBase } from '../OpenElevationEntityBase';
import type { OpenElevationSDK } from '../OpenElevationSDK';
import type { Control } from '../types';
import type { Lookup, LookupListMatch, LookupCreateData } from '../OpenElevationTypes';
declare class LookupEntity extends OpenElevationEntityBase<Lookup> {
    constructor(client: OpenElevationSDK, entopts: any);
    make(this: LookupEntity): LookupEntity;
    list(this: any, reqmatch?: LookupListMatch, ctrl?: Control): Promise<LookupEntity[]>;
    create(this: any, reqdata?: LookupCreateData, ctrl?: Control): Promise<LookupEntity>;
}
export { LookupEntity };
