import * as assert from "assert";
import * as vscode from "vscode";
import { findTailwindStringAtCursor } from "./findTailwindStringAtCursor";

suite("findTailwindStringAtCursor", () => {
	test("matches extractStringAtOffset via document positions", async () => {
		const text = 'const x = "flex gap-2";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		const g = text.indexOf("g");
		const r = findTailwindStringAtCursor(doc, doc.positionAt(g));
		assert.ok(r);
		assert.strictEqual(r!.rawContent, "flex gap-2");
		assert.strictEqual(r!.classes.length, 2);
		assert.strictEqual(r!.classes[0]!.name, "flex");
		assert.strictEqual(r!.classes[1]!.name, "gap-2");
		assert.strictEqual(r!.isTailwind, true);
		const open = text.indexOf('"');
		const close = text.lastIndexOf('"') + 1;
		assert.ok(
			r!.range.isEqual(
				new vscode.Range(doc.positionAt(open), doc.positionAt(close)),
			),
		);
	});

	test("returns undefined when cursor outside any string", async () => {
		const text = 'const x = "a";';
		const doc = await vscode.workspace.openTextDocument({
			content: text,
			language: "typescript",
		});
		assert.strictEqual(
			findTailwindStringAtCursor(doc, doc.positionAt(0)),
			undefined,
		);
	});
});
