import * as assert from 'assert';
import { getChipKey } from './getChipKey';

suite('getChipKey', () => {
	test('trims whitespace', () => {
		assert.strictEqual(getChipKey('  hover  '), 'hover');
	});

	test('strips trailing colon and lowercases', () => {
		assert.strictEqual(getChipKey('HOVER:'), 'hover');
		assert.strictEqual(getChipKey('dark:'), 'dark');
	});

	test('leaves keys without colon lowercased', () => {
		assert.strictEqual(getChipKey('MD'), 'md');
		assert.strictEqual(getChipKey('Light'), 'light');
	});

	test('treats only trailing colon as variant delimiter', () => {
		assert.strictEqual(getChipKey('theme-midnight'), 'theme-midnight');
		assert.strictEqual(getChipKey('[@media]'), '[@media]');
	});
});
