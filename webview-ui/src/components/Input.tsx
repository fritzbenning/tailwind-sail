import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

const inlineInputClass =
	"class-token-input box-border m-0 max-w-full min-w-0 rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[0.85em] text-[var(--vscode-foreground)] outline-none [font-family:var(--vscode-editor-font-family)] hover:border-[var(--vscode-input-border,var(--vscode-widget-border))] hover:bg-[var(--vscode-input-background)] hover:text-[var(--vscode-input-foreground)] focus:border-[var(--vscode-focusBorder)] focus:bg-[var(--vscode-input-background)] focus:text-[var(--vscode-input-foreground)] group-hover/line:border-[var(--vscode-input-border,var(--vscode-widget-border))] group-hover/line:bg-[var(--vscode-input-background)] group-hover/line:text-[var(--vscode-input-foreground)]";

const inlineVariants = cva(`${inlineInputClass} w-full`, {
	variants: {
		swatch: {
			true: "field-sizing-content w-auto",
			false: "w-auto max-w-none flex-1",
		},
	},
	defaultVariants: {
		swatch: false,
	},
});

const filledInputClass =
	"class-token-input box-border m-0 min-w-0 w-full max-w-full flex-1 rounded-sm border border-[var(--vscode-input-border,var(--vscode-widget-border))] bg-[var(--vscode-input-background)] px-1.5 py-1 text-[0.85em] leading-[1.35] text-[var(--vscode-input-foreground)] outline-none [font-family:var(--vscode-editor-font-family)] focus:border-[var(--vscode-focusBorder)]";

export type InputProps = {
	/** Inline: token row (transparent until hover). Filled: panel fields (input background). */
	variant?: "inline" | "filled";
	/** Only for `variant="inline"`: width when a color swatch sits beside the field. */
	swatch?: boolean;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> & {
		class?: string;
	};

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["variant", "swatch", "class"]);
	const variant = () => local.variant ?? "filled";
	const classList = () => {
		const base =
			variant() === "inline"
				? inlineVariants({ swatch: local.swatch ?? false })
				: filledInputClass;
		return [base, local.class].filter(Boolean).join(" ");
	};
	return <input {...rest} class={classList()} />;
}
