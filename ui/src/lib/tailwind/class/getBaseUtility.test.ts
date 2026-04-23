import { describe, expect, it } from "vitest";
import { getBaseUtility } from "./getBaseUtility";

describe("getBaseUtility", () => {
	it("returns the last segment after variant colons", () => {
		expect(getBaseUtility("md:hover:text-red-500")).toBe("text-red-500");
	});

	it("strips a leading important marker", () => {
		expect(getBaseUtility("!bg-white")).toBe("bg-white");
	});

	it("trims surrounding whitespace", () => {
		expect(getBaseUtility("  bg-blue-500  ")).toBe("bg-blue-500");
	});
});
