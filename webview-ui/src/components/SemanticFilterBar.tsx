import type { SailWebviewPanelModel } from "@sail/protocol";
import type { ClientFilterState } from "../matchClasses";
import { Chip } from "./Chip";

export function SemanticFilterBar(props: {
	panel: SailWebviewPanelModel;
	semantic: ClientFilterState["semantic"];
	onSemanticChip: (id: string) => void;
}) {
	if (props.panel.semanticChips.length === 0) {
		return null;
	}
	return (
		<div
			class="sail-filter-section mb-[var(--sail-panel-block-gap)] box-border px-[var(--sail-panel-inline-pad)]"
			data-sail-filter-row="semantic"
		>
			<div class="sail-panel-title mb-2 mt-0 text-[0.7em] font-semibold uppercase tracking-[0.05em] text-[var(--vscode-descriptionForeground)]">
				Utility
			</div>
			<div
				class="sail-filter-bar flex flex-wrap items-center gap-1"
				role="toolbar"
				aria-label="Tailwind utility category filters"
			>
				{props.panel.semanticChips.map((c) => {
					const isActive =
						props.semantic.t === "semantic" && props.semantic.v === c.id;
					return (
						<Chip
							isActive={isActive}
							data-sail-filter-kind="semantic"
							data-sail-semantic={c.id}
							onClick={() => props.onSemanticChip(c.id)}
						>
							{c.id}
						</Chip>
					);
				})}
			</div>
		</div>
	);
}
