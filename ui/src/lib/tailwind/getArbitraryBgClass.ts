/**
 * Build a Tailwind arbitrary `bg-[…]` class for a CSS `<color>` substring (hex, `rgb()`, etc.).
 *
 * Escapes `]` and `\` per arbitrary-value rules.
 *
 * @param cssColor — Color text that goes inside the brackets (no surrounding `[` / `]`).
 * @returns A single utility class string starting with `bg-[`.
 *
 * @example getArbitraryBgClass("#f97316") => "bg-[#f97316]"
 *
 * @example getArbitraryBgClass("rgb(255 0 0 / 0.5)") => "bg-[rgb(255 0 0 / 0.5)]"
 * @example getArbitraryBgClass("a]b") => "bg-[a\\]b]"
 */
export function getArbitraryBgClass(cssColor: string): string {
	const escaped = cssColor.replace(/\\/g, "\\\\").replace(/]/g, "\\]");
	return `bg-[${escaped}]`;
}
