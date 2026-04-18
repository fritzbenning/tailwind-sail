import { MEDIA_FEATURE_EXACT } from '../constants';

/**
 * `true` for media / `@media` feature style variants (`print:`, `motion-reduce:`, …).
 *
 * @example
 * // Input: `'print'`
 * // Output: `true`
 *
 * @example
 * // Input: `'md'` (breakpoint, not this bucket)
 * // Output: `false`
 */
export function isMediaFeatureSegment(segment: string): boolean {
	const l = segment.toLowerCase();
	if (MEDIA_FEATURE_EXACT.has(l)) {
		return true;
	}
	if (l.startsWith('any-pointer-') || l.startsWith('any-hover')) {
		return true;
	}
	return false;
}
