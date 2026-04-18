import * as assert from "assert";
import { isSupportsSegment } from "./isSupportsSegment";

suite("isSupportsSegment", () => {
	test("matches supports- prefix", () => {
		assert.strictEqual(isSupportsSegment("supports-grid"), true);
		assert.strictEqual(isSupportsSegment("SUPPORTS-(display:grid)"), true);
	});

	test("rejects bare utilities", () => {
		assert.strictEqual(isSupportsSegment("grid"), false);
	});
});
