import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import { getArbitraryColorFromBracketUtility } from "./getArbitraryColorFromBracketUtility";
import { getBaseUtility } from "../class/getBaseUtility";
import { getColorTailForSolidBg } from "./getColorTailForSolidBg";
import { getCssVarNameFromBracketVarUtility } from "./getCssVarNameFromBracketVarUtility";
import { isPaletteShade } from "./isPaletteShade";
import { isSpecial } from "./isSpecial";

/**
 * Descriptor for a solid preview swatch: Tailwind `bg-*` for palette colors, or inline
 * `background-color` when arbitrary / CSS variables would require non-generated `bg-[…]` classes.
 *
 * @property className - Palette/special utilities only; empty when {@link backgroundColor} is set.
 * @property backgroundColor - Optional CSS value for inline `background-color` on the swatch.
 *
 * @example { className: "bg-red-500" }
 * @example { className: "", backgroundColor: "var(--workspace-brand)" }
 */
export type TailwindBackgroundClass = {
	className: string;
	backgroundColor?: string;
};

export type TailwindBackgroundClassOptions = {
	/** When a class uses `-[var(--token)]` and `--token` is in this set, preview via `--workspace-token`. */
	readonly knownCssVariableNames?: ReadonlySet<string>;
};

/**
 * Detect Tailwind color utilities and derive the matching `bg-*` class for a solid preview
 *
 * (variants stripped). Non-`bg` utilities map to the equivalent `bg-{color}` class.
 *
 * @param className - Full class string as authored (may include variants and `!`).
 * @returns `{ className }` with one `bg-*` utility, or `null` if not a supported solid color.
 *
 * @example getTailwindBackgroundColorClass("text-red-500") => { className: "bg-red-500" }
 * @example getTailwindBackgroundColorClass("md:hover:border-blue-600") => { className: "bg-blue-600" }
 * @example getTailwindBackgroundColorClass("text-[#f97316]") => { className: "", backgroundColor: "#f97316" }
 * @example getTailwindBackgroundColorClass("text-center") => null
 */
export function getTailwindBackgroundColorClass(
	className: string,
	options?: TailwindBackgroundClassOptions,
): TailwindBackgroundClass | null {
	const base = getBaseUtility(className);
	if (!base) {
		return null;
	}

	const varName = getCssVarNameFromBracketVarUtility(base);
	if (varName && options?.knownCssVariableNames?.has(varName) === true) {
		const workspace = buildWorkspaceVariableName(varName);
		if (workspace) {
			return {
				className: "",
				backgroundColor: `var(${workspace})`,
			};
		}
	}

	const arb = getArbitraryColorFromBracketUtility(base);
	if (arb) {
		return {
			className: "",
			backgroundColor: arb,
		};
	}

	const dash = base.indexOf("-");
	if (dash === -1) {
		return null;
	}
	const prefix = base.slice(0, dash);
	const rest = base.slice(dash + 1);
	if (!rest) {
		return null;
	}

	const tail = getColorTailForSolidBg(prefix, rest);
	if (tail === null) {
		return null;
	}

	if (!isPaletteShade(tail) && !isSpecial(tail)) {
		const themeKey = tail.split("/")[0]?.trim() ?? "";
		if (themeKey) {
			const themeVarName = `--color-${themeKey}`;
			if (options?.knownCssVariableNames?.has(themeVarName) === true) {
				const workspace = buildWorkspaceVariableName(themeVarName);
				if (workspace) {
					return {
						className: "",
						backgroundColor: `var(${workspace})`,
					};
				}
			}
			const primitiveName = `--${themeKey}`;
			if (options?.knownCssVariableNames?.has(primitiveName) === true) {
				const workspace = buildWorkspaceVariableName(primitiveName);
				if (workspace) {
					return {
						className: "",
						backgroundColor: `hsl(var(${workspace}))`,
					};
				}
			}
		}
		return null;
	}

	return {
		className: `bg-${tail}`,
	};
}
