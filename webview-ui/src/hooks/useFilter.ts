import type { Accessor } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import {
	type ClientFilterState,
	getDefaultFilterState,
	mergeFilterState,
	validateFilterState,
} from "../lib";
import type { WebviewModal } from "../types";

export function useFilter(model: Accessor<WebviewModal>) {
	const [filter, setFilter] = createSignal<ClientFilterState>(
		getDefaultFilterState(),
	);

	createEffect(() => {
		const modal = model();
		const currentFilter = filter();

		if (modal.kind === "panel" && !validateFilterState(modal, currentFilter)) {
			setFilter(getDefaultFilterState());
		}
	});

	const patchFilter = (patch: Partial<ClientFilterState>) => {
		setFilter((previous) => mergeFilterState(previous, patch));
	};

	const resetFilter = () => setFilter(getDefaultFilterState());

	return { filter, setFilter, patchFilter, resetFilter };
}
