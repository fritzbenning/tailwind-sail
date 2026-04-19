import { createMemo, Show } from "solid-js";
import { useClassValue } from "../hooks/useClassValue";
import { type FilterState, normalizeVariantState } from "../lib";
import { getTailwindBackgroundColorClass } from "../lib/tailwind/getTailwindBackgroundColorClass";
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
	const activeVariants = props.filter.activeVariants;
	const variantState = () => normalizeVariantState(props.panel, activeVariants);

	const { inputValue, classValue, onFocus, onBlur, onUpdate } = useClassValue({
		fullClass: () => props.item.fullClass,
		hideVariantPrefixes: () => props.filter.hideVariantPrefixes,
		variantState,
	});

	const backgroundColorClass = createMemo(() =>
		getTailwindBackgroundColorClass(classValue()),
	);

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
						value={inputValue()}
						onFocus={onFocus}
						onBlur={onBlur}
						onInput={(event) => {
							const value = event.currentTarget.value;
							onUpdate(value);
							vscode.postMessage({
								type: "sailEditClass",
								tokenIndex: props.item.tokenIndex,
								newValue: value,
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
					<Show when={backgroundColorClass()}>
						{(bg) => (
							<ColorSwatch backgroundColorClass={bg()} />
						)}
					</Show>
				</div>
			</div>
		</li>
	);
}
