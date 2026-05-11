import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

export function IconButton(
	props: Omit<
		JSX.ButtonHTMLAttributes<HTMLButtonElement>,
		"type" | "class" | "aria-label"
	> & {
		ariaLabel: string;
		children: JSX.Element;
	},
) {
	const [local, rest] = splitProps(props, ["children", "ariaLabel"]);

	return (
		<button
			type="button"
			class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[0.85em] text-(--vscode-icon-foreground,var(--vscode-foreground)) opacity-0 outline-none hover:border-(--vscode-input-border,var(--vscode-widget-border)) hover:bg-(--vscode-input-background) hover:text-(--vscode-input-foreground) hover:opacity-100 group-hover/line:border-(--vscode-input-border,var(--vscode-widget-border)) group-hover/line:bg-(--vscode-input-background) group-hover/line:text-(--vscode-input-foreground) group-hover:opacity-75 group-hover/line:opacity-75 group-hover/line:disabled:opacity-25 focus-visible:opacity-75 disabled:pointer-events-none disabled:hover:border-transparent disabled:hover:bg-transparent disabled:hover:text-(--vscode-icon-foreground,var(--vscode-foreground))"
			{...rest}
			tabIndex={rest.tabIndex ?? -1}
			aria-label={local.ariaLabel}
		>
			<span class="block text-inherit [&_svg]:block [&_svg]:size-full">
				{local.children}
			</span>
		</button>
	);
}
