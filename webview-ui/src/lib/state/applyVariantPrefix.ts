import { stripLightPrefix } from "./stripLightPrefix";

/** Keeps the add-class input in sync when sidebar variant filters change. */
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
