import { render } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { IconChevronLeft } from "./IconChevronLeft";
import { IconChevronRight } from "./IconChevronRight";
import { IconInfo } from "./IconInfo";
import { IconTrash } from "./IconTrash";
import { IconX } from "./IconX";

describe("Icons", () => {
	it("IconInfo renders an svg", () => {
		const { container } = render(() => <IconInfo />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconTrash renders an svg", () => {
		const { container } = render(() => <IconTrash />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconChevronLeft renders an svg", () => {
		const { container } = render(() => <IconChevronLeft />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconChevronRight renders an svg", () => {
		const { container } = render(() => <IconChevronRight />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("IconX renders an svg", () => {
		const { container } = render(() => <IconX />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});
});
