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
import { ClassSearchRow } from "./ClassSearchRow";
import { NoResultState } from "./NoResultState";
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
		const nextUtil =
			filterState.activeUtility.t === "utility" &&
			filterState.activeUtility.v === id
				? { t: "all" as const }
				: { t: "utility" as const, v: id };
		patchFilter({ activeUtility: nextUtil });
	};

	const onVariantChip = (dimension: string, value: string) => {
		const filterState = filter();
		const activeVariants = { ...filterState.activeVariants };
		const cur =
			activeVariants[dimension as keyof typeof activeVariants] ?? "all";
		activeVariants[dimension as keyof typeof activeVariants] =
			cur === value ? "all" : value;
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
		<div class="flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden [--sail-class-row-gap:6px] [--sail-panel-block-gap:14px]">
			<ClassSearchRow
				value={filter().search}
				onInput={(v) => patchFilter({ search: v })}
				onClear={() => patchFilter({ search: "" })}
			/>
			<div
				class="mb-(--sail-panel-block-gap) box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
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
			<div
				class="m-0 box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<Show when={currentClasses().length === 0}>
				<NoResultState onReset={resetFilter} />
			</Show>
			<div class="box-border min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-(--sail-panel-inline-pad) pt-(--sail-panel-block-gap) pb-(--sail-panel-block-gap)">
				<ul class="m-0 flex list-none flex-col gap-(--sail-class-row-gap) p-0">
					<For each={currentClasses()}>
						{(item) => (
							<ClassItem item={item} panel={panel()} filter={filter()} />
						)}
					</For>
				</ul>
			</div>
			<AddClass variantPrefix={addClassVariantPrefix} />
		</div>
	);
}
