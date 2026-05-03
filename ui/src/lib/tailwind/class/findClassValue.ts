/**
 * Returns the single hyphen-free segment after `prefix`, when it exists.
 *
 * @param baseUtility - Full utility (e.g. `text-sm`) without a leading `@`.
 * @param prefix - Prefix including its trailing `-` when the value follows it (e.g. `text-`).
 * @returns The suffix when it is non-empty, has no `-`, and `baseUtility` starts with `prefix`.
 *
 * @example findClassValue("text-sm", "text-") => "sm"
 * @example findClassValue("text-2xl", "text-") => "2xl"
 * @example findClassValue("text-red-500", "text-") => undefined
 * @example findClassValue("text-sm", "font-") => undefined
 */
export function findClassValue(
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
