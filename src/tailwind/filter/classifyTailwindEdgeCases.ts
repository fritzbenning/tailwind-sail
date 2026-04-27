/**
 * Prefix rules in {@link ./categories#UTILITY_CATEGORIES} cannot express every disambiguation: `border-`
 * would swallow table utilities and blend modes; `bg-` would swallow `bg-blend-*`; bare `flex` / `grid`
 * would steal `flex-*` / `grid-*`. This runs before per-category prefix iteration in
 * {@link ./classify/classifyTailwindUtility | classifyTailwindUtility}.
 */
export function classifyTailwindEdgeCases(utility: string): string | undefined {
	// Flex / grid: bare display tokens; `flex` / `grid` are not used as list prefixes (would steal `flex-*` / `grid-*`).
	if (utility === "flex" || utility === "inline-flex") {
		return "flex";
	}
	if (utility === "grid" || utility === "inline-grid") {
		return "grid";
	}
	// Table (border-break vs border)
	if (utility === "table-auto" || utility === "table-fixed") {
		return "table";
	}
	if (
		utility === "border-collapse" ||
		utility === "border-separate" ||
		utility.startsWith("border-spacing-")
	) {
		return "table";
	}
	// Effect (blends: listed under "Effects" in the docs, not "Backgrounds")
	if (utility.startsWith("bg-blend-") || utility.startsWith("mix-blend-")) {
		return "effect";
	}
	// Layout: `display: inline` is a single-token utility; `inline` must not steal `inline-flex` (flex)
	if (utility === "inline") {
		return "layout";
	}
	// Text: `content-…` for pseudo-element `content`, not flex `align-content`
	if (utility === "content-none" || /^content-\[/.test(utility)) {
		return "text";
	}
	return undefined;
}
