import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ChipList } from "./ChipList";

describe("ChipList", () => {
	it("renders children", () => {
		render(() => (
			<ChipList>
				<span data-testid="child">a</span>
			</ChipList>
		));
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
