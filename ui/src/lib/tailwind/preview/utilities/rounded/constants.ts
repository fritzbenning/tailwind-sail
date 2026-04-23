/** Tailwind v4 default radius (px) — custom `rounded-5xl` etc. has no entry in the scale. */
export const DEFAULT_PX = 4;

/** Default-theme `rounded-*` key → px when the workspace has no matching `--radius-*` token. */
export const SCALE_PX: Readonly<Record<string, number>> = {
	none: 0,
	xs: 2,
	sm: 4,
	md: 6,
	lg: 8,
	xl: 12,
	"2xl": 16,
	"3xl": 24,
	"4xl": 32,
	full: 9999,
};

export const BORDER_RADIUS_CLASSES = new Set<string>([
	"rounded-t",
	"rounded-r",
	"rounded-b",
	"rounded-l",
	"rounded-tl",
	"rounded-tr",
	"rounded-br",
	"rounded-bl",
	"rounded-ts",
	"rounded-te",
	"rounded-bs",
	"rounded-be",
	"rounded-ss",
	"rounded-se",
	"rounded-es",
	"rounded-ee",
	"rounded-s",
	"rounded-e",
	"rounded-x",
	"rounded-y",
]);
