import { describe, expect, it } from "vitest";
import { getRingDefault } from "./getRingDefault";

const ctx = { spacingBasePx: 4 };

describe("getRingDefault", () => {
	it("returns default px", () => {
		expect(getRingDefault("ring", ctx)).toBe("1px");
		expect(getRingDefault("ring-4", ctx)).toBe("4px");
	});
});
