import { UTILITY_CATEGORIES } from "../categories";

/**
 * Returns a semantic category id for a utility segment (variants already split off).
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
