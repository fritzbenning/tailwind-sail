import type { Accessor } from "solid-js";
import { createMemo } from "solid-js";
import { isClassInScope, type FilterState } from "../lib";
import type { PanelModal } from "../types";

export function useCurrentClasses(
	panel: Accessor<PanelModal>,
	filter: Accessor<FilterState>,
) {
	return createMemo(() =>
		panel().classes.filter((c) => isClassInScope(c, panel(), filter())),
	);
}
