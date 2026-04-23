import { describe, expect, it } from "vitest";
import { borderWidthScaleKey } from "./borderWidthScaleKey";

describe("borderWidthScaleKey", () => {
	it("maps width utilities to scale keys", () => {
		expect(borderWidthScaleKey("border")).toBe("DEFAULT");
		expect(borderWidthScaleKey("border-2")).toBe("2");
		expect(borderWidthScaleKey("border-red-500")).toBeUndefined();
	});
});
