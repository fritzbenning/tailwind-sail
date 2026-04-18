/** Tailwind “important” modifier on a utility (`!flex`, `!bg-red-500`). */
export function stripImportantPrefix(segment: string): string {
	return segment.replace(/^!+/, '');
}
