import { getActiveVariantClasses } from "@ext/filter";
import type { Accessor } from "solid-js";
import { createMemo, For, Show } from "solid-js";
import { useCurrentClasses } from "../hooks/useCurrentClasses";
import { useFilter } from "../hooks/useFilter";
import {
	getEffectiveVariantState,
	getVariantDimensionsFromPanel,
	stripLightPrefix,
} from "../lib";
import type { PanelModal, WebviewModal } from "../types";
import { AddClass } from "./AddClass";
import { ClassItem } from "./ClassItem";
import { Divider } from "./Divider";
import { NoResultState } from "./NoResultState";
import { ScrollPanel } from "./ScrollPanel";
import { Search } from "./Search";
import { UtilityFilters } from "./UtilityFilters";
import { VariantFilters } from "./VariantFilters";
import { VariantPrefixToggle } from "./VariantPrefixToggle";

export type ClassListProps = {
	model: Accessor<WebviewModal>;
};

export function ClassList(props: ClassListProps) {
	const panel = createMemo(() => props.model() as PanelModal);

	const { filter, patchFilter, resetFilter } = useFilter(props.model);

	const currentClasses = useCurrentClasses(panel, filter);

	const onUtilityChip = (id: string) => {
		const filterState = filter();
		const nextUtility =
			filterState.activeUtility.t === "utility" &&
			filterState.activeUtility.v === id
				? { t: "all" as const }
				: { t: "utility" as const, v: id };
		patchFilter({ activeUtility: nextUtility });
	};

	const onVariantChip = (dimension: string, value: string) => {
		const filterState = filter();
		const activeVariants = { ...filterState.activeVariants };
		const activeValue =
			activeVariants[dimension as keyof typeof activeVariants] ?? "all";
		activeVariants[dimension as keyof typeof activeVariants] =
			activeValue === value ? "all" : value;
		patchFilter({ activeVariants });
	};

	const addClassVariantPrefix = createMemo(() =>
		stripLightPrefix(
			getActiveVariantClasses(
				getVariantDimensionsFromPanel(panel()),
				getEffectiveVariantState(panel(), filter().activeVariants),
			),
		),
	);

	return (
		<div class="flex flex-1 flex-col gap-0 overflow-hidden">
			<Search
				value={filter().search}
				onInput={(v) => patchFilter({ search: v })}
				onClear={() => patchFilter({ search: "" })}
			/>
			<Divider marginBottom />
			<UtilityFilters
				panel={panel()}
				activeUtility={filter().activeUtility}
				onUtilityChip={onUtilityChip}
			/>
			<VariantFilters
				panel={panel()}
				activeVariants={filter().activeVariants}
				onVariantChip={onVariantChip}
			/>
			<Show when={panel().showVariantPrefixToggle}>
				<VariantPrefixToggle
					checked={filter().hideMatchingVariantPrefixes}
					onChange={(checked) =>
						patchFilter({ hideMatchingVariantPrefixes: checked })
					}
				/>
			</Show>
			<Divider />
			<Show when={currentClasses().length === 0}>
				<NoResultState onReset={resetFilter} />
			</Show>
			<ScrollPanel>
				<ul class="m-0 flex list-none flex-col p-0 gap-1">
					<For each={currentClasses()}>
						{(item) => (
							<ClassItem item={item} panel={panel()} filter={filter()} />
						)}
					</For>
				</ul>
			</ScrollPanel>
			<AddClass variantPrefix={addClassVariantPrefix} />
		</div>
	);
}
