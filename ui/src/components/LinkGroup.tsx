import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export type LinkGroupProps = {
	children: JSX.Element;
	/** Accessible name for the group of link actions. */
	"aria-label": string;
	class?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "class" | "children" | "role">;

/**
 * Lays out {@link LinkButton} (or other inline actions) in a wrapped row with a single group label for screen readers.
 */
export function LinkGroup(props: LinkGroupProps) {
	const [local, rest] = splitProps(props, ["children", "class", "aria-label"]);

	return (
		<div
			class={twMerge(
				"flex flex-wrap items-center gap-x-3 gap-y-2",
				local.class,
			)}
			role="group"
			aria-label={local["aria-label"]}
			{...rest}
		>
			{local.children}
		</div>
	);
}
