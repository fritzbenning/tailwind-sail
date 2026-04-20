import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ButtonSlot } from "./ButtonSlot";

describe("ButtonSlot", () => {
	it("renders children", () => {
		render(() => (
			<ButtonSlot>
				<span>slot content</span>
			</ButtonSlot>
		));
		expect(screen.getByText("slot content")).toBeInTheDocument();
	});
});
