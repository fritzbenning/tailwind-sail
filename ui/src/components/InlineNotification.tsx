import type { JSX, ParentProps } from "solid-js";
import { Show, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { IconInfo } from "./Icons";

export type InlineNotificationProps = ParentProps<{
	/** When false, only the bordered container and content are shown (no info glyph). */
	showInfoIcon?: boolean;
	class?: string;
}> &
	Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children">;

/**
 * Bordered, inset callout for short guidance (settings hints, empty states).
 */
export function InlineNotification(props: InlineNotificationProps) {
	const [local, rest] = splitProps(props, [
		"showInfoIcon",
		"children",
		"class",
	]);
	const showInfoIcon = () => local.showInfoIcon !== false;

	return (
		<div
			{...rest}
			class={twMerge(
				"box-border mx-(--sidebarPaddingX) flex shrink-0 flex-col gap-0 rounded border border-(--vscode-widget-border) px-3.5 py-3",
				local.class,
			)}
		>
			<div
				class={
					showInfoIcon() ? "flex items-start gap-2.5" : "flex items-start gap-0"
				}
			>
				<Show when={showInfoIcon()}>
					<span
						class="shrink-0 leading-0 text-(--vscode-descriptionForeground) [&_svg]:block"
						aria-hidden="true"
					>
						<IconInfo />
					</span>
				</Show>
				<div class="flex min-w-0 flex-1 flex-col items-start gap-2 text-(--vscode-descriptionForeground) text-xs [&>p]:w-full">
					{local.children}
				</div>
			</div>
		</div>
	);
}
