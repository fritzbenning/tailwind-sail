/**
 * Parses the `lang` attribute from a `<style ...>` open tag (quoted or bare).
 *
 * Shared by Vue, Svelte, Astro, and other formats that embed CSS in `<style>` elements.
 *
 * @param openTagMarkup - Full open tag text including `<style` and `>`.
 * @returns Lowercased language id, or an empty string when missing.
 *
 * @example getStyleLangValue('<style lang="scss">') => "scss"
 * @example getStyleLangValue("<style scoped>") => ""
 */
export function getStyleLangValue(openTagMarkup: string): string {
	const quoted = /\blang\s*=\s*["']([^"']+)["']/i.exec(openTagMarkup);

	if (quoted) {
		return quoted[1]!.trim().toLowerCase();
	}

	const bare = /\blang\s*=\s*([^\s/>]+)/i.exec(openTagMarkup);
	return bare ? bare[1]!.trim().toLowerCase() : "";
}
