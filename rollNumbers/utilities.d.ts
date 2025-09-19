export declare function validateRollNumber(rollNumber: string): boolean;
export interface ParsedRollNumber {
    county?: string;
    municipality?: string;
    mapArea: string;
    mapDivision: string;
    mapSubdivision: string;
    parcel: string;
    parcelSub: string;
    primarySubordinate: string;
}
export declare function parseRollNumber(rollNumber: string): ParsedRollNumber;
