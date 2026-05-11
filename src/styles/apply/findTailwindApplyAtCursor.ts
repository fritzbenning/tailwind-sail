import * as vscode from "vscode";
import { findStyleContent } from "../content/findStyleContent";
import { parseStyleContent } from "../parse/parseStyleContent";
import { descendToInnermostRule } from "../rules/descendToInnermostRule";
import { getTailwindApplyResult } from "./getTailwindApplyResult";
import { listTailwindApplyAtRules } from "./listTailwindApplyAtRules";
import type {
	FindTailwindApplyAtCursorOptions,
	TailwindApplyResult,
} from "./types";

export interface ApplyExtractionResult extends TailwindApplyResult {
	/** Highlights each `@apply` directive spanning the stylesheet. */
	readonly applyHighlightRanges: readonly vscode.Range[];
}

/**
 * When the caret is inside a stylesheet rule that contains `@apply`, returns merged utilities and highlight ranges.
 *
 * @param document - Active editor document.
 * @param position - Primary caret.
 * @param options - Optional resolver overrides; **`scope`** `"atCaretDirective"` merges only the `@apply` containing the caret; **`wholeRule`** (default) merges every `@apply` in the enclosing block.
 * @returns Apply snapshot for the sidebar, or `undefined` outside supported stylesheet `@apply` contexts.
 *
 * @example findTailwindApplyAtCursor(doc, posInApplyParams)?.isTailwind === true
 * @example findTailwindApplyAtCursor(doc, posInTemplateOnly) => undefined
 */
export function findTailwindApplyAtCursor(
	document: vscode.TextDocument,
	position: vscode.Position,
	options?: FindTailwindApplyAtCursorOptions,
): ApplyExtractionResult | undefined {
	const documentOffset = document.offsetAt(position);
	const styleInfo = findStyleContent(document, documentOffset);

	if (!styleInfo?.styleContent) {
		return undefined;
	}

	const { styleContent, styleContentOffset, useScssSyntax } = styleInfo;

	const localOffset = documentOffset - styleContentOffset;

	if (localOffset < 0 || localOffset >= styleContent.length) {
		return undefined;
	}

	const root = parseStyleContent(styleContent, useScssSyntax);

	if (!root) {
		return undefined;
	}

	const rule = descendToInnermostRule(root, localOffset);

	if (!rule) {
		return undefined;
	}

	let applies = listTailwindApplyAtRules(rule);

	if (applies.length === 0) {
		return undefined;
	}

	const scope = options?.scope ?? "wholeRule";

	if (scope === "atCaretDirective") {
		applies = applies.filter((atRule) => {
			const start = atRule.source?.start?.offset;
			const end = atRule.source?.end?.offset;

			if (start === undefined || end === undefined) {
				return false;
			}

			return localOffset >= start && localOffset < end;
		});

		if (applies.length === 0) {
			return undefined;
		}
	}

	const result = getTailwindApplyResult(
		styleContent,
		styleContentOffset,
		applies,
	);

	const applyHighlightRanges = applies.flatMap((atRule): vscode.Range[] => {
		const start = atRule.source?.start?.offset;
		const end = atRule.source?.end?.offset;

		if (start === undefined || end === undefined) {
			return [];
		}

		const docStart = styleContentOffset + start;
		const docEnd = styleContentOffset + end;

		return [
			new vscode.Range(
				document.positionAt(docStart),
				document.positionAt(docEnd),
			),
		];
	});

	return {
		classes: result.classes,
		isTailwind: result.isTailwind,
		applyHighlightRanges,
		tokenDocSpans: result.tokenDocSpans,
		insertDocOffset: result.insertDocOffset,
	};
}
