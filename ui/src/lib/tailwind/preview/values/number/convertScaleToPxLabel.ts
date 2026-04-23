import { DEFAULT_SPACING } from "../../utilities/spacing/constants";

/**
 * Maps a spacing scale key to a pixel preview label (`key × spacingBasePx`, default 4px per step).
 *
 * @param key - Token after the utility prefix (`4`, `px`, `0`, …).
 * @param spacingBasePx - Pixels per numeric step; defaults to {@link DEFAULT_SPACING}.
 * @returns `Npx`, `1px` for `px`, `0px` for `0`, or `undefined` for non-numeric keys (except `px`/`0`).
 *
 * @example convertScaleToPxLabel("4") => "16px"
 * @example convertScaleToPxLabel("px") => "1px"
 * @example convertScaleToPxLabel("3", 5) => "15px"
 * @example convertScaleToPxLabel("sm") => undefined
 */
export function convertScaleToPxLabel(
	key: string,
	spacingBasePx: number = DEFAULT_SPACING,
): string | undefined {
	if (key === "px") {
		return "1px";
	}

	if (key === "0") {
		return "0px";
	}

	const n = Number(key);

	if (Number.isNaN(n)) {
		return undefined;
	}

	return `${Math.round(n * spacingBasePx)}px`;
}
