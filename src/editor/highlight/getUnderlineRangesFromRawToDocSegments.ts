import * as vscode from "vscode";
import type { RawToDocSegment } from "../../string/types";

/**
 * Builds non-empty document ranges for underlining every mapped fragment of a logical class string.
 *
 * @param document - Editor document whose offsets match `segments`.
 * @param segments - `rawToDocSegments` from the string snapshot (maps `rawContent` slices to file offsets).
 * @returns Closed ranges with positive length; zero-length spans are omitted.
 *
 * @example getUnderlineRangesFromRawToDocSegments(doc, [{ rawStart: 0, rawEnd: 2, docStart: 1, docEnd: 3 }]) => range over doc offsets 1–2
 */
export function getUnderlineRangesFromRawToDocSegments(
	document: vscode.TextDocument,
	segments: readonly RawToDocSegment[],
): vscode.Range[] {
	const ranges: vscode.Range[] = [];

	for (const seg of segments) {
		const start = document.positionAt(seg.docStart);
		const end = document.positionAt(seg.docEnd);
		if (!start.isEqual(end)) {
			ranges.push(new vscode.Range(start, end));
		}
	}

	return ranges;
}
