import assert from 'assert';
import { removeRange } from './removeRange';
import { parseTailwindClasses } from '../../tailwind/parse/parseTailwindClasses';

function removedSlice(raw: string, tokenIndex: number): string {
	const { classes } = parseTailwindClasses(raw);
	const r = removeRange(classes, tokenIndex);
	assert(r);
	return raw.slice(r.startInRaw, r.endInRaw);
}

suite('removeRange', () => {
	test('single token removes the token only', () => {
		assert.strictEqual(removedSlice('flex', 0), 'flex');
	});

	test('first of two removes token and following whitespace', () => {
		assert.strictEqual(removedSlice('flex gap-2', 0), 'flex ');
	});

	test('last of two removes preceding whitespace and token', () => {
		assert.strictEqual(removedSlice('flex gap-2', 1), ' gap-2');
	});

	test('middle token removes interstitial whitespace and token', () => {
		assert.strictEqual(removedSlice('a b c', 1), ' b');
	});

	test('first of three with extra spaces removes through next token start', () => {
		assert.strictEqual(removedSlice('a  b c', 0), 'a  ');
	});
});
