/** Variant filter metadata: breakpoint order, matcher sets, toolbar rows. */

/** Min-width breakpoint id order for chip sorting (not theme values). */
export const BREAKPOINT_SCALE_ORDER = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"5xl",
	"6xl",
	"7xl",
	"screen",
] as const;

/** Set of ids in {@link BREAKPOINT_SCALE_ORDER}. */
export const BREAKPOINT_NAMES = new Set<string>(BREAKPOINT_SCALE_ORDER);

/** Form/control pseudo variant keys (no trailing `:`). */
export const FORM_VARIANT_EXACT = new Set([
	"autofill",
	"blank",
	"checked",
	"default",
	"disabled",
	"enabled",
	"in-range",
	"indeterminate",
	"invalid",
	"optional",
	"out-of-range",
	"placeholder-shown",
	"populated",
	"read-only",
	"read-write",
	"required",
	"user-invalid",
	"user-valid",
	"valid",
]);

/** Structural / sibling-order variant keys. */
export const STRUCTURAL_EXACT = new Set([
	"empty",
	"even",
	"first",
	"first-of-type",
	"last",
	"last-of-type",
	"odd",
	"only",
	"only-of-type",
	"root",
]);

/** Pseudo-element variant keys. */
export const PSEUDO_EXACT = new Set([
	"after",
	"backdrop",
	"before",
	"file",
	"first-letter",
	"first-line",
	"marker",
	"placeholder",
	"selection",
]);

/** Media-query feature variant keys (`print`, `motion-reduce`, …). */
export const MEDIA_FEATURE_EXACT = new Set([
	"any-hover",
	"any-hover-none",
	"any-pointer-coarse",
	"any-pointer-fine",
	"any-pointer-none",
	"contrast-less",
	"contrast-more",
	"forced-colors",
	"inverted-colors",
	"landscape",
	"motion-reduce",
	"motion-safe",
	"noscript",
	"pointer-coarse",
	"pointer-fine",
	"pointer-none",
	"portrait",
	"prefers-reduced-data",
	"print",
	"scripting-enabled",
	"scripting-initial",
	"scripting-none",
]);

/** State/interaction pseudo keys for the State row. */
export const INTERACTION_EXACT = new Set([
	"active",
	"focus",
	"focus-visible",
	"focus-within",
	"hover",
	"target",
	"visited",
]);

/** Sidebar row order; rows with no classes are hidden. */
export const VARIANT_FILTER_ROW_DIMENSIONS = [
	"state",
	"breakpoints",
	"media",
	"container",
	"theme",
	"form",
	"structural",
	"pseudo",
	"logical",
	"supports",
	"dir",
	"data",
	"aria",
	"popover",
	"other",
	"misc",
] as const;
