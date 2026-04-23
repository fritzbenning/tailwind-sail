import { describe, expect, it } from "vitest";
import { getSpacingOverrides } from "./getSpacingOverrides";

describe("getSpacingOverrides", () => {
	it("maps to --spacing-* candidates", () => {
		expect(getSpacingOverrides("p-4")).toEqual(["--spacing-4"]);
	});
});
