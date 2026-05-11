/**
 * Readable label for a CSS custom property: strips a leading `--`, title-cases each hyphen segment, joins with spaces.
 *
 * @param name - Token such as `--color-mint-500` or `color-mint-500`.
 * @returns Label for UI, or `""` when there is nothing left after stripping `--`.
 *
 * @example getVariableDisplayTitle("--color-mint-500") => "Color Mint 500"
 * @example getVariableDisplayTitle("--") => ""
 */
export function getVariableDisplayTitle(name: string): string {
	const body = name.replace(/^--/, "");
	if (!body) {
		return "";
	}
	return body
		.split("-")
		.filter((segment) => segment.length > 0)
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");
}
