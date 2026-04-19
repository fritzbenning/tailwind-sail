import type { ClientFilterState } from "./types";

export function mergeFilterState(
	previous: ClientFilterState,
	patch: Partial<ClientFilterState>,
): ClientFilterState {
	return {
		utility: patch.utility ?? previous.utility,
		variant: patch.variant ?? previous.variant,
		classSearch: patch.classSearch ?? previous.classSearch,
		hideMatchingVariantPrefixes:
			patch.hideMatchingVariantPrefixes ?? previous.hideMatchingVariantPrefixes,
	};
}
