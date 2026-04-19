import type { SailWebviewPanelModel } from "sail-protocol";
import { Match, Switch } from "solid-js";
import { EmptyState } from "./components/EmptyState";
import { ParsedClassesPanel } from "./components/ParsedClassesPanel";
import { useFilter } from "./hooks/useFilter";
import { useWebviewModal } from "./hooks/useWebviewModal";

export function App() {
	const [model] = useWebviewModal();
	const { filter, setFilter, patchFilter } = useFilter(model);

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
