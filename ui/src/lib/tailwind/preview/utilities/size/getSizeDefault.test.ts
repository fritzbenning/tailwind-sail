import { describe, expect, it } from "vitest";
import { getSizeDefault } from "./getSizeDefault";

const ctx = { spacingBasePx: 4 };

describe("getSizeDefault", () => {
	it("maps width scale keys with spacing base", () => {
		expect(getSizeDefault("w-4", ctx)).toBe("16px");
	});

	it("resolves max-w-screen-* from constants", () => {
		const v = getSizeDefault("max-w-screen-sm", ctx);
		expect(v).toBeDefined();
		expect(v).toMatch(/px$/);
	});
});
