import assert from 'node:assert'
import { describe, it } from 'node:test'

import * as codes from '../codes/index.js'

await describe('mpac-tools/codes', async () => {
  await it('should have valid lookup data', () => {
    // YETF BB
    assert.strictEqual(codes.propertyCodeClasses[100], 'Land')

    // YETF CC
    assert.strictEqual(codes.yearBuiltCodeNames.A, 'Addition')

    // YETF DD
    assert.strictEqual(codes.textureCodeNames[5], 'Clay')

    // YETF GG
    assert.strictEqual(codes.identifierNames.M, 'Male')

    // YETF PA
    assert.strictEqual(codes.realtyTaxClassNames.F, 'Farm')

  })
})
