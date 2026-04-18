export function getChipKey(sel: string): string {
	const t = sel.trim();
	return (t.endsWith(":") ? t.slice(0, -1) : t).toLowerCase();
}
