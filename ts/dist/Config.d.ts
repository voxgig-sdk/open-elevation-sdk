import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            lookup: {};
        };
    };
    entity: {
        lookup: {
            fields: ({
                format: string;
                name: string;
                short: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                req: boolean;
                short: string;
                type: string;
                format?: undefined;
            } | {
                name: string;
                short: string;
                type: string;
                format?: undefined;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: {
                                example: string;
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                            }[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
