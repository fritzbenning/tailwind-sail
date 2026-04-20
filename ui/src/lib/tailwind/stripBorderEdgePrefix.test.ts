import { describe, expect, it } from "vitest";
import { stripBorderEdgePrefix } from "./stripBorderEdgePrefix";

describe("stripBorderEdgePrefix", () => {
	it("removes axis and side prefixes", () => {
		expect(stripBorderEdgePrefix("t-red-500")).toBe("red-500");
		expect(stripBorderEdgePrefix("x-emerald-400")).toBe("emerald-400");
		expect(stripBorderEdgePrefix("start-blue-600")).toBe("blue-600");
	});

	it("leaves tails without a prefix unchanged", () => {
		expect(stripBorderEdgePrefix("red-500")).toBe("red-500");
	});
});
