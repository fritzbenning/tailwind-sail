import { createSignal, Match, Switch } from "solid-js";
import { ClassList } from "./components/ClassList";
import { EmptyState } from "./components/EmptyState";
import { type SidebarTabId, SidebarTabs } from "./components/SidebarTabs";
import { VariablesPanel } from "./components/VariablesPanel";
import { useWebviewModal } from "./hooks/useWebviewModal";

export function App() {
	const host = useWebviewModal();
	const [tab, setTab] = createSignal<SidebarTabId>("classes");

	return (
		<div class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
			<SidebarTabs active={tab()} onChange={setTab} />
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
				<Match when={tab() === "variables"}>
					<VariablesPanel variables={host.cssVariables} />
				</Match>
			</Switch>
		</div>
	);
}
