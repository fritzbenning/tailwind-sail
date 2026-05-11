import * as vscode from "vscode";
import { parseTailwindClasses } from "../../tailwind/parse/parseTailwindClasses";
import { extractStringAtOffset } from "./extractStringAtOffset";
import type { TailwindStringAtCursorResult } from "./types";

/**
 * Lexes the document from the top (comments skipped; template static spans and nested strings in `${}` supported), parses the literal text like `@apply` parameters, and returns ranges plus tokens, or `undefined`. Heuristic lexer, not a full JS/TS parse.
 *
 * @param document - Active editor document.
 * @param position - Primary selection position.
 * @returns Extracted string with VS Code `Range`, parsed `classes`, `isTailwind`, or `undefined`.
 *
 * @example findTailwindStringAtCursor(doc, pos)?.classes.length => token count inside literal at `pos`
 */
export function findTailwindStringAtCursor(
	document: vscode.TextDocument,
	position: vscode.Position,
): TailwindStringAtCursorResult | undefined {
	const offset = document.offsetAt(position);
	const text = document.getText();
	const inner = extractStringAtOffset(text, offset);

	if (!inner) {
		return undefined;
	}

	const rawContent = inner.rawContent;
	const range = new vscode.Range(
		document.positionAt(inner.startOffset),
		document.positionAt(inner.endOffset),
	);
	const rawToDocSegments = inner.rawToDocSegments;
	const { classes, isTailwind } = parseTailwindClasses(rawContent);

	return {
		rawContent,
		range,
		rawToDocSegments,
		classes,
		isTailwind,
	};
}
