import { twMerge } from "tailwind-merge";
import type { TailwindColorSwatch } from "../tailwindColorSwatch";

export function ColorSwatch(props: { spec: TailwindColorSwatch }) {
	return (
		<div
			class={twMerge(
				"pointer-events-none shrink-0 size-3.5 self-center rounded-full ring-1 ring-inset ring-white/50",
				props.spec.className,
			)}
			aria-hidden="true"
		/>
	);
}
