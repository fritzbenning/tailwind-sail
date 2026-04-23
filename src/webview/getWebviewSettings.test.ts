import * as assert from "assert";
import { webviewShellForLayout } from "./webviewShell";

suite("webviewShellForLayout", () => {
	test("loose defaults for both axes", () => {
		assert.deepStrictEqual(webviewShellForLayout("loose", "loose"), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 12,
			showSidebarRightBorder: false,
		});
	});

	test("one argument sets horizontal only; top defaults to compact", () => {
		assert.deepStrictEqual(webviewShellForLayout("compact"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
		});
	});

	test("no arguments: horizontal loose, top compact (product defaults)", () => {
		assert.deepStrictEqual(webviewShellForLayout(), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
		});
	});

	test("compact horizontal, loose top", () => {
		assert.deepStrictEqual(webviewShellForLayout("compact", "loose"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 12,
			showSidebarRightBorder: false,
		});
	});

	test("loose horizontal, compact top", () => {
		assert.deepStrictEqual(webviewShellForLayout("loose", "compact"), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
		});
	});

	test("compact both", () => {
		assert.deepStrictEqual(webviewShellForLayout("compact", "compact"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
		});
	});

	test("showSidebarRightBorder can be enabled", () => {
		assert.deepStrictEqual(webviewShellForLayout("compact", "compact", true), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: true,
		});
	});
});
