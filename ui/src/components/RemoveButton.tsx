import { vscode } from "../vscode";
import { IconTrash } from "./Icons";

export function RemoveButton(props: { tokenIndex: number }) {
	return (
		<button
			type="button"
			class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 shrink-0 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 opacity-0 outline-none group-hover:opacity-75 hover:opacity-100 focus-visible:opacity-75"
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
			<span class="block text-(--vscode-icon-foreground,var(--vscode-foreground)) [&_svg]:block [&_svg]:size-full">
				<IconTrash />
			</span>
		</button>
	);
}
