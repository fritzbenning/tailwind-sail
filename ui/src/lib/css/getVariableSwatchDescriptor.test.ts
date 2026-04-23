import { describe, expect, it } from "vitest";
import { getVariableSwatchDescriptor } from "./getVariableSwatchDescriptor";

const loc = [] as const;

describe("getVariableSwatchDescriptor", () => {
	it("returns null for non-color-like variables", () => {
		expect(
			getVariableSwatchDescriptor({
				name: "--spacing-4",
				value: "1rem",
				locations: loc,
			}),
		).toBe(null);
	});

	it("previews @theme --color-* via workspace alias", () => {
		expect(
			getVariableSwatchDescriptor({
				name: "--color-primary",
				value: "hsl(var(--primary))",
				locations: loc,
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-color-primary)",
		});
	});

	it("wraps shadcn HSL channel tokens with hsl()", () => {
		expect(
			getVariableSwatchDescriptor({
				name: "--primary",
				value: "0 0% 9%",
				locations: loc,
			}),
		).toEqual({
			className: "",
			backgroundColor: "hsl(var(--workspace-primary))",
		});
	});

	it("previews hex and var() values via workspace alias", () => {
		expect(
			getVariableSwatchDescriptor({
				name: "--brand",
				value: "#f97316",
				locations: loc,
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-brand)",
		});
		expect(
			getVariableSwatchDescriptor({
				name: "--x",
				value: "var(--y)",
				locations: loc,
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-x)",
		});
	});
});
