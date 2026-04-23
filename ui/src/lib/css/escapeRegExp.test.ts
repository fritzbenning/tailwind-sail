import { describe, expect, it } from "vitest";
import { escapeRegExp } from "./escapeRegExp";

describe("escapeRegExp", () => {
	it("leaves letters and numbers unchanged", () => {
		expect(escapeRegExp("abc123")).toBe("abc123");
	});

	it("escapes regex metacharacters", () => {
		expect(escapeRegExp(".*+?^${}()|[]\\")).toBe(
			"\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\",
		);
	});

	it("escapes a CSS var call pattern for use as a RegExp source", () => {
		const s = "var(--background)";
		expect(new RegExp(escapeRegExp(s)).test(s)).toBe(true);
		expect(escapeRegExp(s)).toBe("var\\(--background\\)");
	});
});
