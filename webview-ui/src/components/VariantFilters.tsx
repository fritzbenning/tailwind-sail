import { createMemo, For } from "solid-js";
import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";
import { Section } from "./Section";
import { SectionTitle } from "./SectionTitle";

export function VariantFilters(props: {
	panel: PanelModal;
	activeVariants: FilterState["activeVariants"];
	onVariantClick: (dimension: string, value: string) => void;
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
				<Section data-sail-filter-row={row.dimension}>
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
									onClick={() => props.onVariantClick(row.dimension, val)}
								>
									{val}
								</Chip>
							)}
						</For>
					</div>
				</Section>
			)}
		</For>
	);
}
