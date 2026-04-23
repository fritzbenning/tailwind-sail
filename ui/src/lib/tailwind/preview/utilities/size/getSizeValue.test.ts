import { describe, expect, it } from "vitest";
import { getSizeValue } from "./getSizeValue";

describe("getSizeValue", () => {
	it("returns the key after size utility prefixes", () => {
		expect(getSizeValue("w-64")).toBe("64");
		expect(getSizeValue("min-w-12")).toBe("12");
	});

	it("returns undefined for bare prefixes", () => {
		expect(getSizeValue("w")).toBeUndefined();
	});
});
