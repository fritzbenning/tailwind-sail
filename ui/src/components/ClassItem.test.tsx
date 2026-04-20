import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { getDefaultFilterState } from "../lib";
import { makeClassItem, makePanelModal } from "../test/fixtures";
import { vscode } from "../vscode";
import { ClassItem } from "./ClassItem";

describe("ClassItem", () => {
	it("renders the class input with token metadata", () => {
		const panel = makePanelModal({
			classes: [makeClassItem({ tokenIndex: 2, fullClass: "font-bold" })],
		});
		render(() => (
			<ClassItem
				item={panel.classes[0]}
				panel={() => panel}
				filter={() => getDefaultFilterState()}
			/>
		));
		const input = screen.getByDisplayValue("font-bold");
		expect(input).toHaveAttribute("data-token-index", "2");
	});

	it("posts edit-class on input", () => {
		const postMessage = vi.spyOn(vscode, "postMessage");
		const panel = makePanelModal({
			classes: [makeClassItem({ tokenIndex: 0, fullClass: "p-1" })],
		});
		render(() => (
			<ClassItem
				item={panel.classes[0]}
				panel={() => panel}
				filter={() => getDefaultFilterState()}
			/>
		));
		const input = screen.getByDisplayValue("p-1");
		fireEvent.input(input, { target: { value: "p-2" } });
		expect(postMessage).toHaveBeenCalledWith({
			type: "tailwind-sail-edit-class",
			tokenIndex: 0,
			newValue: "p-2",
		});
	});
});
