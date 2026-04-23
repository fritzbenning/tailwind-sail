import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const scrollPanelVariants = cva(
	"box-border min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-4 pb-4",
	{
		variants: {
			paddingX: {
				true: "px-(--sidebarPaddingX)",
				false: "",
			},
		},
		defaultVariants: {
			paddingX: true,
		},
	},
);

export type ScrollPanelProps = {
	children: JSX.Element;
	class?: string;
	paddingX?: boolean;
} & Omit<
	JSX.HTMLAttributes<HTMLDivElement>,
	"class" | "children" | "paddingX"
>;

export function ScrollPanel(props: ScrollPanelProps) {
	const [local, rest] = splitProps(props, ["children", "class", "paddingX"]);

	return (
		<div
			class={twMerge(
				scrollPanelVariants({ paddingX: local.paddingX !== false }),
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</div>
	);
}
