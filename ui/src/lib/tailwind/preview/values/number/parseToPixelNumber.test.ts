import { describe, expect, it } from "vitest";
import { parseToPixelNumber } from "./parseToPixelNumber";

describe("parseToPixelNumber", () => {
	it("parses simple px and rem via normalizeRawToPxLabel", () => {
		expect(parseToPixelNumber("12px")).toBe(12);
		expect(parseToPixelNumber("0.25rem")).toBe(4);
	});

	it("returns undefined for non-plain lengths", () => {
		expect(parseToPixelNumber("50%")).toBeUndefined();
		expect(parseToPixelNumber("1.3")).toBeUndefined();
	});
});
