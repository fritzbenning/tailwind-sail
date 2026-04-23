import { describe, expect, it } from "vitest";
import { getWorkspaceVariableNames } from "./getWorkspaceVariableNames";

describe("getWorkspaceVariableNames", () => {
	it("chains theme-style hsl(var(--…)) values through --workspace-* aliases", () => {
		const decls = getWorkspaceVariableNames([
			{ name: "--background", value: "0 0% 100%", locations: [] },
			{
				name: "--color-background",
				value: "hsl(var(--background))",
				locations: [],
			},
		]);
		expect(decls).toEqual([
			{ name: "--workspace-background", value: "0 0% 100%" },
			{
				name: "--workspace-color-background",
				value: "hsl(var(--workspace-background))",
			},
		]);
	});

	it("synthesizes --workspace-color-* from a primitive when the theme value was empty", () => {
		const decls = getWorkspaceVariableNames([
			{ name: "--color-secondary", value: "", locations: [] },
			{ name: "--secondary", value: "0 0% 96.1%", locations: [] },
		]);
		expect(decls).toEqual([
			{
				name: "--workspace-color-secondary",
				value: "hsl(var(--workspace-secondary))",
			},
			{ name: "--workspace-secondary", value: "0 0% 96.1%" },
		]);
	});

	it("still emits --workspace-color-* for empty theme values when the primitive was not scanned", () => {
		const decls = getWorkspaceVariableNames([
			{ name: "--color-primary", value: "", locations: [] },
		]);
		expect(decls).toEqual([
			{
				name: "--workspace-color-primary",
				value: "hsl(var(--workspace-primary))",
			},
		]);
	});

	it("bridges var(--stem) for --color-* when the primitive token was not in the scan", () => {
		const decls = getWorkspaceVariableNames([
			{
				name: "--color-primary",
				value: "hsl(var(--primary))",
				locations: [],
			},
		]);
		expect(decls).toEqual([
			{
				name: "--workspace-color-primary",
				value: "hsl(var(--workspace-primary))",
			},
		]);
	});
});
