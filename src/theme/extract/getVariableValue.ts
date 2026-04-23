/**
 * Reads a custom property value starting at `valueStartIndex` until a top-level `;`
 * (not inside balanced `()`), so `@theme` / nested blocks can use multiline values.
 *
 * @param fullText - Entire file contents.
 * @param valueStartIndex - Index of the first character after `:` in `--x: …`.
 * @returns Value text with internal newlines collapsed to spaces, trimmed.
 *
 * @example
 * getVariableValue("--x: 1px;", 5) // "1px"
 */
export function getVariableValue(
	fullText: string,
	valueStartIndex: number,
): string {
	let i = valueStartIndex;
	const n = fullText.length;
	let depth = 0;
	while (i < n) {
		const c = fullText[i]!;
		if (c === "(") {
			depth++;
		} else if (c === ")") {
			if (depth > 0) {
				depth--;
			}
		} else if (c === ";" && depth === 0) {
			return fullText.slice(valueStartIndex, i).replace(/\s+/g, " ").trim();
		}
		i++;
	}
	return fullText.slice(valueStartIndex).replace(/\s+/g, " ").trim();
}
