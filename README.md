# MPAC Tools for Node

_This project is not endorsed by the [Municipal Property Assessment Corporation (MPAC)](https://www.mpac.ca)._

_Lookups and utilities for working with MPAC data._

## Installation

```bash
npm install @cityssm/mpac-tools
```

## Usage

```javascript
import * as mpacTools from '@cityssm/mpac-tools'

/*
 * Validate 15-digit roll numbers.
 */

console.log(mpacTools.validateRollNumber('123456789012345'))
// => true

/*
 * Validate 19-digit roll numbers,
 * ensuring the first four digits is a valid municipality.
 */

console.log(mpacTools.validateRollNumber('5761010000000000000'))
// => true

/*
 * Parse a roll number into its parts.
 */

console.log(mpacTools.parseRollNumber('5761123456789012345'))
/*
  => {
    county: '57',
    municipality: '61',
    mapArea: '12',
    mapDivision: '3',
    mapSubdivision: '456',
    parcel: '789',
    parcelSub: '01',
    primarySubordinate: '2345'
  }
 */
```

## Related Projects

[**MPAC Year-End Tax File (YETF) Parser**](https://www.npmjs.com/package/@cityssm/mpac-yetf)<br />
Takes an MPAC Year End Tax File (YETF) and parses it into usable objects.

🔒 **MPAC Web Services for Node**<br />
An unofficial wrapper around MPAC Web Services.
_Restricted by classified documentation._
