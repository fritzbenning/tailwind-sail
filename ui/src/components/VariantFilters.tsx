import { createMemo, For } from "solid-js";
import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";
import { ChipList } from "./ChipList";
import { Section } from "./Section";
import { SectionTitle } from "./SectionTitle";

export function VariantFilters(props: {
	panel: PanelModal;
	activeVariants: FilterState["activeVariants"];
	onVariantClick: (dimension: string, value: string) => void;
}) {
	const statefulVariants = createMemo(() =>
		props.panel.variants.map((variant) => ({
			variant,
			isActive: props.activeVariants[variant.dimension] ?? "all",
		})),
	);

	return (
		<For each={statefulVariants()}>
			{({ variant, isActive }) => (
				<Section data-tailwind-sail-filter-row={variant.dimension}>
					<SectionTitle>{variant.label}</SectionTitle>
					<ChipList>
						<For each={variant.value}>
							{(value) => (
								<Chip
									isActive={isActive === value}
									onClick={() => props.onVariantClick(variant.dimension, value)}
								>
									{value}
								</Chip>
							)}
						</For>
					</ChipList>
				</Section>
			)}
		</For>
	);
}
