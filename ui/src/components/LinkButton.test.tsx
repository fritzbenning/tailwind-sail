import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { LinkButton } from "./LinkButton";

describe("LinkButton", () => {
	it("calls onClick when pressed", () => {
		const onClick = vi.fn();
		render(() => <LinkButton onClick={onClick}>action</LinkButton>);
		fireEvent.click(screen.getByRole("button", { name: "action" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
