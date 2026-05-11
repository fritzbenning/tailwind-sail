import * as assert from "assert";
import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { getSnapshotFocusFingerprint } from "./getSnapshotFocusFingerprint";

suite("getSnapshotFocusFingerprint", () => {
	const uri = "file:///src/App.tsx";

	test("returns undefined for none context", () => {
		const snapshot: SailEditorSnapshot = { context: { kind: "none" } };
		assert.strictEqual(getSnapshotFocusFingerprint(snapshot, uri), undefined);
	});

	test("string context includes literal range coordinates", () => {
		const snapshot: SailEditorSnapshot = {
			context: {
				kind: "string",
				rawContent: "p-4",
				range: new vscode.Range(2, 10, 2, 20),
				rawToDocSegments: [],
				classes: [],
				isTailwind: true,
			},
		};
		assert.strictEqual(
			getSnapshotFocusFingerprint(snapshot, uri),
			`${uri}:s:2:10:2:20`,
		);
	});

	test("apply context uses first and last token doc ends", () => {
		const snapshot: SailEditorSnapshot = {
			context: {
				kind: "apply",
				classes: [],
				isTailwind: true,
				applyHighlightRanges: [],
				tokenDocSpans: [
					{ docStart: 10, docEnd: 14 },
					{ docStart: 15, docEnd: 22 },
				],
				insertDocOffset: undefined,
			},
		};
		assert.strictEqual(
			getSnapshotFocusFingerprint(snapshot, uri),
			`${uri}:a:10:22`,
		);
	});

	test("apply context with no spans uses empty sentinel", () => {
		const snapshot: SailEditorSnapshot = {
			context: {
				kind: "apply",
				classes: [],
				isTailwind: true,
				applyHighlightRanges: [],
				tokenDocSpans: [],
				insertDocOffset: undefined,
			},
		};
		assert.strictEqual(
			getSnapshotFocusFingerprint(snapshot, uri),
			`${uri}:a:empty`,
		);
	});
});
