import { InlineNotification } from "./InlineNotification";

const copy: Record<"noString" | "noTailwind", string> = {
	noString: "Please select a string literal that contains Tailwind classes.",
	noTailwind:
		"No Tailwind classes were detected in the selected string. Use a string literal with space-separated Tailwind utility classes.",
};

export function ClassEmptyState(props: { kind: "noString" | "noTailwind" }) {
	return (
		<InlineNotification role="status">
			<p>{copy[props.kind]}</p>
		</InlineNotification>
	);
}
