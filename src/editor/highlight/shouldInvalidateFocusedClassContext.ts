import type { SailEditorSnapshot } from "../types";
import { getSnapshotFocusFingerprint } from "./getSnapshotFocusFingerprint";

/**
 * Whether sidebar row focus for a class token is stale after a new snapshot.
 *
 * @param snapshot - Latest caret-resolved Sail snapshot.
 * @param documentUri - `TextDocument#uri.toString()` for the active editor.
 * @param focusFingerprintWhenSet - Fingerprint from {@link getSnapshotFocusFingerprint} when focus was set.
 * @returns `true` when the editing surface changed and row focus should clear.
 *
 * @example shouldInvalidateFocusedClassContext({ context: { kind: "none" } }, "file:///a.tsx", "file:///a.tsx:s:0:0:0:5") => true
 */
export function shouldInvalidateFocusedClassContext(
	snapshot: SailEditorSnapshot,
	documentUri: string,
	focusFingerprintWhenSet: string,
): boolean {
	return (
		getSnapshotFocusFingerprint(snapshot, documentUri) !==
		focusFingerprintWhenSet
	);
}
