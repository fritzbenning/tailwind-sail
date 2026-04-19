import { IconInfo } from "./Icons";

const copy: Record<"noString" | "noTailwind", string> = {
	noString: "Please select a string literal that contains Tailwind classes.",
	noTailwind:
		"No Tailwind classes were detected in the selected string. Use a string literal with space-separated Tailwind utility classes.",
};

export function EmptyState(props: { kind: "noString" | "noTailwind" }) {
	return (
		<div
			class="box-border mx-(--sail-panel-inline-pad) flex shrink-0 items-center gap-2.5 rounded border border-(--vscode-widget-border) px-3 py-2.5 text-[0.95em] leading-[1.45] text-(--vscode-descriptionForeground)"
			role="status"
		>
			<span
				class="shrink-0 leading-[0] text-(--vscode-descriptionForeground) [&_svg]:block"
				aria-hidden="true"
			>
				<IconInfo />
			</span>
			<span class="min-w-0 flex-1">{copy[props.kind]}</span>
		</div>
	);
}
