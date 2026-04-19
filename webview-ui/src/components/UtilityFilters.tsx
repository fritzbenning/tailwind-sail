import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";
import { SectionTitle } from "./SectionTitle";

export function UtilityFilters(props: {
	panel: PanelModal;
	activeUtility: FilterState["activeUtility"];
	onUtilityChip: (id: string) => void;
}) {
	if (props.panel.utilities.length === 0) {
		return null;
	}
	return (
		<div
			class="mb-(--sail-panel-block-gap) box-border shrink-0 px-(--sail-panel-inline-pad)"
			data-sail-filter-row="utility"
		>
			<SectionTitle>Utility</SectionTitle>
			<div
				class="flex flex-wrap items-center gap-1"
				role="toolbar"
				aria-label="Tailwind utility category filters"
			>
				{props.panel.utilities.map((c) => {
					const isActive =
						props.activeUtility.t === "utility" &&
						props.activeUtility.v === c.id;
					return (
						<Chip
							isActive={isActive}
							data-sail-filter-kind="utility"
							data-sail-utility={c.id}
							onClick={() => props.onUtilityChip(c.id)}
						>
							{c.id}
						</Chip>
					);
				})}
			</div>
		</div>
	);
}
