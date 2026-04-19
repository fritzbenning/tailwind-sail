/**
 * Build a Tailwind arbitrary `bg-[…]` class for a CSS `<color>` substring (hex, `rgb()`, etc.).
 * Escapes `]` and `\` per arbitrary-value rules.
 *
 * @param cssColor — Color text that goes inside the brackets (no surrounding `[` / `]`).
 * @returns A single utility class string starting with `bg-[`.
 *
 * @example
 * Input: `"#f97316"` → Output: `"bg-[#f97316]"`
 *
 * @example
 * Input: `"rgb(255 0 0 / 0.5)"` → Output: `"bg-[rgb(255 0 0 / 0.5)]"`
 *
 * @example
 * Input: `"a]b"` (contains `]`) → Output: `"bg-[a\\]b]"` (bracket escaped for Tailwind)
 */
export function getArbitraryBgClass(cssColor: string): string {
	const escaped = cssColor.replace(/\\/g, "\\\\").replace(/]/g, "\\]");
	return `bg-[${escaped}]`;
}
