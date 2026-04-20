import { MEDIA_FEATURE_EXACT } from "../constants";

/**
 * Whether `segment` is a media / `@media` feature variant key (not breakpoints).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` for known media-feature keys.
 *
 * @example isMediaFeatureSegment("print") => true
 *
 * @example isMediaFeatureSegment("md") => false
 */
export function isMediaFeatureSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	if (MEDIA_FEATURE_EXACT.has(l)) {
		return true;
	}
	if (l.startsWith("any-pointer-") || l.startsWith("any-hover")) {
		return true;
	}
	return false;
}
