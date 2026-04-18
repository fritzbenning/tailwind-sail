export interface ParsedTailwindClass {
	readonly name: string;
	/** Half-open range in the extracted string content (before quote delimiters). */
	readonly startInRaw: number;
	readonly endInRaw: number;
}

export interface ParsedTailwindResult {
	readonly classes: ParsedTailwindClass[];
	/** True if at least one token looks Tailwind-like (heuristic; not proof of validity). */
	readonly looksLikeTailwind: boolean;
}
