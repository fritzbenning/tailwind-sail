import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import { escapeRegExp } from "./escapeRegExp";

/**
 * For declarations like `--color-sidebar-primary: hsl(var(--sidebar-primary))`, ensures
 * `var(--sidebar-primary)` becomes `var(--workspace-sidebar-primary)` when the matching
 * primitive was missing from the scan (so {@link rewriteVariableReference} did
 * not rewrite that call).
 *
 * @param themeColorName - Full theme color variable name (e.g. `--color-primary`).
 * @param value - Normalized value string, possibly containing `var(--stem)` for the HSL channels.
 * @returns The value with the primitive `var(--stem)` call rewritten to the workspace-prefixed name when applicable.
 *
 * @example bridgeVariableReference("--color-primary", "hsl(var(--primary))") => "hsl(var(--workspace-primary))"
 * @example bridgeVariableReference("--spacing-4", "1rem") => "1rem"
 */
export function bridgeVariableReference(
	themeColorName: string,
	value: string,
): string {
	if (
		!themeColorName.startsWith("--color-") ||
		themeColorName.length <= "--color-".length
	) {
		return value;
	}

	const stem = themeColorName.slice("--color-".length);
	const prim = `--${stem}`;

	const workspacePrim = buildWorkspaceVariableName(prim);

	if (!workspacePrim) {
		return value;
	}

	return value.replace(
		new RegExp(`var\\(\\s*${escapeRegExp(prim)}\\s*\\)`, "g"),
		`var(${workspacePrim})`,
	);
}
