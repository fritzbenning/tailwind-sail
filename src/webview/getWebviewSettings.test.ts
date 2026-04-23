import * as assert from "assert";
import { getWebviewSettings } from "./getWebviewSettings";

suite("getWebviewSettings", () => {
	test("loose defaults for both axes", () => {
		assert.deepStrictEqual(getWebviewSettings("loose", "loose"), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 12,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("one argument sets horizontal only; top defaults to compact", () => {
		assert.deepStrictEqual(getWebviewSettings("compact"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("no arguments: horizontal loose, top compact (product defaults)", () => {
		assert.deepStrictEqual(getWebviewSettings(), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("compact horizontal, loose top", () => {
		assert.deepStrictEqual(getWebviewSettings("compact", "loose"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 12,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("loose horizontal, compact top", () => {
		assert.deepStrictEqual(getWebviewSettings("loose", "compact"), {
			sidebarPaddingXPx: 20,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("compact both", () => {
		assert.deepStrictEqual(getWebviewSettings("compact", "compact"), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: false,
			showUtilityPreview: true,
		});
	});

	test("showSidebarRightBorder can be enabled", () => {
		assert.deepStrictEqual(getWebviewSettings("compact", "compact", true), {
			sidebarPaddingXPx: 8,
			sidebarPaddingTopPx: 4,
			showSidebarRightBorder: true,
			showUtilityPreview: true,
		});
	});

	test("showUtilityPreview can be disabled", () => {
		assert.deepStrictEqual(
			getWebviewSettings("compact", "compact", false, false),
			{
				sidebarPaddingXPx: 8,
				sidebarPaddingTopPx: 4,
				showSidebarRightBorder: false,
				showUtilityPreview: false,
			},
		);
	});
});
