import { describe, expect, it } from "vitest";
import { getVariableFromClass } from "./getVariableFromClass";

describe("getVariableFromClass", () => {
	it("reads var() from arbitrary bracket utilities", () => {
		expect(getVariableFromClass("text-[var(--foo)]")).toBe("--foo");
		expect(getVariableFromClass("bg-[var(--bar-baz_1)]")).toBe("--bar-baz_1");
	});

	it("reads Tailwind 4 parenthesized custom properties", () => {
		expect(getVariableFromClass("text-(--foo)")).toBe("--foo");
		expect(getVariableFromClass("border-t-(--baz)")).toBe("--baz");
	});

	it("returns null when not a var reference", () => {
		expect(getVariableFromClass("text-red-500")).toBe(null);
		expect(getVariableFromClass("text-[#f00]")).toBe(null);
		expect(getVariableFromClass("text-(--)")).toBe(null);
	});
});
