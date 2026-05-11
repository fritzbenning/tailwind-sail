import * as assert from "assert";
import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "../../string/extract/findTailwindStringAtCursor";
import type { SailEditorSnapshot } from "../types";
import { getFocusClassRange } from "./getFocusClassRange";

suite("getFocusClassRange", () => {
	test("maps string literal token index to document range", async () => {
		const text = 'const x = "p-4 m-2";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const mPos = doc.positionAt(text.indexOf("m-2"));
		const stringResult = findTailwindStringAtCursor(doc, mPos);
		assert.ok(stringResult);
		const snapshot: SailEditorSnapshot = {
			context: { kind: "string", ...stringResult },
		};
		const range = getFocusClassRange(snapshot, 1, doc);
		assert.ok(range);
		assert.strictEqual(doc.getText(range), "m-2");
	});

	test("returns undefined when token index is out of range", async () => {
		const text = 'const x = "p-4";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const pos = doc.positionAt(text.indexOf("p-4"));
		const stringResult = findTailwindStringAtCursor(doc, pos);
		assert.ok(stringResult);
		const snapshot: SailEditorSnapshot = {
			context: { kind: "string", ...stringResult },
		};
		assert.strictEqual(getFocusClassRange(snapshot, 5, doc), undefined);
	});
});
