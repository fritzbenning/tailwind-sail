import { normalizeRawToPxLabel } from "./normalizeRawToPxLabel";

/**
 * Parses a plain `px` or `rem` length into pixels (via {@link normalizeRawToPxLabel}).
 *
 * @param value - Length string such as `12px` or `1rem` (whitespace trimmed).
 * @returns Integer px when the normalized label is `Npx`; otherwise `undefined`.
 *
 * @example parseToPixelNumber("12px") => 12
 * @example parseToPixelNumber("0.25rem") => 4
 * @example parseToPixelNumber("50%") => undefined
 */
export function parseToPixelNumber(value: string): number | undefined {
	const label = normalizeRawToPxLabel(value);

	const px = /^(\d+)px$/.exec(label);

	if (!px) {
		return undefined;
	}

	return Number(px[1]);
}
