/**
 * Normalizes a workspace-relative path stored in `tailwind-sail.variables.sourceFiles`
 * for stable comparison and URI joining: trims, strips a leading `./`, flips
 * backslashes to forward slashes, and collapses duplicate slashes.
 *
 * @param raw - Path segment(s) as stored in settings or from `asRelativePath`.
 * @returns The normalized POSIX-style path, or `""` when there is no usable path.
 *
 * @example
 * normalizeThemePath(".\\src\\./foo.css") // "src/foo.css"
 */
export function normalizeThemePath(raw: string): string {
	let s = raw.trim();
	if (s.length === 0) {
		return "";
	}
	s = s.replace(/\\/g, "/");
	if (s.startsWith("./")) {
		s = s.slice(2);
	}
	s = s.replace(/\/+/g, "/");
	return s.replace(/^\/+/, "").trimEnd();
}
