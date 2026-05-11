import * as assert from "assert";
import * as vscode from "vscode";
import type { ViewProvider } from "../../webview/ViewProvider";
import type { SailEditorSnapshot } from "../types";
import { pushSnapshot } from "./pushSnapshot";

suite("pushSnapshot", () => {
	test("pushes empty snapshot when there is no active editor", async () => {
		await vscode.commands.executeCommand("workbench.action.closeAllEditors");

		let viewSnap: SailEditorSnapshot | undefined;
		let highSnap: SailEditorSnapshot | undefined;
		const viewProvider = {
			update(snapshot: SailEditorSnapshot) {
				viewSnap = snapshot;
			},
		} as unknown as ViewProvider;

		pushSnapshot(viewProvider, (snapshot) => {
			highSnap = snapshot;
		});

		assert.deepStrictEqual(viewSnap, { context: { kind: "none" } });
		assert.deepStrictEqual(highSnap, { context: { kind: "none" } });
	});

	test("pushes string context when cursor is inside a class string", async () => {
		const text = 'const x = "flex gap-2";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const editor = await vscode.window.showTextDocument(doc);
		const pos = doc.positionAt(text.indexOf("f"));
		editor.selection = new vscode.Selection(pos, pos);

		let viewSnap: SailEditorSnapshot | undefined;
		let highSnap: SailEditorSnapshot | undefined;
		const viewProvider = {
			update(snapshot: SailEditorSnapshot) {
				viewSnap = snapshot;
			},
		} as unknown as ViewProvider;

		pushSnapshot(viewProvider, (snapshot) => {
			highSnap = snapshot;
		});

		assert.strictEqual(viewSnap?.context.kind, "string");
		if (viewSnap?.context.kind !== "string") {
			throw new Error("expected string context");
		}
		assert.strictEqual(viewSnap.context.rawContent, "flex gap-2");
		assert.strictEqual(viewSnap.context.classes.length, 2);
		assert.strictEqual(viewSnap.context.isTailwind, true);
		assert.deepStrictEqual(highSnap, viewSnap);
	});
});
