/**
 * Escapes a string so it can be embedded in a `RegExp` source without
 * metacharacters being interpreted (e.g. when matching a CSS variable name).
 *
 * @param text - Raw string to treat as a literal in the resulting pattern.
 * @returns The same string with regex metacharacters backslash-escaped.
 *
 * @example escapeRegExp("var(--background)") => "var\\(--background\\)"
 */
export function escapeRegExp(text: string): string {
	return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
