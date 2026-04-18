import * as assert from "assert";
import { isInteractionStateSegment } from "./isInteractionStateSegment";

suite("isInteractionStateSegment", () => {
	test("matches simple interaction pseudos", () => {
		assert.strictEqual(isInteractionStateSegment("hover"), true);
		assert.strictEqual(isInteractionStateSegment("FOCUS"), true);
	});

	test("matches group- and peer- prefixes", () => {
		assert.strictEqual(isInteractionStateSegment("group-hover"), true);
		assert.strictEqual(isInteractionStateSegment("peer-focus"), true);
	});

	test("matches in- variants except arbitrary in-[…]", () => {
		assert.strictEqual(isInteractionStateSegment("in-foo"), true);
		assert.strictEqual(isInteractionStateSegment("in-[.x]"), false);
	});

	test("does not treat inverted- as interaction", () => {
		assert.strictEqual(isInteractionStateSegment("inverted-colors"), false);
	});
});
