import { describe, expect, it } from "vitest";
import { getRoundedOverrides } from "./getRoundedOverrides";

describe("getRoundedOverrides", () => {
	it("returns radius variable candidates", () => {
		expect(getRoundedOverrides("rounded-lg")).toEqual(["--radius-lg"]);
	});
});
