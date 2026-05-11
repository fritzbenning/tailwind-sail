import * as assert from "assert";
import * as vscode from "vscode";
import { isCssDocument } from "./isCssDocument";

suite("isCssDocument", () => {
	test("returns true for css language id", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: "",
		});
		assert.strictEqual(isCssDocument(doc), true);
	});

	test("returns true for scss language id", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "scss",
			content: "",
		});
		assert.strictEqual(isCssDocument(doc), true);
	});

	test("returns false for vue documents", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "vue",
			content: "",
		});
		assert.strictEqual(isCssDocument(doc), false);
	});

	test("returns true for postcss file paths", async () => {
		assert.ok(vscode.workspace.workspaceFolders?.[0]);
		const uri = vscode.Uri.joinPath(
			vscode.workspace.workspaceFolders![0]!.uri,
			"src/styles/document/fixtures/stub.postcss",
		);
		const doc = await vscode.workspace.openTextDocument(uri);
		assert.strictEqual(isCssDocument(doc), true);
	});
});
