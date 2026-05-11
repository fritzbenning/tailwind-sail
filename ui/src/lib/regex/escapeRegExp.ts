/**
 * Escapes a string for safe use inside a `RegExp` source.
 *
 * @param value - Literal substring to match.
 * @returns Escaped pattern fragment.
 *
 * @example escapeRegExp("a+b") => "a\\+b"
 */
export function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
