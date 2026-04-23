import { normalizeThemePath } from "./normalizeThemePath";

/**
 * Returns a new list with `entry` appended when it is not already present
 * (comparison uses {@link normalizeThemePath} on each item).
 *
 * @param list - Current `variables.sourceFiles` values.
 * @param entry - Workspace-relative path to add.
 * @returns A new array; unchanged length means the entry was already listed.
 *
 * @example
 * addThemeFile(["a.css"], "b.css") // ["a.css", "b.css"]
 */
export function addThemeFile(list: readonly string[], entry: string): string[] {
	const normalizedEntry = normalizeThemePath(entry);
	if (normalizedEntry.length === 0) {
		return [...list];
	}
	const normalizedExisting = new Set(
		list.map((p) => normalizeThemePath(p)).filter(Boolean),
	);
	if (normalizedExisting.has(normalizedEntry)) {
		return [...list];
	}
	return [...list, normalizedEntry];
}
