import { describe, expect, it } from "vitest";
import { getClassName } from "./getClassName";

describe("getClassName", () => {
	it("returns the last segment after variant colons", () => {
		expect(getClassName("md:hover:text-red-500")).toBe("text-red-500");
	});

	it("strips a leading important marker", () => {
		expect(getClassName("!bg-white")).toBe("bg-white");
	});

	it("trims surrounding whitespace", () => {
		expect(getClassName("  bg-blue-500  ")).toBe("bg-blue-500");
	});
});
