import * as assert from 'assert';
import { containTailwindClasses } from './containTailwindClasses';

suite('containTailwindClasses', () => {
	test('detects tailwind-like tokens', () => {
		assert.strictEqual(containTailwindClasses('flex gap-2'), true);
		assert.strictEqual(containTailwindClasses('totally not css'), false);
	});
});
