/**
 * Splits a Tailwind class token into stacked variant prefixes (each ending with `:`) and the
 * remaining utility. Colons inside `[…]` (arbitrary variants / values) are not treated as
 * variant separators, so URLs and similar stay intact.
 */
export function splitTailwindClassVariants(fullClass: string): {
	modifiers: string[];
	utility: string;
} {
	const trimmed = fullClass.trim();
	if (!trimmed) {
		return { modifiers: [], utility: "" };
	}
	const modifiers: string[] = [];
	let start = 0;
	let i = 0;
	let bracketDepth = 0;

	while (i < trimmed.length) {
		const c = trimmed[i];
		if (c === "[") {
			bracketDepth++;
		} else if (c === "]") {
			bracketDepth = Math.max(0, bracketDepth - 1);
		} else if (c === ":" && bracketDepth === 0) {
			const segment = trimmed.slice(start, i);
			if (segment.length === 0) {
				i++;
				continue;
			}
			modifiers.push(segment + ":");
			start = i + 1;
		}
		i++;
	}
	const utility = trimmed.slice(start);
	return { modifiers, utility };
}
