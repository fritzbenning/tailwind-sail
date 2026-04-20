import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ScrollPanel } from "./ScrollPanel";

describe("ScrollPanel", () => {
	it("renders children", () => {
		render(() => (
			<ScrollPanel>
				<p>scrollable</p>
			</ScrollPanel>
		));
		expect(screen.getByText("scrollable")).toBeInTheDocument();
	});
});
