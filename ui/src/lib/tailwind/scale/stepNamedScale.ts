import { findNamedScaleTail } from "./findNamedScaleTail";
import { getNamedSteps } from "./getNamedSteps";

/**
 * Steps the trailing **named breakpoint / size keyword** on one utility token (no variant prefixes), preserving a leading important `!`.
 *
 * @param utility - Base utility possibly prefixed with `!` (e.g. `!shadow-lg`, `text-sm`).
 * @param direction - `-1` smaller step, `1` larger step.
 * @returns Updated utility, or `null` when no matching named tail exists or the step is out of range.
 *
 * @example stepNamedScale("rounded-md", 1) => "rounded-lg"
 * @example stepNamedScale("rounded", 1) => "rounded-md"
 * @example stepNamedScale("!text-sm", 1) => "!text-base"
 */
export function stepNamedScale(
	utility: string,
	direction: 1 | -1,
): string | null {
	let rest = utility;
	let importantPrefix = "";

	if (rest.startsWith("!")) {
		importantPrefix = "!";
		rest = rest.slice(1);
	}

	const steps = getNamedSteps(rest);

	if (!steps) {
		return null;
	}

	const current = findNamedScaleTail(rest, steps);

	if (!current) {
		return null;
	}

	const nextIndex = current.index + direction;

	if (nextIndex < 0 || nextIndex >= steps.length) {
		return null;
	}

	const nextToken = steps[nextIndex];
	const nextRest =
		nextToken === ""
			? current.prefix
			: `${current.prefix}-${nextToken}`;

	return `${importantPrefix}${nextRest}`;
}
