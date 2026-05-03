import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

const chipVariants = cva(
	[
		"box-border m-0 cursor-pointer rounded-sm border px-2 py-0.5 text-[0.75em] leading-[1.3] text-(--vscode-foreground) font-(family-name:--vscode-editor-font-family)",
		"outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--vscode-focusBorder)",
		"active:brightness-[0.94]",
	].join(" "),
	{
		variants: {
			isActive: {
				true: "border-(--vscode-focusBorder) bg-(--vscode-toolbar-hoverBackground) hover:bg-(--vscode-toolbar-hoverBackground)",
				false:
					"border-(--vscode-widget-border) bg-(--vscode-button-secondaryBackground,var(--vscode-input-background)) hover:bg-(--vscode-toolbar-hoverBackground)",
			},
		},
		defaultVariants: {
			isActive: false,
		},
	},
);

/**
 * Props for {@link Chip}.
 *
 * @property isActive - `true` when this filter option is applied.
 *
 * @property children - Chip label.
 * @example `{ isActive: true, children: "Text" }`
 */
export type ChipProps = {
	isActive: boolean;
	children: JSX.Element;
} & Omit<
	JSX.ButtonHTMLAttributes<HTMLButtonElement>,
	"type" | "children" | "aria-pressed"
>;

/**
 * Sidebar filter chip (utility category or variant value).
 *
 * @param props - Extends button HTML attributes with `isActive` and `children`.
 * @returns Pressable chip with `aria-pressed` from `isActive`.
 *
 * @example `<Chip isActive={filter.kind !== "all"}>Text</Chip>`
 */
export function Chip(props: ChipProps) {
	const [local, rest] = splitProps(props, ["isActive", "children", "class"]);
	return (
		<button
			{...rest}
			type="button"
			class={twMerge(chipVariants({ isActive: local.isActive }), local.class)}
			aria-pressed={local.isActive}
		>
			{local.children}
		</button>
	);
}
