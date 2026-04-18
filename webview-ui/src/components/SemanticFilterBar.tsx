import type { SailWebviewPanelModel } from '@sail/protocol';
import type { ClientFilterState } from '../matchClasses';
import './FilterBar.css';

export function SemanticFilterBar(props: {
	panel: SailWebviewPanelModel;
	semantic: ClientFilterState['semantic'];
	onSemanticChip: (id: string) => void;
}) {
	if (props.panel.semanticChips.length === 0) {
		return null;
	}
	return (
		<div class="sail-filter-section" data-sail-filter-row="semantic">
			<div class="sail-panel-title">Utility</div>
			<div class="sail-filter-bar" role="toolbar" aria-label="Tailwind utility category filters">
				{props.panel.semanticChips.map((c) => {
					const pressed = props.semantic.t === 'semantic' && props.semantic.v === c.id;
					return (
						<button
							type="button"
							class="modifier-chip"
							data-sail-filter-kind="semantic"
							data-sail-semantic={c.id}
							aria-pressed={pressed}
							onClick={() => props.onSemanticChip(c.id)}
						>
							{c.id}
						</button>
					);
				})}
			</div>
		</div>
	);
}
