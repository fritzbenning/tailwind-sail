import type {
	SailWebviewPanelModel,
	SailWebviewViewModel,
} from "@sail/protocol";
import {
	createEffect,
	createSignal,
	Match,
	onCleanup,
	onMount,
	Switch,
} from "solid-js";
import { EmptyState } from "./components/EmptyState";
import { ParsedClassesPanel } from "./components/ParsedClassesPanel";
import {
	type ClientFilterState,
	defaultClientFilterState,
	filterStateIsAvailable,
} from "./matchClasses";

let deferRender = false;
let pendingModel: SailWebviewViewModel | null = null;

function mergeFilter(
	prev: ClientFilterState,
	patch: Partial<ClientFilterState>,
): ClientFilterState {
	return {
		semantic: patch.semantic ?? prev.semantic,
		variant: patch.variant ?? prev.variant,
		classSearch: patch.classSearch ?? prev.classSearch,
		hideMatchingVariantPrefixes:
			patch.hideMatchingVariantPrefixes ?? prev.hideMatchingVariantPrefixes,
	};
}

export function App() {
	const [model, setModel] = createSignal<SailWebviewViewModel>({
		kind: "needString",
	});
	const [filter, setFilter] = createSignal<ClientFilterState>(
		defaultClientFilterState(),
	);

	const receiveModel = (m: SailWebviewViewModel) => {
		if (deferRender) {
			pendingModel = m;
			return;
		}
		setModel(m);
	};

	onMount(() => {
		const onMessage = (ev: MessageEvent) => {
			const d = ev.data;
			if (d?.type === "sailUpdate" && d.model) {
				receiveModel(d.model as SailWebviewViewModel);
			}
		};
		window.addEventListener("message", onMessage);

		const onFocusIn = (e: Event) => {
			const t = e.target;
			if (
				t instanceof HTMLInputElement &&
				t.classList.contains("class-token-input")
			) {
				deferRender = true;
			}
		};
		const onFocusOut = (e: Event) => {
			const t = e.target;
			if (
				!(t instanceof HTMLInputElement) ||
				!t.classList.contains("class-token-input")
			) {
				return;
			}
			setTimeout(() => {
				const ae = document.activeElement;
				if (
					ae instanceof HTMLInputElement &&
					ae.classList.contains("class-token-input")
				) {
					return;
				}
				deferRender = false;
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

	createEffect(() => {
		const m = model();
		const f = filter();
		if (m.kind === "panel" && !filterStateIsAvailable(m, f)) {
			setFilter(defaultClientFilterState());
		}
	});

	const patchFilter = (patch: Partial<ClientFilterState>) => {
		setFilter((prev) => mergeFilter(prev, patch));
	};

	return (
		<Switch>
			<Match when={model().kind === "needString"}>
				<EmptyState kind="needString" />
			</Match>
			<Match when={model().kind === "noTailwind"}>
				<EmptyState kind="noTailwind" />
			</Match>
			<Match when={model().kind === "panel"}>
				<ParsedClassesPanel
					panel={model() as SailWebviewPanelModel}
					filter={filter()}
					setFilter={(next) => setFilter(next)}
					onPatchFilter={patchFilter}
				/>
			</Match>
		</Switch>
	);
}
