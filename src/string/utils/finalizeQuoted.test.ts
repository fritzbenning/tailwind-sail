import * as assert from "assert";
import { finalizeQuoted } from "./finalizeQuoted";

suite("finalizeQuoted", () => {
	test("returns extracted when offset is inside the literal (before close quote)", () => {
		const text = 'const x = "flex gap-2";';
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"');
		const r = finalizeQuoted(text, open, close, open + 5);
		assert.ok(r.extracted);
		assert.strictEqual(r.end, close + 1);
		assert.strictEqual(r.extracted!.rawContent, "flex gap-2");
		assert.strictEqual(r.extracted!.startOffset, open);
		assert.strictEqual(r.extracted!.endOffset, close + 1);
		assert.strictEqual(r.extracted!.rawToDocSegments.length, 1);
	});

	test("offset === closeIdx counts as inside (caret before closing quote)", () => {
		const text = 'const x = "ab";';
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"');
		const r = finalizeQuoted(text, open, close, close);
		assert.ok(r.extracted);
		assert.strictEqual(r.extracted!.rawContent, "ab");
	});

	test("offset on opening quote is not inside", () => {
		const text = 'const x = "ab";';
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"');
		const r = finalizeQuoted(text, open, close, open);
		assert.strictEqual(r.extracted, undefined);
		assert.strictEqual(r.end, close + 1);
	});

	test("offset before the literal is not inside", () => {
		const text = 'const x = "ab";';
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"');
		const r = finalizeQuoted(text, open, close, 0);
		assert.strictEqual(r.extracted, undefined);
	});
});
