import { describe, expect, it } from "vitest";
import { findSpacingValue } from "./findSpacingValue";

describe("findSpacingValue", () => {
	it("parses spacing keys after known prefixes", () => {
		expect(findSpacingValue("p-4")).toBe("4");
		expect(findSpacingValue("gap-2")).toBe("2");
		expect(findSpacingValue("gap-px")).toBe("px");
	});

	it("returns undefined for bare utility prefixes without a suffix", () => {
		expect(findSpacingValue("p")).toBeUndefined();
	});
});
