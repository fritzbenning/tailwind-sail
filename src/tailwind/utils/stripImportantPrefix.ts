/**
 * Strips a leading Tailwind important prefix (`!`) from a utility segment.
 *
 * @param segment - Utility text, possibly with leading `!`.
 * @returns Text without leading `!` characters.
 *
 * @example stripImportantPrefix("!bg-red-500") => "bg-red-500"
 */
export function stripImportantPrefix(segment: string): string {
	return segment.replace(/^!+/, "");
}
