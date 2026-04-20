import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { SectionTitle } from "./SectionTitle";

describe("SectionTitle", () => {
	it("renders children", () => {
		render(() => <SectionTitle>Utilities</SectionTitle>);
		expect(screen.getByText("Utilities")).toBeInTheDocument();
	});
});
