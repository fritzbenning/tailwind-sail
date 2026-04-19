/**
 * Strip variant prefixes (`sm:`, `hover:`, …) and a leading important `!` from a class string.
 *
 * @param className — Full Tailwind class as written in markup.
 * @returns The last variant segment (the bare utility).
 *
 * @example
 * Input: `"md:hover:!text-red-500"` → Output: `"text-red-500"`
 *
 * @example
 * Input: `"  bg-blue-500  "` → Output: `"bg-blue-500"`
 */
export function getBaseUtility(className: string): string {
	let s = className.trim();
	if (s.startsWith("!")) {
		s = s.slice(1);
	}
	const parts = s.split(":");
	return parts[parts.length - 1] ?? s;
}
