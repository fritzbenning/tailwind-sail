/**
 * Returns the first hyphen-separated segment of a utility tail.
 *
 * @param rest - Segment after a prefix (e.g. `red` from `red-500`).
 * @returns The substring before the first `-`, or `""` when `rest` is empty.
 *
 * @example firstSegment("red-500") => "red"
 * @example firstSegment("2") => "2"
 */
export function firstSegment(rest: string): string {
	return rest.split("-")[0] ?? "";
}
