import * as assert from "assert";
import * as vscode from "vscode";
import { normalizeThemePath } from "../config/normalizeThemePath";
import { readThemeFiles } from "../config/readThemeFiles";
import { getVariableDefinitions } from "./getVariableDefinitions";

async function setWorkspaceThemeFiles(paths: string[]): Promise<void> {
	const config = vscode.workspace.getConfiguration("tailwind-sail");
	await config.update(
		"variables.sourceFiles",
		paths,
		vscode.ConfigurationTarget.Workspace,
	);
}

suite("getVariableDefinitions", () => {
	let initialThemeFiles: string[] = [];

	suiteSetup(async () => {
		initialThemeFiles = readThemeFiles();
	});

	teardown(async () => {
		await setWorkspaceThemeFiles(initialThemeFiles);
	});

	test("returns an empty list when no theme files are configured", async () => {
		await setWorkspaceThemeFiles([]);
		assert.deepStrictEqual(await getVariableDefinitions(), []);
	});

	test("reads variables from an on-disk `.css` theme file", async () => {
		const root = vscode.workspace.workspaceFolders![0].uri;
		const dir = vscode.Uri.joinPath(root, ".vscode-test-tmp-theme");
		await vscode.workspace.fs.createDirectory(dir);
		const name = `tw-sail-vars-${Date.now()}.css`;
		const fileUri = vscode.Uri.joinPath(dir, name);
		const body =
			":root {\n  --tw-sail-test-abc: #abc;\n  --tw-sail-test-xyz: 2px;\n}\n";
		await vscode.workspace.fs.writeFile(
			fileUri,
			new TextEncoder().encode(body),
		);
		const relative = normalizeThemePath(
			vscode.workspace.asRelativePath(fileUri, false),
		);

		try {
			await setWorkspaceThemeFiles([relative]);
			const entries = await getVariableDefinitions();
			const byName = new Map(entries.map((e) => [e.name, e] as const));
			assert.strictEqual(byName.get("--tw-sail-test-abc")?.value, "#abc");
			assert.strictEqual(byName.get("--tw-sail-test-xyz")?.value, "2px");
			const locs = byName.get("--tw-sail-test-abc")?.locations ?? [];
			assert.strictEqual(locs.length, 1);
			assert.strictEqual(locs[0]?.line, 2);
			assert.strictEqual(locs[0]?.uri, fileUri.toString());
		} finally {
			try {
				await vscode.workspace.fs.delete(fileUri, { useTrash: false });
			} catch {
				// ignore
			}
		}
	});

	test("skips files larger than the read budget", async () => {
		const root = vscode.workspace.workspaceFolders![0].uri;
		const dir = vscode.Uri.joinPath(root, ".vscode-test-tmp-theme");
		await vscode.workspace.fs.createDirectory(dir);
		const name = `tw-sail-huge-${Date.now()}.css`;
		const fileUri = vscode.Uri.joinPath(dir, name);
		const huge = new Uint8Array(600 * 1024);
		huge.fill(32);
		await vscode.workspace.fs.writeFile(fileUri, huge);
		const relative = normalizeThemePath(
			vscode.workspace.asRelativePath(fileUri, false),
		);

		try {
			await setWorkspaceThemeFiles([relative]);
			assert.deepStrictEqual(await getVariableDefinitions(), []);
		} finally {
			try {
				await vscode.workspace.fs.delete(fileUri, { useTrash: false });
			} catch {
				// ignore
			}
		}
	});
});
