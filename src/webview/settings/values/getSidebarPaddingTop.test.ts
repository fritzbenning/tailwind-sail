import * as assert from "assert";
import { getSidebarPaddingTop } from "./getSidebarPaddingTop";

suite("getSidebarPaddingTop", () => {
	test("compact uses 4px", () => {
		assert.strictEqual(getSidebarPaddingTop("compact"), 4);
	});

	test("loose uses 12px", () => {
		assert.strictEqual(getSidebarPaddingTop("loose"), 12);
	});
});
