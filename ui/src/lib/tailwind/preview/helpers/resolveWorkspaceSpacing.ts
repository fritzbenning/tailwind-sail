import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import { parseToPixelNumber } from "../values/number/parseToPixelNumber";
import { hasUnsupportedExpression } from "./hasUnsupportedExpression";

/**
 * Resolves the theme `--spacing` step in pixels for default spacing/size previews.
 *
 * @param valueByName - Optional scan map of `--*` → value; when absent, uses `--workspace-*` on `body`.
 * @returns Rounded px per spacing step, or `undefined` when missing or not a plain length.
 *
 * @example resolveWorkspaceSpacing(new Map([["--spacing", "8px"]])) => 8
 * @example resolveWorkspaceSpacing(new Map([["--spacing", "var(--s)"]])) => undefined
 */
export function resolveWorkspaceSpacing(
	valueByName: Map<string, string> | undefined,
): number | undefined {
	const fromScan = valueByName?.get("--spacing")?.trim();

	if (fromScan && !hasUnsupportedExpression(fromScan)) {
		const n = parseToPixelNumber(fromScan);
		if (n !== undefined) {
			return n;
		}
	}

	const workspace = buildWorkspaceVariableName("--spacing");

	if (!workspace) {
		return undefined;
	}

	const el = document.body ?? document.documentElement;
	const raw = getComputedStyle(el).getPropertyValue(workspace).trim();

	if (raw && !hasUnsupportedExpression(raw)) {
		return parseToPixelNumber(raw);
	}

	return undefined;
}
