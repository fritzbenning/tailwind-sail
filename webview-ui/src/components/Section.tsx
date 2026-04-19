import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export type SectionProps = {
	children: JSX.Element;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLElement>, "class" | "children">;

export function Section(props: SectionProps) {
	const [local, rest] = splitProps(props, ["children", "class"]);

	return (
		<section
			class={twMerge(
				"mb-4 box-border shrink-0 px-(--sidebarPadding)",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</section>
	);
}
