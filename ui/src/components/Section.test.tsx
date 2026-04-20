import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
	it("renders a section with children", () => {
		const { container } = render(() => (
			<Section>
				<p>inside</p>
			</Section>
		));
		expect(container.querySelector("section")).toBeInTheDocument();
		expect(screen.getByText("inside")).toBeInTheDocument();
	});
});
