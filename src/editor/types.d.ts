import type * as vscode from "vscode";
import type { RawToDocSegment } from "../string/types";
import type { ParsedTailwindClass } from "../tailwind/parse/types";

/** Document half-open range for one `@apply` utility token. */
export interface ApplyTokenDocSpan {
	readonly docStart: number;
	readonly docEnd: number;
}

/**
 * Caret-resolved Tailwind editing surface: JS/TS string literal, merged `@apply` list, or none.
 */
export type SailSnapshotContext =
	| { kind: "none" }
	| {
			kind: "string";
			readonly rawContent: string;
			readonly range: vscode.Range;
			readonly rawToDocSegments: readonly RawToDocSegment[];
			readonly classes: readonly ParsedTailwindClass[];
			readonly isTailwind: boolean;
	  }
	| {
			kind: "apply";
			readonly classes: readonly ParsedTailwindClass[];
			readonly isTailwind: boolean;
			readonly applyHighlightRanges: readonly vscode.Range[];
			readonly tokenDocSpans: readonly ApplyTokenDocSpan[];
			readonly insertDocOffset: number | undefined;
	  };

export interface SailEditorSnapshot {
	readonly context: SailSnapshotContext;
}
