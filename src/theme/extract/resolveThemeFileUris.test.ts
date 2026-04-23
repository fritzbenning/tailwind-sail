import * as assert from "assert";
import * as vscode from "vscode";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";
import { resolveThemeFileUris } from "./resolveThemeFileUris";

async function setWorkspaceThemeFiles(paths: string[]): Promise<void> {
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	await config.update(
		"variables.sourceFiles",
		paths,
		vscode.ConfigurationTarget.Workspace,
	);
}

suite("resolveThemeFileUris", () => {
	let initialThemeFiles: string[] = [];

	suiteSetup(async () => {
		initialThemeFiles = readThemeFiles();
	});

	teardown(async () => {
		await setWorkspaceThemeFiles(initialThemeFiles);
	});

	test("returns no URIs when the theme list is empty", async () => {
		await setWorkspaceThemeFiles([]);
		assert.deepStrictEqual(resolveThemeFileUris(), []);
	});

	test("skips non-`.css` paths", async () => {
		await setWorkspaceThemeFiles(["a.pcss", "b.css"]);
		const uris = resolveThemeFileUris();
		assert.strictEqual(uris.length, 1);
		assert.ok(uris[0]!.fsPath.replace(/\\/g, "/").endsWith("/b.css"));
	});

	test("dedupes the same relative path for one workspace folder", async () => {
		await setWorkspaceThemeFiles(["x.css", "./x.css"]);
		const uris = resolveThemeFileUris();
		assert.strictEqual(uris.length, 1);
	});

	test("joins each path against the workspace folder root", async () => {
		await setWorkspaceThemeFiles(["package.json", "src/extension.test.ts"]);
		assert.deepStrictEqual(resolveThemeFileUris(), []);

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
		const root = vscode.workspace.workspaceFolders![0].uri.fsPath.replace(
			/\\/g,
			"/",
		);
		const uris = resolveThemeFileUris();
		assert.strictEqual(uris.length, 1);
		assert.strictEqual(
			uris[0]!.fsPath.replace(/\\/g, "/"),
			`${root}/${cssRel}`,
		);
	});
});
