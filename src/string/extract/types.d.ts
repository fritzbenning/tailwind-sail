import type { ParsedTailwindClass } from "../../tailwind/parse/types";
import type { ExtractedString } from "../types";

/**
 * String literal at the caret plus tokenized utilities, aligned with `findTailwindApplyAtCursor` (`classes` / `isTailwind`).
 */
export interface TailwindStringAtCursorResult extends ExtractedString {
	readonly classes: readonly ParsedTailwindClass[];
	readonly isTailwind: boolean;
}
