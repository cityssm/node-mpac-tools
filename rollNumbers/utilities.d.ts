/**
 * Validates a roll number.
 * @param rollNumber - The roll number to validate
 * @returns True if the roll number is valid, false otherwise
 */
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
/**
 * Parses a roll number into its component parts.
 * @param rollNumber - The roll number to parse
 * @returns An object containing the parsed roll number components
 */
export declare function parseRollNumber(rollNumber: string): ParsedRollNumber;
