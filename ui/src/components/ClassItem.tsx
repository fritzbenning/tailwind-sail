import type { Accessor } from "solid-js";
import { createMemo } from "solid-js";
import { useClassValue } from "../hooks/useClassValue";
import { type FilterState, normalizeVariantState } from "../lib";
import type {
	ClassItem as ClassItemData,
	CssVariableEntry,
	PanelModal,
} from "../types";
import { vscode } from "../vscode";
import { ButtonSlot } from "./ButtonSlot";
import { ClassDot } from "./ClassDot";
import { Input } from "./Input";
import { RemoveButton } from "./RemoveButton";
import { ScaleStepButtons } from "./ScaleStepButtons";
import { UtilityPreview } from "./UtilityPreview";

export function ClassItem(props: {
	item: ClassItemData;
	panel: Accessor<PanelModal>;
	filter: Accessor<FilterState>;
	cssVariables: Accessor<readonly CssVariableEntry[]>;
	showUtilityPreview: Accessor<boolean>;
}) {
	const variantState = () =>
		normalizeVariantState(props.panel(), props.filter().activeVariants);

	const { inputValue, onFocus, onBlur, onUpdate } = useClassValue({
		fullClass: () => props.item.fullClass,
		hideVariantPrefixes: () => props.filter().hideVariantPrefixes,
		variantState,
	});

	const knownCssVariableNames = createMemo(
		() => new Set(props.cssVariables().map((v) => v.name)),
	);

	return (
		<li class="relative group group/line">
			<ClassDot />
			<div class="flex min-w-0 items-center gap-0.5">
				<Input
					variant="inline"
					class="class-token-input"
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
							type: "tailwind-sail-edit-class",
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

				<div class="flex items-center gap-2 px-1">
					<ScaleStepButtons
						tokenIndex={props.item.tokenIndex}
						fullClass={() => props.item.fullClass}
					/>
					<ButtonSlot>
						<RemoveButton tokenIndex={props.item.tokenIndex} />
					</ButtonSlot>
					<UtilityPreview
						fullClass={props.item.fullClass}
						showUtilityPreview={props.showUtilityPreview}
						knownCssVariableNames={knownCssVariableNames}
						cssVariables={props.cssVariables}
					/>
				</div>
			</div>
		</li>
	);
}
