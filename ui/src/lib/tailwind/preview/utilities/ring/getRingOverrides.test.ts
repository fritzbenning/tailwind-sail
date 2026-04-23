import { describe, expect, it } from "vitest";
import { getRingOverrides } from "./getRingOverrides";

describe("getRingOverrides", () => {
	it("maps ring width utilities", () => {
		expect(getRingOverrides("ring-2")).toEqual(["--ring-width-2"]);
	});
});
