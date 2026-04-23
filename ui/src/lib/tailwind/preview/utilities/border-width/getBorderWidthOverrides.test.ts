import { describe, expect, it } from "vitest";
import { getBorderWidthOverrides } from "./getBorderWidthOverrides";

describe("getBorderWidthOverrides", () => {
	it("maps border width utilities to --border-width-*", () => {
		expect(getBorderWidthOverrides("border-2")).toEqual(["--border-width-2"]);
		expect(getBorderWidthOverrides("border-t-4")).toEqual(["--border-width-4"]);
		expect(getBorderWidthOverrides("border")).toEqual([
			"--default-border-width",
			"--border-width-DEFAULT",
			"--border-width",
		]);
	});

	it("skips border colors", () => {
		expect(getBorderWidthOverrides("border-red-500")).toEqual([]);
	});
});
