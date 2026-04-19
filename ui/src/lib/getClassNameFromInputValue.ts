export function getClassNameFromInputValue(
	inputValue: string,
	variantPrefix: string,
): string {
	return inputValue.startsWith(variantPrefix)
		? inputValue.slice(variantPrefix.length).trim()
		: inputValue;
}
