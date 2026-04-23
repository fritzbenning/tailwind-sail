import { twMerge } from "tailwind-merge";
import type { TailwindBackgroundClass } from "../lib/tailwind/preview/values/color/getBackgroundColorClass";

export function ColorSwatch(props: {
	backgroundColorClass: TailwindBackgroundClass;
}) {
	const bg = props.backgroundColorClass.backgroundColor;
	return (
		<div
			class={twMerge(
				"pointer-events-none shrink-0 size-3.5 self-center rounded-full ring-1 ring-inset ring-white/50",
				props.backgroundColorClass.className,
			)}
			style={bg !== undefined ? { "background-color": bg } : undefined}
			aria-hidden="true"
		/>
	);
}
