import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { TailwindBackgroundClass } from "../lib/tailwind/preview/values/color/getBackgroundColorClass";

const colorSwatchVariants = cva(
	"pointer-events-none shrink-0 self-center rounded-full ring-1 ring-inset ring-white/50",
	{
		variants: {
			size: {
				small: "size-4",
				large: "size-6",
			},
		},
		defaultVariants: {
			size: "small",
		},
	},
);

type ColorSwatchSize = NonNullable<
	VariantProps<typeof colorSwatchVariants>["size"]
>;

export type ColorSwatchProps = {
	backgroundColorClass: TailwindBackgroundClass;
	size?: ColorSwatchSize;
};

export function ColorSwatch(props: ColorSwatchProps) {
	const bg = props.backgroundColorClass.backgroundColor;
	return (
		<div
			class={twMerge(
				colorSwatchVariants({ size: props.size }),
				props.backgroundColorClass.className,
			)}
			style={bg !== undefined ? { "background-color": bg } : undefined}
			aria-hidden="true"
		/>
	);
}
