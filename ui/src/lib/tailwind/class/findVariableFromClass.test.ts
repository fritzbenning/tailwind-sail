import { describe, expect, it } from "vitest";
import { findVariableFromClass } from "./findVariableFromClass";

describe("findVariableFromClass", () => {
	it("parses var() references inside arbitrary brackets", () => {
		expect(findVariableFromClass("text-[var(--foo)]")).toBe("--foo");
		expect(findVariableFromClass("bg-[var(--bar-baz_1)]")).toBe("--bar-baz_1");
	});

	it("parses Tailwind 4 parentheses var form", () => {
		expect(findVariableFromClass("text-(--foo)")).toBe("--foo");
		expect(findVariableFromClass("bg-(--bar)")).toBe("--bar");
		expect(findVariableFromClass("border-t-(--baz)")).toBe("--baz");
	});

	it("returns null without a matched var wrapper", () => {
		expect(findVariableFromClass("text-red-500")).toBe(null);
		expect(findVariableFromClass("text-[#f00]")).toBe(null);
		expect(findVariableFromClass("text-(--)")).toBe(null);
	});
});
