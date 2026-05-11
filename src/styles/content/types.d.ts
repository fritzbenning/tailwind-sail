/**
 * Stylesheet source PostCSS can treat as one unit (whole file or Vue `<style>` body).
 */
export interface StyleContentInfo {
	readonly styleContent: string;

	/** Document offset of the first character in `styleContent`. */
	readonly styleContentOffset: number;

	/** When `true`, parse with the SCSS-compatible PostCSS parser. */
	readonly useScssSyntax: boolean;
}
