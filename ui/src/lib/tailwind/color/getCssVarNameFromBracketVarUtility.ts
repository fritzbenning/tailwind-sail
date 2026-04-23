/**
 * If `base` is like `text-[var(--foo)]` or `bg-[var(--bar)]`, returns `--foo` / `--bar`.
 *
 * @param base - Base utility segment (no variants).
 * @returns The custom property name including `--`, or `null`.
 */
export function getCssVarNameFromBracketVarUtility(
	base: string,
): string | null {
	const idx = base.indexOf("-[");
	if (idx === -1) {
		return null;
	}
	const bracket = base.slice(idx + 1);
	if (!bracket.startsWith("[") || !bracket.endsWith("]")) {
		return null;
	}
	const inner = bracket.slice(1, -1).trim();
	const m = /^var\((--[a-zA-Z0-9_-]+)\)$/.exec(inner);
	return m?.[1] ?? null;
}
