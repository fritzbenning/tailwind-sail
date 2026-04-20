import type { RawToDocSegment } from "../types";

/**
 * Maps a `[rawStart, rawEnd)` span in merged `rawContent` to document offsets via `rawToDocSegments`, or `undefined` if not contained in one segment.
 *
 * @param segments - Mapping from logical raw indices to document positions.
 * @param rawStart - Inclusive start in `rawContent`.
 * @param rawEnd - Exclusive end in `rawContent`.
 * @returns Document half-open range, or `undefined` if unmapped.
 *
 * @example rawSpanToDocOffsets([{ rawStart: 0, rawEnd: 11, docStart: 11, docEnd: 22 }], 0, 4) => { docStart: 11, docEnd: 15 }
 *
 * @example rawSpanToDocOffsets([], 0, 1) => undefined
 */
export function rawSpanToDocOffsets(
	segments: readonly RawToDocSegment[],
	rawStart: number,
	rawEnd: number,
): { docStart: number; docEnd: number } | undefined {
	if (rawStart < 0 || rawEnd < rawStart) {
		return undefined;
	}
	const seg = segments.find(
		(s) => rawStart >= s.rawStart && rawEnd <= s.rawEnd,
	);
	if (!seg) {
		return undefined;
	}
	return {
		docStart: seg.docStart + (rawStart - seg.rawStart),
		docEnd: seg.docStart + (rawEnd - seg.rawStart),
	};
}
