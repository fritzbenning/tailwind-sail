import type { AtRule } from "postcss";

/**
 * Joins non-empty `@apply` parameter texts with spaces for tokenizer input.
 *
 * @param applies - Ordered `@apply` at-rules from a single rule body.
 * @returns Merged whitespace-delimited utilities string without leading redundancy.
 *
 * @example mergeApplyAtRuleParams([]) => ""
 * @example mergeApplyAtRuleParams(twoPostcssApplySiblingsWithParamsFlexAndTextSm) => "flex text-sm"
 */
export function mergeApplyAtRuleParams(applies: AtRule[]): string {
	return applies
		.map((rule) => (rule.params ?? "").trim())
		.filter((p) => p.length > 0)
		.join(" ");
}
