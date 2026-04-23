import * as assert from "assert";
import * as vscode from "vscode";
import { readThemeFiles } from "./readThemeFiles";

async function setWorkspaceThemeFiles(paths: string[]): Promise<void> {
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	await config.update(
		"variables.sourceFiles",
		paths,
		vscode.ConfigurationTarget.Workspace,
	);
}

suite("readThemeFiles", () => {
	let initialThemeFiles: string[] = [];

	suiteSetup(async () => {
		initialThemeFiles = readThemeFiles();
	});

	teardown(async () => {
		await setWorkspaceThemeFiles(initialThemeFiles);
	});

	test("returns an empty array when the setting is cleared", async () => {
		await setWorkspaceThemeFiles([]);
		assert.deepStrictEqual(readThemeFiles(), []);
	});

	test("normalizes paths and drops empty entries", async () => {
		await setWorkspaceThemeFiles(["  ./src/a.css  ", "", "b.css"]);
		const got = readThemeFiles();
		assert.ok(got.includes("src/a.css"));
		assert.ok(got.includes("b.css"));
		assert.ok(!got.some((p) => p.length === 0));
	});
});
