import { getNamedSteps } from "./getNamedSteps";
import { getScalePattern } from "./getScalePattern";

/**
 * Steps the trailing **named breakpoint / size keyword** on one utility token (no variant prefixes), preserving a leading important `!`.
 *
 * @param utility - Base utility possibly prefixed with `!` (e.g. `!shadow-lg`, `text-sm`).
 * @param direction - `-1` smaller step, `1` larger step.
 * @returns Updated utility, or `null` when no matching named tail exists or the step is out of range.
 *
 * @example stepNamedScale("rounded-md", 1) => "rounded-lg"
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

	const pattern = getScalePattern(steps);
	const match = pattern.exec(rest);

	if (!match?.[1]) {
		return null;
	}

	const token = match[1];
	const index = steps.indexOf(token);

	if (index === -1) {
		return null;
	}

	const nextIndex = index + direction;

	if (nextIndex < 0 || nextIndex >= steps.length) {
		return null;
	}

	const nextToken = steps[nextIndex];
	const prefix = rest.slice(0, rest.length - token.length - 1);

	return `${importantPrefix}${prefix}-${nextToken}`;
}
