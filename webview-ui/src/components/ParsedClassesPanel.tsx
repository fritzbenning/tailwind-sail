import { getActiveVariantClasses } from "@ext/filter";
import type { SailWebviewPanelModel } from "sail-protocol";
import { createMemo, For, Show } from "solid-js";
import {
	type ClientFilterState,
	getDefaultFilterState,
	getEffectiveVariantFilterState,
	getVariantDimensionsFromPanel,
	isClassItemVisibleForClientFilter,
} from "../lib";
import { AddClassField } from "./AddClassField";
import { ClassItem } from "./ClassItem";
import { ClassSearchRow } from "./ClassSearchRow";
import { NoResultState } from "./NoResultState";
import { UtilityFilterBar } from "./UtilityFilterBar";
import { VariantFilterRows } from "./VariantFilterRows";
import { VariantPrefixToggle } from "./VariantPrefixToggle";

export type ParsedClassesPanelProps = {
	panel: SailWebviewPanelModel;
	filter: ClientFilterState;
	setFilter: (next: ClientFilterState) => void;
	onPatchFilter: (patch: Partial<ClientFilterState>) => void;
};

export function ParsedClassesPanel(props: ParsedClassesPanelProps) {
	const resetFilters = () => props.setFilter(getDefaultFilterState());

	const onUtilityChip = (id: string) => {
		const st = props.filter;
		const nextUtil =
			st.utility.t === "utility" && st.utility.v === id
				? { t: "all" as const }
				: { t: "utility" as const, v: id };
		props.onPatchFilter({ utility: nextUtil });
	};

	const onVariantChip = (dimension: string, value: string) => {
		const st = props.filter;
		const variant = { ...st.variant };
		const cur = variant[dimension as keyof typeof variant] ?? "all";
		variant[dimension as keyof typeof variant] = cur === value ? "all" : value;
		props.onPatchFilter({ variant });
	};

	const visibleClasses = createMemo(() =>
		props.panel.classes.filter((c) =>
			isClassItemVisibleForClientFilter(c, props.panel, props.filter),
		),
	);

	const showNoResult = () =>
		props.panel.classes.length > 0 && visibleClasses().length === 0;

	const addClassVariantPrefix = createMemo(() =>
		getActiveVariantClasses(
			getVariantDimensionsFromPanel(props.panel),
			getEffectiveVariantFilterState(props.panel, props.filter.variant),
		),
	);

	const addClassStripThemeLight = createMemo(
		() =>
			getEffectiveVariantFilterState(props.panel, props.filter.variant)
				.theme === "light",
	);

	return (
		<div class="parsed-classes-panel flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden [--sail-class-row-gap:6px] [--sail-panel-block-gap:14px]">
			<ClassSearchRow
				value={props.filter.classSearch}
				onInput={(v) => props.onPatchFilter({ classSearch: v })}
				onClear={() => props.onPatchFilter({ classSearch: "" })}
			/>
			<div
				class="sail-search-class-divider mb-(--sail-panel-block-gap) box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<UtilityFilterBar
				panel={props.panel}
				utility={props.filter.utility}
				onUtilityChip={onUtilityChip}
			/>
			<VariantFilterRows
				panel={props.panel}
				variant={props.filter.variant}
				onVariantChip={onVariantChip}
			/>
			<Show when={props.panel.showVariantPrefixToggle}>
				<VariantPrefixToggle
					checked={props.filter.hideMatchingVariantPrefixes}
					onChange={(checked) =>
						props.onPatchFilter({ hideMatchingVariantPrefixes: checked })
					}
				/>
			</Show>
			<div
				class="sail-filters-class-divider m-0 box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<Show when={showNoResult()}>
				<NoResultState onReset={resetFilters} />
			</Show>
			<div class="sail-class-list-scroll box-border min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-(--sail-panel-inline-pad) pt-(--sail-panel-block-gap) pb-(--sail-panel-block-gap)">
				<ul class="class-token-list m-0 flex list-none flex-col gap-(--sail-class-row-gap) p-0">
					<Show when={props.panel.classes.length === 0}>
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
							<ClassItem
								item={item}
								panel={props.panel}
								filter={props.filter}
							/>
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
