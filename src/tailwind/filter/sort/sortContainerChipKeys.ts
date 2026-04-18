/**
 * Orders container-query chips: synthetic `base` first, then locale sort.
 *
 * @example
 * // Input: `['@md', 'base']`
 * // Output: `['base', '@md']`
 */
export function sortContainerChipKeys(keys: readonly string[]): string[] {
	const base = 'base';
	const hasBase = keys.includes(base);
	const rest = keys
		.filter((k) => k !== base)
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
	return hasBase ? [base, ...rest] : rest;
}
