import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import type { CssVariableEntry } from "../../../types";
import { hasUnsupportedExpression } from "./helpers/hasUnsupportedExpression";
import { isPreviewAvailable } from "./helpers/isPreviewAvailable";
import { resolveWorkspaceSpacing } from "./helpers/resolveWorkspaceSpacing";
import { getDefault } from "./utilities/registry/getDefault";
import { getOverride } from "./utilities/registry/getOverride";
import { DEFAULT_SPACING } from "./utilities/spacing/constants";
import { normalizeRawToPxLabel } from "./values/number/normalizeRawToPxLabel";

/**
 * Resolves a short preview label for a base utility (scan → injected `--workspace-*` → default theme).
 *
 * @param baseUtility - Normalized utility from {@link getClassName} (arbitrary `[...]` excluded upstream).
 * @param workspaceCssVariables - Optional merged `--*` list from the host; preferred when non-empty.
 * @returns A label such as `16px`, or `undefined` when no safe value exists.
 *
 * @example getRawPreview("text-2xl", []) => "24px"
 */
export function getRawPreview(
	baseUtility: string,
	workspaceCssVariables?: readonly CssVariableEntry[],
): string | undefined {
	if (!isPreviewAvailable(baseUtility)) {
		return;
	}

	const valueByName =
		workspaceCssVariables && workspaceCssVariables.length > 0
			? new Map(workspaceCssVariables.map((e) => [e.name, e.value] as const))
			: undefined;

	for (const candidate of getOverride(baseUtility)) {
		const fromScan = valueByName?.get(candidate)?.trim();

		if (fromScan && !hasUnsupportedExpression(fromScan)) {
			return normalizeRawToPxLabel(fromScan);
		}

		const workspace = buildWorkspaceVariableName(candidate);

		if (!workspace) {
			continue;
		}

		const el = document.body ?? document.documentElement;
		const raw = getComputedStyle(el).getPropertyValue(workspace).trim();

		if (!raw) {
			continue;
		}

		if (hasUnsupportedExpression(raw)) {
			continue;
		}

		return normalizeRawToPxLabel(raw);
	}

	const spacingBasePx = resolveWorkspaceSpacing(valueByName) ?? DEFAULT_SPACING;

	return getDefault(baseUtility, { spacingBasePx });
}
