import type { SailWebviewPanelModel } from '@sail/protocol';
import type { ClientFilterState } from '../matchClasses';
import './FilterBar.css';

export function VariantFilterRows(props: {
	panel: SailWebviewPanelModel;
	variant: ClientFilterState['variant'];
	onVariantChip: (dimension: string, value: string) => void;
}) {
	return (
		<>
			{props.panel.variantRows.map((row) => (
				<div class="sail-filter-section" data-sail-filter-row={row.dimension}>
					<div class="sail-panel-title">{row.label}</div>
					<div class="sail-filter-bar" role="toolbar" aria-label={`${row.label} filters`}>
						{row.values.map((val) => {
							const pressed = (props.variant[row.dimension] ?? 'all') === val;
							return (
								<button
									type="button"
									class="modifier-chip"
									data-sail-filter-kind="variant"
									data-sail-dimension={row.dimension}
									data-sail-value={val}
									aria-pressed={pressed}
									onClick={() => props.onVariantChip(row.dimension, val)}
								>
									{val}
								</button>
							);
						})}
					</div>
				</div>
			))}
		</>
	);
}
