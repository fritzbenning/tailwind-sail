import type { SailEditorSnapshot } from "../types";

/**
 * Stable key for the editing surface behind the sidebar (same class string or `@apply` block).
 *
 * Used to drop a focused class highlight when the snapshot no longer refers to the same surface
 * (e.g. caret moved to another literal, another editor activated).
 *
 * @param snapshot - Current Sail snapshot.
 * @param documentUri - `TextDocument#uri.toString()` for the active editor.
 * @returns A fingerprint string, or `undefined` when there is no Tailwind context.
 *
 * @example getSnapshotFocusFingerprint(snap, "file:///x.tsx") => "file:///x.tsx:s:3:10:3:42"
 */
export function getSnapshotFocusFingerprint(
	snapshot: SailEditorSnapshot,
	documentUri: string,
): string | undefined {
	const ctx = snapshot.context;

	if (ctx.kind === "none") {
		return undefined;
	}

	if (ctx.kind === "string") {
		const r = ctx.range;
		return `${documentUri}:s:${r.start.line}:${r.start.character}:${r.end.line}:${r.end.character}`;
	}

	if (ctx.tokenDocSpans.length === 0) {
		return `${documentUri}:a:empty`;
	}

	const first = ctx.tokenDocSpans[0]!;
	const last = ctx.tokenDocSpans[ctx.tokenDocSpans.length - 1]!;
	
	return `${documentUri}:a:${first.docStart}:${last.docEnd}`;
}
