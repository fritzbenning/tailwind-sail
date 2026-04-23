import { describe, expect, it } from "vitest";
import { PREVIEW_REGISTRY } from "./registry";

describe("PREVIEW_REGISTRY", () => {
	it("uses unique entry ids", () => {
		const ids = PREVIEW_REGISTRY.map((e) => e.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("wires match and default on every entry", () => {
		for (const entry of PREVIEW_REGISTRY) {
			expect(typeof entry.match).toBe("function");
			expect(typeof entry.default).toBe("function");
		}
	});
});
