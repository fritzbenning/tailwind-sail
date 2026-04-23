import type { Accessor } from "solid-js";
import { createMemo, createSignal, For, Show } from "solid-js";
import type { CssVariableEntry } from "../types";
import { vscode } from "../vscode";
import { Divider } from "./Divider";
import { ScrollPanel } from "./ScrollPanel";
import { Search } from "./Search";
import { VariableEntry } from "./VariableEntry";

/**
 * Searchable list of workspace CSS custom properties from the extension scan.
 * Click a row to open the last scanned definition (the one that sets the merged value).
 */
export function ThemePanel(props: {
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
			...(typeof loc.valueStartOffset === "number" &&
			typeof loc.valueEndOffset === "number"
				? {
						valueStartOffset: loc.valueStartOffset,
						valueEndOffset: loc.valueEndOffset,
					}
				: {}),
		});
	}

	return (
		<div class="flex flex-1 flex-col gap-0 overflow-hidden">
			<Search
				placeholder="Filter variables"
				value={query()}
				onInput={(v) => setQuery(v)}
				onClear={() => setQuery("")}
			/>
			<Divider />
			<ScrollPanel paddingX={false}>
				<Show
					when={filtered().length === 0}
					fallback={
						<ul class="m-0 flex list-none flex-col gap-0.5 p-0">
							<For each={filtered()}>
								{(variable) => (
									<VariableEntry
										entry={variable}
										onOpenDefinition={() => openDefinition(variable)}
									/>
								)}
							</For>
						</ul>
					}
				>
					<p class="px-2 py-3 text-[0.85em] text-(--vscode-descriptionForeground)">
						No CSS variables match this search.
					</p>
				</Show>
			</ScrollPanel>
		</div>
	);
}
