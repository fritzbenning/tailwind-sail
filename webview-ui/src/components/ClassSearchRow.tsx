import { IconX } from './Icons';
import './ClassSearchRow.css';

export function ClassSearchRow(props: {
	value: string;
	onInput: (v: string) => void;
	onClear: () => void;
}) {
	return (
		<div class="sail-search-section">
			<div class="sail-class-search-row">
				<input
					type="text"
					class="sail-class-search-input"
					spellcheck={false}
					autocomplete="off"
					placeholder="Filter classes"
					value={props.value}
					onInput={(e) => props.onInput(e.currentTarget.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							(e.target as HTMLInputElement).blur();
						}
						if (e.key === 'Escape') {
							e.preventDefault();
							props.onClear();
							(e.target as HTMLInputElement).blur();
						}
					}}
				/>
				<div class="sail-class-search-clear-wrap" hidden={props.value.trim().length === 0}>
					<button
						type="button"
						class="sail-class-search-clear"
						tabIndex={-1}
						aria-label="Clear search"
						title="Clear search"
						onClick={() => props.onClear()}
					>
						<IconX />
					</button>
				</div>
			</div>
		</div>
	);
}
