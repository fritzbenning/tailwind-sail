import { ROUNDED_NAMED_STEPS } from "./constants";

const ROUNDED_SUFFIX_SET = new Set<string>(
	[...ROUNDED_NAMED_STEPS].filter((step) => step.length > 0),
);

/**
 * Parses the **global** `rounded` / `rounded-*` utility into prefix and step token when it uses the default radius scale (not corners like `rounded-tl`).
 *
 * @param utilityWithoutImportant - Base utility without a leading `!` (e.g. `rounded-md`, `rounded`).
 * @returns `prefix` plus `token` (`""` for bare `rounded`), or `null` when this is not a global rounded utility.
 *
 * @example getRoundedScaleTail("rounded") => { prefix: "rounded", token: "" }
 * @example getRoundedScaleTail("rounded-lg") => { prefix: "rounded", token: "lg" }
 * @example getRoundedScaleTail("rounded-tl") => null
 */
export function getRoundedScaleTail(
	utilityWithoutImportant: string,
): { prefix: string; token: string } | null {
	if (utilityWithoutImportant === "rounded") {
		return { prefix: "rounded", token: "" };
	}

	if (!utilityWithoutImportant.startsWith("rounded-")) {
		return null;
	}

	const suffix = utilityWithoutImportant.slice("rounded-".length);

	if (suffix.includes("-")) {
		return null;
	}

	if (!ROUNDED_SUFFIX_SET.has(suffix)) {
		return null;
	}

	return { prefix: "rounded", token: suffix };
}
