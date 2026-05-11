import { vscode } from "../vscode";
import { IconButton } from "./IconButton";
import { IconTrash } from "./IconTrash";

export function RemoveButton(props: { tokenIndex: number }) {
	return (
		<IconButton
			ariaLabel="Remove this class"
			title="Remove class"
			data-token-index={props.tokenIndex}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				vscode.postMessage({
					type: "tailwind-sail-remove-class",
					tokenIndex: props.tokenIndex,
				});
			}}
		>
			<IconTrash />
		</IconButton>
	);
}
