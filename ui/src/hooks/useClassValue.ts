import type { Accessor } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { getClassWithoutActiveVariant, type VariantState } from "../lib";

/**
 * Local edit state for one class row: display value may hide redundant variant prefixes; edit mode holds a draft until blur.
 *
 * @param options.fullClass - Authoritative class string from the host model.
 * @param options.hideVariantPrefixes - When true and blurred, strip variants aligned with `variantState`.
 * @param options.variantState - Normalized variant axes (`normalizeVariantState(panel, activeVariants)`).
 * @returns Signals and handlers for the class `<input>` (see implementation for members).
 *
 * @example useClassValue({ fullClass, hideVariantPrefixes, variantState }).inputValue() => current display or draft text
 */
export function useClassValue(options: {
	fullClass: Accessor<string>;
	hideVariantPrefixes: Accessor<boolean>;
	variantState: Accessor<VariantState>;
}) {
	const [editMode, setEditMode] = createSignal(false);
	const [draftValue, setDraftValue] = createSignal(options.fullClass());

	const displayValue = () =>
		options.hideVariantPrefixes()
			? getClassWithoutActiveVariant(
					options.fullClass(),
					options.variantState(),
				)
			: options.fullClass();

	const inputValue = () => (editMode() ? draftValue() : displayValue());
	const classValue = () => (editMode() ? draftValue() : options.fullClass());

	const onFocus = () => {
		setEditMode(true);
		setDraftValue(options.fullClass());
	};

	const onBlur = () => {
		setEditMode(false);
	};

	const onUpdate = (value: string) => {
		setDraftValue(value);
	};

	createEffect(() => {
		if (!editMode()) {
			setDraftValue(options.fullClass());
		}
	});

	return {
		inputValue,
		classValue,
		onFocus,
		onBlur,
		onUpdate,
	};
}
