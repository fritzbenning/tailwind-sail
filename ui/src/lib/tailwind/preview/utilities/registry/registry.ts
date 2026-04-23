import type { PreviewDefaultContext } from "../../types";
import { getBorderWidthDefault } from "../border-width/getBorderWidthDefault";
import { getBorderWidthOverrides } from "../border-width/getBorderWidthOverrides";
import { matchBorderWidth } from "../border-width/matchBorderWidth";
import { getInsetRingDefault } from "../inset-ring/getInsetRingDefault";
import { getInsetRingOverrides } from "../inset-ring/getInsetRingOverrides";
import { matchInsetRing } from "../inset-ring/matchInsetRing";
import { getLeadingDefault } from "../leading/getLeadingDefault";
import { getLeadingOverrides } from "../leading/getLeadingOverrides";
import { matchLeading } from "../leading/matchLeading";
import { getRingDefault } from "../ring/getRingDefault";
import { getRingOverrides } from "../ring/getRingOverrides";
import { matchRing } from "../ring/matchRing";
import { getRingOffsetDefault } from "../ring-offset/getRingOffsetDefault";
import { getRingOffsetOverrides } from "../ring-offset/getRingOffsetOverrides";
import { matchRingOffset } from "../ring-offset/matchRingOffset";
import { getRoundedDefault } from "../rounded/getRoundedDefault";
import { getRoundedOverrides } from "../rounded/getRoundedOverrides";
import { matchRounded } from "../rounded/matchRounded";
import { getSizeDefault } from "../size/getSizeDefault";
import { matchSize } from "../size/matchSize";
import { getSpacingDefault } from "../spacing/getSpacingDefault";
import { getSpacingOverrides } from "../spacing/getSpacingOverrides";
import { matchSpacing } from "../spacing/matchSpacing";
import { getTextDefault } from "../text/getTextDefault";
import { getTextOverrides } from "../text/getTextOverrides";
import { matchText } from "../text/matchText";

export type { PreviewDefaultContext, PreviewVariableFamily } from "../../types";

export type TailwindPreviewRegistryEntry =
	| {
			readonly id: string;
			/**
			 * Resolution order among override families (e.g. spacing before `text-`);
			 * not the same as {@link PREVIEW_REGISTRY} array order.
			 */
			readonly order: number;
			readonly match: (baseUtility: string) => boolean;
			readonly default: (
				baseUtility: string,
				ctx: PreviewDefaultContext,
			) => string | undefined;
			readonly overrides: (baseUtility: string) => readonly string[];
	  }
	| {
			readonly id: string;
			readonly match: (baseUtility: string) => boolean;
			readonly default: (
				baseUtility: string,
				ctx: PreviewDefaultContext,
			) => string | undefined;
	  };

/**
 * Preview registry: default resolution follows array order; override candidates use each entry’s `order`.
 *
 * @see {@link getOverride} for sorted override families.
 */
export const PREVIEW_REGISTRY: readonly TailwindPreviewRegistryEntry[] = [
	{
		id: "text",
		order: 1,
		match: matchText,
		default: getTextDefault,
		overrides: getTextOverrides,
	},
	{
		id: "leading",
		order: 2,
		match: matchLeading,
		default: getLeadingDefault,
		overrides: getLeadingOverrides,
	},
	{
		id: "rounded",
		order: 3,
		match: matchRounded,
		default: getRoundedDefault,
		overrides: getRoundedOverrides,
	},
	{
		id: "border-width",
		order: 4,
		match: matchBorderWidth,
		default: getBorderWidthDefault,
		overrides: getBorderWidthOverrides,
	},
	{
		id: "ring-offset",
		order: 5,
		match: matchRingOffset,
		default: getRingOffsetDefault,
		overrides: getRingOffsetOverrides,
	},
	{
		id: "inset-ring",
		order: 6,
		match: matchInsetRing,
		default: getInsetRingDefault,
		overrides: getInsetRingOverrides,
	},
	{
		id: "ring",
		order: 7,
		match: matchRing,
		default: getRingDefault,
		overrides: getRingOverrides,
	},
	{
		id: "size",
		match: matchSize,
		default: getSizeDefault,
	},
	{
		id: "spacing",
		order: 0,
		match: matchSpacing,
		default: getSpacingDefault,
		overrides: getSpacingOverrides,
	},
];
