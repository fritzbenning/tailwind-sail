import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
} from "@sail/protocol";
import { createMemo, Show } from "solid-js";
import { useClassValue } from "../hooks/useClassValue";
import { type ClientFilterState, effectiveVariantState } from "../matchClasses";
import { tailwindColorSwatch } from "../tailwindColorSwatch";
import { vscode } from "../vscode";
import { ButtonSlot } from "./ButtonSlot";
import { ClassDot } from "./ClassDot";
import { ColorSwatch } from "./ColorSwatch";
import { Input } from "./Input";
import { RemoveButton } from "./RemoveButton";

export function ClassRow(props: {
	item: SailWebviewClassItem;
	panel: SailWebviewPanelModel;
	filter: ClientFilterState;
	visible: boolean;
}) {
	const variantEff = () =>
		effectiveVariantState(props.panel, props.filter.variant);

	const classValue = useClassValue({
		fullClass: () => props.item.fullClass,
		hideMatchingVariantPrefixes: () => props.filter.hideMatchingVariantPrefixes,
		variantEff,
	});

	const swatch = createMemo(() =>
		tailwindColorSwatch(classValue.classForSwatch()),
	);

	return (
		<li class="relative group" hidden={!props.visible}>
			<ClassDot />
			<div class="group/line flex min-w-0 items-center gap-1.5">
				<div class="relative min-w-0 flex-1">
					<div class="inline-flex w-full max-w-full min-h-[1.35em] min-w-0 items-center gap-1.5">
						<Input
							variant="inline"
							swatch={Boolean(swatch())}
							type="text"
							spellcheck={false}
							data-token-index={props.item.tokenIndex}
							value={classValue.shownValue()}
							onFocus={classValue.onFocus}
							onBlur={classValue.onBlur}
							onInput={(e) => {
								const v = e.currentTarget.value;
								classValue.onDraftInput(v);
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
				</div>
				<div class="flex items-center gap-2 px-1">
					<ButtonSlot>
						<RemoveButton tokenIndex={props.item.tokenIndex} />
					</ButtonSlot>
					<Show when={swatch()}>{(spec) => <ColorSwatch spec={spec()} />}</Show>
				</div>
			</div>
		</li>
	);
}
