/**
 * Returns the base utility name for the add-class field: if `inputValue` starts
 * with `variantPrefix`, returns the remainder (trimmed); otherwise returns `inputValue`.
 *
 * @param inputValue - Add-class field text.
 * @param variantPrefix - Active variant prefix (e.g. `md:`).
 * @returns Class token without the leading prefix, or the original value when the prefix does not apply.
 *
 * @example getClassNameFromInputValue("md:flex", "md:") => "flex"
 */
export function getClassNameFromInputValue(
	inputValue: string,
	variantPrefix: string,
): string {
	return inputValue.startsWith(variantPrefix)
		? inputValue.slice(variantPrefix.length).trim()
		: inputValue;
}
