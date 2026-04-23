import { findVariableValueEndIndex } from "./findVariableValueEndIndex";

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
	const end = findVariableValueEndIndex(fullText, valueStartIndex);
	return fullText.slice(valueStartIndex, end).replace(/\s+/g, " ").trim();
}
