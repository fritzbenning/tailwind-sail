export function findLastVariantSegment(token: string): string {
	const idx = token.lastIndexOf(':');
	if (idx === -1 || idx === token.length - 1) {
		return token;
	}
	return token.slice(idx + 1);
}
