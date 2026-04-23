import { BORDER_RADIUS_CLASSES } from "../constants";

/**
 * Maps a `rounded*` utility to a theme radius scale key.
 *
 * @param baseUtility - Base utility only.
 * @returns `DEFAULT`, a named key such as `lg`, or `undefined`.
 *
 * @example roundedRadiusKey("rounded") => "DEFAULT"
 * @example roundedRadiusKey("rounded-lg") => "lg"
 * @example roundedRadiusKey("p-4") => undefined
 */
export function roundedRadiusKey(baseUtility: string): string | undefined {
	if (baseUtility === "rounded") {
		return "DEFAULT";
	}
	if (!baseUtility.startsWith("rounded-")) {
		return undefined;
	}
	const rest = baseUtility.slice("rounded-".length);
	if (!rest) {
		return undefined;
	}
	if (BORDER_RADIUS_CLASSES.has(baseUtility)) {
		return "DEFAULT";
	}
	const parts = rest.split("-");
	return parts[parts.length - 1] ?? undefined;
}
