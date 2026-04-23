/**
 * Normalizes lengths for preview labels: `rem`/`px` become rounded `px`; other values pass through trimmed.
 *
 * @param value - Resolved CSS length from a theme token or computed style.
 * @returns A string such as `16px`, or the trimmed input when not a simple `rem`/`px` length.
 *
 * @example normalizeRawToPxLabel("1rem") => "16px"
 * @example normalizeRawToPxLabel("1.5rem") => "24px"
 * @example normalizeRawToPxLabel("1.3") => "1.3"
 * @example normalizeRawToPxLabel("10.4px") => "10px"
 */
export function normalizeRawToPxLabel(value: string): string {
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
