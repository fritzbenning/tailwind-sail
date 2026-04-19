import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const inlineInputClass =
	"class-token-input box-border m-0 max-w-full min-w-0 rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[0.85em] text-(--vscode-foreground) outline-none font-(family-name:--vscode-editor-font-family) hover:border-(--vscode-input-border,var(--vscode-widget-border)) hover:bg-(--vscode-input-background) hover:text-(--vscode-input-foreground) focus:border-(--vscode-focusBorder) focus:bg-(--vscode-input-background) focus:text-(--vscode-input-foreground) group-hover/line:border-(--vscode-input-border,var(--vscode-widget-border)) group-hover/line:bg-(--vscode-input-background) group-hover/line:text-(--vscode-input-foreground)";

const inlineFieldClass = `${inlineInputClass} w-full w-auto max-w-none flex-1`;

const filledInputClass =
	"class-token-input box-border m-0 min-w-0 w-full max-w-full flex-1 rounded-sm border border-(--vscode-input-border,var(--vscode-widget-border)) bg-(--vscode-input-background) px-1.5 py-1 text-[0.85em] leading-[1.35] text-(--vscode-input-foreground) outline-none font-(family-name:--vscode-editor-font-family) focus:border-(--vscode-focusBorder)";

export type InputProps = {
	/** Inline: token row (transparent until hover). Filled: panel fields (input background). */
	variant?: "inline" | "filled";
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> & {
		class?: string;
	};

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["variant", "class"]);
	const variant = () => local.variant ?? "filled";
	const classList = () => {
		const base =
			variant() === "inline" ? inlineFieldClass : filledInputClass;
		return [base, local.class].filter(Boolean).join(" ");
	};
	return <input {...rest} class={classList()} />;
}
