import { describe, expect, it } from "vitest";
import { hasUnsupportedExpression } from "./hasUnsupportedExpression";

describe("hasUnsupportedExpression", () => {
	it("is false for plain lengths", () => {
		expect(hasUnsupportedExpression("12px")).toBe(false);
	});

	it("is true for calc() or var()", () => {
		expect(hasUnsupportedExpression("var(--space)")).toBe(true);
		expect(hasUnsupportedExpression("calc(100% - 1rem)")).toBe(true);
	});
});
