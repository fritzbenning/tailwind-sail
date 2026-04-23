/**
 * Extracts a custom property name from a color utility that uses `var()` or Tailwind 4 `-(...)`.
 *
 * @param base - Base utility segment (no variants), e.g. `text-[var(--foo)]` or `bg-(--bar)`.
 * @returns The `--*` name, or `null` when not a simple var reference.
 *
 * @example getClassValueVariable("text-[var(--x)]") => "--x"
 * @example getClassValueVariable("text-(--foo)") => "--foo"
 * @example getClassValueVariable("text-red-500") => null
 */
export function getClassValueVariable(base: string): string | null {
	const paren = /-\((--[a-zA-Z0-9_-]+)\)$/.exec(base);
	if (paren?.[1]) {
		return paren[1];
	}

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
