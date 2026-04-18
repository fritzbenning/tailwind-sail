import * as assert from "assert";
import { rawSpanToDocOffsets } from "./rawSpanToDocOffsets";

suite("rawSpanToDocOffsets", () => {
	test("maps a sub-span within one segment", () => {
		const segments = [{ rawStart: 0, rawEnd: 11, docStart: 11, docEnd: 22 }];
		assert.deepStrictEqual(rawSpanToDocOffsets(segments, 0, 4), {
			docStart: 11,
			docEnd: 15,
		});
	});

	test("returns undefined when span crosses segments", () => {
		const segments = [
			{ rawStart: 0, rawEnd: 7, docStart: 11, docEnd: 18 },
			{ rawStart: 7, rawEnd: 12, docStart: 22, docEnd: 27 },
		];
		assert.strictEqual(rawSpanToDocOffsets(segments, 5, 9), undefined);
	});

	test("returns undefined for invalid raw range or empty segments", () => {
		const segments = [{ rawStart: 0, rawEnd: 3, docStart: 1, docEnd: 4 }];
		assert.strictEqual(rawSpanToDocOffsets(segments, -1, 1), undefined);
		assert.strictEqual(rawSpanToDocOffsets(segments, 2, 1), undefined);
		assert.strictEqual(rawSpanToDocOffsets([], 0, 1), undefined);
	});
});
