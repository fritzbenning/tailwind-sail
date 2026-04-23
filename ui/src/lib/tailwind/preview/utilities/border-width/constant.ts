/** Longest-match-first sorting uses these when stripping edge prefixes from border width utilities. */
export const BORDER_EDGE_PREFIXES: readonly string[] = [
	"border-bs-",
	"border-be-",
	"border-x-",
	"border-y-",
	"border-t-",
	"border-r-",
	"border-b-",
	"border-l-",
	"border-s-",
	"border-e-",
];

/** Border utilities that imply default width without a numeric token (same as bare `border`). */
export const BORDER_EDGE_ONLY = new Set<string>([
	"border-x",
	"border-y",
	"border-t",
	"border-r",
	"border-b",
	"border-l",
	"border-s",
	"border-e",
	"border-bs",
	"border-be",
]);
