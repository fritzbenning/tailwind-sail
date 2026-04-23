import { tryBuiltinRadiusBorderRingPx } from "./getRadiusBorderRingThemeVariableCandidates";

/**
 * Default Tailwind v4-style font sizes (rem at 16px root) → px label for the sidebar.
 * Does not render any DOM; values are static strings only.
 */
/**
 * Default line-height keywords (unitless multipliers) — `leading-*` preview label.
 *
 * @see https://tailwindcss.com/docs/line-height
 */
const LEADING_RELATIVE_LABEL: Readonly<Record<string, string>> = {
	none: "1",
	tight: "1.25",
	snug: "1.375",
	normal: "1.5",
	relaxed: "1.625",
	loose: "2",
};

const TEXT_FONT_REM: Readonly<Record<string, number>> = {
	xs: 0.75,
	sm: 0.875,
	base: 1,
	/** Not in default v3; common design-token default between sm/base */
	md: 1,
	lg: 1.125,
	xl: 1.25,
	"2xl": 1.5,
	"3xl": 1.875,
	"4xl": 2.25,
	"5xl": 3,
	"6xl": 3.75,
	"7xl": 4.5,
	"8xl": 6,
	"9xl": 8,
};

const SPACING_PREFIXES: readonly string[] = [
	"space-x",
	"space-y",
	"gap-x",
	"gap-y",
	"px",
	"py",
	"pt",
	"pb",
	"pl",
	"pr",
	"mx",
	"my",
	"mt",
	"mb",
	"ml",
	"mr",
	"p",
	"m",
	"gap",
];

/** Default `--spacing` unit in px (0.25rem) when the theme does not set `--spacing`. */
export const DEFAULT_TAILWIND_SPACING_BASE_PX = 4;

export type BuiltinTailwindRawPreviewOptions = {
	/** Pixels per numeric spacing step; from theme `--spacing` when set. */
	readonly spacingBasePx?: number;
};

/**
 * Spacing scale: `key` × base px per step (default 4 = Tailwind's 0.25rem).
 *
 * @see https://tailwindcss.com/docs/customizing-spacing
 */
function spacingKeyToPxString(
	key: string,
	spacingBasePx: number = DEFAULT_TAILWIND_SPACING_BASE_PX,
): string | undefined {
	if (key === "px") {
		return "1px";
	}
	if (key === "0") {
		return "0px";
	}
	const n = Number(key);
	if (Number.isNaN(n)) {
		return undefined;
	}
	return `${Math.round(n * spacingBasePx)}px`;
}

/**
 * Default max-width named sizes (rem at 16px root).
 *
 * @see https://tailwindcss.com/docs/max-width
 */
const MAX_WIDTH_NAMED_REM: Readonly<Record<string, number>> = {
	xs: 20,
	sm: 24,
	md: 28,
	lg: 32,
	xl: 36,
	"2xl": 42,
	"3xl": 48,
	"4xl": 56,
	"5xl": 64,
	"6xl": 72,
	"7xl": 80,
};

/** `max-w-screen-*` → default breakpoint widths (px). */
const MAX_WIDTH_SCREEN_PX: Readonly<Record<string, number>> = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

function maxWidthRestToPxLabel(
	rest: string,
	spacingBasePx: number,
): string | undefined {
	if (rest.startsWith("screen-")) {
		const bp = rest.slice("screen-".length);
		const px = MAX_WIDTH_SCREEN_PX[bp];
		if (px === undefined) {
			return undefined;
		}
		return `${px}px`;
	}
	const namedRem = MAX_WIDTH_NAMED_REM[rest];
	if (namedRem !== undefined) {
		return `${Math.round(namedRem * 16)}px`;
	}
	return spacingKeyToPxString(rest, spacingBasePx);
}

/**
 * Same spacing scale as padding/margin (`key` × base px) for width/height utilities.
 */
const SIZE_SPACING_PREFIXES: readonly string[] = [
	"min-w",
	"min-h",
	"max-h",
	"size",
	"w",
	"h",
];

function sizeSpacingRestAfterPrefix(baseUtility: string): string | undefined {
	const sorted = [...SIZE_SPACING_PREFIXES].sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (baseUtility === prefix) {
			return undefined;
		}
		if (!baseUtility.startsWith(`${prefix}-`)) {
			continue;
		}
		return baseUtility.slice(prefix.length + 1);
	}
	return undefined;
}

function spacingRestAfterPrefix(baseUtility: string): string | undefined {
	const sorted = [...SPACING_PREFIXES].sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (baseUtility === prefix) {
			return undefined;
		}
		if (!baseUtility.startsWith(`${prefix}-`)) {
			continue;
		}
		return baseUtility.slice(prefix.length + 1);
	}
	return undefined;
}

/**
 * Returns a short preview label for common Tailwind utilities when workspace
 * `--workspace-*` injection has no match (e.g. `16px`, `1.25` for line-height
 * keywords). Pure data — no DOM, no extra CSS.
 *
 * @param baseUtility - Base utility only (no variants).
 * @param options - Optional `spacingBasePx` from the workspace theme's `--spacing`.
 */
export function getBuiltinTailwindRawPreview(
	baseUtility: string,
	options?: BuiltinTailwindRawPreviewOptions,
): string | undefined {
	const spacingBasePx =
		options?.spacingBasePx ?? DEFAULT_TAILWIND_SPACING_BASE_PX;

	if (baseUtility.includes("[") || baseUtility.includes("]")) {
		return undefined;
	}

	if (baseUtility.startsWith("text-")) {
		const rest = baseUtility.slice("text-".length);
		if (!rest || rest.includes("-")) {
			return undefined;
		}
		const rem = TEXT_FONT_REM[rest];
		if (rem === undefined) {
			return undefined;
		}
		return `${Math.round(rem * 16)}px`;
	}

	if (baseUtility.startsWith("leading-")) {
		const rest = baseUtility.slice("leading-".length);
		if (!rest || rest.includes("-")) {
			return undefined;
		}
		const relative = LEADING_RELATIVE_LABEL[rest];
		if (relative !== undefined) {
			return relative;
		}
		return spacingKeyToPxString(rest, spacingBasePx);
	}

	if (baseUtility.startsWith("max-w-")) {
		const rest = baseUtility.slice("max-w-".length);
		if (!rest) {
			return undefined;
		}
		return maxWidthRestToPxLabel(rest, spacingBasePx);
	}

	const radiusBorderRing = tryBuiltinRadiusBorderRingPx(baseUtility);
	if (radiusBorderRing !== undefined) {
		return radiusBorderRing;
	}

	const sizeKey = sizeSpacingRestAfterPrefix(baseUtility);
	if (sizeKey) {
		return spacingKeyToPxString(sizeKey, spacingBasePx);
	}

	const key = spacingRestAfterPrefix(baseUtility);
	if (!key) {
		return undefined;
	}
	return spacingKeyToPxString(key, spacingBasePx);
}
