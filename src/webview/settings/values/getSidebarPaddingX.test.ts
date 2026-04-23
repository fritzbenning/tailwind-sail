import * as assert from "assert";
import { getSidebarPaddingX } from "./getSidebarPaddingX";

suite("getSidebarPaddingX", () => {
	test("compact uses 8px", () => {
		assert.strictEqual(getSidebarPaddingX("compact"), 8);
	});

	test("loose uses 20px", () => {
		assert.strictEqual(getSidebarPaddingX("loose"), 20);
	});
});
