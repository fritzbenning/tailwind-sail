import { getEmptyVariantBuckets } from "@ext/filter";
import { describe, expect, it } from "vitest";
import type { ClassItem } from "../../types";
import type { UtilityState } from "../state/types";
import { isClassMatchingUtilityState } from "./isClassMatchingUtilityState";

const item = (utility: string): ClassItem => ({
	tokenIndex: 0,
	fullClass: `${utility}-x`,
	utility,
	variantBuckets: getEmptyVariantBuckets(),
});

describe("isClassMatchingUtilityState", () => {
	it("allows every utility when the filter is “all”", () => {
		const st: UtilityState = { kind: "all" };
		expect(isClassMatchingUtilityState(item("text"), st)).toBe(true);
	});

	it("matches when the item utility equals the chip id", () => {
		const st: UtilityState = { kind: "utility", id: "text" };
		expect(isClassMatchingUtilityState(item("text"), st)).toBe(true);
	});

	it("rejects a mismatching utility id", () => {
		const st: UtilityState = { kind: "utility", id: "text" };
		expect(isClassMatchingUtilityState(item("flex"), st)).toBe(false);
	});
});
