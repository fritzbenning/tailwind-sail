import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

export interface ToggleSwitchProps
	extends Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "children"> {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	children: JSX.Element;
}

export function ToggleSwitch(props: ToggleSwitchProps) {
	const [local, rest] = splitProps(props, [
		"checked",
		"onCheckedChange",
		"children",
		"class",
	]);

	return (
		<label
			{...rest}
			class={[
				"relative m-0 inline-flex w-full cursor-pointer select-none items-center gap-2 py-0 pr-0 pl-9 text-[0.8em] leading-[1.35] text-(--vscode-descriptionForeground)",
				local.class,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<span class="absolute top-1/2 left-0 h-4 w-6 -translate-y-1/2">
				<input
					type="checkbox"
					class="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer appearance-none opacity-0"
					checked={local.checked}
					onChange={(e) => local.onCheckedChange(e.currentTarget.checked)}
				/>
				<span
					class="relative box-border block h-full w-full overflow-visible rounded-lg border border-solid border-(--vscode-input-border,var(--vscode-widget-border)) bg-(--vscode-input-background) transition-all duration-100 after:absolute after:top-1/2 after:left-0.5 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:rounded-full after:bg-(--vscode-foreground) after:opacity-[0.65] after:transition-all after:duration-100 after:content-[''] after:translate-x-0 peer-checked:border-(--vscode-button-background) peer-checked:bg-(--vscode-button-background) peer-checked:after:translate-x-2 peer-checked:after:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--vscode-focusBorder)"
					aria-hidden="true"
				/>
			</span>
			<span class="min-w-0 flex-1">{local.children}</span>
		</label>
	);
}
