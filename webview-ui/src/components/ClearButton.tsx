import { IconX } from "./Icons";

export function ClearButton(props: {
	onClick: () => void;
	"aria-label"?: string;
	title?: string;
}) {
	const label = props["aria-label"] ?? "Clear search";
	const title = props.title ?? label;
	return (
		<button
			type="button"
			class="box-border m-0 inline-flex min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-sm border-none bg-transparent p-0 opacity-75 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-(--vscode-focusBorder)"
			tabIndex={-1}
			aria-label={label}
			title={title}
			onClick={() => props.onClick()}
		>
			<span class="block h-3.5 w-3.5 text-(--vscode-icon-foreground,var(--vscode-foreground)) [&_svg]:block">
				<IconX />
			</span>
		</button>
	);
}
