import { getEmptyVariantBuckets } from "@ext/filter";
import { describe, expect, it } from "vitest";
import type { ClassItem } from "../../types";
import { isClassMatchingSearchQuery } from "./isClassMatchingSearchQuery";

const item = (fullClass: string): ClassItem => ({
	tokenIndex: 0,
	fullClass,
	utility: "flex",
	variantBuckets: getEmptyVariantBuckets(),
});

describe("isClassMatchingSearchQuery", () => {
	it("matches when the query is empty", () => {
		expect(isClassMatchingSearchQuery(item("p-4"), "")).toBe(true);
	});

	it("matches case-insensitive substrings", () => {
		expect(isClassMatchingSearchQuery(item("text-red-500"), "red")).toBe(true);
	});

	it("fails when the substring is missing", () => {
		expect(isClassMatchingSearchQuery(item("p-4"), "grid")).toBe(false);
	});
});
