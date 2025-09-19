import { rollNumberMunicipalities } from './lookups.js';
export function validateRollNumber(rollNumber) {
    return (/^\d{15}$/.test(rollNumber) ||
        (/^\d{19}$/.test(rollNumber) &&
            Object.keys(rollNumberMunicipalities).includes(rollNumber.slice(0, 4))));
}
export function parseRollNumber(rollNumber) {
    if (!validateRollNumber(rollNumber)) {
        throw new Error(`Invalid roll number: ${rollNumber}`);
    }
    const is19Digit = rollNumber.length === 19;
    const countyMunicipalityDigits = is19Digit ? rollNumber.slice(0, 4) : '';
    const shortRollNumber = is19Digit ? rollNumber.slice(4) : rollNumber;
    return {
        county: is19Digit ? countyMunicipalityDigits.slice(0, 2) : undefined,
        municipality: is19Digit ? countyMunicipalityDigits.slice(2, 4) : undefined,
        mapArea: shortRollNumber.slice(0, 2),
        mapDivision: shortRollNumber.slice(2, 3),
        mapSubdivision: shortRollNumber.slice(3, 6),
        parcel: shortRollNumber.slice(6, 9),
        parcelSub: shortRollNumber.slice(9, 11),
        primarySubordinate: shortRollNumber.slice(11, 15)
    };
}
