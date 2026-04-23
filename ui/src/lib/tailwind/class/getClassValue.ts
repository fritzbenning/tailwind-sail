/**
 * Returns the single hyphen-free segment after `prefix`, or `undefined` when there is no match.
 *
 * @param baseUtility - Full utility (e.g. `text-sm`) without a leading `@`.
 * @param prefix - Prefix including its trailing `-` when the value follows it (e.g. `text-`).
 * @returns The suffix when it is non-empty, has no `-`, and `baseUtility` starts with `prefix`.
 *
 * @example getClassValue("text-sm", "text-") => "sm"
 * @example getClassValue("text-2xl", "text-") => "2xl"
 * @example getClassValue("text-red-500", "text-") => undefined
 * @example getClassValue("text-sm", "font-") => undefined
 */
export function getClassValue(
	baseUtility: string,
	prefix: string,
): string | undefined {
	if (!baseUtility.startsWith(prefix)) {
		return undefined;
	}

	const tail = baseUtility.slice(prefix.length);

	if (!tail || tail.includes("-")) {
		return undefined;
	}

	return tail;
}
