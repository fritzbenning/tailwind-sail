import * as assert from "assert";
import * as vscode from "vscode";
import { extractStringAtCursor } from "../../string/extract/extractStringAtCursor";
import type { SailEditorSnapshot } from "../types";
import { registerStringHighlighter } from "./registerStringHighlighter";

suite("registerStringHighlighter", () => {
	const subscriptions: vscode.Disposable[] = [];

	teardown(() => {
		while (subscriptions.length > 0) {
			subscriptions.pop()?.dispose();
		}
	});

	test("refresh runs without error when the sidebar is considered visible", async () => {
		const text = 'const x = "m-2";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const editor = await vscode.window.showTextDocument(doc);
		const pos = doc.positionAt(text.indexOf("m"));
		editor.selection = new vscode.Selection(pos, pos);
		const extracted = extractStringAtCursor(doc, pos);
		assert.ok(extracted);
		const snapshot: SailEditorSnapshot = { extracted, parsed: undefined };

		const context = { subscriptions } as unknown as vscode.ExtensionContext;
		const { refresh } = registerStringHighlighter(context, () => true);
		refresh(snapshot);
	});

	test("refresh returns early when highlightActiveString is disabled", async () => {
		const prev = vscode.workspace
			.getConfiguration("tailwind-sail")
			.get<boolean>("highlightActiveString");
		await vscode.workspace
			.getConfiguration("tailwind-sail")
			.update(
				"highlightActiveString",
				false,
				vscode.ConfigurationTarget.Global,
			);
		try {
			const text = 'const x = "m-2";';
			const doc = await vscode.workspace.openTextDocument({
				content: text,
				language: "typescript",
			});
			const editor = await vscode.window.showTextDocument(doc);
			const pos = doc.positionAt(text.indexOf("m"));
			editor.selection = new vscode.Selection(pos, pos);
			const extracted = extractStringAtCursor(doc, pos);
			assert.ok(extracted);
			const snapshot: SailEditorSnapshot = { extracted, parsed: undefined };

			const context = { subscriptions } as unknown as vscode.ExtensionContext;
			const { refresh } = registerStringHighlighter(context, () => true);
			refresh(snapshot);
		} finally {
			if (prev !== undefined) {
				await vscode.workspace
					.getConfiguration("tailwind-sail")
					.update(
						"highlightActiveString",
						prev,
						vscode.ConfigurationTarget.Global,
					);
			}
		}
	});
});
