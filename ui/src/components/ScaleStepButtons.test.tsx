import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, expect, it, vi } from "vitest";
import { makeClassItem, makePanelModal } from "../test/fixtures";
import { vscode } from "../vscode";
import { ScaleStepButtons } from "./ScaleStepButtons";

describe("ScaleStepButtons", () => {
	it("posts edit-class with requestSaveAfterEdit when stepping", () => {
		const postMessage = vi.spyOn(vscode, "postMessage");
		const panel = makePanelModal({
			classes: [makeClassItem({ tokenIndex: 3, fullClass: "text-sm" })],
		});
		const item = panel.classes[0];

		render(() => (
			<ScaleStepButtons
				tokenIndex={item.tokenIndex}
				fullClass={() => item.fullClass}
			/>
		));

		const stepUp = screen.getByRole("button", {
			name: "Step up named breakpoint or size keyword",
		});
		fireEvent.click(stepUp);

		expect(postMessage).toHaveBeenCalledWith(
			expect.objectContaining({
				type: "tailwind-sail-edit-class",
				tokenIndex: 3,
				requestSaveAfterEdit: true,
			}),
		);
		const payload = postMessage.mock.calls[0][0] as {
			newValue?: string;
		};
		expect(payload.newValue?.length).toBeGreaterThan(0);
	});
});
