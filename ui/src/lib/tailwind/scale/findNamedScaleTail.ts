import { ROUNDED_NAMED_STEPS } from "./constants";
import { getRoundedScaleTail } from "./getRoundedScaleTail";
import { getScalePattern } from "./getScalePattern";

/**
 * Locates the active **named scale** tail on a utility (variant-free), including bare `rounded` when the scale uses an empty token.
 *
 * @param rest - Utility without a leading `!`.
 * @param steps - Sequence returned by {@link getNamedSteps} for this utility family.
 * @returns Prefix stem, matched token, and its index in `steps`, or `null` when no tail applies.
 *
 * @example findNamedScaleTail("rounded-md", ROUNDED_NAMED_STEPS) => { prefix: "rounded", token: "md", index: 4 }
 */
export function findNamedScaleTail(
	rest: string,
	steps: readonly string[],
): { prefix: string; token: string; index: number } | null {
	if (steps === ROUNDED_NAMED_STEPS) {
		const rounded = getRoundedScaleTail(rest);

		if (!rounded) {
			return null;
		}

		const index = steps.findIndex((step) => step === rounded.token);

		if (index === -1) {
			return null;
		}

		return { prefix: rounded.prefix, token: rounded.token, index };
	}

	const nonEmptySteps = steps.filter((step) => step.length > 0);
	const pattern = getScalePattern(nonEmptySteps);
	const match = pattern.exec(rest);

	if (!match?.[1]) {
		return null;
	}

	const token = match[1];
	const index = steps.indexOf(token);

	if (index === -1) {
		return null;
	}

	const prefix = rest.slice(0, rest.length - token.length - 1);

	return { prefix, token, index };
}
