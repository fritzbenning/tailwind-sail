import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { vscode } from "../vscode";
import { RemoveButton } from "./RemoveButton";

describe("RemoveButton", () => {
	it("posts remove-class with tokenIndex on click", () => {
		const postMessage = vi.spyOn(vscode, "postMessage");
		render(() => <RemoveButton tokenIndex={3} />);
		fireEvent.click(screen.getByRole("button", { name: "Remove this class" }));
		expect(postMessage).toHaveBeenCalledWith({
			type: "tailwind-sail-remove-class",
			tokenIndex: 3,
		});
	});

	it("sets data-token-index", () => {
		render(() => <RemoveButton tokenIndex={7} />);
		expect(screen.getByRole("button")).toHaveAttribute("data-token-index", "7");
	});
});
