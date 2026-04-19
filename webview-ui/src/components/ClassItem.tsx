import { createMemo, Show } from "solid-js";
import { useClassValue } from "../hooks/useClassValue";
import { type FilterState, getEffectiveVariantState } from "../lib";
import { getTailwindColorSwatch } from "../tailwindColorSwatch";
import type { ClassItem as ClassItemData, PanelModal } from "../types";
import { vscode } from "../vscode";
import { ButtonSlot } from "./ButtonSlot";
import { ClassDot } from "./ClassDot";
import { ColorSwatch } from "./ColorSwatch";
import { Input } from "./Input";
import { RemoveButton } from "./RemoveButton";

export function ClassItem(props: {
	item: ClassItemData;
	panel: PanelModal;
	filter: FilterState;
}) {
	const variantState = () =>
		getEffectiveVariantState(props.panel, props.filter.activeVariants);

	const { shownValue, swatchClass, onFocus, onBlur, onDraftInput } =
		useClassValue({
			fullClass: () => props.item.fullClass,
			hideMatchingVariantPrefixes: () =>
				props.filter.hideMatchingVariantPrefixes,
			variantState,
		});

	const swatchSpec = createMemo(() => getTailwindColorSwatch(swatchClass()));

	return (
		<li class="relative group">
			<ClassDot />
			<div class="group/line flex min-w-0 items-center gap-1.5">
				<div class="inline-flex w-full max-w-full min-h-[1.35em] min-w-0 items-center gap-1.5">
					<Input
						variant="inline"
						type="text"
						spellcheck={false}
						data-token-index={props.item.tokenIndex}
						value={shownValue()}
						onFocus={onFocus}
						onBlur={onBlur}
						onInput={(e) => {
							const v = e.currentTarget.value;
							onDraftInput(v);
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
				</div>
				<div class="flex items-center gap-2 px-1">
					<ButtonSlot>
						<RemoveButton tokenIndex={props.item.tokenIndex} />
					</ButtonSlot>
					<Show when={swatchSpec()}>
						{(resolvedSwatch) => <ColorSwatch swatch={resolvedSwatch()} />}
					</Show>
				</div>
			</div>
		</li>
	);
}
