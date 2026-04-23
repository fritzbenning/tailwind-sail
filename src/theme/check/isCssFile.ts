import * as path from "node:path";

/**
 * Whether `filePath` uses a `.css` extension, as required for Tailwind theme files
 * in this extension ({@link getVariableScope}, variable scanning).
 *
 * @param filePath - Any path string (e.g. workspace-relative `src/a.css` or `/p/x.css`).
 *
 * @example
 * isCssFile("src/theme.css") // true
 * isCssFile("theme.pcss") // false
 */
export function isCssFile(filePath: string): boolean {
	return path.extname(filePath).toLowerCase() === ".css";
}
