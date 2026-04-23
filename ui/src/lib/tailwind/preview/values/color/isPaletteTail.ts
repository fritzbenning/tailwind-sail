import { firstSegment } from "../../helpers/firstSegment";
import { PALETTE, SPECIAL_COLOR } from "./constants";

/**
 * Whether the first segment of a utility tail is a palette or special color name.
 *
 * @param tail - Text after a prefix such as `border-` or `ring-`.
 * @returns `true` when the leading segment is a known color key.
 *
 * @example isPaletteTail("red-500") => true
 * @example isPaletteTail("2") => false
 */
export function isPaletteTail(tail: string): boolean {
	const first = firstSegment(tail);

	return PALETTE.has(first) || SPECIAL_COLOR.has(first);
}
