import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
} from "@sail/protocol";
import { createEffect, createSignal } from "solid-js";
import {
	type ClientFilterState,
	effectiveVariantState,
	stripMatchingVariantPrefixesForDisplay,
} from "../matchClasses";
import { vscode } from "../vscode";
import { IconTrash } from "./Icons";

const tokenInputClass =
	"class-token-input box-border m-0 max-w-full min-w-0 rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[0.85em] text-[var(--vscode-foreground)] outline-none [font-family:var(--vscode-editor-font-family)] hover:border-[var(--vscode-input-border,var(--vscode-widget-border))] hover:bg-[var(--vscode-input-background)] hover:text-[var(--vscode-input-foreground)] focus:border-[var(--vscode-focusBorder)] focus:bg-[var(--vscode-input-background)] focus:text-[var(--vscode-input-foreground)] group-hover/line:border-[var(--vscode-input-border,var(--vscode-widget-border))] group-hover/line:bg-[var(--vscode-input-background)] group-hover/line:text-[var(--vscode-input-foreground)]";

export function ClassRow(props: {
	item: SailWebviewClassItem;
	panel: SailWebviewPanelModel;
	filter: ClientFilterState;
	visible: boolean;
}) {
	const variantEff = () =>
		effectiveVariantState(props.panel, props.filter.variant);

	const displayWhenBlurred = () =>
		props.filter.hideMatchingVariantPrefixes
			? stripMatchingVariantPrefixesForDisplay(
					props.item.fullClass,
					variantEff(),
				)
			: props.item.fullClass;

	const [focused, setFocused] = createSignal(false);
	const [draft, setDraft] = createSignal(props.item.fullClass);

	createEffect(() => {
		if (!focused()) {
			setDraft(props.item.fullClass);
		}
	});

	const shownValue = () => (focused() ? draft() : displayWhenBlurred());

	return (
		<li
			class={`relative group ${props.item.editable ? "class-row--editable" : ""}`}
			data-sail-semantic={props.item.semantic}
			hidden={!props.visible}
		>
			<span
				class="pointer-events-none absolute bottom-1.5 left-0 z-0 select-none text-[0.55em] leading-none text-[var(--vscode-descriptionForeground)] opacity-75 [font-family:var(--vscode-editor-font-family)] group-hover:opacity-0 group-focus-within:opacity-0"
				aria-hidden="true"
			>
				.
			</span>
			{props.item.editable ? (
				<div class="group/line flex min-w-0 items-center gap-1.5">
					<input
						type="text"
						class={`${tokenInputClass} min-w-0 w-auto max-w-none flex-1`}
						spellcheck={false}
						data-token-index={props.item.tokenIndex}
						value={shownValue()}
						onFocus={() => {
							setFocused(true);
							setDraft(props.item.fullClass);
						}}
						onBlur={() => {
							setFocused(false);
						}}
						onInput={(e) => {
							const v = e.currentTarget.value;
							setDraft(v);
							vscode.postMessage({
								type: "sailEditClass",
								tokenIndex: props.item.tokenIndex,
								newValue: v,
							});
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === "Escape") {
								e.preventDefault();
								(e.target as HTMLInputElement).blur();
							}
						}}
					/>
					<div class="flex aspect-square w-auto min-h-0 min-w-0 shrink-0 self-stretch items-stretch">
						<button
							type="button"
							class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 opacity-0 outline-none group-hover:opacity-75 hover:!opacity-100 focus-visible:opacity-75 focus-visible:shadow-[0_0_0_1px_var(--vscode-focusBorder)]"
							tabIndex={-1}
							data-token-index={props.item.tokenIndex}
							aria-label="Remove this class"
							title="Remove class"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								vscode.postMessage({
									type: "sailRemoveClass",
									tokenIndex: props.item.tokenIndex,
								});
							}}
						>
							<span class="block h-3.5 w-3.5 text-[var(--vscode-icon-foreground,var(--vscode-foreground))] [&_svg]:block">
								<IconTrash />
							</span>
						</button>
					</div>
				</div>
			) : (
				<span class="relative z-10 text-[0.95em] [font-family:var(--vscode-editor-font-family)]">
					{displayWhenBlurred()}
				</span>
			)}
		</li>
	);
}
