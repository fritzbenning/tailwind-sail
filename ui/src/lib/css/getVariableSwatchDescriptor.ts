import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import type { CssVariableEntry } from "../../types";
import type { TailwindBackgroundClass } from "../tailwind/preview/values/color/findBackgroundColorClass";
import { isColorValue } from "./isColorValue";
import { isHslValue } from "./isHslValue";
import { isThemeColorName } from "./isThemeColorName";

/**
 * Resolves a background preview for a CSS variable when the value can be shown as a color swatch.
 * Injected `--workspace-*` aliases on `document.body` carry the value (same pipeline as class-list swatches).
 * Returns `null` when the variable is not color-like, so the UI can hide the swatch.
 *
 * @param entry - Parsed variable with `name`, `value`, and `locations` from the extension.
 * @returns A {@link TailwindBackgroundClass} with `backgroundColor` set from the workspace alias, or `null` when no swatch should appear.
 *
 * @example getVariableSwatchDescriptor({ name: "--color-primary", value: "hsl(var(--p))", locations: [] }) => { className: "", backgroundColor: "var(--workspace-color-primary)" }
 * @example getVariableSwatchDescriptor({ name: "--primary", value: "0 0% 9%", locations: [] }) => { className: "", backgroundColor: "hsl(var(--workspace-primary))" }
 * @example getVariableSwatchDescriptor({ name: "--spacing-4", value: "1rem", locations: [] }) => null
 */
export function getVariableSwatchDescriptor(
	entry: CssVariableEntry,
): TailwindBackgroundClass | null {
	const workspace = buildWorkspaceVariableName(entry.name);
	if (!workspace) {
		return null;
	}
	const raw = entry.value.replace(/\s+/g, " ").trim();
	if (!isThemeColorName(entry.name) && !isColorValue(raw)) {
		return null;
	}
	if (isThemeColorName(entry.name)) {
		return {
			className: "",
			backgroundColor: `var(${workspace})`,
		};
	}
	if (isHslValue(raw)) {
		return {
			className: "",
			backgroundColor: `hsl(var(${workspace}))`,
		};
	}
	return {
		className: "",
		backgroundColor: `var(${workspace})`,
	};
}
