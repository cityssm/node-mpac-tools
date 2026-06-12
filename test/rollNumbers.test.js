import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as rollNumbers from '../rollNumbers/index.js';
await describe('mpac-tools/rollNumbers/lookups', async () => {
    await describe('rollNumberMunicipalities', async () => {
        await it('should have 4-digit municipality codes', () => {
            for (const code of Object.keys(rollNumbers.rollNumberMunicipalities)) {
                if (!/^\d{4}$/.test(code)) {
                    assert.fail(`Invalid municipality code: ${code}`);
                }
            }
        });
    });
});
await describe('mpac-tools/rollNumbers/utilities', async () => {
    await describe('validateRollNumber', async () => {
        await it('should validate 15-digit roll numbers', () => {
            const validRollNumber = '123456789012345';
            const invalidRollNumber = '12345678901234A';
            if (!rollNumbers.validateRollNumber(validRollNumber)) {
                assert.fail(`Valid roll number marked as invalid: ${validRollNumber}`);
            }
            if (rollNumbers.validateRollNumber(invalidRollNumber)) {
                assert.fail(`Invalid roll number marked as valid: ${invalidRollNumber}`);
            }
        });
        await it('should validate 19-digit roll numbers with valid municipality codes', () => {
            const validRollNumber = '5761000000000000000'; // Sault Ste. Marie code
            const invalidRollNumber = '9999000000000000000'; // Not a valid municipality code
            if (!rollNumbers.validateRollNumber(validRollNumber)) {
                assert.fail(`Valid roll number marked as invalid: ${validRollNumber}`);
            }
            if (rollNumbers.validateRollNumber(invalidRollNumber)) {
                assert.fail(`Invalid roll number marked as valid: ${invalidRollNumber}`);
            }
        });
    });
    await describe('parseRollNumber', async () => {
        await it('should parse valid 15-digit roll numbers', () => {
            const rollNumber = '123456789012345';
            const parsed = rollNumbers.parseRollNumber(rollNumber);
            assert.strictEqual(parsed.county, undefined);
            assert.strictEqual(parsed.municipality, undefined);
            assert.strictEqual(parsed.mapArea, '12');
            assert.strictEqual(parsed.mapDivision, '3');
            assert.strictEqual(parsed.mapSubdivision, '456');
            assert.strictEqual(parsed.parcel, '789');
            assert.strictEqual(parsed.parcelSub, '01');
            assert.strictEqual(parsed.primarySubordinate, '2345');
        });
        await it('should parse valid 19-digit roll numbers', () => {
            const rollNumber = '5761123456789012345'; // Sault Ste. Marie code
            const parsed = rollNumbers.parseRollNumber(rollNumber);
            assert.strictEqual(parsed.county, '57');
            assert.strictEqual(parsed.municipality, '61');
            assert.strictEqual(parsed.mapArea, '12');
            assert.strictEqual(parsed.mapDivision, '3');
            assert.strictEqual(parsed.mapSubdivision, '456');
            assert.strictEqual(parsed.parcel, '789');
            assert.strictEqual(parsed.parcelSub, '01');
            assert.strictEqual(parsed.primarySubordinate, '2345');
        });
        await it('should throw an error for invalid roll numbers', () => {
            const invalidRollNumber = '12345';
            // eslint-disable-next-line max-nested-callbacks
            assert.throws(() => {
                rollNumbers.parseRollNumber(invalidRollNumber);
            }, /Invalid roll number/);
        });
    });
});
