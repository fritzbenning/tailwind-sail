import { describe, expect, it } from "vitest";
import { getEmptyVariantState } from "../state/getEmptyVariantState";
import { getClassWithoutActiveVariant } from "./getClassWithoutActiveVariant";

describe("getClassWithoutActiveVariant", () => {
	it("returns whitespace-only input unchanged", () => {
		const eff = getEmptyVariantState();
		expect(getClassWithoutActiveVariant("   ", eff)).toBe("   ");
	});

	it("strips a breakpoint modifier that matches the active filter", () => {
		const eff = { ...getEmptyVariantState(), breakpoints: "md" };
		expect(getClassWithoutActiveVariant("md:flex", eff)).toBe("flex");
	});

	it("keeps modifiers that do not match the active filter selection", () => {
		const eff = { ...getEmptyVariantState(), breakpoints: "md" };
		expect(getClassWithoutActiveVariant("lg:flex", eff)).toContain("lg:");
	});
});
