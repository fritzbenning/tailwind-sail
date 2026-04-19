import { VARIANT_IDS } from "@ext/filter";
import type { VariantState } from "./types";

/**
 * Builds a variant filter map with every known dimension set to `"all"` (no narrowing).
 *
 * @example
 * // Input: (none — uses Tailwind dimension ids from VARIANT_IDS)
 * // Output:
 * // {
 * //   screens: "all",
 * //   theme: "all",
 * //   ...
 * // }
 */
export function getEmptyVariantState(): VariantState {
	const o = {} as VariantState;
	for (const id of VARIANT_IDS) {
		o[id] = "all";
	}
	return o;
}
