import { LinkButton } from "./LinkButton";

export function NoResultState(props: { onReset: () => void }) {
	return (
		<div
			class="m-0 mt-4 box-border shrink-0 px-(--sidebarPaddingX)"
			role="status"
			aria-live="polite"
		>
			<p class="m-0 mb-2 text-[0.9em] leading-[1.45] text-(--vscode-descriptionForeground)">
				No classes matched the filter settings.
			</p>
			<LinkButton onClick={() => props.onReset()}>Reset filters</LinkButton>
		</div>
	);
}
