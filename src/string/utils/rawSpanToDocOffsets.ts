import type { RawToDocSegment } from '../types';

/**
 * Maps a half-open span `[rawStart, rawEnd)` in logical `rawContent` to document character offsets
 * using `rawToDocSegments` from an extraction. Returns `undefined` if the span crosses segment
 * boundaries or is out of range (so it cannot be replaced as one document range).
 *
 * @param segments - `rawToDocSegments` from {@link ExtractedString} / {@link ExtractedStringOffsets}
 * @param rawStart - Start offset in `rawContent` (inclusive)
 * @param rawEnd - End offset in `rawContent` (exclusive)
 * @returns Document offsets `{ docStart, docEnd }`, or `undefined` if unmapped
 *
 * @example
 * // Single-segment quoted string: `rawContent` === 'flex gap-2', one segment covers all of it
 * const segments = [{ rawStart: 0, rawEnd: 11, docStart: 11, docEnd: 22 }];
 * rawSpanToDocOffsets(segments, 0, 4);
 * // → { docStart: 11, docEnd: 15 }  // substring 'flex' in the document
 *
 * @example
 * // Span crosses two template static pieces → cannot map to one range
 * const segments = [
 *   { rawStart: 0, rawEnd: 7, docStart: 11, docEnd: 18 },
 *   { rawStart: 7, rawEnd: 12, docStart: 22, docEnd: 27 },
 * ];
 * rawSpanToDocOffsets(segments, 5, 9);
 * // → undefined
 *
 * @example
 * rawSpanToDocOffsets([], 0, 1);
 * // → undefined
 */
export function rawSpanToDocOffsets(
	segments: readonly RawToDocSegment[],
	rawStart: number,
	rawEnd: number,
): { docStart: number; docEnd: number } | undefined {
	if (rawStart < 0 || rawEnd < rawStart) {
		return undefined;
	}
	const seg = segments.find((s) => rawStart >= s.rawStart && rawEnd <= s.rawEnd);
	if (!seg) {
		return undefined;
	}
	return {
		docStart: seg.docStart + (rawStart - seg.rawStart),
		docEnd: seg.docStart + (rawEnd - seg.rawStart),
	};
}
