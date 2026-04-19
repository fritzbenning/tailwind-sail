export function NoResultState(props: { onReset: () => void }) {
	return (
		<div
			class="sail-filter-empty-state m-0 mt-(--sail-panel-block-gap) box-border px-(--sail-panel-inline-pad)"
			role="status"
			aria-live="polite"
		>
			<p class="m-0 mb-2 text-[0.9em] leading-[1.45] text-(--vscode-descriptionForeground)">
				No classes matched the filter settings.
			</p>
			<button
				type="button"
				class="m-0 cursor-pointer border-none bg-transparent p-0 text-[0.85em] [font:inherit] text-(--vscode-textLink-foreground) underline underline-offset-2 hover:text-(--vscode-textLink-activeForeground,var(--vscode-textLink-foreground)) focus-visible:outline focus-visible:outline-1 focus-visible:outline-(--vscode-focusBorder) focus-visible:outline-offset-2"
				onClick={() => props.onReset()}
			>
				Reset filters
			</button>
		</div>
	);
}
