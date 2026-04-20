/**
 * Normalizes a variant chip label to a filter key (trim, drop trailing `:`, lowercase).
 *
 * @param selection - Chip label or segment from the UI.
 * @returns Lowercase key without trailing colon.
 *
 * @example getChipKey("hover:") => "hover"
 */
export function getChipKey(selection: string): string {
	const t = selection.trim();
	return (t.endsWith(":") ? t.slice(0, -1) : t).toLowerCase();
}
