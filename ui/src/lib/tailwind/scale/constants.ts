/**
 * Default **breakpoint** keywords (`theme.screens`): `sm`, `md`, `lg`, `xl`, `2xl`, plus larger named tails used by many utilities (`xs`, `3xl`…).
 *
 * @see https://tailwindcss.com/docs/responsive-design — Tailwind calls these **breakpoints**.
 */
export const GENERAL_NAMED_STEPS = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"5xl",
	"6xl",
	"7xl",
	"8xl",
	"9xl",
] as const;

/**
 * **`font-size`** scale keywords for `text-*` utilities (`text-sm`, `text-base`, …), excluding `md` (not a default `text-*` size).
 *
 * @see https://tailwindcss.com/docs/font-size
 */
export const TYPOGRAPHY_NAMED_STEPS = [
	"xs",
	"sm",
	"base",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"5xl",
	"6xl",
	"7xl",
	"8xl",
	"9xl",
] as const;
