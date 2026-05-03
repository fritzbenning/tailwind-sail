import { describe, expect, it } from "vitest";
import { findSizeValue } from "./findSizeValue";

describe("findSizeValue", () => {
	it("parses width keys after known prefixes", () => {
		expect(findSizeValue("w-64")).toBe("64");
		expect(findSizeValue("min-w-12")).toBe("12");
	});

	it("returns undefined for bare utility prefixes without a suffix", () => {
		expect(findSizeValue("w")).toBeUndefined();
	});
});
