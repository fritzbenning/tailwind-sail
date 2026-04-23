import { describe, expect, it } from "vitest";
import { getRingOffsetOverrides } from "./getRingOffsetOverrides";

describe("getRingOffsetOverrides", () => {
	it("maps ring-offset utilities", () => {
		expect(getRingOffsetOverrides("ring-offset-4")).toEqual([
			"--ring-offset-width-4",
			"--ring-offset-4",
		]);
	});
});
