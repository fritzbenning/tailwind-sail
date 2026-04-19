/**
 * From a Tailwind arbitrary value wrapper `[…]`, return the inner text when it looks
 * like a CSS color (hex, functional color, or `color-mix()`).
 *
 * @param raw — Bracketed token including `[` and `]`, e.g. `"[#abc]"` or `"[rgb(0 0 0)]"`.
 * @returns The inner color substring, or `null` if the content is not a recognized color form.
 *
 * @example
 * Input: `"[#f97316]"` → Output: `"#f97316"`
 *
 * @example
 * Input: `"[oklch(0.7 0.1 250)]"` → Output: `"oklch(0.7 0.1 250)"`
 *
 * @example
 * Input: `"[2px]"` → Output: `null`
 */
export function getArbitraryColorValue(raw: string): string | null {
	const inner = raw.slice(1, -1).trim();
	if (/^#[0-9a-f]{3,8}$/i.test(inner)) {
		return inner;
	}
	if (/^(?:rgb|hsl|oklch|lab|lch|hwb)\(/i.test(inner)) {
		return inner;
	}
	if (/^color-mix\(/i.test(inner)) {
		return inner;
	}
	return null;
}
