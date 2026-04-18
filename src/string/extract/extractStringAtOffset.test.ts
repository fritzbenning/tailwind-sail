import * as assert from 'assert';
import { extractStringAtOffset } from './extractStringAtOffset';

suite('stringExtractor (extractStringAtOffset)', () => {
	test('finds double-quoted string when cursor is inside content', () => {
		const text = 'const x = "flex gap-2";';
		const open = text.indexOf('"');
		const cursorInside = open + 3;
		const r = extractStringAtOffset(text, cursorInside);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'flex gap-2');
		assert.strictEqual(r!.rawToDocSegments.length, 1);
		assert.strictEqual(r!.rawToDocSegments[0]!.rawStart, 0);
		assert.strictEqual(r!.rawToDocSegments[0]!.rawEnd, r!.rawContent.length);
	});

	test('double-quoted: caret immediately before closing quote counts as inside the literal', () => {
		const text = 'const x = "flex gap-2";';
		const closeIdx = text.lastIndexOf('"');
		const r = extractStringAtOffset(text, closeIdx);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'flex gap-2');
	});

	test('returns undefined when cursor is outside any string', () => {
		const text = 'const x = "flex";';
		const cursorOnKeyword = 0;
		assert.strictEqual(extractStringAtOffset(text, cursorOnKeyword), undefined);
	});

	test('template literal: static segments only — cursor in static text', () => {
		const text = 'const c = `w-full ${x}grid`;';
		const wIdx = text.indexOf('w');
		const r = extractStringAtOffset(text, wIdx);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'w-full grid');
		assert.strictEqual(r!.rawToDocSegments.length, 2);
		assert.strictEqual(r!.rawToDocSegments[0]!.rawEnd, 'w-full '.length);
		assert.strictEqual(r!.rawToDocSegments[1]!.rawStart, 'w-full '.length);
	});

	test('template literal: caret immediately before closing backtick counts as inside', () => {
		const text = 'const c = `w-full ${x}grid`;';
		const closeIdx = text.lastIndexOf('`');
		const r = extractStringAtOffset(text, closeIdx);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'w-full grid');
	});

	test('template literal: cursor inside ${} expression (not nested string) → no match', () => {
		const text = 'const c = `a ${foo} b`;';
		const dollar = text.indexOf('$');
		const cursorInExpr = dollar + 3;
		const r = extractStringAtOffset(text, cursorInExpr);
		assert.strictEqual(r, undefined);
	});

	test('template literal: nested quoted string inside ${} is detected', () => {
		const text = 'const c = `x ${ "hidden md:block" } y`;';
		const h = text.indexOf('hidden');
		const r = extractStringAtOffset(text, h);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'hidden md:block');
	});

	test('single-quoted string', () => {
		const text = "const q = 'p-4 m-2';";
		const p = text.indexOf('p');
		const r = extractStringAtOffset(text, p);
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'p-4 m-2');
	});

	test('returns undefined for negative offset or offset at/past end', () => {
		const text = 'const x = "a";';
		assert.strictEqual(extractStringAtOffset(text, -1), undefined);
		assert.strictEqual(extractStringAtOffset(text, text.length), undefined);
		assert.strictEqual(extractStringAtOffset(text, text.length + 1), undefined);
	});

	test('ignores strings inside line comments', () => {
		const text = '// "fake"\nconst y = "real";';
		const r = extractStringAtOffset(text, text.indexOf('real'));
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'real');
	});

	test('ignores strings inside block comments', () => {
		const text = '/* "fake" */ const y = "ok";';
		const r = extractStringAtOffset(text, text.indexOf('ok'));
		assert.ok(r);
		assert.strictEqual(r!.rawContent, 'ok');
	});
});
