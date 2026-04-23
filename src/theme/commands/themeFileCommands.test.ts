import * as assert from "assert";
import * as vscode from "vscode";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";
import { executeAddThemeFile } from "./executeAddThemeFile";
import { executeRemoveThemeFile } from "./executeRemoveThemeFile";

async function setWorkspaceThemeFiles(paths: string[]): Promise<void> {
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	await config.update(
		"variables.sourceFiles",
		paths,
		vscode.ConfigurationTarget.Workspace,
	);
}

suite(
	"theme file commands (executeAddThemeFile / executeRemoveThemeFile)",
	() => {
		let initialThemeFiles: string[] = [];

		suiteSetup(async () => {
			initialThemeFiles = readThemeFiles();
		});

		teardown(async () => {
			await setWorkspaceThemeFiles(initialThemeFiles);
		});

		test("executeAddThemeFile: does nothing to theme list when the active document is not a file", async () => {
			await setWorkspaceThemeFiles([]);
			const doc = await vscode.workspace.openTextDocument({
				language: "css",
				content: "a { }",
			});
			await vscode.window.showTextDocument(doc);
			assert.notStrictEqual(doc.uri.scheme, "file");

			await executeAddThemeFile();
			assert.deepStrictEqual(readThemeFiles(), []);
		});

		test("executeAddThemeFile: rejects non-`.css` files and does not change the list", async () => {
			await setWorkspaceThemeFiles([]);
			const file = vscode.Uri.joinPath(
				vscode.workspace.workspaceFolders![0].uri,
				"src",
				"extension.test.ts",
			);
			const doc = await vscode.workspace.openTextDocument(file);
			await vscode.window.showTextDocument(doc);

			await executeAddThemeFile();
			assert.ok(!readThemeFiles().some((p) => p.includes("extension.test.ts")));
		});

		test("executeAddThemeFile: appends a workspace `.css` file and is idempotent on a second add", async () => {
			await setWorkspaceThemeFiles([]);

			const root = vscode.workspace.workspaceFolders![0].uri;
			const dir = vscode.Uri.joinPath(root, ".vscode-test-tmp-theme");
			await vscode.workspace.fs.createDirectory(dir);
			const name = `tw-sail-cmd-${Date.now()}.css`;
			const fileUri = vscode.Uri.joinPath(dir, name);
			await vscode.workspace.fs.writeFile(
				fileUri,
				new TextEncoder().encode("/* temp */\n"),
			);
			const relative = normalizeThemePath(
				vscode.workspace.asRelativePath(fileUri, false),
			);
			assert.ok(relative.length > 0, "expected a non-empty relative path");

			try {
				const doc = await vscode.workspace.openTextDocument(fileUri);
				await vscode.window.showTextDocument(doc);

				await executeAddThemeFile();
				assert.ok(readThemeFiles().includes(relative), "first add");
				const afterFirst = [...readThemeFiles()];

				await executeAddThemeFile();
				assert.deepStrictEqual(readThemeFiles(), afterFirst);
			} finally {
				try {
					await vscode.workspace.fs.delete(fileUri, { useTrash: false });
				} catch {
					// ignore
				}
			}
		});

		test("executeRemoveThemeFile: no-op on list when the path is not in settings", async () => {
			await setWorkspaceThemeFiles([]);

			const root = vscode.workspace.workspaceFolders![0].uri;
			const dir = vscode.Uri.joinPath(root, ".vscode-test-tmp-theme");
			await vscode.workspace.fs.createDirectory(dir);
			const name = `tw-sail-rm-miss-${Date.now()}.css`;
			const fileUri = vscode.Uri.joinPath(dir, name);
			await vscode.workspace.fs.writeFile(
				fileUri,
				new TextEncoder().encode("/* temp */\n"),
			);
			try {
				const doc = await vscode.workspace.openTextDocument(fileUri);
				await vscode.window.showTextDocument(doc);

				await executeRemoveThemeFile();
				assert.deepStrictEqual(readThemeFiles(), []);
			} finally {
				try {
					await vscode.workspace.fs.delete(fileUri, { useTrash: false });
				} catch {
					// ignore
				}
			}
		});

		test("executeRemoveThemeFile: removes a listed `.css` file", async () => {
			const root = vscode.workspace.workspaceFolders![0].uri;
			const dir = vscode.Uri.joinPath(root, ".vscode-test-tmp-theme");
			await vscode.workspace.fs.createDirectory(dir);
			const name = `tw-sail-rm-ok-${Date.now()}.css`;
			const fileUri = vscode.Uri.joinPath(dir, name);
			await vscode.workspace.fs.writeFile(
				fileUri,
				new TextEncoder().encode("/* temp */\n"),
			);
			const relative = normalizeThemePath(
				vscode.workspace.asRelativePath(fileUri, false),
			);
			assert.ok(relative.length > 0, "expected a non-empty relative path");

			try {
				await setWorkspaceThemeFiles([relative, "other-should-remain.css"]);
				const doc = await vscode.workspace.openTextDocument(fileUri);
				await vscode.window.showTextDocument(doc);

				await executeRemoveThemeFile();
				assert.ok(!readThemeFiles().includes(relative));
				assert.ok(readThemeFiles().includes("other-should-remain.css"));
			} finally {
				try {
					await vscode.workspace.fs.delete(fileUri, { useTrash: false });
				} catch {
					// ignore
				}
			}
		});
	},
);
