import { getActiveVariantClasses } from "@ext/filter";
import type { Accessor } from "solid-js";
import { createMemo, For, Show } from "solid-js";
import { useFilter } from "../hooks/useFilter";
import {
	getEffectiveVariantFilterState,
	getVariantDimensionsFromPanel,
	isClassItemVisibleForFilter,
} from "../lib";
import type { PanelModal, WebviewModal } from "../types";
import { AddClassField } from "./AddClassField";
import { ClassItem } from "./ClassItem";
import { ClassSearchRow } from "./ClassSearchRow";
import { NoResultState } from "./NoResultState";
import { UtilityFilterBar } from "./UtilityFilterBar";
import { VariantFilterRows } from "./VariantFilterRows";
import { VariantPrefixToggle } from "./VariantPrefixToggle";

export type ClassListProps = {
	model: Accessor<WebviewModal>;
};

export function ClassList(props: ClassListProps) {
	const panel = createMemo(() => props.model() as PanelModal);

	const { filter, patchFilter, resetFilter } = useFilter(props.model);

	const onUtilityChip = (id: string) => {
		const filterState = filter();
		const nextUtil =
			filterState.utility.t === "utility" && filterState.utility.v === id
				? { t: "all" as const }
				: { t: "utility" as const, v: id };
		patchFilter({ utility: nextUtil });
	};

	const onVariantChip = (dimension: string, value: string) => {
		const filterState = filter();
		const variant = { ...filterState.variant };
		const cur = variant[dimension as keyof typeof variant] ?? "all";
		variant[dimension as keyof typeof variant] = cur === value ? "all" : value;
		patchFilter({ variant });
	};

	const visibleClasses = createMemo(() =>
		panel().classes.filter((c) =>
			isClassItemVisibleForFilter(c, panel(), filter()),
		),
	);

	const showNoResult = () =>
		panel().classes.length > 0 && visibleClasses().length === 0;

	const addClassVariantPrefix = createMemo(() =>
		getActiveVariantClasses(
			getVariantDimensionsFromPanel(panel()),
			getEffectiveVariantFilterState(panel(), filter().variant),
		),
	);

	const addClassStripThemeLight = createMemo(
		() =>
			getEffectiveVariantFilterState(panel(), filter().variant).theme ===
			"light",
	);

	return (
		<div class="class-list flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden [--sail-class-row-gap:6px] [--sail-panel-block-gap:14px]">
			<ClassSearchRow
				value={filter().classSearch}
				onInput={(v) => patchFilter({ classSearch: v })}
				onClear={() => patchFilter({ classSearch: "" })}
			/>
			<div
				class="sail-search-class-divider mb-(--sail-panel-block-gap) box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<UtilityFilterBar
				panel={panel()}
				utility={filter().utility}
				onUtilityChip={onUtilityChip}
			/>
			<VariantFilterRows
				panel={panel()}
				variant={filter().variant}
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
				class="sail-filters-class-divider m-0 box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<Show when={showNoResult()}>
				<NoResultState onReset={resetFilter} />
			</Show>
			<div class="sail-class-list-scroll box-border min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-(--sail-panel-inline-pad) pt-(--sail-panel-block-gap) pb-(--sail-panel-block-gap)">
				<ul class="class-token-list m-0 flex list-none flex-col gap-(--sail-class-row-gap) p-0">
					<Show when={panel().classes.length === 0}>
						<li
							class="class-row muted relative text-(--vscode-descriptionForeground) opacity-[0.85]"
							data-sail-no-token="true"
							data-sail-utility="others"
						>
							(no classes)
						</li>
					</Show>
					<For each={visibleClasses()}>
						{(item) => (
							<ClassItem item={item} panel={panel()} filter={filter()} />
						)}
					</For>
				</ul>
			</div>
			<AddClassField
				variantPrefix={addClassVariantPrefix}
				stripIfThemeLightFilter={addClassStripThemeLight}
			/>
		</div>
	);
}
