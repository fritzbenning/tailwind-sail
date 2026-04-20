import { scanTopLevelCode } from "../scan/scanTopLevelCode";
import type { ExtractedStringOffsets } from "../types";

/**
 * Returns the string literal (quoted or template static spans) containing `offset`, or `undefined`.
 *
 * @param text - Full source.
 * @param offset - Cursor index (0-based).
 * @returns Extracted offsets and content, or `undefined`.
 *
 * @example extractStringAtOffset('const x = "flex gap-2";', 15)?.rawContent => "flex gap-2"
 * @example extractStringAtOffset('const x = "flex";', 0) => undefined
 */
export function extractStringAtOffset(
	text: string,
	offset: number,
): ExtractedStringOffsets | undefined {
	if (offset < 0 || offset > text.length) {
		return undefined;
	}
	if (offset === text.length) {
		return undefined;
	}
	return scanTopLevelCode(text, offset);
}
