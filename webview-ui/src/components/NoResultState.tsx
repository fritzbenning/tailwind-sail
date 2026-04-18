import './NoResultState.css';

export function NoResultState(props: { onReset: () => void }) {
	return (
		<div class="sail-filter-empty-state" role="status" aria-live="polite">
			<p class="sail-filter-empty-text">No classes matched the filter settings.</p>
			<button type="button" class="sail-reset-filters-link" onClick={() => props.onReset()}>
				Reset filters
			</button>
		</div>
	);
}
