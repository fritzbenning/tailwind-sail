import { IconX } from "./Icons";
import { Input } from "./Input";

export function Search(props: {
	value: string;
	onInput: (v: string) => void;
	onClear: () => void;
}) {
	return (
		<div class="mb-4 box-border shrink-0 px-(--sidebarPadding)">
			<div class="flex min-w-0 items-center gap-1.5">
				<Input
					type="text"
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
						class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 opacity-75 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-(--vscode-focusBorder)"
						tabIndex={-1}
						aria-label="Clear search"
						title="Clear search"
						onClick={() => props.onClear()}
					>
						<span class="block h-3.5 w-3.5 text-(--vscode-icon-foreground,var(--vscode-foreground)) [&_svg]:block">
							<IconX />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
