export interface Lookup {
    elevation?: number;
    latitude?: number;
    locations: any[];
    longitude?: number;
    results?: any[];
}
export interface LookupListMatch {
    location: string;
}
export interface LookupCreateData {
    locations: any[];
}
