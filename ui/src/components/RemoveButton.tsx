import { vscode } from "../vscode";
import { IconTrash } from "./Icons";

export function RemoveButton(props: { tokenIndex: number }) {
	return (
		<button
			type="button"
			class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent px-1.5 py-1 text-[0.85em] text-(--vscode-icon-foreground,var(--vscode-foreground)) opacity-0 outline-none hover:border-(--vscode-input-border,var(--vscode-widget-border)) hover:bg-(--vscode-input-background) hover:text-(--vscode-input-foreground) hover:opacity-100 group-hover/line:border-(--vscode-input-border,var(--vscode-widget-border)) group-hover/line:bg-(--vscode-input-background) group-hover/line:text-(--vscode-input-foreground) group-hover:opacity-75 group-hover/line:opacity-75 focus-visible:opacity-75"
			tabIndex={-1}
			data-token-index={props.tokenIndex}
			aria-label="Remove this class"
			title="Remove class"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				vscode.postMessage({
					type: "tailwind-sail-remove-class",
					tokenIndex: props.tokenIndex,
				});
			}}
		>
			<span class="block text-inherit [&_svg]:block [&_svg]:size-full">
				<IconTrash />
			</span>
		</button>
	);
}
