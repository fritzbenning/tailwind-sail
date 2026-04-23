import { describe, expect, it } from "vitest";
import { getOverride } from "./getOverride";

describe("getOverride", () => {
	it("returns no candidates for arbitrary utilities", () => {
		expect(getOverride("text-[10px]")).toEqual([]);
	});

	it("returns spacing variable candidates for padding utilities", () => {
		expect(getOverride("p-4")).toEqual(["--spacing-4"]);
	});

	it("returns no candidates when no registry family matches", () => {
		expect(getOverride("not-a-tailwind-utility")).toEqual([]);
	});
});
