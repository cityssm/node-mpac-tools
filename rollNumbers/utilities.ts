// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { rollNumberMunicipalities } from './lookups.js'

/**
 * Validates a roll number.
 * @param rollNumber - The roll number to validate
 * @returns True if the roll number is valid, false otherwise
 */
export function validateRollNumber(rollNumber: string): boolean {
  return (
    /^\d{15}$/.test(rollNumber) ||
    (/^\d{19}$/.test(rollNumber) &&
      Object.keys(rollNumberMunicipalities).includes(rollNumber.slice(0, 4)))
  )
}

export interface ParsedRollNumber {
  county?: string
  municipality?: string
  mapArea: string
  mapDivision: string
  mapSubdivision: string
  parcel: string
  parcelSub: string
  primarySubordinate: string
}

/**
 * Parses a roll number into its component parts.
 * @param rollNumber - The roll number to parse
 * @returns An object containing the parsed roll number components
 */
export function parseRollNumber(rollNumber: string): ParsedRollNumber {
  if (!validateRollNumber(rollNumber)) {
    throw new Error(`Invalid roll number: ${rollNumber}`)
  }

  const is19Digit = rollNumber.length === 19

  const countyMunicipalityDigits = is19Digit ? rollNumber.slice(0, 4) : ''
  const shortRollNumber = is19Digit ? rollNumber.slice(4) : rollNumber

  return {
    county: is19Digit ? countyMunicipalityDigits.slice(0, 2) : undefined,
    municipality: is19Digit ? countyMunicipalityDigits.slice(2, 4) : undefined,

    mapArea: shortRollNumber.slice(0, 2),
    mapDivision: shortRollNumber.slice(2, 3),
    mapSubdivision: shortRollNumber.slice(3, 6),

    parcel: shortRollNumber.slice(6, 9),
    parcelSub: shortRollNumber.slice(9, 11),
    primarySubordinate: shortRollNumber.slice(11, 15)
  }
}
