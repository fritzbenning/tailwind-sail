import { fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { ToggleSwitch } from "./ToggleSwitch";

describe("ToggleSwitch", () => {
	it("reflects checked and notifies on change", () => {
		const onCheckedChange = vi.fn();
		const [checked, setChecked] = createSignal(false);
		render(() => (
			<ToggleSwitch
				checked={checked()}
				onCheckedChange={(v) => {
					setChecked(v);
					onCheckedChange(v);
				}}
			>
				Label
			</ToggleSwitch>
		));
		const box = screen.getByRole("checkbox", { name: /label/i });
		expect(box).not.toBeChecked();
		fireEvent.click(box);
		expect(onCheckedChange).toHaveBeenLastCalledWith(true);
		expect(box).toBeChecked();
	});
});
