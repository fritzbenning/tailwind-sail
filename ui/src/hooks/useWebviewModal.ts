import { createSignal, onCleanup, onMount } from "solid-js";
import { applyVariablesToBody } from "../lib/css/applyVariablesToBody";
import type { CssVariableEntry, ThemeFileScanInfo, WebviewModal } from "../types";

const CLASS_TOKEN_INPUT_CLASS = "class-token-input";

export type WebviewHostState = {
	readonly model: () => WebviewModal;
	readonly cssVariables: () => readonly CssVariableEntry[];
	readonly themeFileScan: () => ThemeFileScanInfo;
	readonly showUtilityPreview: () => boolean;
};

/**
 * Webview modal state from host `postMessage`: queues panel updates while a class input is focused,
 * applies merged CSS variables to `body`, and tracks utility-preview visibility.
 *
 * @returns Accessors for the panel model, workspace variable list, theme scan info, and preview flag.
 *
 * @example const { model, cssVariables, themeFileScan } = useWebviewModal()
 */
export function useWebviewModal(): WebviewHostState {
	const [model, setModel] = createSignal<WebviewModal>({
		kind: "noString",
	});
	const [cssVariables, setCssVariables] = createSignal<
		readonly CssVariableEntry[]
	>([]);
	const [themeFileScan, setThemeFileScan] = createSignal<ThemeFileScanInfo>({
		configuredPathCount: 0,
		resolvedCssPathCount: 0,
		hasWorkspace: true,
	});
	const [showUtilityPreview, setShowUtilityPreview] = createSignal(true);

	let deferModelApply = false;
	let pendingModel: WebviewModal | null = null;

	const receiveModel = (m: WebviewModal) => {
		if (deferModelApply) {
			pendingModel = m;
			return;
		}
		setModel(m);
	};

	onMount(() => {
		const onMessage = (ev: MessageEvent) => {
			const d = ev.data;
			if (d?.type === "tailwind-sail-update" && d.model) {
				receiveModel(d.model as WebviewModal);
				return;
			}
			if (d?.type === "tailwind-sail-variables" && Array.isArray(d.variables)) {
				const vars = d.variables as CssVariableEntry[];
				// Apply `--workspace-*` on `document.body` *before* updating the signal: Solid runs
				// subscribers synchronously, and previews resolve `var(--workspace-*)` on descendants.
				applyVariablesToBody(vars);
				setCssVariables(vars);
				const scan = d.themeFileScan as ThemeFileScanInfo | undefined;
				if (
					scan &&
					typeof scan.configuredPathCount === "number" &&
					typeof scan.resolvedCssPathCount === "number" &&
					typeof scan.hasWorkspace === "boolean"
				) {
					setThemeFileScan(scan);
				}
				return;
			}
			if (d?.type === "tailwind-sail-shell") {
				if (typeof d.sidebarPaddingXPx === "number") {
					document.documentElement.style.setProperty(
						"--sidebarPaddingX",
						`${d.sidebarPaddingXPx}px`,
					);
				}
				if (typeof d.sidebarPaddingTopPx === "number") {
					document.documentElement.style.setProperty(
						"--sidebarPaddingTop",
						`${d.sidebarPaddingTopPx}px`,
					);
				}
				if (typeof d.showSidebarRightBorder === "boolean") {
					document.documentElement.classList.toggle(
						"with-border-right",
						d.showSidebarRightBorder,
					);
				}
				if (typeof d.showUtilityPreview === "boolean") {
					setShowUtilityPreview(d.showUtilityPreview);
				}
			}
		};
		window.addEventListener("message", onMessage);

		const onFocusIn = (e: Event) => {
			const t = e.target;
			if (
				t instanceof HTMLInputElement &&
				t.classList.contains(CLASS_TOKEN_INPUT_CLASS)
			) {
				deferModelApply = true;
			}
		};

		const onFocusOut = (e: Event) => {
			const t = e.target;
			if (
				!(t instanceof HTMLInputElement) ||
				!t.classList.contains(CLASS_TOKEN_INPUT_CLASS)
			) {
				return;
			}
			setTimeout(() => {
				const ae = document.activeElement;
				if (
					ae instanceof HTMLInputElement &&
					ae.classList.contains(CLASS_TOKEN_INPUT_CLASS)
				) {
					return;
				}
				deferModelApply = false;
				if (pendingModel) {
					const pm = pendingModel;
					pendingModel = null;
					setModel(pm);
				}
			}, 0);
		};

		document.addEventListener("focusin", onFocusIn, true);
		document.addEventListener("focusout", onFocusOut, true);

		onCleanup(() => {
			window.removeEventListener("message", onMessage);
			document.removeEventListener("focusin", onFocusIn, true);
			document.removeEventListener("focusout", onFocusOut, true);
		});
	});

	return {
		model,
		cssVariables,
		themeFileScan,
		showUtilityPreview,
	};
}
