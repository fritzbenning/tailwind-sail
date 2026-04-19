import type { Accessor } from "solid-js";
import { createMemo } from "solid-js";
import { isClassInScope, type FilterState } from "../lib";
import type { PanelModal } from "../types";

/**
 * Memoized list of classes on the panel that pass the current filter (search, utility, variants).
 *
 * @param panel - Panel state including the raw `classes` array
 * @param filter - Active filter state from {@link useFilter}
 * @returns Accessor of filtered class entries in display order
 */
export function useCurrentClasses(
	panel: Accessor<PanelModal>,
	filter: Accessor<FilterState>,
) {
	return createMemo(() =>
		panel().classes.filter((c) => isClassInScope(c, panel(), filter())),
	);
}
