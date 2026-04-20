/**
 * Strip variant prefixes (`sm:`, `hover:`, …) and a leading important `!` from a class string.
 *
 * @param className - Full Tailwind class as written in markup.
 * @returns The last segment after `:` splitting (the bare utility).
 *
 * @example getBaseUtility("md:hover:!text-red-500") => "text-red-500"
 *
 * @example getBaseUtility("  bg-blue-500  ") => "bg-blue-500"
 */
export function getBaseUtility(className: string): string {
	let s = className.trim();
	if (s.startsWith("!")) {
		s = s.slice(1);
	}
	const parts = s.split(":");
	return parts[parts.length - 1] ?? s;
}
