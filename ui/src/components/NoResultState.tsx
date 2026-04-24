import { InlineNotification } from "./InlineNotification";
import { LinkButton } from "./LinkButton";

export function NoResultState(props: { onReset: () => void }) {
	return (
		<InlineNotification
			class="mt-4"
			role="status"
			aria-live="polite"
			showInfoIcon={false}
		>
			<p>No classes matched the filter settings.</p>
			<LinkButton onClick={() => props.onReset()}>Reset filters</LinkButton>
		</InlineNotification>
	);
}
