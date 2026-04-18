import type { SailWebviewPanelModel } from "@sail/protocol";
import { createMemo, For } from "solid-js";
import type { ClientFilterState } from "../matchClasses";
import { Chip } from "./Chip";

export function VariantFilterRows(props: {
	panel: SailWebviewPanelModel;
	variant: ClientFilterState["variant"];
	onVariantChip: (dimension: string, value: string) => void;
}) {
	const rowsWithSelection = createMemo(() =>
		props.panel.variantRows.map((row) => ({
			row,
			isActive: props.variant[row.dimension] ?? "all",
		})),
	);

	return (
		<For each={rowsWithSelection()}>
			{({ row, isActive }) => (
				<div
					class="sail-filter-section mb-(--sail-panel-block-gap) box-border px-(--sail-panel-inline-pad)"
					data-sail-filter-row={row.dimension}
				>
					<div class="sail-panel-title mb-2 mt-0 text-[0.7em] font-semibold uppercase tracking-[0.05em] text-(--vscode-descriptionForeground)">
						{row.label}
					</div>
					<div
						class="sail-filter-bar flex flex-wrap items-center gap-1"
						role="toolbar"
						aria-label={`${row.label} filters`}
					>
						<For each={row.values}>
							{(val) => (
								<Chip
									isActive={isActive === val}
									data-sail-filter-kind="variant"
									data-sail-dimension={row.dimension}
									data-sail-value={val}
									onClick={() => props.onVariantChip(row.dimension, val)}
								>
									{val}
								</Chip>
							)}
						</For>
					</div>
				</div>
			)}
		</For>
	);
}
