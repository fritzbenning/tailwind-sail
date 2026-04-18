/**
 * Orders theme chips: `light`, then `dark`, then other keys sorted.
 *
 * @example
 * // Input: `['dark', 'light', 'theme-midnight']`
 * // Output: `['light', 'dark', 'theme-midnight']`
 */
export function sortThemeChipKeys(keys: readonly string[]): string[] {
	const light = "light";
	const rest = keys
		.filter((k) => k !== light && k !== "dark")
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
	const out: string[] = [];
	if (keys.includes(light)) {
		out.push(light);
	}
	if (keys.includes("dark")) {
		out.push("dark");
	}
	out.push(...rest);
	return out;
}
