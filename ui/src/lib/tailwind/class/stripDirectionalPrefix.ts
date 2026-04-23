/**
 * Removes border/ring/outline side or axis prefixes so the remainder is the color tail.
 *
 * @param rest - Token after the utility prefix (e.g. after `border-` in `border-t-red-500`).
 * @returns `rest` without a leading directional segment such as `t-` or `start-`.
 *
 * @example stripDirectionalPrefix("t-red-500") => "red-500"
 * @example stripDirectionalPrefix("red-500") => "red-500"
 */
export function stripDirectionalPrefix(rest: string): string {
	return rest.replace(/^(?:(?:x|y|t|b|l|r|s|e)|start|end)-/i, "");
}
