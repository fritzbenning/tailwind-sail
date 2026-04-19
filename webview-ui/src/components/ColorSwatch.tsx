import { twMerge } from "tailwind-merge";
import type { TailwindBackgroundClass } from "../lib/tailwind/getTailwindBackgroundColorClass";

export function ColorSwatch(props: {
	backgroundColorClass: TailwindBackgroundClass;
}) {
	return (
		<div
			class={twMerge(
				"pointer-events-none shrink-0 size-3.5 self-center rounded-full ring-1 ring-inset ring-white/50",
				props.backgroundColorClass.className,
			)}
			aria-hidden="true"
		/>
	);
}
