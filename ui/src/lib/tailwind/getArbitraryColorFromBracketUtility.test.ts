import { describe, expect, it } from "vitest";
import { getArbitraryColorFromBracketUtility } from "./getArbitraryColorFromBracketUtility";

describe("getArbitraryColorFromBracketUtility", () => {
	it("reads arbitrary color segments after -[", () => {
		expect(getArbitraryColorFromBracketUtility("text-[#f97316]")).toBe(
			"#f97316",
		);
	});

	it("returns null when there is no arbitrary color segment", () => {
		expect(getArbitraryColorFromBracketUtility("bg-red-500")).toBe(null);
	});
});
