import * as assert from "assert";
import * as vscode from "vscode";
import { readSaveDocumentAfterEdit } from "./readSaveDocumentAfterEdit";

suite("readSaveDocumentAfterEdit", () => {
	const configKey = "saveDocumentAfterEdit";
	const globalTarget = vscode.ConfigurationTarget.Global;

	async function restoreGlobalPrev(
		config: vscode.WorkspaceConfiguration,
		prevGlobal: boolean | undefined,
	) {
		await config.update(configKey, prevGlobal ?? undefined, globalTarget);
	}

	test("returns false when the global setting is false", async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| boolean
			| undefined;

		await config.update(configKey, false, globalTarget);

		try {
			assert.strictEqual(readSaveDocumentAfterEdit(), false);
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});

	test("returns true when the global setting is true", async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| boolean
			| undefined;

		await config.update(configKey, true, globalTarget);

		try {
			assert.strictEqual(readSaveDocumentAfterEdit(), true);
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});
});
