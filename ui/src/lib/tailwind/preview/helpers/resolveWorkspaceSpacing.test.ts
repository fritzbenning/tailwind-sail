import { afterEach, describe, expect, it } from "vitest";
import { resolveWorkspaceSpacing } from "./resolveWorkspaceSpacing";

describe("resolveWorkspaceSpacing", () => {
	afterEach(() => {
		document.body.style.removeProperty("--workspace-spacing");
	});

	it("reads plain px --spacing from the scan map", () => {
		expect(resolveWorkspaceSpacing(new Map([["--spacing", "12px"]]))).toBe(12);
	});

	it("returns undefined when the scan value uses var()", () => {
		expect(
			resolveWorkspaceSpacing(new Map([["--spacing", "var(--x)"]])),
		).toBeUndefined();
	});

	it("falls back to --workspace-spacing on body when the map is absent", () => {
		document.body.style.setProperty("--workspace-spacing", "10px");
		expect(resolveWorkspaceSpacing(undefined)).toBe(10);
	});
});
