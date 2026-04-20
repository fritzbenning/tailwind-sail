import { describe, expect, it } from "vitest";
import { getClassNameFromInputValue } from "./getClassNameFromInputValue";

describe("getClassNameFromInputValue", () => {
	it("strips the variant prefix when the value starts with it", () => {
		expect(getClassNameFromInputValue("md:flex", "md:")).toBe("flex");
	});

	it("trims the body after removing the prefix", () => {
		expect(getClassNameFromInputValue("md:  flex  ", "md:")).toBe("flex");
	});

	it("returns the full value when the prefix does not apply", () => {
		expect(getClassNameFromInputValue("flex", "md:")).toBe("flex");
	});
});
