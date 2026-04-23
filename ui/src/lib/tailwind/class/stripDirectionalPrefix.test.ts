import { describe, expect, it } from "vitest";
import { stripDirectionalPrefix } from "./stripDirectionalPrefix";

describe("stripDirectionalPrefix", () => {
	it("removes axis and side prefixes", () => {
		expect(stripDirectionalPrefix("t-red-500")).toBe("red-500");
		expect(stripDirectionalPrefix("x-emerald-400")).toBe("emerald-400");
		expect(stripDirectionalPrefix("start-blue-600")).toBe("blue-600");
	});

	it("leaves tails without a prefix unchanged", () => {
		expect(stripDirectionalPrefix("red-500")).toBe("red-500");
	});
});
