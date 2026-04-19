import type { SailWebviewViewModel } from "sail-protocol";
import type { Accessor } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import {
	type ClientFilterState,
	getDefaultFilterState,
	validateFilterState,
} from "../lib";

function mergeFilter(
	prev: ClientFilterState,
	patch: Partial<ClientFilterState>,
): ClientFilterState {
	return {
		utility: patch.utility ?? prev.utility,
		variant: patch.variant ?? prev.variant,
		classSearch: patch.classSearch ?? prev.classSearch,
		hideMatchingVariantPrefixes:
			patch.hideMatchingVariantPrefixes ?? prev.hideMatchingVariantPrefixes,
	};
}

export function useFilter(model: Accessor<SailWebviewViewModel>) {
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
		setFilter((prev) => mergeFilter(prev, patch));
	};

	return { filter, setFilter, patchFilter };
}
