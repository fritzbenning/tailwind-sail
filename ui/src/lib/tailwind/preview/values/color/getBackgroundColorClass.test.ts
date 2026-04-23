import { describe, expect, it } from "vitest";
import { getBackgroundColorClass } from "./getBackgroundColorClass";

describe("getBackgroundColorClass", () => {
	it("maps palette text and border colors to bg-*", () => {
		expect(getBackgroundColorClass("text-red-500")).toEqual({
			className: "bg-red-500",
		});
		expect(getBackgroundColorClass("md:hover:border-blue-600")).toEqual({
			className: "bg-blue-600",
		});
	});

	it("maps arbitrary bracket colors to inline background-color", () => {
		expect(getBackgroundColorClass("text-[#f97316]")).toEqual({
			className: "",
			backgroundColor: "#f97316",
		});
	});

	it("returns null for non-color utilities", () => {
		expect(getBackgroundColorClass("text-center")).toBe(null);
	});

	it("maps arbitrary var(--token) to workspace-prefixed preview when token is known", () => {
		expect(
			getBackgroundColorClass("text-[var(--brand)]", {
				knownCssVariableNames: new Set(["--brand"]),
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-brand)",
		});
	});

	it("maps Tailwind 4 text-(--token) to workspace preview when token is known", () => {
		expect(
			getBackgroundColorClass("text-(--brand)", {
				knownCssVariableNames: new Set(["--brand"]),
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-brand)",
		});
	});

	it("maps semantic @theme colors to --color-* via injected --workspace-color-*", () => {
		const known = new Set(["--color-background", "--background"]);
		expect(
			getBackgroundColorClass("bg-background", {
				knownCssVariableNames: known,
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-color-background)",
		});
		expect(
			getBackgroundColorClass("text-primary-foreground", {
				knownCssVariableNames: new Set(["--color-primary-foreground"]),
			}),
		).toEqual({
			className: "",
			backgroundColor: "var(--workspace-color-primary-foreground)",
		});
	});

	it("falls back to hsl(var(--workspace-*)) when only the primitive token is scanned", () => {
		expect(
			getBackgroundColorClass("bg-secondary", {
				knownCssVariableNames: new Set(["--secondary"]),
			}),
		).toEqual({
			className: "",
			backgroundColor: "hsl(var(--workspace-secondary))",
		});
	});
});
