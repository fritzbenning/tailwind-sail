import type { Accessor } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import {
	getDisplayClassWithoutRedundantVariantModifiers,
	type VariantState,
} from "../lib";

export function useClassValue(options: {
	fullClass: Accessor<string>;
	hideMatchingVariantPrefixes: Accessor<boolean>;
	variantEff: Accessor<VariantState>;
}) {
	const displayWhenBlurred = () =>
		options.hideMatchingVariantPrefixes()
			? getDisplayClassWithoutRedundantVariantModifiers(
					options.fullClass(),
					options.variantEff(),
				)
			: options.fullClass();

	const [focused, setFocused] = createSignal(false);
	const [draft, setDraft] = createSignal(options.fullClass());

	createEffect(() => {
		if (!focused()) {
			setDraft(options.fullClass());
		}
	});

	const shownValue = () => (focused() ? draft() : displayWhenBlurred());
	const classForSwatch = () => (focused() ? draft() : options.fullClass());

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
		shownValue,
		classForSwatch,
		onFocus,
		onBlur,
		onDraftInput,
	};
}
