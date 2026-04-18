import * as assert from "assert";
import * as vscode from "vscode";
import { onSelectionChange } from "./onSelectionChange";

suite("onSelectionChange", () => {
	test("calls schedule when the editor is the active text editor", async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: "hello",
			language: "typescript",
		});
		const editor = await vscode.window.showTextDocument(doc);
		let calls = 0;
		onSelectionChange(editor, () => {
			calls++;
		});
		assert.strictEqual(calls, 1);
	});

	test("does not schedule when the editor is not active", async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: "hello",
			language: "typescript",
		});
		await vscode.window.showTextDocument(doc);
		const decoy = {} as vscode.TextEditor;
		let calls = 0;
		onSelectionChange(decoy, () => {
			calls++;
		});
		assert.strictEqual(calls, 0);
	});
});
