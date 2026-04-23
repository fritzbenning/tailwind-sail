/**
 * Extracts the selector segment before `{` on a line (first `{` wins).
 *
 * @param line - A single line of CSS, e.g. `  :root {`.
 * @returns Trimmed selector text before `{`, or `undefined` if none.
 *
 * @example
 * findSelector("  :root {") // ":root"
 */
export function findSelector(line: string): string | undefined {
	const trimmed = line.trimStart();
	const brace = trimmed.indexOf("{");
	if (brace === -1) {
		return undefined;
	}
	const selector = trimmed.slice(0, brace).trim();
	return selector === "" ? undefined : selector;
}
