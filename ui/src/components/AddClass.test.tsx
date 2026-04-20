import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { vscode } from "../vscode";
import { AddClass } from "./AddClass";

describe("AddClass", () => {
	it("posts add-class on Enter when the trimmed value is non-empty", () => {
		const postMessage = vi.spyOn(vscode, "postMessage");
		render(() => <AddClass variantPrefix={() => ""} />);
		const input = screen.getByPlaceholderText("New class") as HTMLInputElement;
		fireEvent.input(input, { target: { value: "underline" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(postMessage).toHaveBeenCalledWith({
			type: "tailwind-sail-add-class",
			className: "underline",
		});
	});

	it("does not post when the value is empty", () => {
		const postMessage = vi.spyOn(vscode, "postMessage");
		render(() => <AddClass variantPrefix={() => ""} />);
		const input = screen.getByPlaceholderText("New class");
		fireEvent.input(input, { target: { value: "   " } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(postMessage).not.toHaveBeenCalled();
	});
});
