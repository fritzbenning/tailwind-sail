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

/**
 * Props for {@link Divider}.
 *
 * @property marginBottom - Adds `mb-4` below the rule (section separators).
 *
 * @example `{ marginBottom: true }`
 */
export type DividerProps = {
	marginBottom?: boolean;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "role">;

/**
 * Horizontal separator with optional bottom margin.
 *
 * @param props - Passed to the `<div>`; controls `marginBottom` variant.
 * @returns Rule with `role="presentation"`.
 *
 * @example `<Divider marginBottom />`
 */
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
