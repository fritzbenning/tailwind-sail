import * as assert from "assert";
import * as vscode from "vscode";
import type { RawToDocSegment } from "../../string/types";
import { getUnderlineRangesFromRawToDocSegments } from "./getUnderlineRangesFromRawToDocSegments";

suite("getUnderlineRangesFromRawToDocSegments", () => {
	test("maps each non-empty segment to a range", async () => {
		const content = 'const x = "ab cd";';
		const doc = await vscode.workspace.openTextDocument({
			content,
			language: "typescript",
		});
		const quote = content.indexOf('"');
		const innerStart = quote + 1;
		const segments: RawToDocSegment[] = [
			{
				rawStart: 0,
				rawEnd: 2,
				docStart: innerStart,
				docEnd: innerStart + 2,
			},
			{
				rawStart: 3,
				rawEnd: 5,
				docStart: innerStart + 3,
				docEnd: innerStart + 5,
			},
		];
		const ranges = getUnderlineRangesFromRawToDocSegments(doc, segments);
		assert.strictEqual(ranges.length, 2);
		assert.strictEqual(doc.getText(ranges[0]!), "ab");
		assert.strictEqual(doc.getText(ranges[1]!), "cd");
	});

	test("skips zero-length segments", async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: "hello",
			language: "plaintext",
		});
		const segments: RawToDocSegment[] = [
			{ rawStart: 0, rawEnd: 1, docStart: 1, docEnd: 1 },
			{ rawStart: 1, rawEnd: 2, docStart: 1, docEnd: 3 },
		];
		const ranges = getUnderlineRangesFromRawToDocSegments(doc, segments);
		assert.strictEqual(ranges.length, 1);
		assert.strictEqual(doc.getText(ranges[0]!), "el");
	});
});
