import * as assert from 'assert';
import { tryDoubleQuote } from './tryDoubleQuote';
import { trySingleQuote } from './trySingleQuote';

suite('tryDoubleQuote / trySingleQuote', () => {
	test('tryDoubleQuote extracts when cursor inside; advances past literal when outside', () => {
		const text = 'x = "ab";';
		const open = text.indexOf('"');
		const inside = tryDoubleQuote(text, open, open + 2);
		assert.ok(inside.extracted);
		assert.strictEqual(inside.extracted!.rawContent, 'ab');
		assert.strictEqual(inside.end, text.indexOf(';'));

		const before = tryDoubleQuote(text, open, 0);
		assert.strictEqual(before.extracted, undefined);
		assert.strictEqual(before.end, text.indexOf(';'));
	});

	test('tryDoubleQuote honors escapes and does not end on escaped quote', () => {
		const text = 'x = "a\\"b";';
		const open = text.indexOf('"');
		const r = tryDoubleQuote(text, open, open + 3);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, 'a\\"b');
	});

	test('tryDoubleQuote unterminated newline stops scan without extracted', () => {
		const text = 'x = "ab\n';
		const open = text.indexOf('"');
		const r = tryDoubleQuote(text, open, open + 3);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, text.indexOf('\n'));
	});

	test('trySingleQuote mirrors double-quote behavior', () => {
		const text = "x = 'cd';";
		const open = text.indexOf("'");
		const r = trySingleQuote(text, open, open + 3);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, 'cd');
	});
});
