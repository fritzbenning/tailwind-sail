import type { AtRule, Rule } from "postcss";

/**
 * Collects `@apply` at-rules that are direct children of `rule`.
 *
 * @param rule - PostCSS Rule node (`{ ... }` body).
 * @returns `@apply` nodes in authored order (case-insensitive name match).
 *
 * @example listTailwindApplyAtRules(ruleWithOnlyApplyFlex).length === 1
 * @example listTailwindApplyAtRules(ruleWithNoAtRules) => []
 */
export function listTailwindApplyAtRules(rule: Rule): AtRule[] {
	const out: AtRule[] = [];

	for (const node of rule.nodes ?? []) {
		if (node.type === "atrule" && node.name.toLowerCase() === "apply") {
			out.push(node);
		}
	}

	return out;
}
