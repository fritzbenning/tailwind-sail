import { ExtractedString } from "../string/types";
import type { ParsedTailwindResult } from "../tailwind/parse/types";

export interface SailEditorSnapshot {
	readonly extracted: ExtractedString | undefined;
	readonly parsed: ParsedTailwindResult | undefined;
}
