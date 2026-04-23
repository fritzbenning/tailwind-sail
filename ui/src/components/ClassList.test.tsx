import { fireEvent, render, screen } from "@solidjs/testing-library";
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
		render(() => (
			<ClassList
				model={model}
				cssVariables={() => []}
				showUtilityPreview={() => true}
			/>
		));
		expect(screen.getByPlaceholderText("Filter classes")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("New class")).toBeInTheDocument();
		expect(screen.getByDisplayValue("text-xs")).toBeInTheDocument();
	});

	it("keeps focus on the class input when the panel pushes new class object references (same row)", () => {
		const panel = makePanelModal({
			classes: [makeClassItem({ fullClass: "p-1", tokenIndex: 0 })],
		});
		const [model, setModel] = createSignal(asWebviewModal(panel));
		render(() => (
			<ClassList
				model={model}
				cssVariables={() => []}
				showUtilityPreview={() => true}
			/>
		));
		const input = screen.getByDisplayValue("p-1") as HTMLInputElement;
		input.focus();
		expect(document.activeElement).toBe(input);

		// Simulate host refresh: same logical class, new object reference (breaks <For> identity).
		setModel(
			asWebviewModal({
				...panel,
				classes: [makeClassItem({ fullClass: "p-12", tokenIndex: 0 })],
			}),
		);
		expect(document.activeElement).toBe(input);
		fireEvent.input(input, { target: { value: "p-2" } });
		expect(document.activeElement).toBe(input);
	});
});
