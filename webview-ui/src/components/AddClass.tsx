import { type Accessor, createEffect, createSignal } from "solid-js";
import { applyVariantPrefix, getClassNameFromInputValue } from "../lib";
import { vscode } from "../vscode";
import { Input } from "./Input";
import { SectionTitle } from "./SectionTitle";

export function AddClass(props: { variantPrefix: Accessor<string> }) {
	const [inputElement, setInputElement] = createSignal<
		HTMLInputElement | undefined
	>();

	createEffect(() => {
		const el = inputElement();
		const variantPrefix = props.variantPrefix();

		if (!el) {
			return;
		}

		applyVariantPrefix(el, variantPrefix);
	});

	function handleKeyDown(
		keyboardEvent: KeyboardEvent & { currentTarget: HTMLInputElement },
	) {
		const inputElement = keyboardEvent.currentTarget;
		const variantPrefix = props.variantPrefix();

		if (keyboardEvent.key === "Enter") {
			keyboardEvent.preventDefault();
			const inputValue = inputElement.value.trim();
			const className = getClassNameFromInputValue(inputValue, variantPrefix);

			if (className.length > 0) {
				vscode.postMessage({
					type: "sailAddClass",
					className: inputValue,
				});

				inputElement.value = variantPrefix;
				inputElement.dataset.variantPrefix = variantPrefix;
			}

			inputElement.blur();
		} else if (keyboardEvent.key === "Escape") {
			keyboardEvent.preventDefault();

			inputElement.value = variantPrefix;
			inputElement.dataset.variantPrefix = variantPrefix;

			inputElement.blur();
		}
	}

	return (
		<>
			<div
				class="mb-(--sail-panel-block-gap) box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0"
				role="presentation"
			/>
			<div class="sail-add-class-section box-border px-(--sail-panel-inline-pad)">
				<SectionTitle>Add</SectionTitle>
				<Input
					ref={setInputElement}
					type="text"
					spellcheck={false}
					autocomplete="off"
					placeholder="New class"
					onKeyDown={handleKeyDown}
				/>
			</div>
		</>
	);
}
