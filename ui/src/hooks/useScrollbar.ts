import SimpleBar from "simplebar";
import type { SimpleBarOptions } from "simplebar-core";
import { type Accessor, createEffect, onCleanup } from "solid-js";

/**
 * Attaches [SimpleBar](https://github.com/Grsmto/simplebar) to a host elementement and tears it down when the host unmounts or changes.
 *
 * The host must already contain SimpleBar’s inner structure (e.g. `.scrollbar-wrapper` → … → `.scrollbar-content` in `ScrollPanel`) so child nodes are not reparented away from Solid’s reconciliation parent.
 *
 * @param root - Host elementement (typically the scroll panelement root).
 * @param options - Optional SimpleBar options (defaults include `autoHide: true` and `scrollbar-*` class names).
 */
export function useScrollbar(
	root: Accessor<HTMLDivElement | undefined>,
	options?: SimpleBarOptions,
): void {
	createEffect(() => {
		const element = root();
		if (!element) {
			return;
		}

		const bar = new SimpleBar(element, {
			autoHide: true,
			...options,
			classNames: {
				contentEl: "scrollbar-content",
				contentWrapper: "scrollbar-content-wrapper",
				offset: "scrollbar-offset",
				mask: "scrollbar-mask",
				wrapper: "scrollbar-wrapper",
				placeholder: "scrollbar-placeholder",
				scrollbar: "scrollbar-scrollbar",
				track: "scrollbar-track",
				heightAutoObserverWrapperEl: "scrollbar-height-auto-observer-wrapper",
				heightAutoObserverEl: "scrollbar-height-auto-observer",
				visible: "scrollbar-visible",
				horizontal: "scrollbar-horizontal",
				vertical: "scrollbar-vertical",
				hover: "scrollbar-hover",
				dragging: "scrollbar-dragging",
				scrolling: "scrollbar-scrolling",
				scrollable: "scrollbar-scrollable",
				mouseEntered: "scrollbar-mouse-entered",
				...options?.classNames,
			},
		});

		onCleanup(() => {
			bar.unMount();
		});
	});
}
