/**
 * Detect Tailwind color utilities and describe a solid `bg-*` preview swatch
 * (variants stripped). Non-`bg` utilities map to the matching `bg-{color}` class.
 */

const TEXT_NON_COLOR = new Set([
	"left",
	"center",
	"right",
	"justify",
	"start",
	"end",
	"baseline",
	"top",
	"middle",
	"bottom",
	"balance",
	"pretty",
	"wrap",
	"nowrap",
	"ellipsis",
	"clip",
	"inherit",
	"initial",
	"revert",
	"unset",
	"xs",
	"sm",
	"base",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"5xl",
	"6xl",
	"7xl",
	"8xl",
	"9xl",
]);

const BG_NON_COLOR = new Set([
	"fixed",
	"local",
	"scroll",
	"auto",
	"cover",
	"contain",
	"repeat",
	"repeat-x",
	"repeat-y",
	"repeat-round",
	"repeat-space",
	"no-repeat",
	"opacity",
	"bottom",
	"center",
	"left",
	"right",
	"top",
	"left-bottom",
	"left-top",
	"right-bottom",
	"right-top",
	"none",
	"clip-border",
	"clip-text",
	"clip-padding",
	"clip-content",
	"origin-border",
	"origin-padding",
	"origin-content",
]);

const PALETTE = new Set([
	"slate",
	"gray",
	"zinc",
	"neutral",
	"stone",
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
	"pink",
	"rose",
]);

const SHADE = new Set([
	"50",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"950",
]);

const SPECIAL_COLOR = new Set([
	"black",
	"white",
	"transparent",
	"inherit",
	"current",
]);

const BORDER_NON_COLOR = new Set([
	"collapse",
	"separate",
	"solid",
	"dashed",
	"dotted",
	"double",
	"hidden",
	"none",
	"spacing",
]);

function isPaletteShade(rest: string): boolean {
	const head = rest.split("/")[0] ?? "";
	const [c, s] = head.split("-");
	return Boolean(c && s && PALETTE.has(c) && SHADE.has(s));
}

function isSpecial(rest: string): boolean {
	const head = (rest.split("/")[0] ?? "").split("-")[0] ?? "";
	return SPECIAL_COLOR.has(head);
}

function parseArbitraryColorValue(raw: string): string | null {
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

function arbitraryColorFromBracketUtility(base: string): string | null {
	const idx = base.indexOf("-[");
	if (idx === -1) {
		return null;
	}
	const bracket = base.slice(idx + 1);
	if (!bracket.startsWith("[") || !bracket.endsWith("]")) {
		return null;
	}
	return parseArbitraryColorValue(bracket);
}

/**
 * Build a Tailwind arbitrary `bg-[…]` class for a CSS `<color>` substring (hex, `rgb()`, etc.).
 * Escapes `]` and `\` per arbitrary-value rules.
 */
function arbitraryBgClass(cssColor: string): string {
	const escaped = cssColor.replace(/\\/g, "\\\\").replace(/]/g, "\\]");
	return `bg-[${escaped}]`;
}

/** Preview fill is always one Tailwind `bg-*` utility (palette token or arbitrary `bg-[…]`). */
export type TailwindColorSwatch = {
	className: string;
};

function baseUtility(className: string): string {
	let s = className.trim();
	if (s.startsWith("!")) {
		s = s.slice(1);
	}
	const parts = s.split(":");
	return parts[parts.length - 1] ?? s;
}

/** `border-t-red-500` → `red-500`; `red-500` unchanged. */
function stripBorderEdgePrefix(rest: string): string {
	return rest.replace(/^(?:(?:x|y|t|b|l|r|s|e)|start|end)-/i, "");
}

function isBgNonColorRest(rest: string): boolean {
	const head = rest.split("/")[0]?.split("-")[0] ?? "";
	if (rest.startsWith("gradient-")) {
		return true;
	}
	return BG_NON_COLOR.has(head);
}

/** Color tail after the utility prefix (e.g. `red-500`, `black`), or null if not a color token. */
function colorTailForSolidBg(prefix: string, rest: string): string | null {
	if (prefix === "bg") {
		if (isBgNonColorRest(rest)) {
			return null;
		}
		return rest;
	}

	if (prefix === "text") {
		const head = rest.split("/")[0]?.split("-")[0] ?? "";
		if (TEXT_NON_COLOR.has(head)) {
			return null;
		}
		return rest;
	}

	if (prefix === "border" || prefix === "ring" || prefix === "outline") {
		const colorRest = stripBorderEdgePrefix(rest);
		const head = colorRest.split("/")[0]?.split("-")[0] ?? "";
		if (BORDER_NON_COLOR.has(head)) {
			return null;
		}
		return colorRest;
	}

	if (
		prefix === "decoration" ||
		prefix === "accent" ||
		prefix === "caret" ||
		prefix === "placeholder" ||
		prefix === "fill" ||
		prefix === "stroke"
	) {
		return rest;
	}

	return null;
}

export function tailwindColorSwatch(
	className: string,
): TailwindColorSwatch | null {
	const base = baseUtility(className);
	if (!base) {
		return null;
	}

	const arb = arbitraryColorFromBracketUtility(base);
	if (arb) {
		return {
			className: arbitraryBgClass(arb),
		};
	}

	const dash = base.indexOf("-");
	if (dash === -1) {
		return null;
	}
	const prefix = base.slice(0, dash);
	const rest = base.slice(dash + 1);
	if (!rest) {
		return null;
	}

	const tail = colorTailForSolidBg(prefix, rest);
	if (tail === null) {
		return null;
	}

	if (!isPaletteShade(tail) && !isSpecial(tail)) {
		return null;
	}

	return {
		className: `bg-${tail}`,
	};
}
