import { describe, expect, it } from "vitest";
import { matchSize } from "./matchSize";

describe("matchSize", () => {
	it("matches size utilities without arbitrary brackets", () => {
		expect(matchSize("w-64")).toBe(true);
		expect(matchSize("w-[1rem]")).toBe(false);
	});
});
