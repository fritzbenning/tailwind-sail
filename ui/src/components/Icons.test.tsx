import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { IconInfo, IconTrash, IconX } from "./Icons";

describe("Icons", () => {
	it("IconInfo renders an svg", () => {
		const { container } = render(() => <IconInfo />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconTrash renders an svg", () => {
		const { container } = render(() => <IconTrash />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconX renders an svg", () => {
		const { container } = render(() => <IconX />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});
});
