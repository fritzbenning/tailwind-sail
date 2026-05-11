import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const tabList = cva(
	"mb-4 flex gap-4 shrink-0 border-b border-(--vscode-widget-border) px-(--sidebarPaddingX)",
);

const tabBtn = cva("min-w-0 text-xs font-medium transition-colors -mb-px", {
	variants: {
		active: {
			true: "text-(--vscode-foreground) border-b-2 border-(--vscode-focusBorder)  pt-1.5 pb-2",
			false:
				"text-(--vscode-descriptionForeground) hover:text-(--vscode-foreground) pt-1.5 pb-2.5",
		},
	},
	defaultVariants: { active: false },
});

export type TabId = "classes" | "theme";

/**
 * Primary navigation between the string class inspector and the theme (CSS variables) list.
 */
export function Tabs(props: { active: TabId; onChange: (id: TabId) => void }) {
	return (
		<div class={tabList()} role="tablist">
			<button
				type="button"
				role="tab"
				aria-selected={props.active === "classes"}
				class={twMerge(tabBtn({ active: props.active === "classes" }))}
				onClick={() => props.onChange("classes")}
			>
				Classes
			</button>
			<button
				type="button"
				role="tab"
				aria-selected={props.active === "theme"}
				class={twMerge(tabBtn({ active: props.active === "theme" }))}
				onClick={() => props.onChange("theme")}
			>
				Theme
			</button>
		</div>
	);
}
