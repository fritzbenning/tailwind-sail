/**
 * Whether `offset` lies strictly inside a node's source span (inclusive start, exclusive end).
 *
 * @param node - AST node with optional PostCSS `source` positions.
 * @param offset - 0-based index into the parsed text.
 * @returns `false` when `source.start` / `source.end` offsets are missing.
 *
 * @example offsetStrictlyInsideNode(ruleWithSpan10to50, 25) => true
 * @example offsetStrictlyInsideNode(ruleWithSpan10to50, 10) => true
 * @example offsetStrictlyInsideNode(ruleWithSpan10to50, 50) => false
 */
export function offsetStrictlyInsideNode(
	node: { source?: { start?: { offset?: number }; end?: { offset?: number } } },
	offset: number,
): boolean {
	const s = node.source?.start?.offset;
	const e = node.source?.end?.offset;

	if (s === undefined || e === undefined) {
		return false;
	}

	return offset >= s && offset < e;
}
