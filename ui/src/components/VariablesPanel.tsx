import type { Accessor } from "solid-js";
import { createMemo, createSignal, For, Show } from "solid-js";
import { getVariableSwatchDescriptor } from "../lib/css/getVariableSwatchDescriptor";
import type { CssVariableEntry } from "../types";
import { vscode } from "../vscode";
import { ColorSwatch } from "./ColorSwatch";
import { Divider } from "./Divider";
import { ScrollPanel } from "./ScrollPanel";
import { Search } from "./Search";

/**
 * Searchable list of workspace CSS custom properties from the extension scan.
 * Click a row to open the last scanned definition (the one that sets the merged value).
 */
export function VariablesPanel(props: {
	variables: Accessor<readonly CssVariableEntry[]>;
}) {
	const [query, setQuery] = createSignal("");

	const filtered = createMemo(() => {
		const q = query().trim().toLowerCase();
		const list = props.variables();
		if (!q) {
			return list;
		}
		return list.filter(
			(v) =>
				v.name.toLowerCase().includes(q) || v.value.toLowerCase().includes(q),
		);
	});

	function openDefinition(entry: CssVariableEntry) {
		const loc = entry.locations[entry.locations.length - 1];
		if (!loc) {
			return;
		}
		vscode.postMessage({
			type: "tailwind-sail-open-css-variable",
			uri: loc.uri,
			line: loc.line,
		});
	}

	return (
		<div class="flex flex-1 flex-col gap-0 overflow-hidden">
			<Search
				value={query()}
				onInput={(v) => setQuery(v)}
				onClear={() => setQuery("")}
			/>
			<Divider marginBottom />
			<ScrollPanel>
				<Show
					when={filtered().length === 0}
					fallback={
						<ul class="m-0 flex list-none flex-col gap-0.5 p-0">
							<For each={filtered()}>
								{(v) => (
									<li class="m-0 list-none p-0">
										<button
											type="button"
											class="w-full cursor-pointer rounded border border-transparent px-2 py-1.5 text-left text-[0.8em] hover:bg-(--vscode-list-hoverBackground) focus-visible:outline focus-visible:outline-(--vscode-focusBorder) focus-visible:outline-offset-[-1px]"
											onClick={() => openDefinition(v)}
										>
											<div class="flex min-w-0 items-start gap-2">
												<Show when={getVariableSwatchDescriptor(v)}>
													{(sw) => <ColorSwatch backgroundColorClass={sw()} />}
												</Show>
												<div class="min-w-0 flex-1">
													<div class="font-mono text-(--vscode-foreground)">
														{v.name}
													</div>
													<div class="truncate text-(--vscode-descriptionForeground)">
														{v.value}
													</div>
												</div>
											</div>
										</button>
									</li>
								)}
							</For>
						</ul>
					}
				>
					<p class="px-2 py-3 text-[0.85em] text-(--vscode-descriptionForeground)">
						No CSS variables match this search. Variables are collected from
						your workspace using the include/exclude globs in settings.
					</p>
				</Show>
			</ScrollPanel>
		</div>
	);
}
