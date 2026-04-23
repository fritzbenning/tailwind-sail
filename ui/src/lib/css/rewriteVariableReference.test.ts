import { describe, expect, it } from "vitest";
import { rewriteVariableReference } from "./rewriteVariableReference";

describe("rewriteVariableReference", () => {
	it("rewrites var() calls for names present in the set", () => {
		const known = new Set(["--background"]);
		expect(rewriteVariableReference("hsl(var(--background))", known)).toBe(
			"hsl(var(--workspace-background))",
		);
	});

	it("leaves unknown custom properties unchanged", () => {
		const known = new Set<string>();
		expect(rewriteVariableReference("hsl(var(--background))", known)).toBe(
			"hsl(var(--background))",
		);
	});

	it("rewrites multiple var() calls when each name is known", () => {
		const known = new Set(["--a", "--b"]);
		expect(
			rewriteVariableReference("color-mix(in srgb, var(--a), var(--b))", known),
		).toBe("color-mix(in srgb, var(--workspace-a), var(--workspace-b))");
	});

	it("leaves a mix of known and unknown var() as appropriate", () => {
		const known = new Set(["--only"]);
		expect(
			rewriteVariableReference("var(--only) and var(--missing)", known),
		).toBe("var(--workspace-only) and var(--missing)");
	});
});
