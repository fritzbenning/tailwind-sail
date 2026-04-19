import type { Accessor } from "solid-js";
import type { FilterState } from "../lib";

/** Handlers for utility / variant filter chips in the class list sidebar. */
export function useFilterHandlers(
	filter: Accessor<FilterState>,
	patchFilter: (patch: Partial<FilterState>) => void,
) {
	const onUtilityClick = (id: string) => {
		const filterState = filter();
		const nextUtility =
			filterState.activeUtility.kind === "utility" &&
			filterState.activeUtility.id === id
				? { kind: "all" as const }
				: { kind: "utility" as const, id };
		patchFilter({ activeUtility: nextUtility });
	};

	const onVariantClick = (dimension: string, value: string) => {
		const activeVariants = { ...filter().activeVariants };
		const dimensionKey = dimension as keyof typeof activeVariants;

		const activeValue = activeVariants[dimensionKey] ?? "all";

		activeVariants[dimensionKey] = activeValue === value ? "all" : value;

		patchFilter({ activeVariants });
	};

	return { onUtilityClick, onVariantClick };
}
