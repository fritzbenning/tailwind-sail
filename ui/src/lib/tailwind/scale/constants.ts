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

/**
 * **`border-radius`** scale for **global** `rounded-*` utilities (`rounded-sm`, theme default `rounded`, …).
 * The empty string marks the bare `rounded` token (between `sm` and `md` in Tailwind’s default theme).
 *
 * @see https://tailwindcss.com/docs/border-radius
 */
export const ROUNDED_NAMED_STEPS = [
	"none",
	"sm",
	"",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
	"4xl",
	"full",
] as const;
