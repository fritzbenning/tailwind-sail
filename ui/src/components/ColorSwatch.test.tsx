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
});
