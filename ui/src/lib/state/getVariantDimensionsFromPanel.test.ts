import { describe, expect, it } from "vitest";
import type { PanelModal } from "../../types";
import { getVariantDimensionsFromPanel } from "./getVariantDimensionsFromPanel";

describe("getVariantDimensionsFromPanel", () => {
	it("collects unique variant dimensions from the panel rows", () => {
		const panel: PanelModal = {
			kind: "panel",
			utilities: [],
			variants: [
				{ dimension: "breakpoints", label: "B", value: ["md"] },
				{ dimension: "theme", label: "T", value: ["dark"] },
			],
			showVariantPrefixToggle: false,
			classes: [],
		};
		const dims = getVariantDimensionsFromPanel(panel);
		expect(dims.has("breakpoints")).toBe(true);
		expect(dims.has("theme")).toBe(true);
		expect(dims.size).toBe(2);
	});
});
