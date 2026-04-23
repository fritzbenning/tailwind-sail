import { ClearButton } from "./ClearButton";
import { Input } from "./Input";
import { Section } from "./Section";

export function Search(props: {
	value: string;
	onInput: (v: string) => void;
	onClear: () => void;
	placeholder?: string;
}) {
	function handleKeyDown(
		e: KeyboardEvent & { currentTarget: HTMLInputElement },
	) {
		if (e.key === "Enter") {
			e.preventDefault();
			e.currentTarget.blur();
		} else if (e.key === "Escape") {
			e.preventDefault();
			props.onClear();
			e.currentTarget.blur();
		}
	}

	return (
		<Section class="flex gap-1.5 items-center">
			<Input
				type="text"
				spellcheck={false}
				autocomplete="off"
				placeholder={props.placeholder ?? "Filter classes"}
				value={props.value}
				onInput={(e) => props.onInput(e.currentTarget.value)}
				onKeyDown={handleKeyDown}
			/>
			<div
				class="flex aspect-square w-auto min-h-0 min-w-0 shrink-0 self-stretch items-stretch"
				hidden={props.value.trim().length === 0}
			>
				<ClearButton onClick={props.onClear} />
			</div>
		</Section>
	);
}
