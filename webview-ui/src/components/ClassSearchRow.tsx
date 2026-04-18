import { IconX } from "./Icons";

export function ClassSearchRow(props: {
	value: string;
	onInput: (v: string) => void;
	onClear: () => void;
}) {
	return (
		<div class="sail-search-section mb-[var(--sail-panel-block-gap)] box-border px-[var(--sail-panel-inline-pad)]">
			<div class="flex min-w-0 items-center gap-1.5">
				<input
					type="text"
					class="box-border m-0 min-w-0 flex-1 rounded-sm border border-[var(--vscode-input-border,var(--vscode-widget-border))] bg-[var(--vscode-input-background)] px-1.5 py-1 text-[0.85em] leading-[1.35] text-[var(--vscode-input-foreground)] outline-none [font-family:var(--vscode-editor-font-family)] focus:border-[var(--vscode-focusBorder)]"
					spellcheck={false}
					autocomplete="off"
					placeholder="Filter classes"
					value={props.value}
					onInput={(e) => props.onInput(e.currentTarget.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							(e.target as HTMLInputElement).blur();
						}
						if (e.key === "Escape") {
							e.preventDefault();
							props.onClear();
							(e.target as HTMLInputElement).blur();
						}
					}}
				/>
				<div
					class="flex aspect-square w-auto min-h-0 min-w-0 shrink-0 self-stretch items-stretch"
					hidden={props.value.trim().length === 0}
				>
					<button
						type="button"
						class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 opacity-75 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:shadow-[0_0_0_1px_var(--vscode-focusBorder)]"
						tabIndex={-1}
						aria-label="Clear search"
						title="Clear search"
						onClick={() => props.onClear()}
					>
						<span class="block h-3.5 w-3.5 text-[var(--vscode-icon-foreground,var(--vscode-foreground))] [&_svg]:block">
							<IconX />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
