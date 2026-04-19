import { Match, Switch } from "solid-js";
import { ClassList } from "./components/ClassList";
import { EmptyState } from "./components/EmptyState";
import { useWebviewModal } from "./hooks/useWebviewModal";

export function App() {
	const [model] = useWebviewModal();

	return (
		<Switch>
			<Match when={model().kind === "noString"}>
				<EmptyState kind="noString" />
			</Match>
			<Match when={model().kind === "noTailwind"}>
				<EmptyState kind="noTailwind" />
			</Match>
			<Match when={model().kind === "panel"}>
				<ClassList model={model} />
			</Match>
		</Switch>
	);
}
