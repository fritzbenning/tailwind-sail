import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import type { CssVariableEntry } from "../../../types";
import {
	DEFAULT_TAILWIND_SPACING_BASE_PX,
	getBuiltinTailwindRawPreview,
} from "./builtinTailwindRawPreview";
import { getCandidateCssVariableNamesForBaseUtility } from "./getCandidateCssVariableNamesForBaseUtility";
import { omitRawPreview } from "./omitRawPreview";

/**
 * Returns a short string for the preview column (e.g. `16px`), or `undefined`.
 *
 * 1. Workspace scan (merged entries) — direct lookup by `--token` name (reliable in the webview).
 * 2. Injected `--workspace-*` on `body` via `getComputedStyle` (fallback).
 * 3. Built-in default scale; spacing uses theme `--spacing` when it is a plain `px`/`rem` (same rules as 1 for `var`/`calc`).
 *
 * Skips `calc(` / nested `var()` in scanned values per plan.
 *
 * @param baseUtility - From {@link getBaseUtility}.
 * @param workspaceCssVariables - Merged list from the extension host; preferred over DOM.
 */
export function getRawUtilityPreviewDisplay(
	baseUtility: string,
	workspaceCssVariables?: readonly CssVariableEntry[],
): string | undefined {
	if (omitRawPreview(baseUtility)) {
		return;
	}

	const valueByName =
		workspaceCssVariables && workspaceCssVariables.length > 0
			? new Map(workspaceCssVariables.map((e) => [e.name, e.value] as const))
			: undefined;

	for (const candidate of getCandidateCssVariableNamesForBaseUtility(
		baseUtility,
	)) {
		const fromScan = valueByName?.get(candidate)?.trim();
		if (fromScan && !/calc\(/i.test(fromScan) && !/var\(/i.test(fromScan)) {
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
		if (/calc\(/i.test(raw) || /var\(/i.test(raw)) {
			continue;
		}
		return normalizeRawToPxLabel(raw);
	}

	const spacingBasePx =
		resolveWorkspaceSpacingBasePx(valueByName) ??
		DEFAULT_TAILWIND_SPACING_BASE_PX;
	return getBuiltinTailwindRawPreview(baseUtility, { spacingBasePx });
}

function themeValueHasUnresolvableExpr(value: string): boolean {
	return /calc\(/i.test(value) || /var\(/i.test(value);
}

/**
 * Resolves the numeric spacing base from theme `--spacing` (e.g. `12px` → 12) for built-in `p-*` / `w-*` labels.
 * Returns `undefined` when missing, unparseable, or still references `var()`/`calc()`.
 */
function resolveWorkspaceSpacingBasePx(
	valueByName: Map<string, string> | undefined,
): number | undefined {
	const fromScan = valueByName?.get("--spacing")?.trim();
	if (fromScan && !themeValueHasUnresolvableExpr(fromScan)) {
		const n = parsePlainLengthToPxNumber(fromScan);
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
	if (raw && !themeValueHasUnresolvableExpr(raw)) {
		return parsePlainLengthToPxNumber(raw);
	}
	return undefined;
}

function parsePlainLengthToPxNumber(value: string): number | undefined {
	const t = value.trim();
	const rem = /^([\d.]+)rem$/i.exec(t);
	if (rem) {
		const n = Number(rem[1]);
		if (!Number.isNaN(n)) {
			return Math.round(n * 16);
		}
	}
	const px = /^([\d.]+)px$/i.exec(t);
	if (px) {
		return Math.round(Number(px[1]));
	}
	return undefined;
}

/**
 * If the value is a plain `rem` length, show as px for consistency; otherwise return as-is.
 */
function normalizeRawToPxLabel(value: string): string {
	const t = value.trim();
	const rem = /^([\d.]+)rem$/i.exec(t);
	if (rem) {
		const n = Number(rem[1]);
		if (!Number.isNaN(n)) {
			return `${Math.round(n * 16)}px`;
		}
	}
	const px = /^([\d.]+)px$/i.exec(t);
	if (px) {
		return `${Math.round(Number(px[1]))}px`;
	}
	return t;
}
