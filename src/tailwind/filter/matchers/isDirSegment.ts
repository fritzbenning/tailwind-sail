/**
 * Whether `segment` is `ltr` or `rtl`.
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for `ltr` or `rtl`.
 *
 * @example isDirSegment("rtl") => true
 */
export function isDirSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	return l === "ltr" || l === "rtl";
}
