/**
 * Maps a scanned custom property name to a safe `--workspace-*` name for the webview.
 *
 * @param canonicalName - Must look like `--token` with a token of `[a-zA-Z0-9_-]+`.
 * @returns E.g. `--foo` → `--workspace-foo`, or `undefined` if the name is invalid.
 *
 * @example
 * buildWorkspaceVariableName("--brand") // "--workspace-brand"
 * buildWorkspaceVariableName("nope") // undefined
 */
export function buildWorkspaceVariableName(
	canonicalName: string,
): string | undefined {
	if (!canonicalName.startsWith("--")) {
		return undefined;
	}
	const token = canonicalName.slice(2);
	if (!/^[a-zA-Z0-9_-]+$/.test(token)) {
		return undefined;
	}
	return `--workspace-${token}`;
}
