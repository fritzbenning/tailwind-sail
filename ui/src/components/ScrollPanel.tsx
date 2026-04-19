import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export type ScrollPanelProps = {
	children: JSX.Element;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children">;

export function ScrollPanel(props: ScrollPanelProps) {
	const [local, rest] = splitProps(props, ["children", "class"]);

	return (
		<div
			class={twMerge(
				"box-border min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-(--sidebarPadding) pt-4 pb-4",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</div>
	);
}
