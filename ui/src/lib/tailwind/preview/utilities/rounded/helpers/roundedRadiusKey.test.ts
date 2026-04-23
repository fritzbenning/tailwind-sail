import { describe, expect, it } from "vitest";
import { roundedRadiusKey } from "./roundedRadiusKey";

describe("roundedRadiusKey", () => {
	it("maps rounded utilities to scale keys", () => {
		expect(roundedRadiusKey("rounded")).toBe("DEFAULT");
		expect(roundedRadiusKey("rounded-lg")).toBe("lg");
		expect(roundedRadiusKey("p-4")).toBeUndefined();
	});
});
