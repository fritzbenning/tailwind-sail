/**
 * Human-readable label for a CSS custom property: removes a leading `--`, then
 * capitalizes the first letter of each hyphen-separated segment and joins them with spaces.
 */
export function getVariableDisplayTitle(name: string): string {
	const body = name.replace(/^--/, "");
	if (!body) {
		return "";
	}
	return body
		.split("-")
		.filter((segment) => segment.length > 0)
		.map(
			(segment) =>
				segment.charAt(0).toUpperCase() + segment.slice(1),
		)
		.join(" ");
}
