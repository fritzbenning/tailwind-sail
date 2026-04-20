import { Match, Switch } from "solid-js";
import { ClassList } from "./components/ClassList";
import { EmptyState } from "./components/EmptyState";
import { useWebviewModal } from "./hooks/useWebviewModal";

export function App() {
	const [model] = useWebviewModal();

	return (
		<div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
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
		</div>
	);
}
