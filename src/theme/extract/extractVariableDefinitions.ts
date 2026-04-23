import {
	extractVariableDefinitionFromLine,
	type VariableDefinitionRow,
} from "./extractVariableDefinitionFromLine";

export type { VariableDefinitionRow } from "./extractVariableDefinitionFromLine";

/**
 * Finds `--name: value` declarations in source text (values may span lines until a top-level `;`).
 *
 * @param filePath - Path for scope detection (extension check).
 * @param text - Full file text.
 * @returns One row per definition match, in source order.
 *
 * @example
 * extractVariableDefinitions("/p/t.css", ":root { --a: 1; }")
 * // [{ name: "--a", value: "1", line: 1, definitionScope: ":root" }, ...]
 */
export function extractVariableDefinitions(
	filePath: string,
	text: string,
): VariableDefinitionRow[] {
	const rows: VariableDefinitionRow[] = [];
	const lines = text.split(/\r?\n/);
	let offset = 0;
	for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
		const line = lines[lineIdx]!;
		const lineStart = offset;
		offset += line.length + 1;

		const defs = extractVariableDefinitionFromLine(
			filePath,
			text,
			line,
			lineStart,
			lineIdx + 1,
		);
		rows.push(...defs);
	}
	return rows;
}
