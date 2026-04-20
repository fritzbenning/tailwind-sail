import { type Accessor, createEffect, createSignal } from "solid-js";
import { applyVariantPrefix, getClassNameFromInputValue } from "../lib";
import { vscode } from "../vscode";
import { Divider } from "./Divider";
import { Input } from "./Input";
import { SectionTitle } from "./SectionTitle";

export function AddClass(props: { variantPrefix: Accessor<string> }) {
	const [inputElement, setInputElement] = createSignal<
		HTMLInputElement | undefined
	>();

	createEffect(() => {
		const input = inputElement();
		const variantPrefix = props.variantPrefix();

		if (!input) {
			return;
		}

		applyVariantPrefix(input, variantPrefix);
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
					type: "tailwind-sail-add-class",
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
			<Divider />
			<div class="box-border shrink-0 px-(--sidebarPadding) pt-3">
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
