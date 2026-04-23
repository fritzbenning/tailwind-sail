import { getVariableScope } from "../scope/getVariableScope";
import type { SimpleDefinitionScope } from "../types";
import { getVariableValue } from "./getVariableValue";

const MAX_VALUE_LENGTH = 200;

export type VariableDefinitionRow = {
	readonly name: string;
	readonly value: string;
	readonly line: number;
	readonly definitionScope?: SimpleDefinitionScope;
};

/**
 * Scans a single line of a stylesheet for `--name: value` custom properties, resolving
 * each value in `fullText` from the `:` so values can continue on following lines until
 * a top-level semicolon. Reports the 1-based source line the declaration starts on, and
 * the nearest simple definition scope (e.g. `:root`, `@theme`) for the first character
 * of the variable name.
 *
 * @param filePath - Path of the file (used to decide scope detection rules, e.g. CSS vs SCSS).
 * @param fullText - Entire file text; used for multiline values and scope detection, not just `line`.
 * @param line - The single line to scan.
 * @param lineStartOffset - Index in `fullText` where `line` begins (0 for a file that is one line, or
 *   cumulative with `\\n` for multi-line `fullText`).
 * @param oneBasedLine - 1-based line number of `line` in the file.
 * @returns All variable definitions that start on this line, in left-to-right order.
 *
 * @example
 * extractVariableDefinitionFromLine("/a.css", "--a: 1px;", "--a: 1px;", 0, 1)
 * // [{ name: "--a", value: "1px", line: 1 }]
 */
export function extractVariableDefinitionFromLine(
	filePath: string,
	fullText: string,
	line: string,
	lineStartOffset: number,
	oneBasedLine: number,
): VariableDefinitionRow[] {
	const rows: VariableDefinitionRow[] = [];
	const re = /--([a-zA-Z0-9_-]+)\s*:\s*/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(line)) !== null) {
		const name = `--${m[1]}`;
		const nameStartInLine = m.index;
		const valueStartInLine = m.index + m[0].length;
		const valueAbsStart = lineStartOffset + valueStartInLine;
		let value = getVariableValue(fullText, valueAbsStart);
		if (value.length > MAX_VALUE_LENGTH) {
			value = `${value.slice(0, MAX_VALUE_LENGTH)}…`;
		}
		const nameStartIndex = lineStartOffset + nameStartInLine;
		const scope = getVariableScope(filePath, fullText, nameStartIndex);
		rows.push({
			name,
			value,
			line: oneBasedLine,
			...(scope !== undefined ? { definitionScope: scope } : {}),
		});
	}
	return rows;
}
