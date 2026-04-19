import type { JSX } from "solid-js";

export function LinkButton(props: {
	children: JSX.Element;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			class="m-0 cursor-pointer border-none bg-transparent p-0 text-[0.85em] [font:inherit] text-(--vscode-textLink-foreground) underline underline-offset-2 hover:text-(--vscode-textLink-activeForeground,var(--vscode-textLink-foreground)) focus-visible:outline focus-visible:outline-(--vscode-focusBorder) focus-visible:outline-offset-2"
			onClick={() => props.onClick()}
		>
			{props.children}
		</button>
	);
}
