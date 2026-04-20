import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { getDefaultFilterState } from "../lib";
import { makePanelModal } from "../test/fixtures";
import { UtilityFilters } from "./UtilityFilters";

describe("UtilityFilters", () => {
	it("renders nothing when the panel has no utilities", () => {
		const { container } = render(() => (
			<UtilityFilters
				panel={makePanelModal({ utilities: [] })}
				activeUtility={getDefaultFilterState().activeUtility}
				onUtilityClick={() => {}}
			/>
		));
		expect(container.firstChild).toBeNull();
	});

	it("renders utility chips and notifies on click", () => {
		const onUtilityClick = vi.fn();
		render(() => (
			<UtilityFilters
				panel={makePanelModal()}
				activeUtility={{ kind: "utility", id: "text" }}
				onUtilityClick={onUtilityClick}
			/>
		));
		expect(screen.getByText("Utility")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "text" }));
		expect(onUtilityClick).toHaveBeenCalledWith("text");
	});
});
