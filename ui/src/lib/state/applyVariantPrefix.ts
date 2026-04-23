import { stripLightPrefix } from "./stripLightPrefix";

/**
 * Keeps the add-class input in sync when sidebar variant filters change.
 *
 * @param input - The add-class `<input>` element (uses `dataset.variantPrefix`).
 * @param variantPrefix - New prefix string from variant filters.
 * @returns `void`; may update `input.value` and caret position.
 *
 * @example applyVariantPrefix(input, "sm:") - sets `input.value` to `sm:` plus the previous suffix body.
 */
export function applyVariantPrefix(
	input: HTMLInputElement,
	variantPrefix: string,
): void {
	const previousVariantPrefix = input.dataset.variantPrefix ?? "";
	const shouldStripLightPrefixes =
		!variantPrefix.startsWith("light:") &&
		stripLightPrefix(input.value) !== input.value;

	if (variantPrefix === previousVariantPrefix && !shouldStripLightPrefixes) {
		return;
	}

	let currentValue = input.value;

	if (shouldStripLightPrefixes) {
		currentValue = stripLightPrefix(currentValue);
	}

	let bodyAfterPrefix: string;

	if (previousVariantPrefix.length === 0) {
		bodyAfterPrefix =
			variantPrefix.length > 0 && currentValue.startsWith(variantPrefix)
				? currentValue.slice(variantPrefix.length)
				: currentValue;
	} else if (currentValue.startsWith(previousVariantPrefix)) {
		bodyAfterPrefix = currentValue.slice(previousVariantPrefix.length);
	} else {
		bodyAfterPrefix = currentValue;
	}

	input.value = variantPrefix + bodyAfterPrefix;
	input.dataset.variantPrefix = variantPrefix;

	if (document.activeElement === input) {
		const caretAtEnd = input.value.length;
		queueMicrotask(() => input.setSelectionRange(caretAtEnd, caretAtEnd));
	}
}
