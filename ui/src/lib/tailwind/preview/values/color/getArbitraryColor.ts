/**
 * Reads a CSS color from a `-[…]` arbitrary segment when it looks like a color value.
 *
 * @param base - Base utility only (e.g. `text-[#f00]`).
 * @returns The inner color string, or `null` when not an arbitrary color.
 *
 * @example getArbitraryColor("text-[#f97316]") => "#f97316"
 * @example getArbitraryColor("bg-red-500") => null
 */
export function getArbitraryColor(base: string): string | null {
	const idx = base.indexOf("-[");
	if (idx === -1) {
		return null;
	}
	const bracket = base.slice(idx + 1);
	if (!bracket.startsWith("[") || !bracket.endsWith("]")) {
		return null;
	}
	const inner = bracket.slice(1, -1).trim();

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
