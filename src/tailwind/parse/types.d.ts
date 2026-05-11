/**
 * One whitespace-delimited class token inside a `class` attribute.
 *
 * @property name - Token text as authored.
 *
 * @property startInRaw - Inclusive start in the attribute string.
 * @property endInRaw - Exclusive end in the attribute string.
 *
 * @example { name: "p-4", startInRaw: 0, endInRaw: 3 }
 */
export interface ParsedTailwindClass {
	readonly name: string;
	readonly startInRaw: number;
	readonly endInRaw: number;
}

/**
 * Result of {@link parseTailwindClasses}.
 *
 * @property classes - Parsed tokens with spans.
 *
 * @property isTailwind - Heuristic signal (same basis as `hasTailwindClasses`).
 * @example { classes: [{ name: "p-4", startInRaw: 0, endInRaw: 3 }], isTailwind: true }
 */
export interface ParsedTailwindResult {
	readonly classes: ParsedTailwindClass[];
	readonly isTailwind: boolean;
}
