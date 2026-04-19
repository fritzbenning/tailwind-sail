import type { Accessor } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import {
	getDisplayClassWithoutRedundantVariantModifiers,
	type VariantState,
} from "../lib";

/**
 * Local edit state for a single class string in the panel: blurred value may hide
 * redundant variant prefixes; focused value is a draft synced from `fullClass` until blur.
 *
 * @param options.fullClass - Authoritative class string from the host model
 * @param options.hideMatchingVariantPrefixes - When true and blurred, strip variants that match the effective state
 * @param options.variantState - Normalized variant axes (`normalizeVariantState(panel, activeVariants)`)
 * @returns Input/swatch helpers: `inputValue`, `swatchClass`, and focus/draft handlers
 */
export function useClassValue(options: {
	fullClass: Accessor<string>;
	hideMatchingVariantPrefixes: Accessor<boolean>;
	variantState: Accessor<VariantState>;
}) {
	const displayWhenBlurred = () =>
		options.hideMatchingVariantPrefixes()
			? getDisplayClassWithoutRedundantVariantModifiers(
					options.fullClass(),
					options.variantState(),
				)
			: options.fullClass();

	const [focused, setFocused] = createSignal(false);
	const [draft, setDraft] = createSignal(options.fullClass());

	createEffect(() => {
		if (!focused()) {
			setDraft(options.fullClass());
		}
	});

	const inputValue = () => (focused() ? draft() : displayWhenBlurred());
	const swatchClass = () => (focused() ? draft() : options.fullClass());

	const onFocus = () => {
		setFocused(true);
		setDraft(options.fullClass());
	};

	const onBlur = () => {
		setFocused(false);
	};

	const onDraftInput = (value: string) => {
		setDraft(value);
	};

	return {
		inputValue,
		swatchClass,
		onFocus,
		onBlur,
		onDraftInput,
	};
}
