import { createSignal, Match, Switch } from "solid-js";
import { ClassList } from "./components/ClassList";
import { EmptyState } from "./components/EmptyState";
import { type TabId, Tabs } from "./components/Tabs";
import { ThemePanel } from "./components/ThemePanel";
import { useWebviewModal } from "./hooks/useWebviewModal";

export function App() {
	const host = useWebviewModal();
	const [tab, setTab] = createSignal<TabId>("classes");

	return (
		<div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
			<Tabs active={tab()} onChange={setTab} />
			<Switch>
				<Match when={tab() === "classes"}>
					<Switch>
						<Match when={host.model().kind === "noString"}>
							<EmptyState kind="noString" />
						</Match>
						<Match when={host.model().kind === "noTailwind"}>
							<EmptyState kind="noTailwind" />
						</Match>
						<Match when={host.model().kind === "panel"}>
							<ClassList
								model={host.model}
								cssVariables={host.cssVariables}
								showUtilityPreview={host.showUtilityPreview}
							/>
						</Match>
					</Switch>
				</Match>
				<Match when={tab() === "theme"}>
					<ThemePanel variables={host.cssVariables} />
				</Match>
			</Switch>
		</div>
	);
}
