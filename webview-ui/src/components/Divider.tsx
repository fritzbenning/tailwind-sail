import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const dividerVariants = cva(
	"box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0",
	{
		variants: {
			marginBottom: {
				true: "mb-4",
				false: "m-0",
			},
		},
		defaultVariants: {
			marginBottom: false,
		},
	},
);

export type DividerProps = {
	/** Adds `mb-4` below the rule (matches section separators). */
	marginBottom?: boolean;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "role">;

export function Divider(props: DividerProps) {
	const [local, rest] = splitProps(props, ["marginBottom"]);

	return (
		<div
			class={dividerVariants({ marginBottom: local.marginBottom })}
			role="presentation"
			{...rest}
		/>
	);
}
