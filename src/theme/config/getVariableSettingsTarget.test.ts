import * as assert from "assert";
import * as vscode from "vscode";
import { getVariableSettingsTarget } from "./getVariableSettingsTarget";

suite("getVariableSettingsTarget", () => {
	test("uses Workspace target when a workspace folder is open", () => {
		assert.ok(
			(vscode.workspace.workspaceFolders?.length ?? 0) > 0,
			"vscode-test should open the repo as a workspace folder",
		);
		assert.strictEqual(
			getVariableSettingsTarget(),
			vscode.ConfigurationTarget.Workspace,
		);
	});
});
