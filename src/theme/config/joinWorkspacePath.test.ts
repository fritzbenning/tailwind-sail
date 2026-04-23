import * as assert from "assert";
import * as vscode from "vscode";
import { joinWorkspacePath } from "./joinWorkspacePath";

suite("joinWorkspacePath", () => {
	test("joins nested segments", () => {
		const root = vscode.Uri.file("/proj");
		const uri = joinWorkspacePath(root, "src/app/globals.css");
		assert.strictEqual(
			uri.fsPath.replace(/\\/g, "/"),
			"/proj/src/app/globals.css",
		);
	});
});
