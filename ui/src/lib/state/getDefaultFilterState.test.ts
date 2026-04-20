import { describe, expect, it } from "vitest";
import { getDefaultFilterState } from "./getDefaultFilterState";

describe("getDefaultFilterState", () => {
	it("starts with “all” utilities, empty search, and default variant map", () => {
		const st = getDefaultFilterState();
		expect(st.activeUtility).toEqual({ kind: "all" });
		expect(st.search).toBe("");
		expect(st.hideVariantPrefixes).toBe(false);
		expect(st.activeVariants.theme).toBe("all");
		expect(st.activeVariants.breakpoints).toBe("all");
	});
});
