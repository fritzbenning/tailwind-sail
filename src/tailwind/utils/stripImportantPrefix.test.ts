import * as assert from "assert";
import { stripImportantPrefix } from "./stripImportantPrefix";

suite("stripImportantPrefix", () => {
	test("removes leading important bangs", () => {
		assert.strictEqual(stripImportantPrefix("!flex"), "flex");
		assert.strictEqual(stripImportantPrefix("!!bg-red-500"), "bg-red-500");
	});

	test("leaves strings without bang unchanged", () => {
		assert.strictEqual(stripImportantPrefix("flex"), "flex");
		assert.strictEqual(stripImportantPrefix(""), "");
	});
});
