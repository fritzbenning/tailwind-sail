import { isHslValue } from "./isHslValue";

/**
 * Heuristic: whether a CSS custom property value is plausibly color-like for swatch preview.
 * Matches hex, functional colors, shadcn HSL channel tokens, `color-mix`, and `var(--other)`.
 *
 * @param value - The variable's declared value (whitespace is normalized by callers in practice).
 * @returns `true` if the value looks like a color or color reference; `false` for lengths, numbers-only tokens, etc.
 *
 * @example isColorValue("#f97316") => true
 * @example isColorValue("0 0% 9%") => true
 * @example isColorValue("var(--y)") => true
 * @example isColorValue("1rem") => false
 */
export function isColorValue(value: string): boolean {
	const v = value.trim();
	if (!v) {
		return false;
	}
	if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
		return true;
	}
	if (/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)\(/i.test(v)) {
		return true;
	}
	if (/^color-mix\(/i.test(v)) {
		return true;
	}
	if (isHslValue(v)) {
		return true;
	}
	if (/^var\(\s*--[a-zA-Z0-9_-]+\s*\)$/.test(v)) {
		return true;
	}
	return false;
}
