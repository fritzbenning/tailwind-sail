import * as assert from "assert";
import * as vscode from "vscode";
import { isScssDocument } from "./isScssDocument";

suite("isScssDocument", () => {
	test("returns true for scss language id", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "scss",
			content: "",
		});
		assert.strictEqual(isScssDocument(doc), true);
	});

	test("returns false for plain css language id", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: "",
		});
		assert.strictEqual(isScssDocument(doc), false);
	});

	test("returns false for vue documents", async () => {
		const doc = await vscode.workspace.openTextDocument({
			language: "vue",
			content: "",
		});
		assert.strictEqual(isScssDocument(doc), false);
	});

	test("returns true for scss and sass file paths", async () => {
		assert.ok(vscode.workspace.workspaceFolders?.[0]);
		const root = vscode.workspace.workspaceFolders![0]!.uri;
		const scssUri = vscode.Uri.joinPath(
			root,
			"src/styles/document/fixtures/stub.scss",
		);
		const sassUri = vscode.Uri.joinPath(
			root,
			"src/styles/document/fixtures/stub.sass",
		);
		const scssDoc = await vscode.workspace.openTextDocument(scssUri);
		const sassDoc = await vscode.workspace.openTextDocument(sassUri);
		assert.strictEqual(isScssDocument(scssDoc), true);
		assert.strictEqual(isScssDocument(sassDoc), true);
	});
});
