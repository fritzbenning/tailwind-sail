import { SPECIAL_COLOR } from "./constants";

/**
 * Whether the color tail starts with a built-in named color (`black`, `white`, `transparent`, …).
 *
 * @param rest — Color tail after the utility prefix; opacity `/` suffix is ignored for the check.
 * @returns `true` if the first segment is a special color keyword.
 *
 * @example isSpecial("black") => true
 *
 * @example isSpecial("white/50") => true
 * @example isSpecial("red-500") => false
 */
export function isSpecial(rest: string): boolean {
	const head = (rest.split("/")[0] ?? "").split("-")[0] ?? "";
	return SPECIAL_COLOR.has(head);
}
