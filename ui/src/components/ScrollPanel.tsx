import { cva } from "class-variance-authority";
import type { JSX } from "solid-js";
import { createSignal, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";
import { useScrollbar } from "../hooks/useScrollbar";

const scrollPanelVariants = cva(
	"relative box-border flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden pt-4 pb-4",
	{
		variants: {
			paddingX: {
				true: "px-(--sidebarPaddingX)",
				false: "",
			},
		},
		defaultVariants: {
			paddingX: true,
		},
	},
);

export type ScrollPanelProps = {
	children: JSX.Element;
	class?: string;
	paddingX?: boolean;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children" | "paddingX">;

export function ScrollPanel(props: ScrollPanelProps) {
	const [local, rest] = splitProps(props, ["children", "class", "paddingX"]);
	const [scrollRoot, setScrollRoot] = createSignal<
		HTMLDivElement | undefined
	>();

	useScrollbar(scrollRoot);

	return (
		<div
			ref={setScrollRoot}
			data-scroll-panel
			class={twMerge(
				scrollPanelVariants({ paddingX: local.paddingX !== false }),
				local.class,
			)}
			{...rest}
		>
			<div class="scrollbar-wrapper min-h-0 w-full min-w-0 flex-1">
				<div class="scrollbar-height-auto-observer-wrapper">
					<div class="scrollbar-height-auto-observer" />
				</div>
				<div class="scrollbar-mask">
					<div class="scrollbar-offset">
						<div
							class="scrollbar-content-wrapper"
							tabIndex={0}
							role="region"
							aria-label="scrollable content"
						>
							<div class="scrollbar-content">{local.children}</div>
						</div>
					</div>
				</div>
				<div class="scrollbar-placeholder" />
			</div>
		</div>
	);
}
