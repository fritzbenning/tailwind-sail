/**
 * Whether a base utility can use the built-in raw preview path (no arbitrary `[...]` segments).
 *
 * @param baseUtility - Base utility only; typically from {@link getClassName}.
 * @returns `false` when `baseUtility` contains `[` or `]`.
 *
 * @example isPreviewAvailable("p-4") => true
 */
export function isPreviewAvailable(baseUtility: string): boolean {
	return !baseUtility.includes("[") && !baseUtility.includes("]");
}
