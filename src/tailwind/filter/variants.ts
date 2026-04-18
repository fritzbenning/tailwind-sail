/**
 * Config-driven grouping of Tailwind variant prefixes (segments ending with `:` from
 * `splitTailwindClassVariants`) into sidebar filter rows.
 *
 * Order matters: the first matching dimension wins (see `classifyVariantModifier`).
 *
 * @example
 * // Input: segment `'md'` (from class prefix `md:`)
 * // Output: row `breakpoints` matches first among ordered defs → dimension `breakpoints`
 *
 * @example
 * // Input: segment `'@md'` (from `@md:`)
 * // Output: row `container` matches (`startsWith('@')`) before later rows → `container`
 */

import { isBreakpointSegment } from "./breakpoints/isBreakpointSegment";
import { isAriaSegment } from "./matchers/isAriaSegment";
import { isDataSegment } from "./matchers/isDataSegment";
import { isDirSegment } from "./matchers/isDirSegment";
import { isFormVariantSegment } from "./matchers/isFormVariantSegment";
import { isInteractionStateSegment } from "./matchers/isInteractionStateSegment";
import { isLogicalSegment } from "./matchers/isLogicalSegment";
import { isMediaFeatureSegment } from "./matchers/isMediaFeatureSegment";
import { isPopoverSegment } from "./matchers/isPopoverSegment";
import { isPseudoSegment } from "./matchers/isPseudoSegment";
import { isStructuralSegment } from "./matchers/isStructuralSegment";
import { isSupportsSegment } from "./matchers/isSupportsSegment";
import { isThemeSegment } from "./matchers/isThemeSegment";

/**
 * Dimension definitions: id, UI label, and `match(segment)` without trailing `:`.
 */
export const VARIANTS = [
	{
		id: "breakpoints" as const,
		label: "Breakpoints",
		match: (segment: string): boolean => isBreakpointSegment(segment),
	},
	{
		id: "container" as const,
		label: "Container",
		match: (segment: string): boolean => segment.startsWith("@"),
	},
	{
		id: "theme" as const,
		label: "Theme",
		match: (segment: string): boolean => isThemeSegment(segment),
	},
	{
		id: "form" as const,
		label: "Forms",
		match: (segment: string): boolean => isFormVariantSegment(segment),
	},
	{
		id: "structural" as const,
		label: "Structure",
		match: (segment: string): boolean => isStructuralSegment(segment),
	},
	{
		id: "pseudo" as const,
		label: "Pseudo-elements",
		match: (segment: string): boolean => isPseudoSegment(segment),
	},
	{
		id: "logical" as const,
		label: "Logical",
		match: (segment: string): boolean => isLogicalSegment(segment),
	},
	{
		id: "media" as const,
		label: "Media",
		match: (segment: string): boolean => isMediaFeatureSegment(segment),
	},
	{
		id: "supports" as const,
		label: "Supports",
		match: (segment: string): boolean => isSupportsSegment(segment),
	},
	{
		id: "dir" as const,
		label: "Direction",
		match: (segment: string): boolean => isDirSegment(segment),
	},
	{
		id: "data" as const,
		label: "Data",
		match: (segment: string): boolean => isDataSegment(segment),
	},
	{
		id: "aria" as const,
		label: "ARIA",
		match: (segment: string): boolean => isAriaSegment(segment),
	},
	{
		id: "popover" as const,
		label: "Open / close",
		match: (segment: string): boolean => isPopoverSegment(segment),
	},
	{
		id: "state" as const,
		label: "State",
		match: (segment: string): boolean => isInteractionStateSegment(segment),
	},
	{
		id: "other" as const,
		label: "Other variants",
		/**
		 * Arbitrary variants `[…]`.
		 *
		 * @example
		 * // Input: `'[&_svg]'` (from `[&_svg]:`)
		 * // Output: `true`
		 */
		match: (segment: string): boolean => segment.startsWith("["),
	},
	{
		id: "misc" as const,
		label: "More",
		match: (_segment: string): boolean => true,
	},
] as const;

/**
 * Union of all dimension ids in {@link VARIANTS}.
 *
 * @example
 * // Input: dimension id `'pseudo'`
 * // Output: label `'Pseudo-elements'` (via `getVariantLabel`)
 */
export type FilterDimensionId = (typeof VARIANTS)[number]["id"];

/**
 * Full dimension order for client filter state (every row, including those hidden from the toolbar).
 *
 * @example
 * // Input: `VARIANT_IDS.length`
 * // Output: `16`
 */
export const VARIANT_IDS: readonly FilterDimensionId[] = VARIANTS.map(
	(d) => d.id,
);
