import SimpleBar from "simplebar";
import type { SimpleBarOptions } from "simplebar-core";
import { type Accessor, createEffect, onCleanup } from "solid-js";

/**
 * Attaches [SimpleBar](https://github.com/Grsmto/simplebar) to a host elementement and tears it down when the host unmounts or changes.
 *
 * The host must already contain SimpleBar’s inner structure (e.g. `.simplebar-wrapper` → … → `.simplebar-content`) so child nodes are not reparented away from Solid’s reconciliation parent.
 *
 * @param root - Host elementement (typically the scroll panelement root).
 * @param options - Optional SimpleBar options (defaults include `autoHide: true`).
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
		});

		onCleanup(() => {
			bar.unMount();
		});
	});
}
