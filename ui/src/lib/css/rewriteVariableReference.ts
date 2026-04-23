import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";

const VAR_CALL_RE = /var\(\s*(--[a-zA-Z0-9_-]+)\s*\)/g;

/**
 * Rewrites `var(--token)` to `var(--workspace-token)` when `--token` is in the scanned set.
 * Used for theme chains such as `--color-background: hsl(var(--background))` in the webview.
 *
 * @param value - A CSS value that may contain one or more `var(--name)` substrings.
 * @param knownNames - The set of `--names` that appeared in the workspace scan; only those are rewritten.
 * @returns The value with known `var()` calls pointing at `--workspace-*` aliases.
 *
 * @example rewriteVariableReference("hsl(var(--background))", new Set(["--background"])) => "hsl(var(--workspace-background))"
 * @example rewriteVariableReference("hsl(var(--background))", new Set()) => "hsl(var(--background))"
 */
export function rewriteVariableReference(
	value: string,
	knownNames: ReadonlySet<string>,
): string {
	return value.replace(VAR_CALL_RE, (full, name: string) => {
		if (!knownNames.has(name)) {
			return full;
		}
		const workspace = buildWorkspaceVariableName(name);
		return workspace ? `var(${workspace})` : full;
	});
}
