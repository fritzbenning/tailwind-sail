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
				class="w-full cursor-pointer border border-transparent px-(--sidebarPaddingX) py-1.5 text-left hover:bg-(--vscode-list-hoverBackground) focus-visible:outline focus-visible:outline-(--vscode-focusBorder) focus-visible:-outline-offset-1"
				onClick={() => props.onOpenDefinition()}
			>
				<div class="flex min-w-0 items-start gap-3 justify-between">
					<div class="min-w-0 flex-1 flex flex-col gap-1">
						<div class="text-(--vscode-foreground) text-xs">
							{props.entry.name}
						</div>
						<div class="truncate text-(--vscode-descriptionForeground) text-2xs">
							{props.entry.value}
						</div>
					</div>
					<Show when={getVariableSwatchDescriptor(props.entry)}>
						{(sw) => <ColorSwatch backgroundColorClass={sw()} size="large" />}
					</Show>
				</div>
			</button>
		</li>
	);
}
