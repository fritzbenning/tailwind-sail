import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
	it("shows noString copy", () => {
		render(() => <EmptyState kind="noString" />);
		expect(screen.getByText(/select a string literal/i)).toBeInTheDocument();
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("shows noTailwind copy", () => {
		render(() => <EmptyState kind="noTailwind" />);
		expect(
			screen.getByText(/no tailwind classes were detected/i),
		).toBeInTheDocument();
	});
});
