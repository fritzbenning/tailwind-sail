const LEADING_LIGHT_VARIANT = /^(?:light:)+/;

/**
 * Removes one or more redundant leading `light:` variant segments.
 *
 * The sidebar "light" theme chip does not contribute this prefix; chains like
 * `light:light:` are invalid in Tailwind and are safe to drop for the add-class field.
 *
 * @param s - Add-class input value.
 * @returns Value without redundant leading `light:` chain.
 *
 * @example stripLightPrefix("light:light:flex") => "flex"
 */
export function stripLightPrefix(s: string): string {
	return s.replace(LEADING_LIGHT_VARIANT, "");
}
