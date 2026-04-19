import { ClearButton } from "./ClearButton";
import { Input } from "./Input";

export function Search(props: {
	value: string;
	onInput: (v: string) => void;
	onClear: () => void;
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
		<div class="mb-4 box-border shrink-0 px-(--sidebarPadding) flex gap-1.5 items-center">
			<Input
				type="text"
				spellcheck={false}
				autocomplete="off"
				placeholder="Filter classes"
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
		</div>
	);
}
