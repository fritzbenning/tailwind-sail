/**
 * Orders State-row chips: synthetic `idle` first, then locale sort of the rest.
 *
 * @example
 * // Input: `['hover', 'idle', 'focus']`
 * // Output: `['idle', 'focus', 'hover']`
 */
export function sortStateChipKeys(keys: readonly string[]): string[] {
	const idle = "idle";
	const hasIdle = keys.includes(idle);
	const rest = keys
		.filter((k) => k !== idle)
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
	return hasIdle ? [idle, ...rest] : rest;
}
