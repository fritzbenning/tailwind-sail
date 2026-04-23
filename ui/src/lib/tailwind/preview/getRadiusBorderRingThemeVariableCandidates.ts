import { BORDER_NON_COLOR, PALETTE, SPECIAL_COLOR } from "../constants";

const BORDER_EDGE_PREFIXES: readonly string[] = [
	"border-bs-",
	"border-be-",
	"border-x-",
	"border-y-",
	"border-t-",
	"border-r-",
	"border-b-",
	"border-l-",
	"border-s-",
	"border-e-",
];

const BORDER_EDGE_ONLY = new Set<string>([
	"border-x",
	"border-y",
	"border-t",
	"border-r",
	"border-b",
	"border-l",
	"border-s",
	"border-e",
	"border-bs",
	"border-be",
]);

/** Corners/sides without a size token — same default radius as `rounded`. */
const ROUNDED_EDGE_ONLY = new Set<string>([
	"rounded-t",
	"rounded-r",
	"rounded-b",
	"rounded-l",
	"rounded-tl",
	"rounded-tr",
	"rounded-br",
	"rounded-bl",
	"rounded-ts",
	"rounded-te",
	"rounded-bs",
	"rounded-be",
	"rounded-ss",
	"rounded-se",
	"rounded-es",
	"rounded-ee",
	"rounded-s",
	"rounded-e",
	"rounded-x",
	"rounded-y",
]);

function firstSegment(rest: string): string {
	return rest.split("-")[0] ?? "";
}

function isPaletteColorRest(rest: string): boolean {
	const first = firstSegment(rest);
	return PALETTE.has(first) || SPECIAL_COLOR.has(first);
}

function roundedRadiusKey(baseUtility: string): string | undefined {
	if (baseUtility === "rounded") {
		return "DEFAULT";
	}
	if (!baseUtility.startsWith("rounded-")) {
		return undefined;
	}
	const rest = baseUtility.slice("rounded-".length);
	if (!rest) {
		return undefined;
	}
	if (ROUNDED_EDGE_ONLY.has(baseUtility)) {
		return "DEFAULT";
	}
	const parts = rest.split("-");
	return parts[parts.length - 1] ?? undefined;
}

function getRoundedCandidates(baseUtility: string): readonly string[] {
	const key = roundedRadiusKey(baseUtility);
	if (!key) {
		return [];
	}
	if (key === "DEFAULT") {
		return ["--radius", "--radius-DEFAULT", "--radius-sm"];
	}
	return [`--radius-${key}`];
}

function getBorderWidthCandidates(baseUtility: string): readonly string[] {
	if (baseUtility === "border") {
		return [
			"--default-border-width",
			"--border-width-DEFAULT",
			"--border-width",
		];
	}
	if (!baseUtility.startsWith("border-")) {
		return [];
	}
	const rest = baseUtility.slice("border-".length);
	if (!rest) {
		return [];
	}
	if (BORDER_NON_COLOR.has(rest) || BORDER_NON_COLOR.has(firstSegment(rest))) {
		return [];
	}
	if (firstSegment(rest) === "spacing") {
		return [];
	}
	if (isPaletteColorRest(rest)) {
		return [];
	}
	if (BORDER_EDGE_ONLY.has(baseUtility)) {
		return [
			"--default-border-width",
			"--border-width-DEFAULT",
			"--border-width",
		];
	}
	const sorted = [...BORDER_EDGE_PREFIXES].sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (!baseUtility.startsWith(prefix)) {
			continue;
		}
		const tail = baseUtility.slice(prefix.length);
		if (!tail) {
			return [];
		}
		if (/^\d+$/.test(tail)) {
			return [`--border-width-${tail}`];
		}
		if (isPaletteColorRest(tail)) {
			return [];
		}
		return [];
	}
	if (/^\d+$/.test(rest)) {
		return [`--border-width-${rest}`];
	}
	return [];
}

function getRingOffsetCandidates(baseUtility: string): readonly string[] {
	if (!baseUtility.startsWith("ring-offset-")) {
		return [];
	}
	const rest = baseUtility.slice("ring-offset-".length);
	if (!rest || !/^\d+$/.test(rest)) {
		return [];
	}
	return [`--ring-offset-width-${rest}`, `--ring-offset-${rest}`];
}

function getInsetRingCandidates(baseUtility: string): readonly string[] {
	if (baseUtility === "inset-ring") {
		return [
			"--default-inset-ring-width",
			"--inset-ring-width-DEFAULT",
			"--inset-ring-width",
		];
	}
	if (!baseUtility.startsWith("inset-ring-")) {
		return [];
	}
	const rest = baseUtility.slice("inset-ring-".length);
	if (!rest) {
		return [];
	}
	if (isPaletteColorRest(rest)) {
		return [];
	}
	if (/^\d+$/.test(rest)) {
		return [`--inset-ring-width-${rest}`];
	}
	return [];
}

function getRingWidthCandidates(baseUtility: string): readonly string[] {
	if (baseUtility === "ring") {
		return ["--default-ring-width", "--ring-width-DEFAULT", "--ring-width"];
	}
	if (!baseUtility.startsWith("ring-")) {
		return [];
	}
	const rest = baseUtility.slice("ring-".length);
	if (!rest) {
		return [];
	}
	if (rest.startsWith("offset-")) {
		return [];
	}
	if (isPaletteColorRest(rest)) {
		return [];
	}
	if (/^\d+$/.test(rest)) {
		return [`--ring-width-${rest}`];
	}
	return [];
}

/**
 * Tailwind v4-style `--radius-*`, `--border-width-*`, `--ring-width-*`, etc. for workspace preview.
 */
export function getRadiusBorderRingThemeVariableCandidates(
	baseUtility: string,
): readonly string[] {
	const rounded = getRoundedCandidates(baseUtility);
	if (rounded.length > 0) {
		return rounded;
	}
	const border = getBorderWidthCandidates(baseUtility);
	if (border.length > 0) {
		return border;
	}
	const ringOff = getRingOffsetCandidates(baseUtility);
	if (ringOff.length > 0) {
		return ringOff;
	}
	const insetRing = getInsetRingCandidates(baseUtility);
	if (insetRing.length > 0) {
		return insetRing;
	}
	const ring = getRingWidthCandidates(baseUtility);
	if (ring.length > 0) {
		return ring;
	}
	return [];
}

/** Tailwind v4 default radius scale (px) — custom `rounded-5xl` etc. has no builtin. */
const DEFAULT_RADIUS_BUILTIN_PX = 4;

const RADIUS_BUILTIN_PX: Readonly<Record<string, number>> = {
	none: 0,
	xs: 2,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 12,
	"2xl": 16,
	"3xl": 24,
	"4xl": 32,
	full: 9999,
};

const DEFAULT_RING_WIDTH_BUILTIN_PX = 1;

const RING_WIDTH_BUILTIN_PX: Readonly<Record<string, number>> = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"8": 8,
};

const RING_OFFSET_BUILTIN_PX: Readonly<Record<string, number>> = {
	"0": 0,
	"1": 1,
	"2": 2,
	"4": 4,
	"8": 8,
};

function tryBuiltinBorderWidthPx(baseUtility: string): string | undefined {
	if (getBorderWidthCandidates(baseUtility).length === 0) {
		return undefined;
	}
	if (baseUtility === "border" || BORDER_EDGE_ONLY.has(baseUtility)) {
		return "1px";
	}
	const sorted = [...BORDER_EDGE_PREFIXES].sort((a, b) => b.length - a.length);
	for (const prefix of sorted) {
		if (!baseUtility.startsWith(prefix)) {
			continue;
		}
		const tail = baseUtility.slice(prefix.length);
		if (/^\d+$/.test(tail)) {
			return `${tail}px`;
		}
		return undefined;
	}
	const rest = baseUtility.slice("border-".length);
	if (/^\d+$/.test(rest)) {
		return `${rest}px`;
	}
	return undefined;
}

/**
 * Default px labels for radius / border / ring utilities when the workspace scan has no token.
 */
export function tryBuiltinRadiusBorderRingPx(
	baseUtility: string,
): string | undefined {
	if (getRoundedCandidates(baseUtility).length > 0) {
		const key = roundedRadiusKey(baseUtility);
		if (!key) {
			return undefined;
		}
		if (key === "DEFAULT") {
			return `${DEFAULT_RADIUS_BUILTIN_PX}px`;
		}
		const px = RADIUS_BUILTIN_PX[key];
		if (px === undefined) {
			return undefined;
		}
		return `${px}px`;
	}
	const borderPx = tryBuiltinBorderWidthPx(baseUtility);
	if (borderPx !== undefined) {
		return borderPx;
	}
	if (getRingOffsetCandidates(baseUtility).length > 0) {
		const rest = baseUtility.slice("ring-offset-".length);
		const px = RING_OFFSET_BUILTIN_PX[rest];
		if (px === undefined) {
			return undefined;
		}
		return `${px}px`;
	}
	if (getInsetRingCandidates(baseUtility).length > 0) {
		if (baseUtility === "inset-ring") {
			return `${DEFAULT_RING_WIDTH_BUILTIN_PX}px`;
		}
		const rest = baseUtility.slice("inset-ring-".length);
		if (/^\d+$/.test(rest)) {
			const px = RING_WIDTH_BUILTIN_PX[rest];
			if (px === undefined) {
				return undefined;
			}
			return `${px}px`;
		}
		return undefined;
	}
	if (getRingWidthCandidates(baseUtility).length > 0) {
		if (baseUtility === "ring") {
			return `${DEFAULT_RING_WIDTH_BUILTIN_PX}px`;
		}
		const rest = baseUtility.slice("ring-".length);
		if (/^\d+$/.test(rest)) {
			const px = RING_WIDTH_BUILTIN_PX[rest];
			if (px === undefined) {
				return undefined;
			}
			return `${px}px`;
		}
		return undefined;
	}
	return undefined;
}
