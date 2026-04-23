import { buildWorkspaceVariableName } from "@css/buildWorkspaceVariableName";
import type { CssVariableEntry } from "../../types";
import { bridgeVariableReference } from "./bridgeVariableReference";
import { rewriteVariableReference } from "./rewriteVariableReference";

export type WorkspaceVarDeclaration = {
	readonly name: string;
	readonly value: string;
};

/**
 * Produces resolved `--workspace-*` custom property declarations (same values as those applied
 * to `document.body` in the webview).
 *
 * @param entries - Variable rows from the extension workspace scan.
 * @returns An array of `{ name, value }` pairs with workspace-prefixed names and normalized values.
 *
 * @example getWorkspaceVariableNames([{ name: "--background", value: "0 0% 100%", locations: [] }]) => [{ name: "--workspace-background", value: "0 0% 100%" }]
 * @example getWorkspaceVariableNames([{ name: "--color-background", value: "hsl(var(--background))", locations: [] }, { name: "--background", value: "0 0% 100%", locations: [] }]) => [{ name: "--workspace-color-background", value: "hsl(var(--workspace-background))" }, { name: "--workspace-background", value: "0 0% 100%" }]
 */
export function getWorkspaceVariableNames(
	entries: readonly CssVariableEntry[],
): WorkspaceVarDeclaration[] {
	const knownNames = new Set(entries.map((e) => e.name));
	const out: WorkspaceVarDeclaration[] = [];

	for (const e of entries) {
		const workspaceName = buildWorkspaceVariableName(e.name);

		if (!workspaceName) {
			continue;
		}

		let normalized = e.value.replace(/\s+/g, " ").trim();

		if (
			normalized.length === 0 &&
			e.name.startsWith("--color-") &&
			e.name.length > "--color-".length
		) {
			const primitive = `--${e.name.slice("--color-".length)}`;
			const pu = buildWorkspaceVariableName(primitive);
			if (pu) {
				normalized = `hsl(var(${pu}))`;
			}
		}

		if (normalized.length === 0) {
			continue;
		}

		const safe = bridgeVariableReference(
			e.name,
			rewriteVariableReference(normalized, knownNames),
		);

		out.push({ name: workspaceName, value: safe });
	}
	return out;
}
