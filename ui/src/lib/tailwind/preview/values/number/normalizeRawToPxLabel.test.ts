import { describe, expect, it } from "vitest";
import { normalizeRawToPxLabel } from "./normalizeRawToPxLabel";

describe("normalizeRawToPxLabel", () => {
	it("converts rem to rounded px labels", () => {
		expect(normalizeRawToPxLabel("1rem")).toBe("16px");
		expect(normalizeRawToPxLabel("1.5rem")).toBe("24px");
	});

	it("rounds px values", () => {
		expect(normalizeRawToPxLabel("10.4px")).toBe("10px");
	});

	it("passes through non rem/px strings", () => {
		expect(normalizeRawToPxLabel("1.3")).toBe("1.3");
	});
});
