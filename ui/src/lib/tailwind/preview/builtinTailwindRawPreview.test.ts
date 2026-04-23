import { describe, expect, it } from "vitest";
import { getBuiltinTailwindRawPreview } from "./builtinTailwindRawPreview";

describe("getBuiltinTailwindRawPreview", () => {
	it("maps text sizes to px", () => {
		expect(getBuiltinTailwindRawPreview("text-sm")).toBe("14px");
		expect(getBuiltinTailwindRawPreview("text-base")).toBe("16px");
		expect(getBuiltinTailwindRawPreview("text-md")).toBe("16px");
	});

	it("maps leading keywords to relative multipliers and numeric keys to px", () => {
		expect(getBuiltinTailwindRawPreview("leading-tight")).toBe("1.25");
		expect(getBuiltinTailwindRawPreview("leading-snug")).toBe("1.375");
		expect(getBuiltinTailwindRawPreview("leading-normal")).toBe("1.5");
		expect(getBuiltinTailwindRawPreview("leading-relaxed")).toBe("1.625");
		expect(getBuiltinTailwindRawPreview("leading-loose")).toBe("2");
		expect(getBuiltinTailwindRawPreview("leading-none")).toBe("1");
		expect(getBuiltinTailwindRawPreview("leading-4")).toBe("16px");
		expect(getBuiltinTailwindRawPreview("leading-px")).toBe("1px");
	});

	it("maps spacing scale to px", () => {
		expect(getBuiltinTailwindRawPreview("p-4")).toBe("16px");
		expect(getBuiltinTailwindRawPreview("gap-2")).toBe("8px");
		expect(getBuiltinTailwindRawPreview("px-px")).toBe("1px");
	});

	it("maps max-width named, screen, and spacing to px", () => {
		expect(getBuiltinTailwindRawPreview("max-w-xs")).toBe("320px");
		expect(getBuiltinTailwindRawPreview("max-w-sm")).toBe("384px");
		expect(getBuiltinTailwindRawPreview("max-w-4xl")).toBe("896px");
		expect(getBuiltinTailwindRawPreview("max-w-screen-md")).toBe("768px");
		expect(getBuiltinTailwindRawPreview("max-w-4")).toBe("16px");
	});

	it("maps width, height, min/max constraints on spacing scale to px", () => {
		expect(getBuiltinTailwindRawPreview("w-64")).toBe("256px");
		expect(getBuiltinTailwindRawPreview("h-12")).toBe("48px");
		expect(getBuiltinTailwindRawPreview("min-w-12")).toBe("48px");
		expect(getBuiltinTailwindRawPreview("max-h-96")).toBe("384px");
		expect(getBuiltinTailwindRawPreview("size-8")).toBe("32px");
	});

	it("returns undefined for arbitrary or unknown", () => {
		expect(getBuiltinTailwindRawPreview("text-[13px]")).toBeUndefined();
		expect(getBuiltinTailwindRawPreview("text-rose-500")).toBeUndefined();
		expect(getBuiltinTailwindRawPreview("unknown-4")).toBeUndefined();
	});

	it("uses custom spacingBasePx for spacing-scale utilities (theme --spacing)", () => {
		expect(
			getBuiltinTailwindRawPreview("p-4", { spacingBasePx: 12 }),
		).toBe("48px");
		expect(
			getBuiltinTailwindRawPreview("gap-2", { spacingBasePx: 10 }),
		).toBe("20px");
		expect(
			getBuiltinTailwindRawPreview("leading-4", { spacingBasePx: 6 }),
		).toBe("24px");
		expect(
			getBuiltinTailwindRawPreview("max-w-4", { spacingBasePx: 5 }),
		).toBe("20px");
	});
});
