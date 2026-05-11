import * as assert from "assert";
import * as vscode from "vscode";
import { persistApplyAtCaretScope } from "./persistApplyAtCaretScope";
import { readTailwindApplyScope } from "./readTailwindApplyScope";

suite("persistApplyAtCaretScope", () => {
	const configKey = "applyAtCaretScope";
	const globalTarget = vscode.ConfigurationTarget.Global;

	async function restoreGlobalPrev(
		config: vscode.WorkspaceConfiguration,
		prevGlobal: string | undefined,
	) {
		await config.update(configKey, prevGlobal ?? undefined, globalTarget);
	}

	test('writes `"atCaretDirective"` for `readTailwindApplyScope()`', async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| string
			| undefined;

		try {
			await persistApplyAtCaretScope("atCaretDirective");
			assert.strictEqual(readTailwindApplyScope(), "atCaretDirective");
			assert.strictEqual(
				config.inspect(configKey)?.globalValue,
				"atCaretDirective",
			);
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});

	test('writes `"wholeRule"` for `readTailwindApplyScope()`', async () => {
		const config = vscode.workspace.getConfiguration("tailwind-sail");
		const prevGlobal = config.inspect(configKey)?.globalValue as
			| string
			| undefined;

		try {
			await persistApplyAtCaretScope("wholeRule");
			assert.strictEqual(readTailwindApplyScope(), "wholeRule");
			assert.strictEqual(config.inspect(configKey)?.globalValue, "wholeRule");
		} finally {
			await restoreGlobalPrev(config, prevGlobal);
		}
	});
});
