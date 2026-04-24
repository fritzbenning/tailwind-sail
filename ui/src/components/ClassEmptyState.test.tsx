import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ClassEmptyState } from "./ClassEmptyState";

describe("ClassEmptyState", () => {
	it("shows noString copy", () => {
		render(() => <ClassEmptyState kind="noString" />);
		expect(screen.getByText(/select a string literal/i)).toBeInTheDocument();
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("shows noTailwind copy", () => {
		render(() => <ClassEmptyState kind="noTailwind" />);
		expect(
			screen.getByText(/no tailwind classes were detected/i),
		).toBeInTheDocument();
	});
});
