import "./VariantPrefixToggle.css";

export function VariantPrefixToggle(props: {
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {
	return (
		<div class="sail-modifier-prefix-toggle-section">
			<label class="sail-variant-prefix-toggle">
				<input
					type="checkbox"
					class="sail-variant-prefix-toggle-input"
					checked={props.checked}
					onInput={(e) => props.onChange(e.currentTarget.checked)}
				/>
				<span class="sail-variant-prefix-switch" aria-hidden="true" />
				<span class="sail-variant-prefix-toggle-text">
					Hide selected variant prefixes
				</span>
			</label>
		</div>
	);
}
