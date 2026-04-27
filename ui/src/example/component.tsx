import { cva, type VariantProps } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const colorBlockVariants = cva(
	"size-50 md:size-75 lg:size-100 rounded-sm transition-colors outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-500",
	{
		variants: {
			variant: {
				primary: "bg-yellow-400",
				secondary: "bg-green-500",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

export type ColorBlockVariant = NonNullable<
	VariantProps<typeof colorBlockVariants>["variant"]
>;

export type ColorBlockProps = {
	variant?: ColorBlockVariant;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class">;

export function ColorBlock(props: ColorBlockProps) {
	const [local, rest] = splitProps(props, ["variant", "class"]);

	return (
		<div
			tabIndex={0}
			aria-label="Color block"
			class={twMerge(
				colorBlockVariants({ variant: local.variant }),
				local.class,
			)}
			{...rest}
		/>
	);
}
