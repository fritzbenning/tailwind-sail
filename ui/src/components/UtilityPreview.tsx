import type { Accessor } from "solid-js";
import { createMemo, Show } from "solid-js";
import { getClassName } from "../lib/tailwind/class/getClassName";
import { getRawPreview } from "../lib/tailwind/preview/getRawPreview";
import { findBackgroundColorClass } from "../lib/tailwind/preview/values/color/findBackgroundColorClass";
import type { CssVariableEntry } from "../types";
import { ColorSwatch } from "./ColorSwatch";

/**
 * Color swatch and/or raw token preview for one class row (respects `showUtilityPreview`).
 */
export function UtilityPreview(props: {
	fullClass: string;
	showUtilityPreview: Accessor<boolean>;
	knownCssVariableNames: Accessor<ReadonlySet<string>>;
	/** Subscribed so previews refresh when the workspace scan updates injected `--workspace-*` values. */
	cssVariables: Accessor<readonly CssVariableEntry[]>;
}) {
	const bg = createMemo(() => {
		if (!props.showUtilityPreview()) {
			return null;
		}
		props.cssVariables();
		return findBackgroundColorClass(props.fullClass, {
			knownCssVariableNames: props.knownCssVariableNames(),
		});
	});

	const raw = createMemo(() => {
		if (!props.showUtilityPreview()) {
			return undefined;
		}
		if (bg() !== null) {
			return undefined;
		}
		const vars = props.cssVariables();

		return getRawPreview(getClassName(props.fullClass), vars);
	});

	return (
		<Show when={props.showUtilityPreview()}>
			<div class="flex min-w-8 shrink-0 items-center justify-end">
				<Show when={bg()}>
					{(bc) => <ColorSwatch backgroundColorClass={bc()} />}
				</Show>
				<Show when={!bg() && raw()}>
					<span class="truncate font-mono text-3xs text-(--vscode-descriptionForeground)">
						{raw()}
					</span>
				</Show>
			</div>
		</Show>
	);
}
