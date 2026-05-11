import type { ApplyTokenDocSpan } from "../../editor/types";
import type { ParsedTailwindClass } from "../../tailwind/parse/types";

/**
 * Whether stylesheet `@apply` resolution merges the whole rule body or only the directive that contains the caret.
 */
export type TailwindApplyAtCaretScope = "wholeRule" | "atCaretDirective";

/**
 * Optional overrides for resolving `@apply` at the primary caret.
 */
export interface FindTailwindApplyAtCursorOptions {
	/**
	 * When `"atCaretDirective"`, only the `@apply` whose parsed source range contains the caret is merged.
	 * When `"wholeRule"` or omitted, every `@apply` in the innermost enclosing rule is merged.
	 */
	readonly scope?: TailwindApplyAtCaretScope;
}

/**
 * Merged `@apply` utilities in one rule: class tokens, applicability flag (`isTailwind` when the rule lists `@apply`), per-token document spans, and insertion point.
 */
export interface TailwindApplyResult {
	readonly classes: readonly ParsedTailwindClass[];
	readonly isTailwind: boolean;
	readonly tokenDocSpans: readonly ApplyTokenDocSpan[];
	/** Exclusive end offset of trimmed params in the last `@apply`; insert point for new utilities. */
	readonly insertDocOffset: number | undefined;
}
