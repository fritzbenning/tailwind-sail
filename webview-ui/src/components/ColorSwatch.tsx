import { cva } from "class-variance-authority";
import type { TailwindColorSwatch } from "../tailwindColorSwatch";

const colorSwatchVariants = cva(
	"pointer-events-none shrink-0 size-3.5 self-center rounded-sm ring-1 ring-inset ring-white/50",
);

export function ColorSwatch(props: { spec: TailwindColorSwatch }) {
	return (
		<div
			class={[colorSwatchVariants(), props.spec.className]
				.filter(Boolean)
				.join(" ")}
			aria-hidden="true"
		/>
	);
}
