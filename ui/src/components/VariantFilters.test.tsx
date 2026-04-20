import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { getDefaultFilterState } from "../lib";
import { makePanelModal } from "../test/fixtures";
import { VariantFilters } from "./VariantFilters";

describe("VariantFilters", () => {
	it("renders variant rows and notifies on chip click", () => {
		const onVariantClick = vi.fn();
		render(() => (
			<VariantFilters
				panel={makePanelModal()}
				activeVariants={getDefaultFilterState().activeVariants}
				onVariantClick={onVariantClick}
			/>
		));
		expect(screen.getByText("Breakpoints")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "md" }));
		expect(onVariantClick).toHaveBeenCalledWith("breakpoints", "md");
	});
});
