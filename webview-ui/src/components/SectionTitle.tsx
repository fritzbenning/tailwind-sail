import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export type SectionTitleProps = {
	children: JSX.Element;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children">;

export function SectionTitle(props: SectionTitleProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);

	return (
		<div
			class={twMerge(
				"mb-2 mt-0 text-[0.7rem] font-semibold uppercase tracking-[0.05rem] text-(--vscode-descriptionForeground)",
				local.class,
			)}
			{...rest}
		>
			{local.children}
		</div>
	);
}
