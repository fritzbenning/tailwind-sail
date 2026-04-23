/**
 * Whether the custom property name is a Tailwind v4 @theme `color` token (`--color-*`).
 *
 * @param name - Full variable name including a leading `--`.
 * @returns `true` when the name denotes a theme color key; `false` for `--color-` alone or other variables.
 *
 * @example isThemeColorName("--color-primary") => true
 * @example isThemeColorName("--color-") => false
 * @example isThemeColorName("--spacing-4") => false
 */
export function isThemeColorName(name: string): boolean {
	return name.startsWith("--color-") && name.length > "--color-".length;
}
