/**
 * Shared data for variant sidebar filters: breakpoint scale, matcher word lists, and toolbar row order.
 */

/**
 * Default min-width scale order (smallest → largest). Used for filter chip order, not theme values.
 */
export const BREAKPOINT_SCALE_ORDER = [
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'screen',
] as const;

/**
 * Breakpoint names from {@link BREAKPOINT_SCALE_ORDER} for O(1) lookup.
 */
export const BREAKPOINT_NAMES = new Set<string>(BREAKPOINT_SCALE_ORDER);

/**
 * Form / control pseudo-class variant names (segment without trailing `:`).
 */
export const FORM_VARIANT_EXACT = new Set([
	'autofill',
	'blank',
	'checked',
	'default',
	'disabled',
	'enabled',
	'in-range',
	'indeterminate',
	'invalid',
	'optional',
	'out-of-range',
	'placeholder-shown',
	'populated',
	'read-only',
	'read-write',
	'required',
	'user-invalid',
	'user-valid',
	'valid',
]);

/**
 * Structural pseudo-class / sibling-order names (segment without trailing `:`).
 */
export const STRUCTURAL_EXACT = new Set([
	'empty',
	'even',
	'first',
	'first-of-type',
	'last',
	'last-of-type',
	'odd',
	'only',
	'only-of-type',
	'root',
]);

/**
 * Pseudo-element variant names (segment without trailing `:`).
 */
export const PSEUDO_EXACT = new Set([
	'after',
	'backdrop',
	'before',
	'file',
	'first-letter',
	'first-line',
	'marker',
	'placeholder',
	'selection',
]);

/**
 * Media / `@media` feature style variants (e.g. `print:`, `motion-reduce:`).
 */
export const MEDIA_FEATURE_EXACT = new Set([
	'any-hover',
	'any-hover-none',
	'any-pointer-coarse',
	'any-pointer-fine',
	'any-pointer-none',
	'contrast-less',
	'contrast-more',
	'forced-colors',
	'inverted-colors',
	'landscape',
	'motion-reduce',
	'motion-safe',
	'noscript',
	'pointer-coarse',
	'pointer-fine',
	'pointer-none',
	'portrait',
	'prefers-reduced-data',
	'print',
	'scripting-enabled',
	'scripting-initial',
	'scripting-none',
]);

/**
 * Simple interaction pseudo-classes (`hover:`, `focus:`, …) used by the State row matcher.
 */
export const INTERACTION_EXACT = new Set([
	'active',
	'focus',
	'focus-visible',
	'focus-within',
	'hover',
	'target',
	'visited',
]);

/**
 * Container filter chip: only classes with no `@` container-query variant.
 */
export const CONTAINER_BASE_FILTER_VALUE = 'base';

/**
 * Sidebar toolbar row order (subset of dimensions). Rows with no matching classes are hidden.
 */
export const VARIANT_FILTER_ROW_DIMENSIONS = [
	'state',
	'breakpoints',
	'media',
	'container',
	'theme',
	'form',
	'structural',
	'pseudo',
	'logical',
	'supports',
	'dir',
	'data',
	'aria',
	'popover',
	'other',
	'misc',
] as const;
