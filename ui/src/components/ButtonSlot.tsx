import type { JSX } from "solid-js";

export function ButtonSlot(props: { children: JSX.Element }) {
	return (
		<div class="flex aspect-square w-auto min-h-0 min-w-0 shrink-0 self-stretch items-stretch">
			{props.children}
		</div>
	);
}
