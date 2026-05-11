import * as assert from "assert";
import * as vscode from "vscode";
import type { ViewProvider } from "../../webview/ViewProvider";
import type { StringHighlighterHandle } from "../highlight/registerStringHighlighter";
import type { SailEditorSnapshot } from "../types";
import { registerEditorTracker } from "./registerEditorTracker";

suite("registerEditorTracker", () => {
	const subscriptions: vscode.Disposable[] = [];

	teardown(() => {
		while (subscriptions.length > 0) {
			subscriptions.pop()?.dispose();
		}
	});

	test("exposes refreshNow that pushes a snapshot for the active editor", async () => {
		const text = 'const x = "p-4";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const editor = await vscode.window.showTextDocument(doc);
		const pos = doc.positionAt(text.indexOf("p"));
		editor.selection = new vscode.Selection(pos, pos);

		let last: SailEditorSnapshot | undefined;
		const viewProvider = {
			update(snapshot: SailEditorSnapshot) {
				last = snapshot;
			},
		} as unknown as ViewProvider;
		const stringHighlighter: StringHighlighterHandle = {
			refresh(snapshot: SailEditorSnapshot) {
				last = snapshot;
			},
		};

		const extensionContext = {
			subscriptions,
		} as unknown as vscode.ExtensionContext;
		const handle = registerEditorTracker(
			viewProvider,
			stringHighlighter,
			extensionContext,
		);
		handle.refreshNow();

		assert.strictEqual(last?.context.kind, "string");
		if (last?.context.kind !== "string") {
			throw new Error("expected string context");
		}
		assert.strictEqual(last.context.rawContent, "p-4");
	});
});
