import type { CssVariableEntry } from "../../types";
import { getWorkspaceVariableNames } from "./getWorkspaceVariableNames";

let lastAppliedWorkspaceVarNames = new Set<string>();

/**
 * Applies scanned project variables as `--workspace-*` on `document.body` (inline custom properties).
 * Runs synchronously when `document.body` exists so Solid updates after this still see resolved vars;
 * if `body` is missing, retries on the next animation frame.
 * Removes stale `--workspace-*` from the previous scan.
 *
 * @param entries - Variable definitions from the extension workspace scan.
 * @returns `void` after scheduling or applying declarations on `document.body`.
 *
 * @example applyVariablesToBody([]) - clears stale `--workspace-*` properties from `body`.
 */
export function applyVariablesToBody(
	entries: readonly CssVariableEntry[],
): void {
	const decls = getWorkspaceVariableNames(entries);

	const run = (): void => {
		const body = document.body;

		if (!body) {
			requestAnimationFrame(run);
			return;
		}

		const next = new Set<string>();
		for (const d of decls) {
			next.add(d.name);
			body.style.setProperty(d.name, d.value);
		}
		for (const name of lastAppliedWorkspaceVarNames) {
			if (!next.has(name)) {
				body.style.removeProperty(name);
			}
		}

		lastAppliedWorkspaceVarNames = next;
	};

	run();
}
