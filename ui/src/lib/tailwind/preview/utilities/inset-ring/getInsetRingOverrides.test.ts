import { describe, expect, it } from "vitest";
import { getInsetRingOverrides } from "./getInsetRingOverrides";

describe("getInsetRingOverrides", () => {
	it("maps inset-ring width utilities", () => {
		expect(getInsetRingOverrides("inset-ring-2")).toEqual([
			"--inset-ring-width-2",
		]);
		expect(getInsetRingOverrides("inset-ring-red-500")).toEqual([]);
	});
});
