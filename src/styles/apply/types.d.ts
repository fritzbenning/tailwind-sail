import type { ApplyTokenDocSpan } from "../../editor/types";
import type { ParsedTailwindClass } from "../../tailwind/parse/types";

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
