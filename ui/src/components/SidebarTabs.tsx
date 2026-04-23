import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const tabList = cva(
	"flex shrink-0 border-b border-(--vscode-widget-border) px-1",
);

const tabBtn = cva(
	"min-w-0 flex-1 px-2 py-1.5 text-[0.8em] font-medium transition-colors",
	{
		variants: {
			active: {
				true: "text-(--vscode-foreground) border-b-2 border-(--vscode-focusBorder) -mb-px",
				false:
					"text-(--vscode-descriptionForeground) hover:text-(--vscode-foreground)",
			},
		},
		defaultVariants: { active: false },
	},
);

export type SidebarTabId = "classes" | "variables";

/**
 * Primary navigation between the class inspector and the workspace variable list.
 */
export function SidebarTabs(props: {
	active: SidebarTabId;
	onChange: (id: SidebarTabId) => void;
}) {
	return (
		<div class={tabList()} role="tablist">
			<button
				type="button"
				role="tab"
				aria-selected={props.active === "classes"}
				class={twMerge(tabBtn({ active: props.active === "classes" }))}
				onClick={() => props.onChange("classes")}
			>
				Document classes
			</button>
			<button
				type="button"
				role="tab"
				aria-selected={props.active === "variables"}
				class={twMerge(tabBtn({ active: props.active === "variables" }))}
				onClick={() => props.onChange("variables")}
			>
				Variables
			</button>
		</div>
	);
}
