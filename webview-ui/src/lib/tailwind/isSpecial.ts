import { SPECIAL_COLOR } from "./constants";

/**
 * Whether the color tail starts with a built-in named color (`black`, `white`, `transparent`, …).
 *
 * @param rest — Color tail after the utility prefix; opacity `/` suffix is ignored for the check.
 * @returns `true` if the first segment is a special color keyword.
 *
 * @example
 * Input: `"black"` → Output: `true`
 *
 * @example
 * Input: `"white/50"` → Output: `true`
 *
 * @example
 * Input: `"red-500"` → Output: `false`
 */
export function isSpecial(rest: string): boolean {
	const head = (rest.split("/")[0] ?? "").split("-")[0] ?? "";
	return SPECIAL_COLOR.has(head);
}
