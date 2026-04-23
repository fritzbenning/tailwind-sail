import { describe, expect, it } from "vitest";
import { getVariableDisplayTitle } from "./getVariableDisplayTitle";

describe("getVariableDisplayTitle", () => {
	it("strips a leading -- and title-cases hyphen segments", () => {
		expect(getVariableDisplayTitle("--color-primary-500")).toBe(
			"Color Primary 500",
		);
	});

	it("handles names without a leading --", () => {
		expect(getVariableDisplayTitle("spacing-4")).toBe("Spacing 4");
	});

	it("returns empty for -- only", () => {
		expect(getVariableDisplayTitle("--")).toBe("");
	});

	it("skips empty segments from repeated hyphens", () => {
		expect(getVariableDisplayTitle("--foo--bar")).toBe("Foo Bar");
	});
});
