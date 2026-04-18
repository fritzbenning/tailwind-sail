import { getActiveVariantClasses } from "@ext/filter";
import type { SailWebviewPanelModel } from "@sail/protocol";
import { createMemo, For, Show } from "solid-js";
import {
	anyClassVisible,
	type ClientFilterState,
	classItemVisible,
	defaultClientFilterState,
	effectiveVariantState,
	presentVariantDimensions,
} from "../matchClasses";
import { AddClassField } from "./AddClassField";
import { ClassRow } from "./ClassRow";
import { ClassSearchRow } from "./ClassSearchRow";
import { NoResultState } from "./NoResultState";
import { SemanticFilterBar } from "./SemanticFilterBar";
import { VariantFilterRows } from "./VariantFilterRows";
import { VariantPrefixToggle } from "./VariantPrefixToggle";
import "./panel-titles.css";
import "./ParsedClassesPanel.css";

export function ParsedClassesPanel(props: {
	panel: SailWebviewPanelModel;
	filter: ClientFilterState;
	setFilter: (next: ClientFilterState) => void;
	onPatchFilter: (patch: Partial<ClientFilterState>) => void;
}) {
	const resetFilters = () => props.setFilter(defaultClientFilterState());

	const onSemanticChip = (id: string) => {
		const st = props.filter;
		const nextSem =
			st.semantic.t === "semantic" && st.semantic.v === id
				? { t: "all" as const }
				: { t: "semantic" as const, v: id };
		props.onPatchFilter({ semantic: nextSem });
	};

	const onVariantChip = (dimension: string, value: string) => {
		const st = props.filter;
		const variant = { ...st.variant };
		const cur = variant[dimension as keyof typeof variant] ?? "all";
		variant[dimension as keyof typeof variant] = cur === value ? "all" : value;
		props.onPatchFilter({ variant });
	};

	const showNoResult = () =>
		props.panel.classes.length > 0 &&
		!anyClassVisible(props.panel, props.filter);

	const addClassVariantPrefix = createMemo(() =>
		getActiveVariantClasses(
			presentVariantDimensions(props.panel),
			effectiveVariantState(props.panel, props.filter.variant),
		),
	);

	const addClassStripThemeLight = createMemo(
		() =>
			effectiveVariantState(props.panel, props.filter.variant).theme ===
			"light",
	);

	return (
		<div class="parsed-classes-panel">
			<ClassSearchRow
				value={props.filter.classSearch}
				onInput={(v) => props.onPatchFilter({ classSearch: v })}
				onClear={() => props.onPatchFilter({ classSearch: "" })}
			/>
			<div class="sail-search-class-divider" role="presentation" />
			<SemanticFilterBar
				panel={props.panel}
				semantic={props.filter.semantic}
				onSemanticChip={onSemanticChip}
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
			<div class="sail-filters-class-divider" role="presentation" />
			<Show when={showNoResult()}>
				<NoResultState onReset={resetFilters} />
			</Show>
			<div class="sail-class-list-scroll">
				<ul class="class-token-list">
					<Show when={props.panel.classes.length === 0}>
						<li
							class="class-row muted"
							data-sail-no-token="true"
							data-sail-semantic="others"
						>
							(no classes)
						</li>
					</Show>
					<For each={props.panel.classes}>
						{(item) => (
							<ClassRow
								item={item}
								panel={props.panel}
								filter={props.filter}
								visible={classItemVisible(item, props.panel, props.filter)}
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
