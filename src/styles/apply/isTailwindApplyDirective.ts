/**
 * Whether a whitespace token is the Tailwind `@apply` at-keyword (not a utility).
 *
 * @param name - Token from `@apply` parameter text.
 * @returns `true` when the token is only `@apply`, case-insensitive.
 *
 * @example isTailwindApplyDirective("@apply") => true
 * @example isTailwindApplyDirective("flex") => false
 */
export function isTailwindApplyDirective(name: string): boolean {
	return /^@apply$/i.test(name.trim());
}
