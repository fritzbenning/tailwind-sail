import { describe, expect, it } from "vitest";
import { firstSegment } from "./firstSegment";

describe("firstSegment", () => {
	it("returns the substring before the first hyphen", () => {
		expect(firstSegment("red-500")).toBe("red");
		expect(firstSegment("2")).toBe("2");
	});

	it("returns empty string when rest is empty", () => {
		expect(firstSegment("")).toBe("");
	});
});
