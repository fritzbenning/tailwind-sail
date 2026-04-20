import { FORM_VARIANT_EXACT } from "../constants";

/**
 * Whether `segment` is a form/control pseudo variant key (`disabled`, `checked`, …).
 *
 * @param segment - Variant segment without trailing `:`.
 * @returns `true` when listed in {@link FORM_VARIANT_EXACT}.
 *
 * @example isFormVariantSegment("disabled") => true
 *
 * @example isFormVariantSegment("hover") => false
 */
export function isFormVariantSegment(segment: string): boolean {
	return FORM_VARIANT_EXACT.has(segment.toLowerCase());
}
