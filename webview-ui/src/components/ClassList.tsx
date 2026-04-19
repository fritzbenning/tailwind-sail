import type { Accessor } from "solid-js";
import { createMemo, For, Show } from "solid-js";
import { useCurrentClasses } from "../hooks/useCurrentClasses";
import { useFilter } from "../hooks/useFilter";
import { useFilterHandlers } from "../hooks/useFilterHandlers";
import { useVariantPrefix } from "../hooks/useVariantPrefix";
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
	const variantPrefix = useVariantPrefix(panel, filter);

	const { onUtilityClick, onVariantClick } = useFilterHandlers(
		filter,
		patchFilter,
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
				onUtilityClick={onUtilityClick}
			/>
			<VariantFilters
				panel={panel()}
				activeVariants={filter().activeVariants}
				onVariantClick={onVariantClick}
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
			<AddClass variantPrefix={variantPrefix} />
		</div>
	);
}
