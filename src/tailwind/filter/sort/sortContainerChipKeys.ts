import { CONTAINER_BASE_FILTER_VALUE } from "..";

/**
 * Orders container-query chips: synthetic `base` first, then locale sort.
 *
 * @example
 * // Input: `['@md', 'base']`
 * // Output: `['base', '@md']`
 */
export function sortContainerChipKeys(keys: readonly string[]): string[] {
	const base = CONTAINER_BASE_FILTER_VALUE;
	const hasBase = keys.includes(CONTAINER_BASE_FILTER_VALUE);
	const rest = keys
		.filter((k) => k !== base)
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
	return hasBase ? [base, ...rest] : rest;
}
