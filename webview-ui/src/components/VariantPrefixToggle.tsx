export function VariantPrefixToggle(props: {
	checked: boolean;
	onChange: (checked: boolean) => void;
}) {
	return (
		<div class="mb-4 box-border shrink-0 px-(--sidebarPadding)">
			<label class="relative m-0 inline-flex w-full cursor-pointer select-none items-center gap-2 py-0 pr-0 pl-9 text-[0.8em] leading-[1.35] text-(--vscode-descriptionForeground)">
				<span class="absolute top-1/2 left-0 h-4 w-6 -translate-y-1/2">
					<input
						type="checkbox"
						class="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer appearance-none opacity-0"
						checked={props.checked}
						onChange={(e) => props.onChange(e.currentTarget.checked)}
					/>
					<span
						class="relative box-border block h-full w-full overflow-visible rounded-lg border border-solid border-(--vscode-input-border,var(--vscode-widget-border)) bg-(--vscode-input-background) transition-all duration-100 after:absolute after:top-1/2 after:left-0.5 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:rounded-full after:bg-(--vscode-foreground) after:opacity-[0.65] after:transition-all after:duration-100 after:content-[''] after:translate-x-0 peer-checked:border-(--vscode-button-background) peer-checked:bg-(--vscode-button-background) peer-checked:after:translate-x-2 peer-checked:after:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--vscode-focusBorder)"
						aria-hidden="true"
					/>
				</span>
				<span class="min-w-0 flex-1">Hide selected variant prefixes</span>
			</label>
		</div>
	);
}
