import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { NoResultState } from "./NoResultState";

describe("NoResultState", () => {
	it("calls onReset when the link is activated", () => {
		const onReset = vi.fn();
		render(() => <NoResultState onReset={onReset} />);
		expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
		fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
		expect(onReset).toHaveBeenCalledTimes(1);
	});
});
