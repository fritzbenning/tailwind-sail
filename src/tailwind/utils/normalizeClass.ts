import { stripImportantPrefix } from './stripImportantPrefix';

/**
 * Canonical form for filter matching: trim, strip `!`, lowercase, drop leading `-`/`_` (negative
 * spacing etc.) so category prefix lists stay simple. Call once where utilities enter the filter
 * pipeline (same idea as splitting variants before variant dimensions).
 */
export function normalizeClass(utility: string): string {
	const u = stripImportantPrefix(utility.trim()).toLowerCase();
	return u.replace(/^[-_]+/, '');
}
