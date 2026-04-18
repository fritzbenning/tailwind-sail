import * as assert from "assert";
import { isLogicalSegment } from "./isLogicalSegment";

suite("isLogicalSegment", () => {
	test("matches has- and not- prefixes", () => {
		assert.strictEqual(isLogicalSegment("has-[.x]"), true);
		assert.strictEqual(isLogicalSegment("not-hover"), true);
		assert.strictEqual(isLogicalSegment("NOT-OPEN"), true);
	});

	test("rejects plain state segments", () => {
		assert.strictEqual(isLogicalSegment("hover"), false);
	});
});
