import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const chipVariants = cva(
	[
		"box-border m-0 cursor-pointer rounded-sm border px-2 py-0.5 text-[0.75em] leading-[1.3] text-(--vscode-foreground) font-(family-name:--vscode-editor-font-family)",
		"outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--vscode-focusBorder)",
		"active:brightness-[0.94]",
	].join(" "),
	{
		variants: {
			isActive: {
				true:
					"border-(--vscode-focusBorder) bg-(--vscode-toolbar-hoverBackground) hover:bg-(--vscode-toolbar-hoverBackground)",
				false:
					"border-(--vscode-widget-border) bg-(--vscode-button-secondaryBackground,var(--vscode-input-background)) hover:bg-(--vscode-toolbar-hoverBackground)",
			},
		},
		defaultVariants: {
			isActive: false,
		},
	},
);

export type ChipProps = {
	/** `true` when this filter option is currently applied (utility category or variant value). */
	isActive: boolean;
	children: JSX.Element;
} & Omit<
	JSX.ButtonHTMLAttributes<HTMLButtonElement>,
	"type" | "children" | "aria-pressed"
>;

export function Chip(props: ChipProps) {
	const [local, rest] = splitProps(props, ["isActive", "children", "class"]);
	return (
		<button
			{...rest}
			type="button"
			class={[chipVariants({ isActive: local.isActive }), local.class]
				.filter(Boolean)
				.join(" ")}
			aria-pressed={local.isActive}
		>
			{local.children}
		</button>
	);
}
