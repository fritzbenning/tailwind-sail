import * as assert from 'assert';
import { skipBlockComment } from './skipBlockComment';
import { skipLineComment } from './skipLineComment';

suite('string scan (skipLineComment, skipBlockComment)', () => {
	test('skipLineComment stops at newline without consuming it', () => {
		const text = 'a // hi\nb';
		const start = text.indexOf('//');
		assert.strictEqual(skipLineComment(text, start), text.indexOf('\n'));
	});

	test('skipLineComment at EOF without newline returns text.length', () => {
		const text = 'a // eof';
		const start = text.indexOf('//');
		assert.strictEqual(skipLineComment(text, start), text.length);
	});

	test('skipBlockComment advances past closing */', () => {
		const text = 'before /* note */ after';
		const start = text.indexOf('/*');
		assert.strictEqual(skipBlockComment(text, start), text.indexOf(' after'));
	});

	test('skipBlockComment without closing delimiter returns text.length', () => {
		const text = '/* unfinished';
		assert.strictEqual(skipBlockComment(text, 0), text.length);
	});
});
