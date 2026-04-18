import * as assert from 'assert';
import { VARIANT_IDS } from '../variants';
import { getEmptyVariantBuckets } from './getEmptyVariantBuckets';

suite('getEmptyVariantBuckets', () => {
	test('returns empty arrays for every dimension', () => {
		const b = getEmptyVariantBuckets();
		for (const id of VARIANT_IDS) {
			assert.deepStrictEqual(b[id], [], id);
		}
	});
});
