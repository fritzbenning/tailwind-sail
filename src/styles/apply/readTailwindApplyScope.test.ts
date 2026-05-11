import * as assert from "assert";
import * as vscode from "vscode";
import { readTailwindApplyScope } from "./readTailwindApplyScope";

suite("readTailwindApplyScope", () => {
	const configKey = "applyAtCaretScope";
	const globalTarget = vscode.ConfigurationTarget.Global;

	async function restoreGlobalPrev(
		config: vscode.WorkspaceConfiguration,
		prevGlobal: string | undefined,
	) {
		await config.update(configKey, prevGlobal ?? undefined, globalTarget);
	}

	test("returns wholeRule when the workspace setting is wholeRule", async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| string
			| undefined;

		await config.update(configKey, "wholeRule", globalTarget);

		try {
			assert.strictEqual(readTailwindApplyScope(), "wholeRule");
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});

	test("returns atCaretDirective when the workspace setting is atCaretDirective", async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| string
			| undefined;

		await config.update(configKey, "atCaretDirective", globalTarget);

		try {
			assert.strictEqual(readTailwindApplyScope(), "atCaretDirective");
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});

	test("treats any other stored value as wholeRule", async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| string
			| undefined;

		await config.update(configKey, "unexpected", globalTarget);

		try {
			assert.strictEqual(readTailwindApplyScope(), "wholeRule");
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});
});
