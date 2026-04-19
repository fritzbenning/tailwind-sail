import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

export type SectionTitleProps = {
	children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children">;

export function SectionTitle(props: SectionTitleProps) {
	const [local, rest] = splitProps(props, ["children"]);

	return (
		<div
			class="mb-2 mt-0 text-[0.5625rem] font-semibold uppercase tracking-[0.05rem] text-(--vscode-descriptionForeground)"
			{...rest}
		>
			{local.children}
		</div>
	);
}
