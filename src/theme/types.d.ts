/**
 * Types for workspace CSS custom property scanning and webview payloads.
 *
 * @example
 * ```ts
 * const entry: CssVariableEntry = {
 *   name: "--brand",
 *   value: "#f00",
 *   locations: [{ uri: "file:///…/globals.css", line: 2, definitionScope: ":root" }],
 * };
 * ```
 */

export type SimpleDefinitionScope = ":root" | "html" | "body" | ":host";

export type VariableDefinitionLocation = {
	/** `file://` URI string. */
	readonly uri: string;
	/** 1-based line number (VS Code convention). */
	readonly line: number;
	/** Present only when {@link getVariableScope} could resolve a simple selector. */
	readonly definitionScope?: SimpleDefinitionScope;
};

/**
 * One logical custom property after merging duplicate definitions (last value wins for injection).
 */
export type CssVariableEntry = {
	/** Canonical name including leading `--`, e.g. `--brand`. */
	readonly name: string;
	/** Trimmed value string used for `--workspace-*` injection (last definition in scan order). */
	readonly value: string;
	readonly locations: readonly VariableDefinitionLocation[];
};
