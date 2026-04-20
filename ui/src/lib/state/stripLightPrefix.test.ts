import { describe, expect, it } from "vitest";
import { stripLightPrefix } from "./stripLightPrefix";

describe("stripLightPrefix", () => {
	it("removes a single leading light: segment", () => {
		expect(stripLightPrefix("light:text-red-500")).toBe("text-red-500");
	});

	it("removes repeated leading light: segments", () => {
		expect(stripLightPrefix("light:light:flex")).toBe("flex");
	});

	it("leaves strings without a leading light: prefix unchanged", () => {
		expect(stripLightPrefix("dark:text-white")).toBe("dark:text-white");
	});
});
