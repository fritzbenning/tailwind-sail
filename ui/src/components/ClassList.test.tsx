import { render, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { describe, expect, it } from "vitest";
import {
	asWebviewModal,
	makeClassItem,
	makePanelModal,
} from "../test/fixtures";
import { ClassList } from "./ClassList";

describe("ClassList", () => {
	it("renders search, filters, and class rows for a panel model", () => {
		const panel = makePanelModal({
			classes: [makeClassItem({ fullClass: "text-xs", tokenIndex: 0 })],
		});
		const [model] = createSignal(asWebviewModal(panel));
		render(() => <ClassList model={model} />);
		expect(screen.getByPlaceholderText("Filter classes")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("New class")).toBeInTheDocument();
		expect(screen.getByDisplayValue("text-xs")).toBeInTheDocument();
	});
});
