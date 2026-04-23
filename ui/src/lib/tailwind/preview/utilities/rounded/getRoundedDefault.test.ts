import { describe, expect, it } from "vitest";
import { getRoundedDefault } from "./getRoundedDefault";

const ctx = { spacingBasePx: 4 };

describe("getRoundedDefault", () => {
	it("returns default px labels from the radius scale", () => {
		expect(getRoundedDefault("rounded-md", ctx)).toBeDefined();
	});
});
