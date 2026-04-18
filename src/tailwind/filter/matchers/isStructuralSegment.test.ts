import * as assert from "assert";
import { isStructuralSegment } from "./isStructuralSegment";

suite("isStructuralSegment", () => {
	test("matches structural exact set", () => {
		assert.strictEqual(isStructuralSegment("first"), true);
		assert.strictEqual(isStructuralSegment("EVEN"), true);
	});

	test("matches nth- prefix variants", () => {
		assert.strictEqual(isStructuralSegment("nth-2"), true);
	});

	test("does not match pseudo-elements", () => {
		assert.strictEqual(isStructuralSegment("before"), false);
	});
});
