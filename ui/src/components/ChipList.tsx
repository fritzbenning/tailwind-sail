import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export type ChipListProps = {
	children: JSX.Element;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children">;

export function ChipList(props: ChipListProps) {
	const [local, rest] = splitProps(props, ["children", "class"]);

	return (
		<div
			class={twMerge("flex flex-wrap items-center gap-1", local.class)}
			{...rest}
		>
			{local.children}
		</div>
	);
}
