import { splitTailwindClassVariants } from "@ext/variants/splitTailwindClassVariants";
import { stepNamedScale } from "./stepNamedScale";

/**
 * Steps the trailing **named breakpoint / size keyword** on the base utility (`max-w-md` → `max-w-lg`, `text-sm` → `text-base`), preserving variant prefixes and important `!`.
 *
 * Tailwind documents viewport **`sm`–`2xl`** as **breakpoints**; the same keywords appear on many non-breakpoint utilities (shadows, radius, etc.).
 *
 * @param fullClass - Full token including variants (e.g. `hover:text-sm`).
 * @param direction - `-1` smaller step, `1` larger step.
 * @returns Updated full class, or `null` when no matching named tail exists or the step is out of range.
 *
 * @example stepNamedScaleClass("rounded-md", 1) => "rounded-lg"
 * @example stepNamedScaleClass("rounded", 1) => "rounded-md"
 * @example stepNamedScaleClass("md:text-sm", 1) => "md:text-base"
 */
export function stepNamedScaleClass(
	fullClass: string,
	direction: 1 | -1,
): string | null {
	const trimmed = fullClass.trim();

	if (!trimmed) {
		return null;
	}

	const { modifiers, utility } = splitTailwindClassVariants(trimmed);

	if (!utility) {
		return null;
	}

	const nextUtility = stepNamedScale(utility, direction);

	if (!nextUtility) {
		return null;
	}

	return modifiers.join("") + nextUtility;
}
