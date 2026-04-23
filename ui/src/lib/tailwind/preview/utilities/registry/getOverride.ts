import type { PreviewVariableFamily } from "../../types";
import {
	PREVIEW_REGISTRY,
	type TailwindPreviewRegistryEntry,
} from "./registry";

function toVariableCandidateFamilies(
	registry: readonly TailwindPreviewRegistryEntry[],
): readonly PreviewVariableFamily[] {
	return registry
		.filter(
			(e): e is Extract<TailwindPreviewRegistryEntry, { order: number }> =>
				"order" in e,
		)
		.toSorted((a, b) => a.order - b.order)
		.map((e) => ({
			id: e.id,
			match: e.match,
			overrides: e.overrides,
		}));
}

/**
 * Override families derived from {@link PREVIEW_REGISTRY}, sorted by each entry’s `order`.
 *
 * @see {@link PREVIEW_REGISTRY}
 */
export const VARIABLE_CANDIDATE_FAMILIES: readonly PreviewVariableFamily[] =
	toVariableCandidateFamilies(PREVIEW_REGISTRY);

/**
 * Lists `--*` theme variable names to try for workspace/DOM preview resolution.
 *
 * @param baseUtility - Base utility only (no variants).
 * @returns Candidate names in family order; empty for arbitrary utilities or non-matches.
 *
 * @example getOverride("p-4") => ["--spacing-4"]
 */
export function getOverride(baseUtility: string): readonly string[] {
	if (baseUtility.includes("[")) {
		return [];
	}

	for (const f of VARIABLE_CANDIDATE_FAMILIES) {
		if (f.match(baseUtility)) {
			return f.overrides(baseUtility);
		}
	}
	return [];
}
