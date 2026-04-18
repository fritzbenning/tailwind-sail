import { IconInfo } from "./Icons";
import "./EmptyState.css";

const copy: Record<"needString" | "noTailwind", string> = {
	needString: "Please select a string literal that contains Tailwind classes.",
	noTailwind:
		"No Tailwind classes were detected in the selected string. Use a string literal with space-separated Tailwind utility classes.",
};

export function EmptyState(props: { kind: "needString" | "noTailwind" }) {
	return (
		<div class="sail-message-box" role="status">
			<span class="sail-message-box-icon-wrap" aria-hidden="true">
				<IconInfo />
			</span>
			<span class="sail-message-box-text">{copy[props.kind]}</span>
		</div>
	);
}
