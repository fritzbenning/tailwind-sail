import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import { findVariableFromClass } from "../../../class/findVariableFromClass";
import { getClassName } from "../../../class/getClassName";
import { findArbitraryColor } from "./findArbitraryColor";
import { findColorTail } from "./findColorTail";
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
	/** When a class uses `-[var(--token)]` or `…-(--token)` (Tailwind 4) and `--token` is in this set, preview via `--workspace-token`. */
	readonly knownCssVariableNames?: ReadonlySet<string>;
};

/**
 * Maps a color-related utility to a solid preview (`bg-*` or inline `background-color`), when supported.
 *
 * @param className - Full class as authored (variants and `!` allowed).
 * @param options - Optional known `--*` names for workspace variable bridging.
 * @returns A `bg-*` class and/or inline color, or `null` when not a supported solid color.
 *
 * @example findBackgroundColorClass("text-red-500") => { className: "bg-red-500" }
 * @example findBackgroundColorClass("md:hover:border-blue-600") => { className: "bg-blue-600" }
 * @example findBackgroundColorClass("text-[#f97316]") => { className: "", backgroundColor: "#f97316" }
 * @example findBackgroundColorClass("text-center") => null
 */
export function findBackgroundColorClass(
	className: string,
	options?: TailwindBackgroundClassOptions,
): TailwindBackgroundClass | null {
	const base = getClassName(className);

	if (!base) {
		return null;
	}

	const varName = findVariableFromClass(base);
	if (varName && options?.knownCssVariableNames?.has(varName) === true) {
		const workspace = buildWorkspaceVariableName(varName);
		if (workspace) {
			return {
				className: "",
				backgroundColor: `var(${workspace})`,
			};
		}
	}

	const arb = findArbitraryColor(base);

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

	const tail = findColorTail(prefix, rest);
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
