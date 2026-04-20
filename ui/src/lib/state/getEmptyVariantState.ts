import { VARIANT_IDS } from "@ext/filter";
import type { VariantState } from "./types";

/**
 * Builds a variant filter map with every known dimension set to `"all"` (no narrowing).
 *
 * @returns {@link VariantState} with every id in {@link VARIANT_IDS} set to `"all"`.
 *
 * @example getEmptyVariantState().theme => "all"
 */
export function getEmptyVariantState(): VariantState {
	const o = {} as VariantState;
	for (const id of VARIANT_IDS) {
		o[id] = "all";
	}
	return o;
}
