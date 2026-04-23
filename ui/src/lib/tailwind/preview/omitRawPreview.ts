/**
 * Returns true when we intentionally skip raw value preview (arbitrary brackets, etc.).
 *
 * @param baseUtility - Output of {@link getBaseUtility}.
 */
export function omitRawPreview(baseUtility: string): boolean {
	if (baseUtility.includes("[") || baseUtility.includes("]")) {
		return true;
	}
	return false;
}
