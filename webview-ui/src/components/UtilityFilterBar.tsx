import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";

export function UtilityFilterBar(props: {
	panel: PanelModal;
	utility: FilterState["utility"];
	onUtilityChip: (id: string) => void;
}) {
	if (props.panel.utilities.length === 0) {
		return null;
	}
	return (
		<div
			class="sail-filter-section mb-(--sail-panel-block-gap) box-border px-(--sail-panel-inline-pad)"
			data-sail-filter-row="utility"
		>
			<div class="sail-panel-title mb-2 mt-0 text-[0.7em] font-semibold uppercase tracking-[0.05em] text-(--vscode-descriptionForeground)">
				Utility
			</div>
			<div
				class="sail-filter-bar flex flex-wrap items-center gap-1"
				role="toolbar"
				aria-label="Tailwind utility category filters"
			>
				{props.panel.utilities.map((c) => {
					const isActive =
						props.utility.t === "utility" && props.utility.v === c.id;
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
