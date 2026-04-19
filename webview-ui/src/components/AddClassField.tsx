import { type Accessor, createEffect, createSignal } from "solid-js";
import { vscode } from "../vscode";
import { Input } from "./Input";

export function AddClassField(props: {
	variantPrefix: Accessor<string>;
	/** Theme "light" chip is a filter-only sentinel (no `light:` auto-prefix); strip stray `light:` when syncing. */
	stripIfThemeLightFilter: Accessor<boolean>;
}) {
	const [inputEl, setInputEl] = createSignal<HTMLInputElement | undefined>();

	const applyPrefixChange = (
		el: HTMLInputElement,
		p: string,
		themeLightFilter: boolean,
	) => {
		const oldP = el.dataset.sailVariantPrefix ?? "";
		const stripLight =
			themeLightFilter &&
			!p.startsWith("light:") &&
			el.value.startsWith("light:");
		if (p === oldP && !stripLight) {
			return;
		}
		let cur = el.value;
		if (stripLight) {
			cur = cur.slice("light:".length);
		}
		let suffix: string;
		if (oldP.length === 0) {
			suffix = p.length > 0 && cur.startsWith(p) ? cur.slice(p.length) : cur;
		} else if (cur.startsWith(oldP)) {
			suffix = cur.slice(oldP.length);
		} else {
			suffix = cur;
		}
		el.value = p + suffix;
		el.dataset.sailVariantPrefix = p;
		if (document.activeElement === el) {
			const len = el.value.length;
			queueMicrotask(() => el.setSelectionRange(len, len));
		}
	};

	createEffect(() => {
		const el = inputEl();
		const p = props.variantPrefix();
		const themeLight = props.stripIfThemeLightFilter();
		if (!el) {
			return;
		}
		applyPrefixChange(el, p, themeLight);
	});

	return (
		<>
			<div
				class="mb-[var(--sail-panel-block-gap)] box-border h-px shrink-0 border-0 bg-[var(--vscode-widget-border)] p-0"
				role="presentation"
			/>
			<div class="sail-add-class-section box-border px-[var(--sail-panel-inline-pad)]">
				<div class="sail-panel-title mb-2.5 mt-0 text-[0.7em] font-semibold uppercase tracking-[0.05em] text-[var(--vscode-descriptionForeground)]">
					Add
				</div>
				<Input
					ref={setInputEl}
					type="text"
					spellcheck={false}
					autocomplete="off"
					placeholder="New class"
					onKeyDown={(e) => {
						const t = e.currentTarget;
						const p = props.variantPrefix();
						if (e.key === "Enter") {
							e.preventDefault();
							const raw = t.value;
							const full = raw.trim();
							const util = full.startsWith(p)
								? full.slice(p.length).trim()
								: full;
							if (util.length > 0) {
								vscode.postMessage({
									type: "sailAddClass",
									className: raw.trim(),
								});
								t.value = p;
								t.dataset.sailVariantPrefix = p;
							}
							t.blur();
						} else if (e.key === "Escape") {
							e.preventDefault();
							t.value = p;
							t.dataset.sailVariantPrefix = p;
							t.blur();
						}
					}}
				/>
			</div>
		</>
	);
}
