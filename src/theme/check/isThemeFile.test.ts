import * as assert from "assert";
import * as vscode from "vscode";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";
import { isThemeFile } from "./isThemeFile";

async function setWorkspaceThemeFiles(paths: string[]): Promise<void> {
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	await config.update(
		"variables.sourceFiles",
		paths,
		vscode.ConfigurationTarget.Workspace,
	);
}

suite("isThemeFile", () => {
	let initialThemeFiles: string[] = [];

	suiteSetup(async () => {
		initialThemeFiles = readThemeFiles();
	});

	teardown(async () => {
		await setWorkspaceThemeFiles(initialThemeFiles);
	});

	test("returns false for non-`file` URIs", async () => {
		await setWorkspaceThemeFiles([]);
		const doc = await vscode.workspace.openTextDocument({
			language: "css",
			content: ":root { --x: 1; }",
		});
		assert.strictEqual(doc.uri.scheme, "untitled");
		assert.strictEqual(isThemeFile(doc.uri), false);
	});

	test("returns false when the file is not listed as a theme source", async () => {
		await setWorkspaceThemeFiles([]);
		const file = vscode.Uri.joinPath(
			vscode.workspace.workspaceFolders![0].uri,
			"package.json",
		);
		assert.strictEqual(isThemeFile(file), false);
	});

	test("returns true when the path matches a resolved theme file URI", async () => {
		const cssRel = normalizeThemePath(
			vscode.workspace.asRelativePath(
				vscode.Uri.joinPath(
					vscode.workspace.workspaceFolders![0].uri,
					"ui",
					"src",
					"app.css",
				),
				false,
			),
		);
		await setWorkspaceThemeFiles([cssRel]);
		const file = vscode.Uri.joinPath(
			vscode.workspace.workspaceFolders![0].uri,
			...cssRel.split("/"),
		);
		assert.strictEqual(isThemeFile(file), true);
	});
});
