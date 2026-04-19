import { createMemo, For } from "solid-js";
import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";
import { SectionTitle } from "./SectionTitle";

export function VariantFilters(props: {
	panel: PanelModal;
	activeVariants: FilterState["activeVariants"];
	onVariantChip: (dimension: string, value: string) => void;
}) {
	const rowsWithSelection = createMemo(() =>
		props.panel.variants.map((row) => ({
			row,
			isActive: props.activeVariants[row.dimension] ?? "all",
		})),
	);

	return (
		<For each={rowsWithSelection()}>
			{({ row, isActive }) => (
				<div
					class="mb-4 box-border shrink-0 px-(--sidebarPadding)"
					data-sail-filter-row={row.dimension}
				>
					<SectionTitle>{row.label}</SectionTitle>
					<div
						class="flex flex-wrap items-center gap-1"
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
