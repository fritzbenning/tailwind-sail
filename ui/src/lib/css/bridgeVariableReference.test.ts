import { describe, expect, it } from "vitest";
import { bridgeVariableReference } from "./bridgeVariableReference";

describe("bridgeVariableReference", () => {
	it("leaves the value unchanged when the theme name is not a --color-* token", () => {
		expect(bridgeVariableReference("--primary", "hsl(var(--primary))")).toBe(
			"hsl(var(--primary))",
		);
	});

	it("leaves the value unchanged for bare --color- prefix", () => {
		expect(bridgeVariableReference("--color-", "hsl(var(--x))")).toBe(
			"hsl(var(--x))",
		);
	});

	it("rewrites inner var(--stem) to workspace when theme is --color-<stem>", () => {
		expect(
			bridgeVariableReference("--color-primary", "hsl(var(--primary))"),
		).toBe("hsl(var(--workspace-primary))");
	});

	it("replaces every matching var() call (global)", () => {
		expect(
			bridgeVariableReference(
				"--color-a",
				"color-mix(in srgb, var(--a), var(--a))",
			),
		).toBe("color-mix(in srgb, var(--workspace-a), var(--workspace-a))");
	});

	it("accepts optional whitespace inside var()", () => {
		expect(bridgeVariableReference("--color-p", "hsl(  var(  --p  )  )")).toBe(
			"hsl(  var(--workspace-p)  )",
		);
	});
});
