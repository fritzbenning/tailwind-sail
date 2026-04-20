import { stripImportantPrefix } from "./stripImportantPrefix";

/**
 * Trims, lowercases, strips `!`, and removes leading `-`/`_` for stable filter matching.
 *
 * @param utility - Raw class token or utility segment.
 * @returns Normalized string for matching and deduplication.
 *
 * @example normalizeClass("  !-MT-4  ") => "mt-4"
 *
 * @example normalizeClass("bg-red-500") => "bg-red-500"
 */
export function normalizeClass(utility: string): string {
	const u = stripImportantPrefix(utility.trim()).toLowerCase();
	return u.replace(/^[-_]+/, "");
}
