import { createMemo } from "solid-js";
import type { FilterState } from "../lib";
import type { PanelModal } from "../types";
import { Chip } from "./Chip";
import { ChipList } from "./ChipList";
import { Section } from "./Section";
import { SectionTitle } from "./SectionTitle";

export function UtilityFilters(props: {
	panel: PanelModal;
	activeUtility: FilterState["activeUtility"];
	onUtilityClick: (id: string) => void;
}) {
	if (props.panel.utilities.length === 0) {
		return null;
	}

	const currentUtilityId = createMemo(() =>
		props.activeUtility.kind === "utility" ? props.activeUtility.id : null,
	);

	return (
		<Section>
			<SectionTitle>Utility</SectionTitle>
			<ChipList>
				{props.panel.utilities.map((utility) => {
					const isActive = currentUtilityId() === utility.id;

					return (
						<Chip
							isActive={isActive}
							data-tailwind-sail-filter-kind="utility"
							data-tailwind-sail-utility={utility.id}
							onClick={() => props.onUtilityClick(utility.id)}
						>
							{utility.id}
						</Chip>
					);
				})}
			</ChipList>
		</Section>
	);
}
