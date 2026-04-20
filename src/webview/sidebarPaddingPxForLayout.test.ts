import * as assert from "assert";
import {
	sidebarPaddingTopPxForLayout,
	sidebarPaddingXPxForLayout,
} from "./sidebarPaddingPxForLayout";

suite("sidebarPaddingXPxForLayout", () => {
	test("compact uses 8px", () => {
		assert.strictEqual(sidebarPaddingXPxForLayout("compact"), 8);
	});

	test("loose uses 20px", () => {
		assert.strictEqual(sidebarPaddingXPxForLayout("loose"), 20);
	});
});

suite("sidebarPaddingTopPxForLayout", () => {
	test("compact uses 4px", () => {
		assert.strictEqual(sidebarPaddingTopPxForLayout("compact"), 4);
	});

	test("loose uses 12px", () => {
		assert.strictEqual(sidebarPaddingTopPxForLayout("loose"), 12);
	});
});
