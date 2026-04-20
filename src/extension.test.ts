import * as assert from "assert";
import * as vscode from "vscode";

suite("Tailwind Sail extension (smoke)", () => {
	test("vscode API is available in test host", () => {
		assert.ok(vscode);
	});
});
