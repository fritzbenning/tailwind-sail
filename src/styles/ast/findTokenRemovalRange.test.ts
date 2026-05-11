import * as assert from "assert";
import { findTokenRemovalRange } from "./findTokenRemovalRange";

suite("findTokenRemovalRange", () => {
	test("removes following gap when deleting the first token", () => {
		const text = "flex gap-2";
		const spans = [
			{ docStart: 0, docEnd: 4 },
			{ docStart: 5, docEnd: 11 },
		] as const;
		const r = findTokenRemovalRange(text, spans, 0);
		assert.deepStrictEqual(r, { docStart: 0, docEnd: 5 });
		assert.strictEqual(text.slice(r!.docStart, r!.docEnd), "flex ");
	});

	test("removes preceding gap when deleting the last token", () => {
		const text = "flex gap-2";
		const spans = [
			{ docStart: 0, docEnd: 4 },
			{ docStart: 5, docEnd: 11 },
		] as const;
		const r = findTokenRemovalRange(text, spans, 1);
		assert.deepStrictEqual(r, { docStart: 4, docEnd: 11 });
		assert.strictEqual(text.slice(r!.docStart, r!.docEnd), " gap-2");
	});

	test("single token only removes the token", () => {
		const text = "flex";
		const spans = [{ docStart: 0, docEnd: 4 }] as const;
		const r = findTokenRemovalRange(text, spans, 0);
		assert.deepStrictEqual(r, { docStart: 0, docEnd: 4 });
	});

	test("undefined when token index is out of range", () => {
		const r = findTokenRemovalRange("a", [], 0);
		assert.strictEqual(r, undefined);
	});
});
