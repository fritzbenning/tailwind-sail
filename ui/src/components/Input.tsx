import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const inputVariants = cva("", {
	variants: {
		variant: {
			inline:
				"max-w-full min-w-0 w-full w-auto max-w-none flex-1 border border-transparent bg-transparent text-(--vscode-foreground) hover:border-(--vscode-input-border,var(--vscode-widget-border)) hover:bg-(--vscode-input-background) hover:text-(--vscode-input-foreground) focus:border-(--vscode-focusBorder) focus:bg-(--vscode-input-background) focus:text-(--vscode-input-foreground) group-hover/line:border-(--vscode-input-border,var(--vscode-widget-border)) group-hover/line:bg-(--vscode-input-background) group-hover/line:text-(--vscode-input-foreground)",
			filled:
				"min-w-0 w-full max-w-full flex-1 border border-(--vscode-input-border,var(--vscode-widget-border)) bg-(--vscode-input-background) leading-[1.35] text-(--vscode-input-foreground) focus:border-(--vscode-focusBorder)",
		},
	},
	defaultVariants: {
		variant: "filled",
	},
});

/**
 * Props for {@link Input}.
 *
 * @property variant - Inline: token row (transparent until hover). Filled: panel fields.
 *
 * @example `{ variant: "inline", value: "p-4" }`
 */
export type InputProps = {
	variant?: "inline" | "filled";
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> & {
		class?: string;
	};

/**
 * Styled text input for class tokens or panel fields.
 *
 * @param props - Input props; default `variant` is `"filled"`.
 * @returns `<input>` with VS Code-themed classes.
 *
 * @example `<Input value={v} onInput={...} variant="inline" />`
 */
export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["variant", "class"]);
	return (
		<input
			{...rest}
			class={[
				"box-border m-0 rounded-sm px-1.5 py-1.5 text-2xs outline-none font-(family-name:--vscode-editor-font-family)",
				inputVariants({ variant: local.variant ?? "filled" }),
				local.class,
			]
				.filter(Boolean)
				.join(" ")}
		/>
	);
}
