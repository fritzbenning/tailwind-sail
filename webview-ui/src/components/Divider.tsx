import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const baseClass =
	"box-border h-px shrink-0 border-0 bg-(--vscode-widget-border) p-0";

export type DividerProps = {
	/** Adds `mb-4` below the rule (matches section separators). */
	marginBottom?: boolean;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "role">;

export function Divider(props: DividerProps) {
	const [local, rest] = splitProps(props, ["marginBottom"]);

	return (
		<div
			class={
				local.marginBottom
					? `${baseClass} mb-4`
					: `${baseClass} m-0`
			}
			role="presentation"
			{...rest}
		/>
	);
}
