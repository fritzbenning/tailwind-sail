import { describe, expect, it } from "vitest";
import { getDefault } from "./getDefault";

describe("getDefault", () => {
	it("returns built-in spacing and text previews", () => {
		expect(getDefault("p-4")).toBe("16px");
		expect(getDefault("text-sm")).toBe("14px");
	});

	it("respects spacingBasePx for spacing utilities", () => {
		expect(getDefault("p-4", { spacingBasePx: 6 })).toBe("24px");
	});

	it("returns undefined when no registry entry matches", () => {
		expect(getDefault("not-a-tailwind-utility")).toBeUndefined();
	});
});
