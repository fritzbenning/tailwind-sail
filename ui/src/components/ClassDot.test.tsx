import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ClassDot } from "./ClassDot";

describe("ClassDot", () => {
	it("renders a decorative dot", () => {
		render(() => <ClassDot />);
		const dot = screen.getByText(".");
		expect(dot).toHaveAttribute("aria-hidden", "true");
	});
});
