import * as assert from "assert";
import * as vscode from "vscode";
import type { SailEditorSnapshot } from "../types";
import { getSnapshotFocusFingerprint } from "./getSnapshotFocusFingerprint";
import { shouldInvalidateFocusedClassContext } from "./shouldInvalidateFocusedClassContext";

suite("shouldInvalidateFocusedClassContext", () => {
	const uri = "file:///src/App.tsx";

	test("returns false when fingerprint still matches", () => {
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
		const fp = getSnapshotFocusFingerprint(snapshot, uri);
		assert.ok(fp);
		assert.strictEqual(
			shouldInvalidateFocusedClassContext(snapshot, uri, fp),
			false,
		);
	});

	test("returns true when context becomes none", () => {
		const prior: SailEditorSnapshot = {
			context: {
				kind: "string",
				rawContent: "p-4",
				range: new vscode.Range(0, 0, 0, 5),
				rawToDocSegments: [],
				classes: [],
				isTailwind: true,
			},
		};
		const fp = getSnapshotFocusFingerprint(prior, uri);
		assert.ok(fp);
		assert.strictEqual(
			shouldInvalidateFocusedClassContext(
				{ context: { kind: "none" } },
				uri,
				fp,
			),
			true,
		);
	});

	test("returns true when string literal range moves", () => {
		const a: SailEditorSnapshot = {
			context: {
				kind: "string",
				rawContent: "p-4",
				range: new vscode.Range(1, 0, 1, 5),
				rawToDocSegments: [],
				classes: [],
				isTailwind: true,
			},
		};
		const b: SailEditorSnapshot = {
			context: {
				kind: "string",
				rawContent: "p-4",
				range: new vscode.Range(2, 0, 2, 5),
				rawToDocSegments: [],
				classes: [],
				isTailwind: true,
			},
		};
		const fp = getSnapshotFocusFingerprint(a, uri);
		assert.ok(fp);
		assert.strictEqual(shouldInvalidateFocusedClassContext(b, uri, fp), true);
	});
});
