import type { AtRule, Container, Rule } from "postcss";

import { offsetStrictlyInsideNode } from "../ast/offsetStrictlyInsideNode";

/**
 * Walks direct children of `container` to find the innermost `{ ... }` rule containing `offset`.
 *
 * @param container - PostCSS container (root, rule body, or at-rule body).
 * @param offset - 0-based index into the same text string PostCSS parsed.
 * @returns The deepest matching `rule`, or `undefined`.
 *
 * @example descendToInnermostRule(root, cursorInsideNestedRule)?.selector === ".inner"
 */
export function descendToInnermostRule(
	container: Container,
	offset: number,
): Rule | undefined {
	const nodes = container.nodes;
	if (!nodes) {
		return undefined;
	}
	for (const child of nodes) {
		if (child.type === "rule") {
			if (!offsetStrictlyInsideNode(child, offset)) {
				continue;
			}
			const deeper = descendToInnermostRule(child, offset);
			return deeper ?? child;
		}
		if (child.type === "atrule") {
			const atRule = child as AtRule;
			if (!atRule.nodes || !offsetStrictlyInsideNode(atRule, offset)) {
				continue;
			}

			const deeper = descendToInnermostRule(atRule as Container, offset);

			if (deeper !== undefined) {
				return deeper;
			}
		}
	}

	return;
}
