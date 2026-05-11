import type { SailEditorSnapshot } from "../../editor/types";
import type { ParsedTailwindClass } from "../../tailwind/parse/types";

/**
 * Reads modal gating fields from a snapshot: whether the editor resolved to
 * supported context, whether tokens look like Tailwind, and class list.
 *
 * @param snapshot - Current editor snapshot (`context.kind` is `string`, `apply`, or `none`).
 * @returns `hasContext` when `context.kind` is `string` or `apply`;
 *   `containsTailwind` mirrors `isTailwind` in those variants; `classes` may be empty.
 *
 * @example getSnapshotModalContext({ context: { kind: "none" } }) => { hasContext: false, containsTailwind: false, classes: [] }
 * @example getSnapshotModalContext({ context: { kind: "apply", classes: [], isTailwind: true, applyHighlightRanges: [], tokenDocSpans: [], insertDocOffset: undefined } }) => { hasContext: true, containsTailwind: true, classes: [] }
 */
export function getSnapshotModalContext(snapshot: SailEditorSnapshot): {
	hasContext: boolean;
	containsTailwind: boolean;
	classes: readonly ParsedTailwindClass[];
} {
	const { context } = snapshot;

	if (context.kind === "none") {
		return {
			hasContext: false,
			containsTailwind: false,
			classes: [],
		};
	}

	return {
		hasContext: true,
		containsTailwind: context.isTailwind,
		classes: context.classes,
	};
}
