import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import type { CssVariableEntry } from "../../types";
import type { TailwindBackgroundClass } from "../tailwind/color/getTailwindBackgroundColorClass";

const SHADCN_HSL_CHANNELS_RE =
	/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%(\s*\/\s*[^;)]+)?$/;

function isThemeColorName(name: string): boolean {
	return name.startsWith("--color-") && name.length > "--color-".length;
}

function isLikelyColorCssValue(value: string): boolean {
	const v = value.trim();
	if (!v) {
		return false;
	}
	if (/^#[0-9a-fA-F]{3,8}$/.test(v)) {
		return true;
	}
	if (/^(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)\(/i.test(v)) {
		return true;
	}
	if (/^color-mix\(/i.test(v)) {
		return true;
	}
	if (SHADCN_HSL_CHANNELS_RE.test(v)) {
		return true;
	}
	if (/^var\(\s*--[a-zA-Z0-9_-]+\s*\)$/.test(v)) {
		return true;
	}
	return false;
}

/**
 * When non-null, the variable is treated as color-like and can be previewed via injected
 * `--workspace-*` values on `document.body` (same as class-list swatches).
 */
export function getCssVariableSwatchDescriptor(
	entry: CssVariableEntry,
): TailwindBackgroundClass | null {
	const workspace = buildWorkspaceVariableName(entry.name);
	if (!workspace) {
		return null;
	}
	const raw = entry.value.replace(/\s+/g, " ").trim();
	if (!isThemeColorName(entry.name) && !isLikelyColorCssValue(raw)) {
		return null;
	}
	if (isThemeColorName(entry.name)) {
		return {
			className: "",
			backgroundColor: `var(${workspace})`,
		};
	}
	if (SHADCN_HSL_CHANNELS_RE.test(raw)) {
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
