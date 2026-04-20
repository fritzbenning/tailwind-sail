import { getActiveVariantClasses } from "@ext/filter";
import type { Accessor } from "solid-js";
import { createMemo } from "solid-js";
import {
	type FilterState,
	getVariantDimensionsFromPanel,
	normalizeVariantState,
	stripLightPrefix,
} from "../lib";
import type { PanelModal } from "../types";

/**
 * Memoized Tailwind variant prefix string for the current panel dimensions and
 *
 * active variant filters (e.g. `md:`). Strips `light:` so the prefix matches
 * editor behavior when composing new classes.
 *
 * @param panel - Panel state (dimensions, classes, etc.).
 * @param filter - Filter state; `activeVariants` selects which variant values apply.
 * @returns Accessor that resolves to the prefix string (may be empty).
 *
 * @example `useVariantPrefix(panel, filter)()` => `"dark:hover:"` when those chips are selected.
 */
export function useVariantPrefix(
	panel: Accessor<PanelModal>,
	filter: Accessor<FilterState>,
): Accessor<string> {
	return createMemo(() =>
		stripLightPrefix(
			getActiveVariantClasses(
				getVariantDimensionsFromPanel(panel()),
				normalizeVariantState(panel(), filter().activeVariants),
			),
		),
	);
}
