import type {
	SailWebviewClassItem,
	SailWebviewPanelModel,
} from "@sail/protocol";
import { createEffect, createMemo, createSignal, Show } from "solid-js";
import {
	type ClientFilterState,
	effectiveVariantState,
	stripMatchingVariantPrefixesForDisplay,
} from "../matchClasses";
import { tailwindColorSwatch } from "../tailwindColorSwatch";
import { vscode } from "../vscode";
import { ButtonSlot } from "./ButtonSlot";
import { ClassDot } from "./ClassDot";
import { ColorSwatch } from "./ColorSwatch";
import { Input } from "./Input";
import { RemoveButton } from "./RemoveButton";

const labelStackClass =
	"inline-flex w-full max-w-full min-h-[1.35em] min-w-0 items-center gap-1.5";

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

	const classForSwatch = () => (focused() ? draft() : props.item.fullClass);
	const swatch = createMemo(() => tailwindColorSwatch(classForSwatch()));

	return (
		<li
			class={`relative group ${props.item.editable ? "class-row--editable" : ""}`}
			data-sail-semantic={props.item.semantic}
			hidden={!props.visible}
		>
			<ClassDot />
			{props.item.editable ? (
				<div class="group/line flex min-w-0 items-center gap-1.5">
					<div class="relative min-w-0 flex-1">
						<div class={labelStackClass}>
							<Input
								variant="inline"
								swatch={Boolean(swatch())}
								type="text"
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
							<Show when={swatch()}>
								{(spec) => <ColorSwatch spec={spec()} />}
							</Show>
						</div>
					</div>
					<ButtonSlot>
						<RemoveButton tokenIndex={props.item.tokenIndex} />
					</ButtonSlot>
				</div>
			) : (
				<span
					class={
						swatch()
							? labelStackClass
							: "inline-flex min-h-[1.35em] min-w-0 max-w-full items-center"
					}
				>
					<span class="text-[0.95em] [font-family:var(--vscode-editor-font-family)]">
						{displayWhenBlurred()}
					</span>
					<Show when={swatch()}>{(spec) => <ColorSwatch spec={spec()} />}</Show>
				</span>
			)}
		</li>
	);
}
