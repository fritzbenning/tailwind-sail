import * as assert from "assert";

/**
 * Integration-style tests that need the VS Code API live here.
 * Pure logic is covered in `extractStringAtOffset.test.ts`.
 */
import * as vscode from "vscode";

suite("Sail extension (smoke)", () => {
	test("vscode API is available in test host", () => {
		assert.ok(vscode);
	});
});
