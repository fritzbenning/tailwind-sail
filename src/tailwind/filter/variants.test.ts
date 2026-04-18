import * as assert from 'assert';
import { VARIANT_IDS, VARIANTS } from './variants';

suite('variants config', () => {
	test('VARIANT_IDS mirrors VARIANTS order and length', () => {
		assert.strictEqual(VARIANT_IDS.length, VARIANTS.length);
		for (let i = 0; i < VARIANTS.length; i++) {
			assert.strictEqual(VARIANT_IDS[i], VARIANTS[i].id);
		}
	});

	test('last dimension is misc and always matches', () => {
		const last = VARIANTS[VARIANTS.length - 1];
		assert.strictEqual(last.id, 'misc');
		assert.strictEqual(last.match('anything'), true);
	});
});
