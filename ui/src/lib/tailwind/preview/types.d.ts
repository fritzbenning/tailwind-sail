/**
 * A family that maps a base utility to `--*` theme variable names to try in workspace / DOM.
 * Order comes from each registry entry’s `order` (e.g. spacing before `text-`).
 */
export type PreviewVariableFamily = {
	readonly id: string;
	readonly match: (baseUtility: string) => boolean;
	readonly overrides: (baseUtility: string) => readonly string[];
};

export type PreviewDefaultContext = {
	readonly spacingBasePx: number;
};

export type PreviewOptions = {
	readonly spacingBasePx?: number;
};
