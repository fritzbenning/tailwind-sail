/**
 * Strips variant prefixes and a leading important `!`, returning the bare utility segment.
 *
 * @param className - Full Tailwind class as written in markup.
 * @returns The last `:`-delimited segment after trimming (the base utility).
 *
 * @example getClassName("md:hover:!text-red-500") => "text-red-500"
 * @example getClassName("  bg-blue-500  ") => "bg-blue-500"
 */
export function getClassName(className: string): string {
	let s = className.trim();

	if (s.startsWith("!")) {
		s = s.slice(1);
	}

	const parts = s.split(":");

	return parts[parts.length - 1] ?? s;
}
