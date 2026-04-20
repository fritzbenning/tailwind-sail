import { UTILITY_CATEGORIES } from "../categories";

/**
 * Maps a normalized utility string to a sidebar category id.
 *
 * @param utility - Utility without variant prefixes.
 * @returns Category id string (e.g. `box`, `text`, `others`).
 *
 * @example classifyTailwindUtility("p-4") => "box"
 */
export function classifyTailwindUtility(utility: string): string {
	if (!utility) {
		return "others";
	}
	for (const cat of UTILITY_CATEGORIES) {
		if (cat.id === "others") {
			break;
		}
		const sorted = [...cat.prefixes].sort((a, b) => b.length - a.length);
		for (const p of sorted) {
			if (utility === p || utility.startsWith(p)) {
				return cat.id;
			}
		}
	}
	return "others";
}
