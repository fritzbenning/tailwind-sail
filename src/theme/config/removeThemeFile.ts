import { normalizeThemePath } from "./normalizeThemePath";

/**
 * Returns a new list with any item that normalizes equal to `entry` removed.
 *
 * @param list - Current `variables.sourceFiles` values.
 * @param entry - Workspace-relative path to remove.
 * @returns A new array; unchanged length means nothing matched.
 *
 * @example
 * removeThemeFile(["a.css", "b.css"], "./a.css") // ["b.css"]
 */
export function removeThemeFile(
	list: readonly string[],
	entry: string,
): string[] {
	const needle = normalizeThemePath(entry);
	if (needle.length === 0) {
		return [...list];
	}
	return list.filter((p) => normalizeThemePath(p) !== needle);
}
