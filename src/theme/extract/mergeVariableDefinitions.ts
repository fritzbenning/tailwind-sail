import type { CssVariableEntry, VariableDefinitionLocation } from "../types";
import type { VariableDefinitionRow } from "./extractVariableDefinitions";

export type VariableDefinitionRowWithUri = VariableDefinitionRow & {
	readonly uri: string;
};

/**
 * Merges definition rows from many files: last definition in scan order wins for
 * {@link CssVariableEntry.value}; all locations are kept in order.
 *
 * @param rows - Rows in workspace scan order (file order + line order).
 * @returns Deduplicated variable list for the webview.
 *
 * @example
 * mergeVariableDefinitions([
 *   { name: "--x", value: "1", line: 1, uri: "file:///a.css" },
 *   { name: "--x", value: "2", line: 2, uri: "file:///b.css" },
 * ]) // [{ name: "--x", value: "2", locations: [...] }] (sorted by name)
 */
export function mergeVariableDefinitions(
	rows: readonly VariableDefinitionRowWithUri[],
): CssVariableEntry[] {
	const map = new Map<
		string,
		{ value: string; locations: VariableDefinitionLocation[] }
	>();

	for (const row of rows) {
		const loc: VariableDefinitionLocation = {
			uri: row.uri,
			line: row.line,
			valueStartOffset: row.valueStartOffset,
			valueEndOffset: row.valueEndOffset,
			...(row.definitionScope !== undefined
				? { definitionScope: row.definitionScope }
				: {}),
		};
		const prev = map.get(row.name);
		if (!prev) {
			map.set(row.name, { value: row.value, locations: [loc] });
		} else {
			prev.locations.push(loc);
			prev.value = row.value;
		}
	}

	const out: CssVariableEntry[] = [];
	for (const [name, { value, locations }] of map) {
		out.push({ name, value, locations });
	}
	out.sort((a, b) => a.name.localeCompare(b.name));
	return out;
}
