import { describe, expect, it } from "vitest";
import { getClassValueVariable } from "./getClassValueVariable";

describe("getClassValueVariable", () => {
	it("reads var() from arbitrary bracket utilities", () => {
		expect(getClassValueVariable("text-[var(--foo)]")).toBe("--foo");
		expect(getClassValueVariable("bg-[var(--bar-baz_1)]")).toBe("--bar-baz_1");
	});

	it("reads Tailwind 4 parenthesized custom properties", () => {
		expect(getClassValueVariable("text-(--foo)")).toBe("--foo");
		expect(getClassValueVariable("bg-(--bar)")).toBe("--bar");
		expect(getClassValueVariable("border-t-(--baz)")).toBe("--baz");
	});

	it("returns null when not a var reference", () => {
		expect(getClassValueVariable("text-red-500")).toBe(null);
		expect(getClassValueVariable("text-[#f00]")).toBe(null);
		expect(getClassValueVariable("text-(--)")).toBe(null);
	});
});
