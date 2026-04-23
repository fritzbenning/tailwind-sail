import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { applyVariablesToBody } from "./applyVariablesToBody";

describe("applyVariablesToBody", () => {
	beforeEach(() => {
		applyVariablesToBody([]);
	});

	afterEach(() => {
		applyVariablesToBody([]);
		document.body.removeAttribute("style");
	});

	it("applies --workspace-* properties from scan entries to document.body", () => {
		applyVariablesToBody([{ name: "--foo", value: "1px", locations: [] }]);
		expect(document.body.style.getPropertyValue("--workspace-foo")).toBe("1px");
	});

	it("removes previously applied --workspace-* names that are not in the next scan", () => {
		applyVariablesToBody([{ name: "--a", value: "1", locations: [] }]);
		expect(document.body.style.getPropertyValue("--workspace-a")).toBe("1");
		applyVariablesToBody([{ name: "--b", value: "2", locations: [] }]);
		expect(document.body.style.getPropertyValue("--workspace-a")).toBe("");
		expect(document.body.style.getPropertyValue("--workspace-b")).toBe("2");
	});
});
