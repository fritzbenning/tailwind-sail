import { describe, expect, it } from "vitest";
import { getTailwindBackgroundColorClass } from "./getTailwindBackgroundColorClass";

describe("getTailwindBackgroundColorClass", () => {
	it("maps palette text and border colors to bg-*", () => {
		expect(getTailwindBackgroundColorClass("text-red-500")).toEqual({
			className: "bg-red-500",
		});
		expect(getTailwindBackgroundColorClass("md:hover:border-blue-600")).toEqual(
			{
				className: "bg-blue-600",
			},
		);
	});

	it("maps arbitrary bracket colors to bg-[…]", () => {
		expect(getTailwindBackgroundColorClass("text-[#f97316]")).toEqual({
			className: "bg-[#f97316]",
		});
	});

	it("returns null for non-color utilities", () => {
		expect(getTailwindBackgroundColorClass("text-center")).toBe(null);
	});
});
