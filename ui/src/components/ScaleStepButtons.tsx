import type { Accessor } from "solid-js";
import { createMemo, Show } from "solid-js";
import { stepNamedScaleClass } from "../lib/tailwind/scale/stepNamedScaleClass";
import { vscode } from "../vscode";
import { ButtonSlot } from "./ButtonSlot";
import { IconButton } from "./IconButton";
import { IconChevronLeft } from "./IconChevronLeft";
import { IconChevronRight } from "./IconChevronRight";

/**
 * Chevron buttons that step the trailing **breakpoint / named size** keyword on the class utility (`max-w-md` → `max-w-lg`, `text-sm` → `text-base`), when applicable.
 *
 * Uses {@link IconButton} row chrome. Hidden when the utility has no recognized named tail (e.g. numeric spacing).
 *
 * @param props.tokenIndex - Host token index for `tailwind-sail-edit-class`.
 * @param props.fullClass - Authoritative class string (including variants).
 */
export function ScaleStepButtons(props: {
	tokenIndex: number;
	fullClass: Accessor<string>;
}) {
	const stepDownClass = createMemo(() =>
		stepNamedScaleClass(props.fullClass(), -1),
	);

	const stepUpClass = createMemo(() =>
		stepNamedScaleClass(props.fullClass(), 1),
	);

	const shouldShow = createMemo(
		() => stepDownClass() !== null || stepUpClass() !== null,
	);

	const handleStep = (direction: 1 | -1) => {
		const next = stepNamedScaleClass(
			props.fullClass(),
			direction,
		);

		if (!next) {
			return;
		}

		vscode.postMessage({
			type: "tailwind-sail-edit-class",
			tokenIndex: props.tokenIndex,
			newValue: next,
		});
	};

	return (
		<Show when={shouldShow()}>
			<div class="flex shrink-0 items-center gap-1 px-0.5">
				<ButtonSlot>
					<IconButton
						ariaLabel="Step down named breakpoint or size keyword"
						title="Smaller breakpoint / size keyword"
						disabled={stepDownClass() === null}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleStep(-1);
						}}
					>
						<IconChevronLeft />
					</IconButton>
				</ButtonSlot>
				<ButtonSlot>
					<IconButton
						ariaLabel="Step up named breakpoint or size keyword"
						title="Larger breakpoint / size keyword"
						disabled={stepUpClass() === null}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleStep(1);
						}}
					>
						<IconChevronRight />
					</IconButton>
				</ButtonSlot>
			</div>
		</Show>
	);
}
