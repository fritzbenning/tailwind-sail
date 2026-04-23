import { Show } from "solid-js";
import { getVariableSwatchDescriptor } from "../lib/css/getVariableSwatchDescriptor";
import type { CssVariableEntry } from "../types";
import { ColorSwatch } from "./ColorSwatch";

/**
 * One row in the theme (CSS custom properties) list: optional color swatch, name, and resolved value.
 */
export function VariableEntry(props: {
	entry: CssVariableEntry;
	onOpenDefinition: () => void;
}) {
	return (
		<li class="m-0 list-none p-0">
			<button
				type="button"
				class="w-full cursor-pointer border border-transparent px-2 py-1.5 text-left text-[0.8em] hover:bg-(--vscode-list-hoverBackground) focus-visible:outline focus-visible:outline-(--vscode-focusBorder) focus-visible:-outline-offset-1"
				onClick={() => props.onOpenDefinition()}
			>
				<div class="flex min-w-0 items-start gap-2">
					<Show when={getVariableSwatchDescriptor(props.entry)}>
						{(sw) => <ColorSwatch backgroundColorClass={sw()} />}
					</Show>
					<div class="min-w-0 flex-1">
						<div class="font-mono text-(--vscode-foreground)">
							{props.entry.name}
						</div>
						<div class="truncate text-(--vscode-descriptionForeground)">
							{props.entry.value}
						</div>
					</div>
				</div>
			</button>
		</li>
	);
}
