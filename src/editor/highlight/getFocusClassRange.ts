import * as vscode from "vscode";
import { rawSpanToDocOffsets } from "../../string/utils/rawSpanToDocOffsets";
import type { SailEditorSnapshot } from "../types";

/**
 * Resolves the document range for one parsed class token in the current Sail snapshot.
 *
 * @param snapshot - Caret-resolved Tailwind context (string literal or `@apply`).
 * @param tokenIndex - Index into `snapshot.context.classes`.
 * @param document - Editor document whose offsets match the snapshot.
 * @returns A closed range covering the token text, or `undefined` when out of range or unmapped.
 *
 * @example getFocusClassRange(stringSnapshot, 0, doc) => range over first utility in the literal
 */
export function getFocusClassRange(
	snapshot: SailEditorSnapshot,
	tokenIndex: number,
	document: vscode.TextDocument,
): vscode.Range | undefined {
	const ctx = snapshot.context;

	if (ctx.kind === "none") {
		return;
	}

	if (ctx.kind === "apply") {
		const span = ctx.tokenDocSpans[tokenIndex];
		if (!span) {
			return undefined;
		}
		return new vscode.Range(
			document.positionAt(span.docStart),
			document.positionAt(span.docEnd),
		);
	}

	const c = ctx.classes[tokenIndex];

	if (!c) {
		return;
	}

	const span = rawSpanToDocOffsets(
		ctx.rawToDocSegments,
		c.startInRaw,
		c.endInRaw,
	);

	if (!span) {
		return;
	}

	return new vscode.Range(
		document.positionAt(span.docStart),
		document.positionAt(span.docEnd),
	);
}
