import { isCssFile } from "../check/isCssFile";
import type { SimpleDefinitionScope } from "../types";
import { getSelectorScope } from "./getSelectorScope";

/**
 * Finds the allowlisted enclosing scope (`:root`, `html`, `body`, `:host`) for a
 * `--name:` declaration, using backward brace walking. Only runs for `.css` inputs.
 *
 * Does not skip strings or comments inside rules (rare `--` in comments on the same
 * path); keep declarations in normal blocks for reliable results.
 *
 * @param filePath - File path; scope detection runs only for `.css` theme files ({@link isCssFile}).
 * @param fullText - Entire file contents.
 * @param nameStartIndex - Index in `fullText` of the first `-` of `--name`.
 * @returns A simple scope label, or `undefined` if nested, non-allowlisted, or ambiguous.
 *
 * @example
 * getVariableScope("a.css", ":root {\n  --x: 1;\n}", 9) // ":root"
 * getVariableScope("a.vue", ":root { --x: 1; }", 10) // undefined
 */
export function getVariableScope(
	filePath: string,
	fullText: string,
	nameStartIndex: number,
): SimpleDefinitionScope | undefined {
	if (!isCssFile(filePath)) {
		return undefined;
	}
	if (nameStartIndex <= 0 || nameStartIndex >= fullText.length) {
		return undefined;
	}

	let depth = 0;
	for (let i = nameStartIndex - 1; i >= 0; i--) {
		const c = fullText[i];
		if (c === "}") {
			depth++;
		} else if (c === "{") {
			depth--;
			if (depth < 0) {
				const lineStart = fullText.lastIndexOf("\n", i - 1) + 1;
				const line = fullText.slice(lineStart, i + 1);
				return getSelectorScope(line);
			}
		}
	}
	return undefined;
}
