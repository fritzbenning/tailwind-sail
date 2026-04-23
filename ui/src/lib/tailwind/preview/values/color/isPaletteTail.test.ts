import { describe, expect, it } from "vitest";
import { isPaletteTail } from "./isPaletteTail";

describe("isPaletteTail", () => {
	it("is true when the first segment is a theme color name", () => {
		expect(isPaletteTail("red-500")).toBe(true);
	});

	it("is false for numeric width-like tails", () => {
		expect(isPaletteTail("2")).toBe(false);
	});
});
