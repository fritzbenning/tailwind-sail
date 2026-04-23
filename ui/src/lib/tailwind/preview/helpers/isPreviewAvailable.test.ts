import { describe, expect, it } from "vitest";
import { isPreviewAvailable } from "./isPreviewAvailable";

describe("isPreviewAvailable", () => {
	it("allows built-in utilities without bracket arbitrary values", () => {
		expect(isPreviewAvailable("p-4")).toBe(true);
		expect(isPreviewAvailable("text-sm")).toBe(true);
	});

	it("rejects arbitrary bracket utilities", () => {
		expect(isPreviewAvailable("text-[10px]")).toBe(false);
		expect(isPreviewAvailable("w-[1rem]")).toBe(false);
	});
});
