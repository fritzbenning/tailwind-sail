import { createSignal, onCleanup, onMount } from "solid-js";
import type { WebviewModal } from "../types";

const CLASS_TOKEN_INPUT_CLASS = "class-token-input";

// Host `sailUpdate` → model signal; defers applies while a class-token input is focused.
export function useWebviewModal() {
	const [model, setModel] = createSignal<WebviewModal>({
		kind: "noString",
	});

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
			if (d?.type === "sailUpdate" && d.model) {
				receiveModel(d.model as WebviewModal);
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

	return [model, setModel] as const;
}
