import { render, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
	it("renders its label", () => {
		render(() => <Chip isActive={false}>Typography</Chip>);
		expect(
			screen.getByRole("button", { name: "Typography" }),
		).toBeInTheDocument();
	});

	it("is a button with type=button", () => {
		render(() => <Chip isActive={false}>A</Chip>);
		const btn = screen.getByRole("button", { name: "A" });
		expect(btn).toHaveAttribute("type", "button");
	});

	it("reflects isActive on aria-pressed when the prop changes", () => {
		const [active, setActive] = createSignal(false);
		render(() => <Chip isActive={active()}>X</Chip>);
		const btn = screen.getByRole("button", { name: "X" });
		expect(btn).toHaveAttribute("aria-pressed", "false");
		setActive(true);
		expect(btn).toHaveAttribute("aria-pressed", "true");
	});
});
