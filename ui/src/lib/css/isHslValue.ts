const HSL_CHANNEL_COMPONENTS_RE =
	/^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%(\s*\/\s*[^;)]+)?$/;

/**
 * Whether `value` matches space-separated HSL channel syntax (e.g. shadcn-style themes:
 * `0 0% 9%` or with alpha: `0 0% 9% / 0.5`), not wrapped in `hsl()`.
 *
 * @param value - Raw CSS value; surrounding whitespace is ignored for the test.
 * @returns `true` when the value looks like HSL channel components (not wrapped in `hsl()`).
 *
 * @example isHslValue("0 0% 9%") => true
 * @example isHslValue("0 0% 9% / 0.5") => true
 * @example isHslValue("#f97316") => false
 */
export function isHslValue(value: string): boolean {
	return HSL_CHANNEL_COMPONENTS_RE.test(value.trim());
}
