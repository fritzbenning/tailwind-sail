import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { ClearButton } from "./ClearButton";

describe("ClearButton", () => {
	it("calls onClick when pressed", () => {
		const onClick = vi.fn();
		render(() => <ClearButton onClick={onClick} />);
		fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("uses custom aria-label and title when provided", () => {
		render(() => (
			<ClearButton
				onClick={() => {}}
				aria-label="Dismiss"
				title="Remove filter text"
			/>
		));
		const btn = screen.getByRole("button", { name: "Dismiss" });
		expect(btn).toHaveAttribute("title", "Remove filter text");
	});
});
