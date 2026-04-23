import { describe, expect, it } from "vitest";
import { getLeadingOverrides } from "./getLeadingOverrides";

describe("getLeadingOverrides", () => {
	it("maps to --leading-* candidates", () => {
		expect(getLeadingOverrides("leading-tight")).toEqual(["--leading-tight"]);
	});
});
