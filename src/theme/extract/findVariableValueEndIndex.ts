/**
 * Index of the terminating top-level `;` for a custom property value, or `fullText.length`
 * if none (same end-detection rules as `getVariableValue`).
 */
export function findVariableValueEndIndex(
	fullText: string,
	valueStartIndex: number,
): number {
	let i = valueStartIndex;
	const n = fullText.length;
	let depth = 0;
	while (i < n) {
		const c = fullText[i]!;
		if (c === "(") {
			depth++;
		} else if (c === ")") {
			if (depth > 0) {
				depth--;
			}
		} else if (c === ";" && depth === 0) {
			return i;
		}
		i++;
	}
	return n;
}
