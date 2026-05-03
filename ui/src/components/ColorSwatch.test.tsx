import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ColorSwatch } from "./ColorSwatch";

describe("ColorSwatch", () => {
	it("renders a decorative swatch with merged classes", () => {
		const { container } = render(() => (
			<ColorSwatch backgroundColorClass={{ className: "bg-red-500" }} />
		));
		const swatch = container.querySelector('[aria-hidden="true"]');
		expect(swatch).toBeInTheDocument();
		expect(swatch?.className).toContain("bg-red-500");
	});

	it("uses inline background-color for CSS variables without Tailwind bg-[…]", () => {
		const { container } = render(() => (
			<ColorSwatch
				backgroundColorClass={{
					className: "",
					backgroundColor: "var(--workspace-color-secondary)",
				}}
			/>
		));
		const swatch = container.querySelector(
			'[aria-hidden="true"]',
		) as HTMLDivElement | null;
		expect(swatch).toBeInTheDocument();
		expect(swatch?.style.backgroundColor).toBe(
			"var(--workspace-color-secondary)",
		);
	});

	it("applies a larger size when size is large", () => {
		const { container } = render(() => (
			<ColorSwatch
				size="large"
				backgroundColorClass={{ className: "bg-blue-500" }}
			/>
		));
		const swatch = container.querySelector('[aria-hidden="true"]');
		expect(swatch?.className).toMatch(/\bsize-6\b/);
	});
});
