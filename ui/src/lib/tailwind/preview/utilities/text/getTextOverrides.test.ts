import { describe, expect, it } from "vitest";
import { getTextOverrides } from "./getTextOverrides";

describe("getTextOverrides", () => {
	it("maps to --text-* candidates", () => {
		expect(getTextOverrides("text-sm")).toEqual(["--text-sm"]);
	});
});
